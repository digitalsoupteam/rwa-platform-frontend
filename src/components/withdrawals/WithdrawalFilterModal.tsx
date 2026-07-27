'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/ui';
import { Calendar } from '@/components/common';

export type FilterCategory = 'Status' | 'Amount' | 'Period' | 'Pool';

export interface AmountRange {
  min: number;
  max: number;
}

export interface PeriodRange {
  from: string; // ISO yyyy-mm-dd
  to: string; // ISO yyyy-mm-dd
}

interface Props {
  open: boolean;
  categories: FilterCategory[];
  activeCategory: FilterCategory;
  onCategoryChange: (cat: FilterCategory) => void;
  selections: Record<string, string[]>;
  onToggle: (category: FilterCategory, value: string) => void;
  categoryOptions: Partial<Record<FilterCategory, string[]>>;
  amountBounds?: AmountRange;
  amountRange?: AmountRange | null;
  onAmountRangeChange?: (range: AmountRange | null) => void;
  periodRange?: PeriodRange | null;
  onPeriodRangeChange?: (range: PeriodRange | null) => void;
}

const AmountRangePanel: FC<{
  bounds: AmountRange;
  value: AmountRange | null;
  onChange: (range: AmountRange | null) => void;
}> = ({ bounds, value, onChange }) => {
  const [draft, setDraft] = useState<AmountRange>(value ?? bounds);

  useEffect(() => {
    setDraft(value ?? bounds);
    // Only re-sync when the popover's committed value or the pool set (bounds) changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, bounds.min, bounds.max]);

  const clamp = (n: number) => Math.min(Math.max(n, bounds.min), bounds.max);

  return (
    <div className={'flex flex-col gap-4 px-4 py-4 w-[280px]'}>
      <div className={'flex items-center gap-3'}>
        <div className={'flex flex-col gap-1 flex-1'}>
          <label className={'text-xs font-medium text-grey-dark'}>From</label>
          <input
            type={'number'}
            value={draft.min}
            min={bounds.min}
            max={draft.max}
            onChange={e => setDraft(d => ({ ...d, min: clamp(Number(e.target.value) || bounds.min) }))}
            className={'w-full px-3 py-2 rounded-lg border border-stroke-primary bg-white text-sm text-black outline-none focus:border-grey-dark'}
          />
        </div>
        <span className={'text-grey-dark mt-5'}>—</span>
        <div className={'flex flex-col gap-1 flex-1'}>
          <label className={'text-xs font-medium text-grey-dark'}>Up to</label>
          <input
            type={'number'}
            value={draft.max}
            min={draft.min}
            max={bounds.max}
            onChange={e => setDraft(d => ({ ...d, max: clamp(Number(e.target.value) || bounds.max) }))}
            className={'w-full px-3 py-2 rounded-lg border border-stroke-primary bg-white text-sm text-black outline-none focus:border-grey-dark'}
          />
        </div>
      </div>

      <div className={'relative h-4 flex items-center'}>
        <div className={'absolute inset-x-0 h-1 rounded-full bg-stroke-secondary'} />
        <div
          className={'absolute h-1 rounded-full bg-blue'}
          style={{
            left: `${((draft.min - bounds.min) / (bounds.max - bounds.min || 1)) * 100}%`,
            right: `${100 - ((draft.max - bounds.min) / (bounds.max - bounds.min || 1)) * 100}%`,
          }}
        />
        <input
          type={'range'}
          min={bounds.min}
          max={bounds.max}
          value={draft.min}
          onChange={e => setDraft(d => ({ ...d, min: Math.min(Number(e.target.value), d.max) }))}
          className={clsx(
            'absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none',
            '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue [&::-webkit-slider-thumb]:cursor-pointer',
            '[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue [&::-moz-range-thumb]:cursor-pointer'
          )}
        />
        <input
          type={'range'}
          min={bounds.min}
          max={bounds.max}
          value={draft.max}
          onChange={e => setDraft(d => ({ ...d, max: Math.max(Number(e.target.value), d.min) }))}
          className={clsx(
            'absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none',
            '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue [&::-webkit-slider-thumb]:cursor-pointer',
            '[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue [&::-moz-range-thumb]:cursor-pointer'
          )}
        />
      </div>

      <div className={'flex items-center justify-end gap-2'}>
        <button
          type={'button'}
          onClick={() => {
            setDraft(bounds);
            onChange(null);
          }}
          className={'px-4 py-2.5 rounded-lg border border-stroke-primary text-sm font-medium text-grey-dark cursor-pointer'}
        >
          Clear
        </button>
        <button
          type={'button'}
          onClick={() => onChange(draft)}
          className={'px-4 py-2.5 rounded-lg bg-blue text-sm font-medium text-white cursor-pointer'}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

function formatPeriodDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = String(d.getFullYear()).slice(2);
  return `${dd}.${mm}.${yyyy}`;
}

const PeriodRangePanel: FC<{
  value: PeriodRange | null;
  onChange: (range: PeriodRange | null) => void;
}> = ({ value, onChange }) => {
  const [draft, setDraft] = useState<PeriodRange>(value ?? { from: '', to: '' });
  const [openField, setOpenField] = useState<'from' | 'to' | null>(null);

  useEffect(() => {
    setDraft(value ?? { from: '', to: '' });
  }, [value]);

  return (
    <div className={'flex flex-col gap-4 px-4 py-4 w-[280px]'}>
      <div className={'flex items-center gap-3'}>
        <div className={'flex flex-col gap-1 flex-1 relative'}>
          <label className={'text-xs font-medium text-grey-dark'}>From</label>
          <button
            type={'button'}
            onClick={() => setOpenField(f => (f === 'from' ? null : 'from'))}
            className={'w-full px-3 py-2 rounded-lg border border-stroke-primary bg-white text-sm text-left outline-none focus:border-grey-dark'}
          >
            <span className={draft.from ? 'text-black' : 'text-label-tertiary'}>
              {draft.from ? formatPeriodDate(draft.from) : 'dd.mm.yy'}
            </span>
          </button>
          {openField === 'from' && (
            <Calendar
              value={draft.from}
              onChange={v => setDraft(d => ({ ...d, from: v }))}
              onClose={() => setOpenField(null)}
            />
          )}
        </div>
        <span className={'text-grey-dark mt-5'}>—</span>
        <div className={'flex flex-col gap-1 flex-1 relative'}>
          <label className={'text-xs font-medium text-grey-dark'}>Up to</label>
          <button
            type={'button'}
            onClick={() => setOpenField(f => (f === 'to' ? null : 'to'))}
            className={'w-full px-3 py-2 rounded-lg border border-stroke-primary bg-white text-sm text-left outline-none focus:border-grey-dark'}
          >
            <span className={draft.to ? 'text-black' : 'text-label-tertiary'}>
              {draft.to ? formatPeriodDate(draft.to) : 'dd.mm.yy'}
            </span>
          </button>
          {openField === 'to' && (
            <Calendar value={draft.to} onChange={v => setDraft(d => ({ ...d, to: v }))} onClose={() => setOpenField(null)} minDate={draft.from} />
          )}
        </div>
      </div>

      <div className={'flex items-center justify-end gap-2'}>
        <button
          type={'button'}
          onClick={() => {
            setDraft({ from: '', to: '' });
            onChange(null);
          }}
          className={'px-4 py-2.5 rounded-lg border border-stroke-primary text-sm font-medium text-grey-dark cursor-pointer'}
        >
          Clear
        </button>
        <button
          type={'button'}
          onClick={() => draft.from && draft.to && onChange(draft)}
          disabled={!draft.from || !draft.to}
          className={'px-4 py-2.5 rounded-lg bg-blue text-sm font-medium text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

const SearchIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width={'14'} height={'14'} viewBox={'0 0 14 14'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
    <circle cx={'6.5'} cy={'6.5'} r={'5'} stroke={'#959EB5'} />
    <path d={'M10.5 10.5L13 13'} stroke={'#959EB5'} strokeLinecap={'round'} />
  </svg>
);

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
    {checked && <Icon name={'check'} className={'size-3 text-white'} />}
  </button>
);

const WithdrawalFilterModal: FC<Props> = ({
  open,
  categories,
  activeCategory,
  onCategoryChange,
  selections,
  onToggle,
  categoryOptions,
  amountBounds,
  amountRange,
  onAmountRangeChange,
  periodRange,
  onPeriodRangeChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [innerOpen, setInnerOpen] = useState(false);

  // Outside clicks close only the options/amount panel — the category list
  // (this whole widget) stays open until the Filter button is clicked again.
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setInnerOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  useEffect(() => {
    if (!open) setInnerOpen(false);
  }, [open]);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSearchQuery('');
  }, [activeCategory, open]);

  if (!open) return null;

  const handleCategoryClick = (cat: FilterCategory) => {
    if (cat === activeCategory) {
      setInnerOpen(v => !v);
    } else {
      onCategoryChange(cat);
      setInnerOpen(true);
    }
  };

  const isAmount = activeCategory === 'Amount';
  const isPeriod = activeCategory === 'Period';
  const isPool = activeCategory === 'Pool';
  const options = isAmount || isPeriod ? [] : (categoryOptions[activeCategory] ?? []);
  const visibleOptions = isPool ? options.filter(o => o.toLowerCase().includes(searchQuery.toLowerCase())) : options;
  const selected = selections[activeCategory] ?? [];
  const allChecked = selected.length === 0;

  const panel = isAmount ? (
    <div className={'bg-bg-primary border border-stroke-primary rounded-lg shadow-[0px_2px_13.4px_0px_rgba(0,0,0,0.2)]'}>
      <AmountRangePanel bounds={amountBounds ?? { min: 0, max: 0 }} value={amountRange ?? null} onChange={onAmountRangeChange ?? (() => {})} />
    </div>
  ) : isPeriod ? (
    <div className={'bg-bg-primary border border-stroke-primary rounded-lg shadow-[0px_2px_13.4px_0px_rgba(0,0,0,0.2)]'}>
      <PeriodRangePanel value={periodRange ?? null} onChange={onPeriodRangeChange ?? (() => {})} />
    </div>
  ) : (
    options.length > 0 && (
      <div className={'bg-bg-primary border border-stroke-primary rounded-lg shadow-[0px_2px_13.4px_0px_rgba(0,0,0,0.2)] py-4 w-[280px] lg:w-[220px]'}>
        <div className={'flex flex-col px-4'}>
          {isPool && (
            <div className={'flex items-center gap-2 mb-3 px-2.5 py-2 rounded-lg border border-stroke-primary'}>
              <SearchIcon className={'size-3.5 shrink-0'} />
              <input
                type={'text'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={'Search'}
                className={'w-full text-sm text-black placeholder:text-label-tertiary outline-none bg-transparent'}
              />
            </div>
          )}
          <p className={'text-xs font-medium text-grey-dark mb-1'}>Selected</p>
          <div
            className={'flex items-center gap-2 py-1.5 pb-4 border-b border-stroke-primary mb-3 cursor-pointer'}
            onClick={() => onToggle(activeCategory, '__all__')}
          >
            <Checkbox checked={allChecked} onChange={() => onToggle(activeCategory, '__all__')} />
            <span className={'text-sm text-black'}>All</span>
          </div>
          <p className={'text-xs font-medium text-grey-dark mb-1'}>Options</p>
          <div className={'max-h-60 overflow-y-auto overflow-x-hidden'}>
            {visibleOptions.map(opt => (
              <div
                key={opt}
                className={'flex items-center gap-2 py-1.5 cursor-pointer rounded hover:bg-bg-tertiary/50 -mx-1 px-1'}
                onClick={() => onToggle(activeCategory, opt)}
              >
                <Checkbox checked={selected.includes(opt)} onChange={() => onToggle(activeCategory, opt)} />
                <span className={'text-sm text-black truncate'}>{opt}</span>
              </div>
            ))}
            {isPool && visibleOptions.length === 0 && (
              <p className={'text-sm text-label-tertiary py-1.5'}>No pools match &quot;{searchQuery}&quot;</p>
            )}
          </div>
        </div>
      </div>
    )
  );

  return (
    <div ref={ref} className={'absolute top-full left-0 z-50 pt-1'}>
      <div className={'bg-bg-primary border border-stroke-primary rounded-lg shadow-[0px_2px_13.4px_0px_rgba(0,0,0,0.2)] py-2 w-[160px]'}>
        <div className={'flex flex-col px-1'}>
          {categories.map(cat => {
            const hasSelection =
              cat === 'Amount' ? amountRange != null : cat === 'Period' ? periodRange != null : (selections[cat] ?? []).length > 0;
            const isActive = cat === activeCategory;
            return (
              <div key={cat} className={'relative'}>
                <button
                  type={'button'}
                  onClick={() => handleCategoryClick(cat)}
                  className={clsx(
                    'flex items-center gap-2 px-2 py-2 rounded text-left w-full tr-d-all',
                    isActive ? 'bg-bg-tertiary' : 'hover:bg-bg-tertiary/50'
                  )}
                >
                  <Icon name={'plus'} className={'size-[18px] shrink-0 text-blue'} />
                  <span className={clsx('text-sm text-blue', hasSelection && 'font-medium')}>{cat}</span>
                </button>
                {isActive && innerOpen && (
                  <div className={'absolute z-50 max-lg:top-full max-lg:left-0 max-lg:pt-1 lg:top-0 lg:left-full lg:pl-1'}>
                    {panel}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalFilterModal;
