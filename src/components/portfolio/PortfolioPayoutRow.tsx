import React, { FC } from 'react';
import Link from 'next/link';
import { Icon, Button } from '@/components/ui';

export interface PortfolioPayoutPool {
  id: string;
  poolAddress: string;
  rwaAddress: string;
  name: string;
  aiRating: number;
  nextPaymentDate: number | null; // unix seconds; null when fully repaid
  nextPaymentIsOverdue: boolean;
  completedTranches: number;
  totalTranches: number;
  profitPct: string;
  paymentAmount: number | null; // null when fully repaid
  totalAvailable: number;
  claimable: boolean;
  description?: string | null;
  companyName: string;
  projectName: string;
  virtualHoldReserve?: string | null;
  realHoldReserve?: string | null;
  virtualRwaReserve?: string | null;
  exitFeePercent?: string | null;
}

function formatDate(ts: number): string {
  const d = new Date(ts * 1000);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(2);
  return `${mm}.${dd}.${yy}`;
}

interface PortfolioPayoutRowProps {
  pool: PortfolioPayoutPool;
  onClaim: (pool: PortfolioPayoutPool) => void;
  onOpenDetail: (pool: PortfolioPayoutPool) => void;
}

const PortfolioPayoutRow: FC<PortfolioPayoutRowProps> = ({ pool, onClaim, onOpenDetail }) => {
  return (
    <div
      className="bg-bg-primary border border-stroke-primary h-[52px] flex items-center px-3 gap-2 tr-d-all hover:bg-bg-tertiary/40 cursor-pointer"
      onClick={() => onOpenDetail(pool)}
    >
      <Link
        href={`/pool/${pool.id}`}
        onClick={e => e.stopPropagation()}
        className="text-sm text-black w-[200px] shrink-0 truncate hover:underline"
      >
        {pool.name}
      </Link>
      <span className="text-sm text-black flex-1 text-right">{pool.aiRating.toFixed(2)}</span>

      <span className="text-sm text-black flex-1 flex items-center justify-end gap-1.5">
        {pool.nextPaymentDate === null ? (
          'Fully repaid'
        ) : (
          <>
            {pool.nextPaymentIsOverdue && <Icon name="failed" className="size-3.5 shrink-0" />}
            {formatDate(pool.nextPaymentDate)} ({pool.completedTranches}/{pool.totalTranches})
          </>
        )}
      </span>

      <span className="text-sm text-black flex-1 text-right">{pool.profitPct}</span>
      <span className="text-sm text-black flex-1 text-right">
        {pool.paymentAmount !== null ? pool.paymentAmount.toLocaleString('en-US', { maximumFractionDigits: 0 }) : ''}
      </span>
      <span className="text-sm text-black flex-1 text-right">
        {pool.totalAvailable.toLocaleString('en-US', { maximumFractionDigits: 0 })}
      </span>

      <div className="w-[110px] shrink-0 flex justify-end">
        {pool.claimable && (
          <Button
            visualType="quaternary"
            className="!py-2 !px-4 text-sm"
            onClick={e => { e.stopPropagation(); onClaim(pool); }}
          >
            Claim
          </Button>
        )}
      </div>
    </div>
  );
};

export default PortfolioPayoutRow;
