import React, { FC, ReactNode } from 'react';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import Tooltip from '@/components/ui/Tooltip';

interface PortfolioStatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  tooltip: string;
  icon: ReactNode;
  onAction?: () => void;
  actionLabel?: string;
}

const PortfolioStatCard: FC<PortfolioStatCardProps> = ({ value, label, sublabel, tooltip, icon, onAction, actionLabel }) => {
  return (
    <div className='flex flex-col gap-4 justify-between bg-bg-tertiary rounded-xl w-[250px] shrink-0 md:w-auto md:flex-1 md:min-w-0 h-[134px] md:h-[168px] p-4'>
      <div className={'flex gap-1 justify-between'}>
        <span className='text-xl md:text-[28px] font-semibold leading-none text-black'>{value}</span>

        {onAction && actionLabel && (
          <Button visualType='quaternary' onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>

      <div className={'flex justify-between gap-1'}>
        <div className='flex flex-col items-start max-w-[166px]'>
          {sublabel && <span className='text-sm md:text-base text-grey-dark uppercase leading-[1.3]'>{sublabel}</span>}
          <div className='flex items-end gap-1'>
            <span className='text-sm md:text-base text-grey-dark uppercase leading-[1.3]'>{label}</span>
            <Tooltip content={tooltip}>
              <Icon name='info' className='size-[18px] text-grey shrink-0' />
            </Tooltip>
          </div>
        </div>

        <div className='bg-bg-primary rounded-xl size-[46px] flex items-center justify-center'>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default PortfolioStatCard;
