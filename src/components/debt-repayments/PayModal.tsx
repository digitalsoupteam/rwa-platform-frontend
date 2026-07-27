'use client';

import React, { FC, useMemo, useState } from 'react';
import { useAccount, useWriteContract, usePublicClient } from 'wagmi';
import { Modal } from '@/components/common';
import { Button, toast } from '@/components/ui';
import { ERC20_APPROVE_ABI, POOL_ABI, HOLD_TOKEN_ADDRESS } from '@/lib/contracts';
import type { DebtRepaymentPool } from './DebtRepaymentRow';

const ZERO = BigInt(0);
const MAX_UINT256 = BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
);
const HOLD_DECIMALS = 18;
const HOLD_DIVISOR = BigInt(10) ** BigInt(HOLD_DECIMALS);

function formatUsdtAmount(wei: bigint | undefined): string {
  if (!wei || wei === ZERO) return '0';
  const whole = wei / HOLD_DIVISOR;
  const frac = wei % HOLD_DIVISOR;
  if (frac === ZERO) return whole.toLocaleString('en-US').replace(/,/g, ' ');
  const fracStr = frac.toString().padStart(HOLD_DECIMALS, '0').replace(/0+$/, '').slice(0, 4);
  return `${whole.toLocaleString('en-US').replace(/,/g, ' ')}.${fracStr}`;
}

function parseUsdtAmount(value: string): bigint {
  if (!value || isNaN(parseFloat(value))) return ZERO;
  const trimmed = value.replace(/\s/g, '');
  const [whole, frac = ''] = trimmed.split('.');
  const fracPadded = frac.padEnd(HOLD_DECIMALS, '0').slice(0, HOLD_DECIMALS);
  try {
    return BigInt(whole || '0') * HOLD_DIVISOR + BigInt(fracPadded);
  } catch {
    return ZERO;
  }
}

interface PayModalProps {
  pool: (DebtRepaymentPool & { amountDueWei: bigint }) | null;
  onClose: () => void;
  onPaid: () => void;
}

const PayModal: FC<PayModalProps> = ({ pool, onClose, onPaid }) => {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const poolAddress = pool?.poolAddress as `0x${string}` | undefined;
  const amountDueWei = pool?.amountDueWei ?? ZERO;

  const inputWei = useMemo(() => parseUsdtAmount(inputValue), [inputValue]);
  const exceedsDue = amountDueWei > ZERO && inputWei > amountDueWei;

  const canSubmit = !!address && !!poolAddress && inputWei > ZERO && !exceedsDue && !isSubmitting;

  const handleClose = () => {
    setInputValue('');
    onClose();
  };

  const handlePay = async () => {
    if (!address || !poolAddress || !publicClient || inputWei === ZERO) return;
    setIsSubmitting(true);
    try {
      const allowance = (await publicClient.readContract({
        address: HOLD_TOKEN_ADDRESS,
        abi: ERC20_APPROVE_ABI,
        functionName: 'allowance',
        args: [address, poolAddress],
      })) as bigint;

      if (allowance < inputWei) {
        toast('Approving USDT…');
        const approveTx = await writeContractAsync({
          address: HOLD_TOKEN_ADDRESS,
          abi: ERC20_APPROVE_ABI,
          functionName: 'approve',
          args: [poolAddress, MAX_UINT256],
        });
        await publicClient.waitForTransactionReceipt({ hash: approveTx });
      }

      toast('Sending repayment transaction…');
      await writeContractAsync({
        address: poolAddress,
        abi: POOL_ABI,
        functionName: 'returnIncomingTranche',
        args: [inputWei],
      });

      toast('Repayment successful!');
      setInputValue('');
      onPaid();
      onClose();
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : 'Repayment failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpened={!!pool} closeModal={handleClose}>
      {pool && (
        <div className="flex flex-col gap-4 px-5 pt-1">
          <h3 className="text-lg font-semibold text-black">Debt repayment</h3>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm text-grey-dark">
                Amount to pay<span className="text-red-bright">*</span>
              </label>
              <button
                type="button"
                className="text-sm font-medium text-blue cursor-pointer"
                onClick={() => setInputValue(formatUsdtAmount(amountDueWei).replace(/\s/g, ''))}
              >
                MAX
              </button>
            </div>
            <input
              type="number"
              min="0"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="0"
              className={
                'w-full px-4 py-3 rounded-2xl border bg-white text-base text-black placeholder:text-label-tertiary outline-none tr-d-all focus:border-grey-dark ' +
                (exceedsDue ? 'border-red-bright' : 'border-stroke-primary')
              }
            />
            {exceedsDue && <span className="text-xs text-red-bright">Amount exceeds the tranche due</span>}
          </div>

          <div className="flex flex-col gap-2 py-3 border-t border-stroke-primary text-sm">
            <div className="flex items-center justify-between">
              <span className="text-grey-dark">Amount due</span>
              <span className="text-black">{formatUsdtAmount(amountDueWei)} USDT</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-grey-dark">Company</span>
              <span className="text-blue">{pool.companyName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-grey-dark">Project</span>
              <span className="text-blue">{pool.projectName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-grey-dark">Pool</span>
              <span className="text-blue">{pool.name}</span>
            </div>
          </div>

          <Button visualType="quaternary" disabled={!canSubmit} onClick={handlePay}>
            {isSubmitting ? 'Processing…' : 'Pay'}
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default PayModal;
