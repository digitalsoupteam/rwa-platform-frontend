import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface PortfolioStatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  icon: ReactNode;
  onAction?: () => void;
  actionLabel?: string;
  valueClassName?: string;
}

const PortfolioStatCard: FC<PortfolioStatCardProps> = ({
  value,
  label,
  sublabel,
  icon,
  onAction,
  actionLabel,
  valueClassName,
}) => {
  return (
    <div className="bg-bg-tertiary rounded-xl flex-1 min-w-0 h-[168px] overflow-hidden relative p-4 flex flex-col justify-between">
      <span className={clsx('text-[28px] font-semibold leading-none', valueClassName ?? 'text-black')}>
        {value}
      </span>

      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="absolute top-3 right-3 bg-blue text-white text-sm font-medium px-4 py-2 rounded-lg tr-d-all hover:bg-blue/90"
        >
          {actionLabel}
        </button>
      )}

      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-0">
          {sublabel && (
            <span className="text-sm uppercase text-grey-dark leading-snug">{sublabel}</span>
          )}
          <div className="flex items-center gap-1">
            <span className="text-sm uppercase text-grey-dark leading-snug">{label}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl size-[46px] flex items-center justify-center shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default PortfolioStatCard;
