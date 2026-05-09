'use client';

import React, { FC, useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Button, Title, toast } from '@/components/ui';
import { ConfirmModal } from '@/components/common';
import { useMutation, useApolloClient } from '@apollo/client/react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from 'wagmi';
import clsx from 'clsx';
import { CREATE_POOL, REQUEST_POOL_APPROVAL_SIGNATURES, GET_SIGNATURE_TASK } from '@/lib/pool/operations';
import { FACTORY_ABI, FACTORY_ADDRESS, HOLD_TOKEN_ADDRESS, ERC20_APPROVE_ABI } from '@/lib/pool/factoryAbi';

// ── Constants ──────────────────────────────────────────────────────────────────
const TIMING_OPTIONS = Array.from({ length: 67 }, (_, i) => `${(i + 1) * 5} days`); // max 335 days: completionPeriod = timing + 30 ≤ 365
const COMMISSION_RATE = 0.03;
const MAX_TRANCHES = 20;
const CREATE_POOL_FEE_RATIO = '300'; // 3% in basis points
const PRICE_IMPACT_PERCENT = BigInt(101); // 100 is absent from the on-chain liquidity coefficient table
const ENTRY_PERIOD_DAYS = 90; // contract max; calendar months can exceed 90 days
const POLL_INTERVAL_MS = 3_000;
const POLL_TIMEOUT_MS = 120_000;

// ── Deploy helpers ─────────────────────────────────────────────────────────────
function toWei(amount: string | number): bigint {
  const n = typeof amount === 'string' ? Math.round(parseFloat(amount)) : Math.round(amount);
  return BigInt(n) * BigInt(10) ** BigInt(18);
}

function daysFromTimingOption(option: string): number {
  return parseInt(option);
}

function pollUntilComplete(
  poll: () => Promise<{ completed: boolean; expired: number; signatures: { signer: string; signature: string }[] | null }>,
  timeoutMs = POLL_TIMEOUT_MS
): Promise<{ signers: `0x${string}`[]; signatures: `0x${string}`[]; expired: bigint }> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const run = async () => {
      try {
        const task = await poll();
        if (task.completed && task.signatures?.length) {
          resolve({
            signers: task.signatures.map(s => s.signer as `0x${string}`),
            signatures: task.signatures.map(s => s.signature as `0x${string}`),
            expired: BigInt(task.expired),
          });
          return;
        }
        if (Date.now() - start > timeoutMs) {
          reject(new Error('Signature task timed out — try again'));
          return;
        }
        setTimeout(run, POLL_INTERVAL_MS);
      } catch (e) {
        reject(e);
      }
    };
    run();
  });
}

// ── Types ──────────────────────────────────────────────────────────────────────
interface Tranche {
  timing: string;
  percent: string;
  amount: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function formatNumber(n: number): string {
  if (!n) return '0';
  return Math.round(n).toLocaleString('en-US').replace(/,/g, ' ');
}

function parseNum(v: string): number {
  return parseFloat(v.replace(/\s/g, '')) || 0;
}

function addDays(isoDate: string, days: number): string {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + days);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}.${dd}.${yyyy}`;
}

function isoToDisplay(isoDate: string): string {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-');
  return `${m}.${d}.${y}`;
}

// ── Info icon ──────────────────────────────────────────────────────────────────
const InfoIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7.5" stroke="#959EB5" />
    <circle cx="8" cy="5" r="0.75" fill="#959EB5" />
    <path d="M8 7.5v4" stroke="#959EB5" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// ── Tooltip ────────────────────────────────────────────────────────────────────
const Tooltip: FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className="relative inline-flex items-center cursor-default"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span className="absolute left-0 bottom-full mb-2 z-50 w-64 bg-white rounded-xl shadow-base border border-stroke-primary p-3 text-xs text-grey-dark leading-relaxed whitespace-normal pointer-events-none">
          {text}
        </span>
      )}
    </span>
  );
};

// ── Calendar ───────────────────────────────────────────────────────────────────
const Calendar: FC<{ value: string; onChange: (v: string) => void; onClose: () => void; minDate?: string }> = ({
  value,
  onChange,
  onClose,
  minDate,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const init = value ? new Date(value) : new Date();
  const [viewMonth, setViewMonth] = useState(init.getMonth());
  const [viewYear, setViewYear] = useState(init.getFullYear());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const selected = value ? new Date(value) : null;
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const monthLabel = new Date(viewYear, viewMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const minDateObj = minDate ? new Date(minDate) : null;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selectDay = (day: number) => {
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(iso);
    onClose();
  };

  const isPast = (day: number) => {
    if (!minDateObj) return false;
    const d = new Date(viewYear, viewMonth, day);
    return d < new Date(minDateObj.getFullYear(), minDateObj.getMonth(), minDateObj.getDate());
  };

  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-1 z-50 bg-white rounded-2xl border border-stroke-primary shadow-base p-4 w-72"
    >
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="p-1 rounded-lg hover:bg-blue-light cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="#202E46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-blue-dark">{monthLabel}</span>
        <button type="button" onClick={nextMonth} className="p-1 rounded-lg hover:bg-blue-light cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="#202E46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-center text-xs text-grey py-1 font-medium">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const isSelected =
            selected &&
            selected.getDate() === day &&
            selected.getMonth() === viewMonth &&
            selected.getFullYear() === viewYear;
          const disabled = isPast(day);
          return (
            <button
              key={day}
              type="button"
              onClick={() => !disabled && selectDay(day)}
              disabled={disabled}
              className={clsx(
                'text-center text-sm py-1 rounded-lg transition-colors',
                disabled ? 'text-grey-light cursor-not-allowed' : 'cursor-pointer hover:bg-blue-light',
                isSelected && '!bg-blue !text-white hover:!bg-blue'
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ── Timing dropdown ────────────────────────────────────────────────────────────
const TimingDropdown: FC<{ value: string; onChange: (v: string) => void; minOption?: string }> = ({ value, onChange, minOption }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const minDays = minOption ? daysFromTimingOption(minOption) : 0;
  const availableOptions = TIMING_OPTIONS.filter(opt => daysFromTimingOption(opt) > minDays);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-stroke-primary bg-white text-sm cursor-pointer text-left"
      >
        <span className={value ? 'text-black' : 'text-label-tertiary'}>{value || 'Select timing'}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={clsx('shrink-0 transition-transform duration-200', open && 'rotate-180')}
        >
          <path d="M4 6l4 4 4-4" stroke="#959EB5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white rounded-xl border border-stroke-primary shadow-base max-h-48 overflow-y-auto">
          {availableOptions.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={clsx(
                'w-full text-left px-3 py-2.5 text-sm hover:bg-blue-light cursor-pointer transition-colors',
                value === opt && 'text-blue font-medium'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Info card ──────────────────────────────────────────────────────────────────
const InfoCard: FC<{ label: string; value: string; description: string; icon: React.ReactNode }> = ({
  label,
  value,
  description,
  icon,
}) => (
  <div className="bg-blue-light rounded-2xl p-4 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-grey-dark">{label}</span>
      <span className="text-blue">{icon}</span>
    </div>
    <span className="inline-flex bg-blue-dark text-white text-sm font-semibold px-3 py-1.5 rounded-lg self-start">
      {value}
    </span>
    <span className="text-sm text-grey-dark leading-snug">{description}</span>
  </div>
);

// ── SVG icons for info cards ───────────────────────────────────────────────────
const CommissionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M6.5 9h5M9 6.5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const DebtIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 5h12M3 9h12M3 13h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2.5" y="3.5" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2.5 7h13M6 2v3M12 2v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

// ── Page ───────────────────────────────────────────────────────────────────────
const AddPoolContent: FC = () => {
  const searchParams = useSearchParams();
  const businessId = searchParams.get('businessId') ?? '';
  const { address: walletAddress } = useAccount();
  const apolloClient = useApolloClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const [deployTxHash, setDeployTxHash] = useState<`0x${string}` | undefined>();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash: deployTxHash });

  const [createPool] = useMutation(CREATE_POOL);
  const [requestApproval] = useMutation(REQUEST_POOL_APPROVAL_SIGNATURES);

  const [deployStatus, setDeployStatus] = useState<string>('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [financialGoal, setFinancialGoal] = useState('');
  const [profitability, setProfitability] = useState('');
  const [poolType, setPoolType] = useState<'fixed' | 'flexible'>('fixed');
  const [startDate, setStartDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [tranches, setTranches] = useState<Tranche[]>([{ timing: '', percent: '', amount: '' }]);

  const goalNum = parseNum(financialGoal);
  const profitNum = parseNum(profitability);
  const commission = goalNum * COMMISSION_RATE;
  const debtAmount = goalNum > 0 && profitNum >= 0 ? goalNum * (1 + profitNum / 100) : 0;
  const endDate = startDate ? addDays(startDate, ENTRY_PERIOD_DAYS) : '';

  const hasCommission = goalNum > 0;
  const hasDebt = goalNum > 0 && profitability !== '';
  const hasEndDate = !!startDate;
  const hasAllCards = hasCommission && hasDebt && hasEndDate;

  const trancheTotal = tranches.reduce((sum, t) => sum + parseNum(t.amount), 0);
  const tranchePercent = debtAmount > 0 ? Math.min((trancheTotal / debtAmount) * 100, 100) : 0;
  const hasAnyTranche = tranches.some(t => t.timing);

  const updateTranche = useCallback(
    (index: number, field: keyof Tranche, value: string) => {
      setTranches(prev => {
        let clampedValue = value;

        if (field === 'percent' && value !== '') {
          const otherPct = prev.reduce((sum, t, j) => j !== index ? sum + (parseFloat(t.percent) || 0) : sum, 0);
          const maxPct = 100 - otherPct;
          const pct = parseFloat(value) || 0;
          if (pct > maxPct) clampedValue = String(maxPct);
        } else if (field === 'amount' && value !== '') {
          const otherAmt = prev.reduce((sum, t, j) => j !== index ? sum + (parseFloat(t.amount) || 0) : sum, 0);
          const maxAmt = debtAmount - otherAmt;
          const amt = parseFloat(value) || 0;
          if (amt > maxAmt) clampedValue = String(maxAmt);
        }

        const next = prev.map((t, i) => (i === index ? { ...t, [field]: clampedValue } : t));
        const t = { ...next[index] };

        if (field === 'percent') {
          const pct = parseFloat(clampedValue) || 0;
          t.amount = debtAmount > 0 && pct > 0 ? String(Math.round((pct / 100) * debtAmount)) : '';
        } else if (field === 'amount') {
          const amt = parseFloat(clampedValue) || 0;
          t.percent = debtAmount > 0 && amt > 0 ? String(+((amt / debtAmount) * 100).toFixed(2)) : '';
        }

        next[index] = t;

        if (field === 'timing' && value && index === next.length - 1 && next.length < MAX_TRANCHES) {
          next.push({ timing: '', percent: '', amount: '' });
        }

        return next;
      });
    },
    [debtAmount]
  );

  const deleteTranche = (index: number) => {
    setTranches(prev => {
      const next = prev.filter((_, i) => i !== index);
      if (next.length === 0) return [{ timing: '', percent: '', amount: '' }];
      const last = next[next.length - 1];
      if (last.timing && next.length < MAX_TRANCHES) next.push({ timing: '', percent: '', amount: '' });
      return next;
    });
  };

  const clearAll = () => setTranches([{ timing: '', percent: '', amount: '' }]);

  const closeCalendar = useCallback(() => setShowCalendar(false), []);

  // ── Build tranche arrays from form state ───────────────────────────────────
  const buildTranches = useCallback(() => {
    const startUnix = startDate ? Math.floor(new Date(startDate).getTime() / 1000) : 0;
    const endUnix = startUnix + ENTRY_PERIOD_DAYS * 86400;

    const filledTranches = tranches.filter(t => t.timing && t.amount);

    const incomingAmounts = filledTranches.map(t => toWei(t.amount));
    const incomingDeadlines = filledTranches.map(t => BigInt(endUnix + daysFromTimingOption(t.timing) * 86400));

    const lastDeadline = incomingDeadlines.length > 0 ? incomingDeadlines[incomingDeadlines.length - 1] : BigInt(endUnix);
    const completionPeriodExpired = lastDeadline + BigInt(30 * 86400);

    // Single outgoing tranche: full financial goal disbursed to owner at fundraising end
    const holdAmount = toWei(goalNum);
    const outgoingAmounts = [holdAmount];
    const outgoingTimestamps = [BigInt(endUnix)];

    return {
      startUnix,
      endUnix,
      completionPeriodExpiredUnix: completionPeriodExpired,
      incomingAmounts,
      incomingDeadlines,
      outgoingAmounts,
      outgoingTimestamps,
    };
  }, [startDate, tranches, goalNum]);

  // ── Validate and open confirmation modal ──────────────────────────────────
  const handleDeployClick = () => {
    if (!walletAddress) {
      toast('Connect your wallet first', 'error');
      return;
    }
    if (!businessId) {
      toast('Missing businessId in URL', 'error');
      return;
    }
    if (!name || !financialGoal || !profitability || !startDate) {
      toast('Fill in all required fields', 'error');
      return;
    }
    if (profitNum < 1 || profitNum > 100) {
      toast('Profitability must be between 1% and 100%', 'error');
      return;
    }
    const filledTranches = tranches.filter(t => t.timing && t.amount);
    if (filledTranches.length === 0) {
      toast('Add at least one debt repayment tranche', 'error');
      return;
    }
    setShowDeployModal(true);
  };

  // ── Deploy pool ────────────────────────────────────────────────────────────
  const handleDeploy = async () => {
    setShowDeployModal(false);
    setIsDeploying(true);
    try {
      const { startUnix, endUnix, completionPeriodExpiredUnix, incomingAmounts, incomingDeadlines, outgoingAmounts, outgoingTimestamps } =
        buildTranches();

      const holdAmount = toWei(goalNum);
      const rewardBps = BigInt(Math.round(profitNum * 100));

      const totalExpected = holdAmount + (holdAmount * rewardBps) / BigInt(10000);
      const totalIncoming = incomingAmounts.reduce((a, b) => a + b, BigInt(0));
      if (totalIncoming !== totalExpected) {
        const expectedUsdt = Number(totalExpected / BigInt(10 ** 18));
        toast(`Tranche amounts must sum to exactly ${expectedUsdt} USDT (goal + ${profitNum}% profit)`, 'error');
        setIsDeploying(false);
        return;
      }

      // Step 1: Create pool record in DB
      setDeployStatus('Creating pool record…');
      const { data: poolData } = await createPool({
        variables: {
          input: {
            name,
            businessId,
            description: description || undefined,
            expectedHoldAmount: holdAmount.toString(),
            expectedRwaAmount: goalNum.toString(),
            rewardPercent: rewardBps.toString(),
            priceImpactPercent: PRICE_IMPACT_PERCENT.toString(),
            entryFeePercent: '100',
            exitFeePercent: '100',
            entryPeriodStart: startUnix,
            entryPeriodExpired: endUnix,
            completionPeriodExpired: Number(completionPeriodExpiredUnix),
            fixedSell: poolType === 'fixed',
            allowEntryBurn: false,
            awaitCompletionExpired: true,
            floatingOutTranchesTimestamps: false,
            outgoingTranches: outgoingAmounts.map((amount, i) => ({
              amount: amount.toString(),
              timestamp: Number(outgoingTimestamps[i]),
              executedAmount: '0',
            })),
            incomingTranches: incomingAmounts.map((amount, i) => ({
              amount: amount.toString(),
              expiredAt: Number(incomingDeadlines[i]),
              returnedAmount: '0',
            })),
          },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pool = (poolData as any)?.createPool as { id: string; rwaAddress: string } | undefined;
      if (!pool) throw new Error('Failed to create pool record');

      // Step 2: Request backend approval signatures
      setDeployStatus('Requesting approval signatures…');
      const { data: approvalData } = await requestApproval({
        variables: {
          input: {
            id: pool.id,
            ownerWallet: walletAddress,
            deployerWallet: walletAddress,
            createPoolFeeRatio: CREATE_POOL_FEE_RATIO,
          },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const taskId = (approvalData as any)?.requestPoolApprovalSignatures?.taskId as string | undefined;
      if (!taskId) throw new Error('Failed to get approval task ID');

      // Step 3: Poll until signers have signed
      setDeployStatus('Waiting for backend signatures…');
      const { signers, signatures, expired } = await pollUntilComplete(async () => {
        const result = await apolloClient.query({
          query: GET_SIGNATURE_TASK,
          variables: { input: { taskId } },
          fetchPolicy: 'network-only',
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const task = (result.data as any)?.getSignatureTask;
        return {
          completed: task?.completed ?? false,
          expired: task?.expired ?? 0,
          signatures: task?.signatures ?? null,
        };
      });

      // Step 4: Approve HOLD token spend
      setDeployStatus('Approving HOLD token spend…');
      const approveTxHash = await writeContractAsync({
        address: HOLD_TOKEN_ADDRESS,
        abi: ERC20_APPROVE_ABI,
        functionName: 'approve',
        args: [FACTORY_ADDRESS, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')],
      });
      if (!publicClient) throw new Error('No public client available');
      await publicClient.waitForTransactionReceipt({ hash: approveTxHash });

      // Step 5: Call the Factory contract
      setDeployStatus('Sending transaction…');
      const txHash = await writeContractAsync({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'deployPool',
        args: [
          BigInt(CREATE_POOL_FEE_RATIO),
          pool.id,
          pool.rwaAddress as `0x${string}`,
          holdAmount,
          BigInt(goalNum),
          PRICE_IMPACT_PERCENT,
          rewardBps,
          BigInt(startUnix),
          BigInt(endUnix),
          completionPeriodExpiredUnix,
          BigInt(100),
          BigInt(100),
          poolType === 'fixed',
          false,
          true,
          false,
          outgoingAmounts,
          outgoingTimestamps,
          incomingAmounts,
          incomingDeadlines,
          signers,
          signatures,
          expired,
        ],
        gas: BigInt(2_000_000),
      });

      setDeployTxHash(txHash);
      setDeployStatus('Waiting for confirmation…');
      toast('Pool deployed! Waiting for confirmation…');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Deploy failed';
      toast(msg, 'error');
    } finally {
      setIsDeploying(false);
      setDeployStatus('');
    }
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <section className="mb-10">
        <Wrapper>
          <div className="border-b border-stroke-primary pb-6 flex justify-between items-center">
            <Title size="xs">New pool</Title>
            <div className="flex items-center gap-3">
              {deployStatus && (
                <span className="text-sm text-grey-dark animate-pulse">{deployStatus}</span>
              )}
              <Button
                visualType="quaternary"
                type="button"
                onClick={handleDeployClick}
                disabled={isDeploying || isConfirming}
              >
                {isDeploying || isConfirming ? 'Deploying…' : 'Deploy pool'}
              </Button>
            </div>
          </div>
        </Wrapper>
      </section>

      <Wrapper>
        <div className="flex flex-col gap-10 pb-16">

          {/* ── Information ──────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-semibold mb-6">Information</h2>

            <div className="flex flex-col gap-5">
              {/* Pool name */}
              <div className="flex items-start gap-6">
                <label className="w-44 shrink-0 pt-2.5 text-sm text-grey-dark">Pool name</label>
                <div className="relative w-[330px]">
                  <input
                    value={name}
                    maxLength={50}
                    onChange={e => setName(e.target.value)}
                    placeholder="Prototype development"
                    className="w-full px-3 py-2.5 rounded-lg border border-stroke-primary bg-white text-sm outline-none placeholder:text-label-tertiary tr-d-all focus:border-grey-dark"
                  />
                  <span className="absolute right-2 bottom-2.5 text-xs text-label-tertiary pointer-events-none">
                    {name.length}/50
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="flex items-start gap-6">
                <label className="w-44 shrink-0 pt-2.5 text-sm text-grey-dark">Description</label>
                <div className="relative w-[330px]">
                  <textarea
                    value={description}
                    maxLength={250}
                    rows={5}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Tell investors what you need money for and why they should invest in your pool"
                    className="w-full px-3 py-2.5 pb-6 rounded-lg border border-stroke-primary bg-white text-sm outline-none placeholder:text-label-tertiary resize-none tr-d-all focus:border-grey-dark"
                  />
                  <span className="absolute right-2 bottom-2.5 text-xs text-label-tertiary pointer-events-none">
                    {description.length}/250
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Pool parameters ──────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-semibold mb-6">Pool parameters</h2>

            <div className={clsx('flex gap-8', !hasAllCards && 'items-start')}>
              {/* Left: form fields */}
              <div className="flex flex-col gap-5 flex-1">
                {/* Financial goal */}
                <div className="flex items-center gap-6">
                  <label className="w-44 shrink-0 text-sm text-grey-dark">Financial goal</label>
                  <div className="relative w-[330px]">
                    <input
                      value={financialGoal}
                      onChange={e => setFinancialGoal(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="50 000"
                      className="w-full px-3 py-2.5 pr-8 rounded-lg border border-stroke-primary bg-white text-sm outline-none placeholder:text-label-tertiary tr-d-all focus:border-grey-dark"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-grey text-sm pointer-events-none">₮</span>
                  </div>
                </div>

                {/* Profitability */}
                <div className="flex items-center gap-6">
                  <label className="w-44 shrink-0 text-sm text-grey-dark flex items-center gap-1.5">
                    Profitability
                    <Tooltip text="Best option is not too high and not too low. Profitability can't be higher than 100%. Profitability will be included in the total amount of debt">
                      <InfoIcon />
                    </Tooltip>
                  </label>
                  <div className="relative w-[330px]">
                    <input
                      value={profitability}
                      onChange={e => {
                        const v = e.target.value.replace(/[^0-9.]/g, '');
                        if (v === '' || (parseFloat(v) >= 1 && parseFloat(v) <= 100)) setProfitability(v);
                      }}
                      placeholder="4"
                      className="w-full px-3 py-2.5 pr-8 rounded-lg border border-stroke-primary bg-white text-sm outline-none placeholder:text-label-tertiary tr-d-all focus:border-grey-dark"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-grey text-sm pointer-events-none">%</span>
                  </div>
                </div>

                {/* Pool type */}
                <div className="flex items-center gap-6">
                  <label className="w-44 shrink-0 text-sm text-grey-dark">Pool type</label>
                  <div className="flex gap-3">
                    {(
                      [
                        {
                          value: 'fixed',
                          label: 'Fixed pool',
                          tooltip: 'The pool stops collecting after reaching the financial goal',
                        },
                        {
                          value: 'flexible',
                          label: 'Flexible pool',
                          tooltip: 'The pool will continue collecting after reaching the financial goal',
                        },
                      ] as const
                    ).map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setPoolType(opt.value)}
                        className={clsx(
                          'flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium cursor-pointer tr-d-all',
                          poolType === opt.value
                            ? 'border-blue bg-white text-blue-dark'
                            : 'border-stroke-primary bg-white text-grey-dark hover:border-grey'
                        )}
                      >
                        <span
                          className={clsx(
                            'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0',
                            poolType === opt.value ? 'border-blue' : 'border-grey'
                          )}
                        >
                          {poolType === opt.value && <span className="w-2 h-2 rounded-full bg-blue" />}
                        </span>
                        {opt.label}
                        <Tooltip text={opt.tooltip}>
                          <InfoIcon />
                        </Tooltip>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Collection start date */}
                <div className="flex items-center gap-6">
                  <label className="w-44 shrink-0 text-sm text-grey-dark">Collection start date</label>
                  <div className="relative w-[330px]">
                    <button
                      type="button"
                      onClick={() => setShowCalendar(o => !o)}
                      className={clsx(
                        'w-full flex items-center justify-between px-3 py-2.5 rounded-lg border bg-white text-sm cursor-pointer tr-d-all',
                        showCalendar ? 'border-grey-dark' : 'border-stroke-primary'
                      )}
                    >
                      <span className={startDate ? 'text-black' : 'text-label-tertiary'}>
                        {startDate ? isoToDisplay(startDate) : 'MM.DD.YYYY'}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="#959EB5" strokeWidth="1.2" />
                        <path d="M2 6.5h12M5.5 2v2.5M10.5 2v2.5" stroke="#959EB5" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </button>
                    {showCalendar && (
                      <Calendar value={startDate} onChange={setStartDate} onClose={closeCalendar} minDate={new Date().toISOString().slice(0, 10)} />
                    )}
                  </div>
                </div>
              </div>

              {/* Right: stacked info cards (only when not all cards present) */}
              {!hasAllCards && (hasCommission || hasDebt || hasEndDate) && (
                <div className="flex flex-col gap-3 w-[340px] shrink-0">
                  {hasCommission && (
                    <InfoCard
                      label="Comission:"
                      value={`${formatNumber(commission)} USDT`}
                      description="Will be debited upon receipt of money to the pool account"
                      icon={<CommissionIcon />}
                    />
                  )}
                  {hasDebt && (
                    <InfoCard
                      label="Debt amount:"
                      value={`${formatNumber(debtAmount)} USDT`}
                      description="The amount owed to your investors that you will have to repay"
                      icon={<DebtIcon />}
                    />
                  )}
                  {hasEndDate && (
                    <InfoCard
                      label="End date:"
                      value={endDate}
                      description="The end date of the fundraising, 90 days from the start date"
                      icon={<CalendarIcon />}
                    />
                  )}
                </div>
              )}
            </div>
          </section>

          {/* ── Terms (horizontal, once all cards are available) ─────────────── */}
          {hasAllCards && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Terms</h2>
              <div className="grid grid-cols-3 gap-4">
                <InfoCard
                  label="Comission:"
                  value={`${formatNumber(commission)} USDT`}
                  description="Will be debited upon receipt of money to the pool account"
                  icon={<CommissionIcon />}
                />
                <InfoCard
                  label="Debt amount:"
                  value={`${formatNumber(debtAmount)} USDT`}
                  description="The amount owed to your investors that you will have to repay"
                  icon={<DebtIcon />}
                />
                <InfoCard
                  label="End date:"
                  value={endDate}
                  description="The end date of the fundraising, 90 days from the start date"
                  icon={<CalendarIcon />}
                />
              </div>
            </section>
          )}

          {/* ── Debt paying schedule ─────────────────────────────────────────── */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-xl font-semibold">Debt paying schedule</h2>
              <Tooltip text="Set the repayment schedule: choose how many days after the pool ends each tranche will be paid. Then, assign what percentage of the total debt you want to return in each tranche. The total across all tranches must equal 100%. You can schedule up to 20 tranches, or pay off the entire debt in one go">
                <InfoIcon />
              </Tooltip>
            </div>

            <div className="bg-grey-light rounded-2xl overflow-hidden">
              {/* Table header */}
              <div className="grid items-center px-6 py-3 text-sm text-grey-dark gap-4"
                style={{ gridTemplateColumns: '60px 1fr 180px 220px 130px' }}>
                <div>№</div>
                <div>Tranche timing (days post-end)</div>
                <div>Precent of debt</div>
                <div>Amount of debt (USDT)</div>
                {hasAnyTranche ? (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={clearAll}
                      className="flex items-center gap-1 text-blue text-sm hover:opacity-70 cursor-pointer"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Clear everything
                    </button>
                  </div>
                ) : <div />}
              </div>

              {/* Rows */}
              <div className="divide-y divide-stroke-primary">
                {tranches.map((tranche, i) => (
                  <div
                    key={i}
                    className="grid items-center px-6 py-3 gap-4 bg-white"
                    style={{ gridTemplateColumns: '60px 1fr 180px 220px 130px' }}
                  >
                    <span className="text-sm text-grey-dark">{i + 1}</span>

                    <TimingDropdown
                      value={tranche.timing}
                      onChange={v => updateTranche(i, 'timing', v)}
                      minOption={i > 0 ? tranches[i - 1].timing : undefined}
                    />

                    {/* Percent of debt */}
                    <div className="relative">
                      <input
                        value={tranche.percent}
                        onChange={e => updateTranche(i, 'percent', e.target.value.replace(/[^0-9.]/g, ''))}
                        placeholder="0"
                        className="w-full px-3 py-2.5 pr-8 rounded-lg border border-stroke-primary bg-white text-sm outline-none placeholder:text-label-tertiary tr-d-all focus:border-grey-dark"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-grey text-sm pointer-events-none">%</span>
                    </div>

                    {/* Amount of debt */}
                    <div className="relative">
                      <input
                        value={tranche.amount}
                        onChange={e => updateTranche(i, 'amount', e.target.value.replace(/[^0-9.]/g, ''))}
                        placeholder="0"
                        className="w-full px-3 py-2.5 pr-8 rounded-lg border border-stroke-primary bg-white text-sm outline-none placeholder:text-label-tertiary tr-d-all focus:border-grey-dark"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-grey text-sm pointer-events-none">₮</span>
                    </div>

                    {/* Delete */}
                    <div className="flex justify-end">
                      {tranche.timing && (
                        <button
                          type="button"
                          onClick={() => deleteTranche(i)}
                          className="flex items-center gap-1 text-grey-dark text-xs hover:text-red cursor-pointer tr-d-all"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                              d="M2 3.5h10M5.5 3.5V2.5a1 1 0 012 0v1M3 3.5l.5 8a1 1 0 001 1h5a1 1 0 001-1l.5-8"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tranche total */}
              <div className="px-6 py-4 border-t border-stroke-primary">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Tranche total</span>
                  <span className="text-sm font-semibold">
                    {formatNumber(trancheTotal)} of {formatNumber(debtAmount)}
                  </span>
                </div>
                <div className="h-1 bg-stroke-primary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue rounded-full tr-d-all"
                    style={{ width: `${tranchePercent}%` }}
                  />
                </div>
                <div className="flex items-start justify-between mt-2">
                  <span className="text-xs text-grey-dark max-w-[220px] leading-snug">
                    You can pay the entire sum at once or in parts
                  </span>
                  <span className="text-xs text-grey-dark">{Math.round(tranchePercent)}%</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </Wrapper>
      <ConfirmModal
        isOpen={showDeployModal}
        title={'Deploy pool?'}
        heading={'Care to double-check?'}
        description={"You won't be able to change pool parameters after the pool is deployed. Make sure everything is correct"}
        confirmText={'Deploy'}
        onConfirm={handleDeploy}
        onCancel={() => setShowDeployModal(false)}
      />
    </DashboardLayout>
  );
};

const AddPoolPage: FC = () => (
  <React.Suspense fallback={null}>
    <AddPoolContent />
  </React.Suspense>
);

export default AddPoolPage;
