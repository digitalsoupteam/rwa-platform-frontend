import React, { FC, HTMLAttributes } from 'react';

import PlusTightSVG from '../../../../public/icons/plus-tight.svg';
import clsx from 'clsx';

const ButtonBorderDash: FC<HTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => {
  return (
    <button
      className={clsx(
        className,
        'cursor-pointer relative flex items-center justify-center p-4 с-border-dash rounded-xl w-full text-label-tertiary text-lg font-medium'
      )}
      {...props}
    >
      <svg className='absolute inset-0.5 w-full h-full pointer-events-none' preserveAspectRatio='none'>
        <rect
          className={'w-[calc(100%-2px)] h-[calc(100%-2px)]'}
          x='1'
          y='1'
          width='100%'
          height='100%'
          rx='16'
          ry='16'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeDasharray='10 10'
        />
      </svg>
      <span className={'inline-flex items-center justify-center gap-2'}>
        <PlusTightSVG className='size-6' />
        {children}
      </span>
    </button>
  );
};

export default ButtonBorderDash;
