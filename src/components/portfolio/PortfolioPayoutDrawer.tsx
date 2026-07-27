'use client';

import React, { FC, useEffect } from 'react';
import clsx from 'clsx';
import { Icon, Button } from '@/components/ui';
import type { PortfolioPayoutPool } from './PortfolioPayoutRow';
import type { PayoutTranche } from './PortfolioPayoutCardMobile';

function formatDate(ts: number): string {
  const d = new Date(ts * 1000);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(2);
  return `${mm}.${dd}.${yy}`;
}

interface PortfolioPayoutDrawerProps {
  pool: PortfolioPayoutPool | null;
  tranches: PayoutTranche[];
  onClose: () => void;
  onClaim: (pool: PortfolioPayoutPool) => void;
}

const PortfolioPayoutDrawer: FC<PortfolioPayoutDrawerProps> = ({ pool, tranches, onClose, onClaim }) => {
  useEffect(() => {
    if (pool) document.body.classList.add('locked');
    else document.body.classList.remove('locked');
    return () => document.body.classList.remove('locked');
  }, [pool]);

  if (!pool) return null;

  const filledStars = Math.round((pool.aiRating / 5) * 5);

  return (
    <section
      className="z-20 fixed top-0 right-0 bottom-0 left-0 bg-[#494A53]/60"
      onClick={evt => evt.currentTarget === evt.target && onClose()}
    >
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-[490px] bg-white flex flex-col">
        <button className="absolute top-6 right-6 size-6 cursor-pointer" onClick={onClose}>
          <Icon name="plus" className="size-6 rotate-45 text-grey-dark" />
        </button>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon key={i} name="star" className={clsx('size-4', i < filledStars ? 'text-blue' : 'text-grey')} />
            ))}
            <span className="text-sm font-medium text-black ml-1">{pool.aiRating.toFixed(2)}</span>
            <Icon name="info" className="size-3.5 text-grey" />
            <span className="text-sm text-grey-dark">AI rating</span>
          </div>

          <h3 className="text-xl font-semibold text-black">{pool.name} pool</h3>

          {pool.description && <p className="text-sm text-grey-dark leading-[1.4]">{pool.description}</p>}

          <div className="border border-stroke-primary rounded-lg overflow-hidden">
            <div className="flex items-center px-3 py-2.5 border-b border-stroke-primary">
              <span className="flex-1 text-xs font-medium text-grey-dark">Amount (USDT)</span>
              <span className="flex-1 text-xs font-medium text-grey-dark text-right">Date</span>
              <span className="flex-1 text-xs font-medium text-grey-dark text-right">Status</span>
            </div>
            {tranches.length === 0 ? (
              <div className="py-8 text-center text-sm text-label-tertiary">No payments scheduled yet.</div>
            ) : (
              tranches.map((tr, i) => (
                <div
                  key={i}
                  className="flex items-center px-3 py-2.5 border-b border-stroke-primary last:border-b-0 text-sm"
                >
                  <span className="flex-1 text-black">{tr.amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  <span className="flex-1 text-right text-grey-dark">{formatDate(tr.date)}</span>
                  <span className="flex-1 flex items-center justify-end gap-1.5">
                    <Icon
                      name={tr.completed ? 'completed' : 'time'}
                      className={clsx('size-4 shrink-0', tr.completed ? 'text-green' : 'text-grey')}
                    />
                    {tr.completed ? 'Completed' : 'Upcoming'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-6 border-t border-stroke-primary">
          <Button
            visualType="quaternary"
            className={clsx('w-full justify-center', !pool.claimable && 'opacity-50 cursor-not-allowed')}
            disabled={!pool.claimable}
            onClick={() => onClaim(pool)}
          >
            Claim {pool.totalAvailable.toLocaleString('en-US', { maximumFractionDigits: 0 })} USDT
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPayoutDrawer;
