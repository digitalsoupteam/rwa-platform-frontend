'use client';

import React, { FC, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/ui';

export type FilterCategory = 'Status' | 'Pool';

export const FILTER_CATEGORIES: FilterCategory[] = ['Status', 'Pool'];

interface Props {
  open: boolean;
  onClose: () => void;
  activeCategory: FilterCategory;
  onCategoryChange: (cat: FilterCategory) => void;
  selections: Record<string, string[]>;
  onToggle: (category: FilterCategory, value: string) => void;
  categoryOptions: Partial<Record<FilterCategory, string[]>>;
}

const Checkbox: FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    type={'button'}
    onClick={e => {
      e.stopPropagation();
      onChange();
    }}
    className={clsx(
      'shrink-0 size-[18px] rounded border flex items-center justify-center tr-d-all',
      checked ? 'bg-blue border-blue' : 'bg-bg-tertiary border-stroke-primary'
    )}
  >
    {checked && <Icon name={'tick'} className={'size-3 text-white'} />}
  </button>
);

const WithdrawalFilterModal: FC<Props> = ({
  open,
  onClose,
  activeCategory,
  onCategoryChange,
  selections,
  onToggle,
  categoryOptions,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const options = categoryOptions[activeCategory] ?? [];
  const selected = selections[activeCategory] ?? [];
  const allChecked = selected.length === 0;

  return (
    <div ref={ref} className={'absolute top-full left-0 z-50 flex gap-1 pt-1'}>
      <div className={'bg-bg-primary border border-stroke-primary rounded-lg shadow-[0px_2px_13.4px_0px_rgba(0,0,0,0.2)] py-2 w-[160px]'}>
        <div className={'flex flex-col px-1'}>
          {FILTER_CATEGORIES.map(cat => {
            const hasSelection = (selections[cat] ?? []).length > 0;
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                type={'button'}
                onClick={() => onCategoryChange(cat)}
                className={clsx(
                  'flex items-center gap-2 px-2 py-2 rounded text-left w-full tr-d-all',
                  isActive ? 'bg-bg-tertiary' : 'hover:bg-bg-tertiary/50'
                )}
              >
                <Icon name={'plus'} className={'size-[18px] shrink-0 text-blue'} />
                <span className={clsx('text-sm text-blue', hasSelection && 'font-medium')}>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {options.length > 0 && (
        <div className={'bg-bg-primary border border-stroke-primary rounded-lg shadow-[0px_2px_13.4px_0px_rgba(0,0,0,0.2)] py-4 w-[220px]'}>
          <div className={'flex flex-col px-4'}>
            <p className={'text-xs font-medium text-grey-dark mb-1'}>Selected</p>
            <div
              className={'flex items-center gap-2 py-1.5 pb-4 border-b border-stroke-primary mb-3 cursor-pointer'}
              onClick={() => onToggle(activeCategory, '__all__')}
            >
              <Checkbox checked={allChecked} onChange={() => onToggle(activeCategory, '__all__')} />
              <span className={'text-sm text-black'}>All</span>
            </div>
            <p className={'text-xs font-medium text-grey-dark mb-1'}>Options</p>
            <div className={'max-h-60 overflow-y-auto'}>
              {options.map(opt => (
                <div
                  key={opt}
                  className={'flex items-center gap-2 py-1.5 cursor-pointer rounded hover:bg-bg-tertiary/50 -mx-1 px-1'}
                  onClick={() => onToggle(activeCategory, opt)}
                >
                  <Checkbox checked={selected.includes(opt)} onChange={() => onToggle(activeCategory, opt)} />
                  <span className={'text-sm text-black truncate'}>{opt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalFilterModal;
