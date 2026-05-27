'use client';

import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { Checkbox, Icon } from '@/components/ui';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection: FC<FilterSectionProps> = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={'border-t border-blue-dim pt-6 pb-3 flex flex-col gap-6'}>
      <button
        className={'w-full flex items-center justify-between cursor-pointer'}
        onClick={() => setOpen(!open)}
      >
        <span className={'text-lg font-semibold leading-[1.4] text-black'}>{title}</span>
        <Icon
          name={'tick'}
          className={clsx('size-5 shrink-0 tr-d-all', open ? '-rotate-90' : 'rotate-90')}
        />
      </button>
      <div
        className={clsx(
          'grid tr-d-all overflow-hidden',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className={'overflow-hidden flex flex-col gap-4'}>{children}</div>
      </div>
    </div>
  );
};

interface MarketplaceFiltersProps {
  className?: string;
  sortBy?: string;
  onSortChange?: (value: string) => void;
  selectedRanges?: number[];
  onRangeChange?: (ranges: number[]) => void;
  categories?: string[];
  selectedCategories?: string[];
  onCategoryChange?: (categories: string[]) => void;
  selectedStages?: PoolStage[];
  onStageChange?: (stages: PoolStage[]) => void;
}

export const POOL_STAGES = [
  { value: 'collecting',    label: 'Collecting'    },
  { value: 'paying_debt',   label: 'Paying debt'   },
  { value: 'paying_profit', label: 'Paying profit' },
] as const;

export type PoolStage = typeof POOL_STAGES[number]['value'];

export const RISK_SCORE_RANGES = [
  { label: '0 – 29',   min: 0,  max: 29  },
  { label: '30 – 49',  min: 30, max: 49  },
  { label: '50 – 69',  min: 50, max: 69  },
  { label: '70 – 89',  min: 70, max: 89  },
  { label: '90 – 100', min: 90, max: 100 },
] as const;

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price_desc', label: 'Token price: high to low' },
  { value: 'price_asc', label: 'Token price: low to high' },
  { value: 'goal_desc', label: 'Funding goal: high to low' },
  { value: 'goal_asc', label: 'Funding goal: low to high' },
] as const;

const COUNTRIES = [
  'Abkhazia', 'Australia', 'Austria', 'Azerbaijan', 'Albania',
  'American Samoa', 'Anguilla', 'Angola', 'Andorra', 'Argentina',
  'Armenia', 'Belgium', 'Brazil', 'Canada', 'China',
  'Denmark', 'Estonia', 'Finland', 'France', 'Germany',
];

const MarketplaceFilters: FC<MarketplaceFiltersProps> = ({ className, sortBy = 'newest', onSortChange, selectedRanges = [], onRangeChange, categories = [], selectedCategories = [], onCategoryChange, selectedStages = [], onStageChange }) => {
  const [countrySearch, setCountrySearch] = useState('');

  const filteredCountries = COUNTRIES.filter(c =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <div className={clsx('flex flex-col', className)}>
      <FilterSection title={'Sort by'}>
        {SORT_OPTIONS.map(opt => (
          <label key={opt.value} className={'flex items-center gap-2.5 cursor-pointer'}>
            <input
              type={'radio'}
              name={'sort-by'}
              value={opt.value}
              checked={sortBy === opt.value}
              onChange={() => onSortChange?.(opt.value)}
              className={'size-4 accent-blue-600 cursor-pointer shrink-0'}
            />
            <span className={'text-sm select-none'}>{opt.label}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title={'AI risk score'}>
        {RISK_SCORE_RANGES.map((range, i) => (
          <Checkbox
            key={range.label}
            label={range.label}
            checked={selectedRanges.includes(i)}
            onChange={e => {
              const next = e.target.checked
                ? [...selectedRanges, i]
                : selectedRanges.filter(r => r !== i);
              onRangeChange?.(next);
            }}
          />
        ))}
      </FilterSection>

      <FilterSection title={'Category'}>
        {categories.length === 0 ? (
          <span className={'text-sm text-grey-dark'}>No categories available</span>
        ) : (
          categories.map(cat => (
            <Checkbox
              key={cat}
              label={cat}
              checked={selectedCategories.includes(cat)}
              onChange={e => {
                const next = e.target.checked
                  ? [...selectedCategories, cat]
                  : selectedCategories.filter(c => c !== cat);
                onCategoryChange?.(next);
              }}
            />
          ))
        )}
      </FilterSection>

      <FilterSection title={'Pool stage'}>
        {POOL_STAGES.map(stage => (
          <Checkbox
            key={stage.value}
            label={stage.label}
            checked={selectedStages.includes(stage.value)}
            onChange={e => {
              const next = e.target.checked
                ? [...selectedStages, stage.value]
                : selectedStages.filter(s => s !== stage.value);
              onStageChange?.(next);
            }}
          />
        ))}
      </FilterSection>

      <FilterSection title={'Pool type'}>
        <Checkbox label={'Fixed'} defaultChecked />
        <Checkbox label={'Flexible'} />
      </FilterSection>

      <FilterSection title={'Location'} defaultOpen={false}>
        <input
          type={'text'}
          placeholder={'Country name'}
          value={countrySearch}
          onChange={e => setCountrySearch(e.target.value)}
          className={
            'w-full border border-grey rounded-2xl h-[52px] px-5 py-[13px] text-base leading-[1.4] text-grey-dark outline-none focus:border-blue tr-d-all'
          }
        />
        <div className={'flex flex-col gap-4 max-h-[280px] overflow-y-auto scrollbar-hidden'}>
          {filteredCountries.map(country => (
            <Checkbox key={country} label={country} />
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

export default MarketplaceFilters;
