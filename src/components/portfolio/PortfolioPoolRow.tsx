import React, { FC } from 'react';
import clsx from 'clsx';

export type PoolStatus = 'collecting' | 'completed' | 'failed' | 'active';

export interface PortfolioPool {
  id: string;
  name: string;
  aiRating: number;
  amount: number;
  poolShare: string;
  returned: number;
  currentValue: number;
  profit: string;
  status: PoolStatus;
  collected: number;
  goal: number;
}

const STATUS_LABELS: Record<PoolStatus, string> = {
  collecting: 'Collecting',
  completed: 'Completed',
  failed: 'Failed',
  active: 'Active',
};

const STATUS_COLORS: Record<PoolStatus, string> = {
  collecting: '#1D58E9',
  completed: '#1ABF97',
  failed: '#BE142A',
  active: '#1D58E9',
};

interface PortfolioPoolRowProps {
  pool: PortfolioPool;
}

const PortfolioPoolRow: FC<PortfolioPoolRowProps> = ({ pool }) => {
  const fillPct = pool.goal > 0 ? Math.min((pool.collected / pool.goal) * 100, 100) : 0;
  const barColor = STATUS_COLORS[pool.status];
  const trackColor = pool.status === 'completed' ? '#1ABF97' : '#9DBDF9';

  return (
    <div className="bg-white border border-stroke-primary h-[52px] flex items-center px-3 relative overflow-hidden">
      {/* Pool name */}
      <span className="text-sm text-black whitespace-nowrap w-[180px] shrink-0 truncate">{pool.name}</span>

      {/* AI Rating */}
      <span className="text-sm text-black w-[80px] shrink-0 text-right pr-4">{pool.aiRating.toFixed(2)}</span>

      {/* Amount */}
      <span className="text-sm text-black w-[100px] shrink-0 text-right pr-4">
        {pool.amount.toLocaleString()}
      </span>

      {/* Pool share */}
      <span className="text-sm text-black w-[80px] shrink-0 text-right pr-4">{pool.poolShare}</span>

      {/* Returned */}
      <span className="text-sm text-black w-[120px] shrink-0 text-right pr-4">
        {pool.returned.toLocaleString()}
      </span>

      {/* Current value */}
      <span className="text-sm text-black w-[130px] shrink-0 text-right pr-4">
        {pool.currentValue.toFixed(2)}
      </span>

      {/* Profit */}
      <span
        className={clsx(
          'text-sm w-[80px] shrink-0 text-right pr-4',
          pool.profit.startsWith('+') ? 'text-[#1ABF97]' : pool.profit.startsWith('-') ? 'text-red' : 'text-black'
        )}
      >
        {pool.profit}
      </span>

      {/* Pool status label */}
      <div className="flex items-center gap-1 w-[120px] shrink-0">
        <span className="text-sm text-black">{STATUS_LABELS[pool.status]}</span>
      </div>

      {/* Collected progress bar */}
      <div className="flex-1 flex items-center justify-end">
        <div
          className="h-[30px] rounded-lg overflow-hidden relative"
          style={{ width: 213, background: trackColor }}
        >
          <div
            className="absolute top-0 left-0 h-full rounded-lg"
            style={{ width: `${fillPct}%`, background: barColor }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white whitespace-nowrap">
            {pool.collected.toLocaleString()} / {pool.goal.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPoolRow;
