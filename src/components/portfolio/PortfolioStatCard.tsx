import React, { FC, ReactNode } from 'react';
import Icon from '@/components/ui/Icon';

interface PortfolioStatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  icon: ReactNode;
  onAction?: () => void;
  actionLabel?: string;
}

const PortfolioStatCard: FC<PortfolioStatCardProps> = ({
  value,
  label,
  sublabel,
  icon,
  onAction,
  actionLabel,
}) => {
  return (
    <div className="bg-bg-tertiary rounded-xl flex-1 min-w-0 h-[168px] overflow-hidden relative">
      <span className="absolute left-4 top-4 text-[28px] font-semibold leading-none text-black">
        {value}
      </span>

      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="absolute top-3 right-3 bg-blue text-white text-sm font-medium px-4 py-3 rounded-lg tr-d-all hover:bg-blue/90"
        >
          {actionLabel}
        </button>
      )}

      <div className="absolute bottom-4 left-4 flex flex-col items-start max-w-[110px]">
        {sublabel && (
          <span className="text-base text-grey-dark uppercase leading-[1.3]">{sublabel}</span>
        )}
        <div className="flex items-center gap-1">
          <span className="text-base text-grey-dark uppercase leading-[1.3]">{label}</span>
          <Icon name="info" className="size-[18px] text-grey shrink-0" />
        </div>
      </div>

      <div className="absolute bottom-3.5 right-3 bg-bg-primary rounded-xl size-[46px] flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
};

export default PortfolioStatCard;