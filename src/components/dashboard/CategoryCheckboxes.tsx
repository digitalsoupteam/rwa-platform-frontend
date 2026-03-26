'use client';

import React, { FC } from 'react';
import { Checkbox } from '@/components/ui';

export const PROJECT_CATEGORIES = [
  'Technology', 'Medicine', 'Entertainment', 'Enterprise', 'Real estate', 'Energy',
  'Infrastructure', 'Collectibles', 'Luxury goods', 'Finance', 'Art',
];

const MAX_CATEGORIES = 3;

interface CategoryCheckboxesProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

const CategoryCheckboxes: FC<CategoryCheckboxesProps> = ({ selected, onChange }) => {
  const toggle = (category: string) => {
    if (selected.includes(category)) {
      onChange(selected.filter(c => c !== category));
    } else if (selected.length < MAX_CATEGORIES) {
      onChange([...selected, category]);
    }
  };

  return (
    <div>
      <div className={'text-sm font-medium mb-1'}>
        Project categories<span className={'text-red-bright'}>*</span>
      </div>
      <div className={'text-xs text-text-secondary mb-4'}>Select up to {MAX_CATEGORIES} main categories for your project</div>
      <div className={'grid grid-cols-2 gap-x-8 gap-y-3'}>
        {PROJECT_CATEGORIES.map(category => (
          <Checkbox
            key={category}
            label={category}
            checked={selected.includes(category)}
            onChange={() => toggle(category)}
            disabled={!selected.includes(category) && selected.length >= MAX_CATEGORIES}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCheckboxes;
