'use client';

import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Icon from './Icon';
import { useKeepInViewport } from '@/lib/useKeepInViewport';

interface TooltipProps {
  content: string;
  children?: ReactNode;
  className?: string;
}

// Opens above its trigger on hover (desktop) or tap (touch) — defaults to the
// standard info icon as the trigger when no children are given.
const Tooltip: FC<TooltipProps> = ({ content, children, className }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // On phones the tooltip is centred on its icon and can stick out of the screen — keep it inside.
  // The arrow is shifted the opposite way so it keeps pointing at the icon.
  const { ref: tipRef, shift } = useKeepInViewport<HTMLDivElement>(open);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div
      ref={ref}
      className={clsx('relative z-20 inline-flex items-center', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type={'button'}
        onClick={e => {
          e.stopPropagation();
          setOpen(o => !o);
        }}
        className={'flex items-center shrink-0 cursor-pointer'}
      >
        {children ?? <Icon name={'info'} className={'size-3.5 text-grey'} />}
      </button>

      {open && (
        <div
          ref={tipRef}
          className={'absolute bottom-full left-1/2 z-50 flex flex-col items-center w-56 pointer-events-none'}
          style={{ transform: `translateX(calc(-50% + ${shift}px))`, filter: 'drop-shadow(0px 2px 7px rgba(0,0,0,0.1))' }}
        >
          <div className={'bg-bg-primary rounded-xl p-4 w-full -mb-px'}>
            <p className={'text-sm leading-[1.2] text-grey-dark break-words'}>{content}</p>
          </div>
          <svg
            width={'28'}
            height={'12'}
            viewBox={'0 0 28 12'}
            fill={'none'}
            xmlns={'http://www.w3.org/2000/svg'}
            style={{ transform: `translateX(${-shift}px)` }}
          >
            <path
              d={
                'M13.1 0.001L0.72 0C0.49 0 0.25 0.067 0.13 0.259C-0.1 0.635 -0.02 1.105 0.37 1.419L13.08 11.589C13.57 11.98 14.37 11.98 14.86 11.589L27.57 1.419C27.97 1.105 28.04 0.635 27.81 0.259C27.69 0.067 27.45 0 27.22 0L14.86 0.001H13.1Z'
              }
              fill={'var(--color-bg-primary, #FDFEFF)'}
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
