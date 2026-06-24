import React, { FC } from 'react';
import Icon from '@/components/ui/Icon';

export type PoolStatus = 'collecting' | 'paying_out' | 'completed' | 'failed';

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
  paying_out: 'Pays out',
  completed: 'Completed',
  failed: 'Failed',
};

// [track color, fill color] — matches the Figma status bar tokens
const STATUS_BAR_COLORS: Record<PoolStatus, { track: string; fill: string }> = {
  collecting: { track: '#9DBDF9', fill: '#1D58E9' },
  paying_out: { track: '#1ABF97', fill: '#1ABF97' },
  completed: { track: '#4A5363', fill: '#4A5363' },
  failed: { track: '#9B9BA5', fill: '#4A5363' },
};

interface PortfolioPoolRowProps {
  pool: PortfolioPool;
}

const PortfolioPoolRow: FC<PortfolioPoolRowProps> = ({ pool }) => {
  const fillPct = pool.goal > 0 ? Math.min((pool.collected / pool.goal) * 100, 100) : 0;
  const { track, fill } = STATUS_BAR_COLORS[pool.status];

  return (
    <div className="bg-bg-primary border border-stroke-primary h-[52px] flex items-center px-3 gap-2">
      <span className="text-sm text-black w-[200px] shrink-0 truncate">{pool.name}</span>
      <span className="text-sm text-black flex-1 text-right">{pool.aiRating.toFixed(2)}</span>
      <span className="text-sm text-black flex-1 text-right">{pool.amount.toLocaleString()}</span>
      <span className="text-sm text-black flex-1 text-right">{pool.poolShare}</span>
      <span className="text-sm text-black flex-1 text-right">{pool.returned.toLocaleString()}</span>
      <span className="text-sm text-black flex-1 text-right">{pool.currentValue.toFixed(2)}</span>
      <span className="text-sm text-black flex-1 text-right">{pool.profit}</span>

      <div className="flex items-center gap-1.5 w-[110px] shrink-0 justify-end">
        <span className="text-sm text-black whitespace-nowrap">{STATUS_LABELS[pool.status]}</span>
        <Icon name="info" className="size-3.5 text-grey shrink-0" />
      </div>

      <div className="h-[30px] rounded-lg overflow-hidden relative w-[213px] shrink-0" style={{ background: track }}>
        <div className="absolute top-0 left-0 h-full rounded-lg" style={{ width: `${fillPct}%`, background: fill }} />
        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white whitespace-nowrap">
          {pool.collected.toLocaleString()} / {pool.goal.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PortfolioPoolRow;