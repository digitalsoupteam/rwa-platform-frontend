'use client';

import React, { FC, useEffect } from 'react';
import MarketplaceFilters, { type PoolStage, type PoolType } from './MarketplaceFilters';
import {Icon} from "@/components/ui";

export interface FilterChip {
  label: string;
  onRemove: () => void;
}

interface MobileFiltersModalProps {
  activeChips: FilterChip[];
  onClearAll: () => void;
  onClose: () => void;
  sortBy?: string;
  onSortChange?: (value: string) => void;
  selectedRanges?: number[];
  onRangeChange?: (ranges: number[]) => void;
  categories?: string[];
  selectedCategories?: string[];
  onCategoryChange?: (categories: string[]) => void;
  selectedStages?: PoolStage[];
  onStageChange?: (stages: PoolStage[]) => void;
  selectedTypes?: PoolType[];
  onTypeChange?: (types: PoolType[]) => void;
}

const MobileFiltersModal: FC<MobileFiltersModalProps> = ({
  activeChips,
  onClearAll,
  onClose,
  sortBy,
  onSortChange,
  selectedRanges,
  onRangeChange,
  categories,
  selectedCategories,
  onCategoryChange,
  selectedStages,
  onStageChange,
  selectedTypes,
  onTypeChange,
}) => {
  useEffect(() => {
    document.body.classList.add('locked');
    return () => document.body.classList.remove('locked');
  }, []);

  return (
    <div className={'fixed inset-0 z-50 flex flex-col bg-grey-light'}>
      {/* Header */}
      <div className={'shrink-0 border-b border-blue-dim'}>
        <div className={'flex items-center justify-between px-3 pt-4 pb-[14px]'}>
          <span className={'text-xl font-semibold leading-[1.2] tracking-[-0.02em] text-grey-dark'}>Filters</span>
          <button
            onClick={onClose}
            className={'text-grey-dark size-8 shrink-0 flex items-center justify-center'}
            aria-label={'Close filters'}
          >
            <Icon className={'rotate-45 size-8'} name={'plus'} />
          </button>
        </div>

        {/* Chips — horizontally scrollable */}
        <div className={'flex gap-2 overflow-x-auto scrollbar-hidden px-3 pb-4'}>
          {activeChips.length > 0 ? (
            activeChips.map(chip => (
              <button
                key={chip.label}
                onClick={chip.onRemove}
                className={
                  'shrink-0 flex items-center gap-4 bg-blue-dim text-black text-sm font-normal px-4 py-2 rounded-full'
                }
              >
                {chip.label}
                <Icon className={'size-4 rotate-45'} name={'plus'} />
              </button>
            ))
          ) : (
            <span className={'text-sm text-grey-dark py-2'}>No active filters</span>
          )}
        </div>
      </div>

      {/* Scrollable filter body */}
      <div className={'flex-1 overflow-y-auto px-3'}>
        <MarketplaceFilters sortBy={sortBy} onSortChange={onSortChange} selectedRanges={selectedRanges} onRangeChange={onRangeChange} categories={categories} selectedCategories={selectedCategories} onCategoryChange={onCategoryChange} selectedStages={selectedStages} onStageChange={onStageChange} selectedTypes={selectedTypes} onTypeChange={onTypeChange} />
      </div>

      {/* Fixed bottom bar */}
      <div className={'shrink-0 h-[76px] border-t border-blue-dim bg-grey-light flex items-center px-3'}>
        <div className={'flex-1 flex items-center justify-center'}>
          <button
            onClick={onClearAll}
            className={'text-base font-semibold leading-[1.2] text-black tr-d-all hover:text-grey-dark'}
          >
            Clear All
          </button>
        </div>
        <button
          onClick={onClose}
          className={
            'w-[162px] h-[52px] flex items-center justify-center bg-blue-dark text-white text-base font-semibold leading-[1.2] rounded-2xl tr-d-all hover:bg-blue-hover'
          }
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default MobileFiltersModal;
