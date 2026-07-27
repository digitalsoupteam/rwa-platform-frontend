'use client';

import React, { FC, useMemo, useState } from 'react';
import { useAccount, useReadContract, useWriteContract, usePublicClient } from 'wagmi';
import { Modal } from '@/components/common';
import { Button, toast } from '@/components/ui';
import { ERC1155_BALANCE_ABI, POOL_ABI } from '@/lib/contracts';
import type { WithdrawalPool } from './WithdrawalsPoolRow';

const ZERO = BigInt(0);
const SLIPPAGE_BPS = BigInt(50);
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

// pool state carries reserves as raw decimal strings (AMM curve inputs), used
// to convert between RWA token count and its USDT payout — same math as
// BuyTokenWidget's sell mode.
function computeUsdtFromRwa(rwaAmt: bigint, pool: WithdrawModalPoolContext): { usdtWei: bigint; fee: bigint } {
  try {
    if (!rwaAmt || rwaAmt === ZERO) return { usdtWei: ZERO, fee: ZERO };
    const virtualHold = BigInt(pool.virtualHoldReserve || '0');
    const realHold = BigInt(pool.realHoldReserve || '0');
    const virtualRwa = BigInt(pool.virtualRwaReserve || '0');
    const exitFee = BigInt(pool.exitFeePercent || '100');
    if (!virtualHold || !virtualRwa) return { usdtWei: ZERO, fee: ZERO };

    const effectiveHold = virtualHold + realHold;
    const k = effectiveHold * virtualRwa;

    const newRwaReserve = virtualRwa + rwaAmt;
    const newHoldReserve = k / newRwaReserve;
    const holdAmount = effectiveHold > newHoldReserve ? effectiveHold - newHoldReserve : ZERO;

    const fee = (holdAmount * exitFee) / BigInt(10000);
    const usdtWei = holdAmount - fee;

    return { usdtWei, fee };
  } catch {
    return { usdtWei: ZERO, fee: ZERO };
  }
}

export interface WithdrawModalPoolContext {
  poolAddress: string;
  rwaAddress: string;
  name: string;
  companyName: string;
  projectName: string;
  virtualHoldReserve?: string | null;
  realHoldReserve?: string | null;
  virtualRwaReserve?: string | null;
  exitFeePercent?: string | null;
}

interface WithdrawModalProps {
  pool: (WithdrawalPool & WithdrawModalPoolContext) | null;
  onClose: () => void;
  onWithdrawn: () => void;
}

const WithdrawModal: FC<WithdrawModalProps> = ({ pool, onClose, onWithdrawn }) => {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const poolAddress = pool?.poolAddress as `0x${string}` | undefined;
  const rwaAddress = pool?.rwaAddress as `0x${string}` | undefined;

  const { data: poolTokenId } = useReadContract({
    address: poolAddress,
    abi: POOL_ABI,
    functionName: 'tokenId',
    query: { enabled: !!poolAddress },
  });

  const { data: rwaBalance } = useReadContract({
    address: rwaAddress,
    abi: ERC1155_BALANCE_ABI,
    functionName: 'balanceOf',
    args: address && poolTokenId != null ? [address, poolTokenId as bigint] : undefined,
    query: { enabled: !!address && !!rwaAddress && poolTokenId != null },
  });

  const rwaBalanceBig = rwaBalance as bigint | undefined;

  const availableUsdt = useMemo(
    () => (pool && rwaBalanceBig ? computeUsdtFromRwa(rwaBalanceBig, pool).usdtWei : ZERO),
    [pool, rwaBalanceBig]
  );

  const inputUsdtWei = useMemo(() => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return ZERO;
    const trimmed = inputValue.replace(/\s/g, '');
    const [whole, frac = ''] = trimmed.split('.');
    const fracPadded = frac.padEnd(HOLD_DECIMALS, '0').slice(0, HOLD_DECIMALS);
    try {
      return BigInt(whole || '0') * HOLD_DIVISOR + BigInt(fracPadded);
    } catch {
      return ZERO;
    }
  }, [inputValue]);

  const exceedsBalance = inputUsdtWei > availableUsdt;

  // Withdraw amount is entered in USDT, but burn() takes an RWA amount — the
  // curve isn't linear, so invert it by proportionally scaling the user's
  // full RWA balance by the USDT fraction they asked to withdraw.
  const rwaToRedeem = useMemo(() => {
    if (!rwaBalanceBig || rwaBalanceBig === ZERO || availableUsdt === ZERO) return ZERO;
    if (inputUsdtWei >= availableUsdt) return rwaBalanceBig;
    return (rwaBalanceBig * inputUsdtWei) / availableUsdt;
  }, [rwaBalanceBig, availableUsdt, inputUsdtWei]);

  const canSubmit = !!address && !!poolAddress && inputUsdtWei > ZERO && !exceedsBalance && !isSubmitting;

  const handleClose = () => {
    setInputValue('');
    onClose();
  };

  const handleWithdraw = async () => {
    if (!address || !poolAddress || !pool || !publicClient || rwaToRedeem === ZERO) return;
    setIsSubmitting(true);
    try {
      const { usdtWei } = computeUsdtFromRwa(rwaToRedeem, pool);
      const minHold = usdtWei - (usdtWei * SLIPPAGE_BPS) / BigInt(10000);
      const validUntil = BigInt(Math.floor(Date.now() / 1000) + 300);

      toast('Sending withdrawal transaction…');
      await writeContractAsync({
        address: poolAddress,
        abi: POOL_ABI,
        functionName: 'burn',
        args: [rwaToRedeem, minHold, ZERO, validUntil],
      });

      toast('Withdrawal successful!');
      setInputValue('');
      onWithdrawn();
      onClose();
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : 'Withdrawal failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpened={!!pool} closeModal={handleClose}>
      {pool && (
        <div className={'flex flex-col gap-4 px-5 pt-1'}>
          <h3 className={'text-lg font-semibold text-black'}>Funds withdrawal</h3>

          <div className={'flex flex-col gap-1.5'}>
            <div className={'flex items-center justify-between'}>
              <label className={'text-sm text-grey-dark'}>
                Withdrawal amount<span className={'text-red-bright'}>*</span>
              </label>
              <button
                type={'button'}
                className={'text-sm font-medium text-blue cursor-pointer'}
                onClick={() => setInputValue(formatUsdtAmount(availableUsdt).replace(/\s/g, ''))}
              >
                MAX
              </button>
            </div>
            <input
              type={'number'}
              min={'0'}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={'0'}
              className={
                'w-full px-4 py-3 rounded-2xl border bg-white text-base text-black placeholder:text-label-tertiary outline-none tr-d-all focus:border-grey-dark ' +
                (exceedsBalance ? 'border-red-bright' : 'border-stroke-primary')
              }
            />
            {exceedsBalance && <span className={'text-xs text-red-bright'}>Amount exceeds available balance</span>}
          </div>

          <div className={'flex flex-col gap-2 py-3 border-t border-stroke-primary text-sm'}>
            <div className={'flex items-center justify-between'}>
              <span className={'text-grey-dark'}>Available for withdrawal</span>
              <span className={'text-black'}>{formatUsdtAmount(availableUsdt)} USDT</span>
            </div>
            <div className={'flex items-center justify-between'}>
              <span className={'text-grey-dark'}>Company</span>
              <span className={'text-blue'}>{pool.companyName}</span>
            </div>
            <div className={'flex items-center justify-between'}>
              <span className={'text-grey-dark'}>Project</span>
              <span className={'text-blue'}>{pool.projectName}</span>
            </div>
            <div className={'flex items-center justify-between'}>
              <span className={'text-grey-dark'}>Pool</span>
              <span className={'text-blue'}>{pool.name}</span>
            </div>
          </div>

          <Button visualType={'quaternary'} disabled={!canSubmit} onClick={handleWithdraw}>
            {isSubmitting ? 'Processing…' : 'Withdraw'}
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default WithdrawModal;
