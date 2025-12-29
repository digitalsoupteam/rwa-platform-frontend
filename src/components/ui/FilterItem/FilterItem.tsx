'use client';

import React, { FC, useState } from 'react';
import { Checkbox, Radio } from '@/components/ui';
import clsx from 'clsx';

interface FilterItemProps {
  title: string;
  controlType: 'checkbox' | 'radio';
  items: {
    label: string;
    value?: string;
    name: string;
  }[];
}

const FilterItem: FC<FilterItemProps> = ({ title, items, controlType }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={'py-6 border-t border-blue-dim'}>
      <button
        className={clsx(
          'w-full flex items-center justify-between gap-2 text-lg font-semibold mb-6',
          'after:shrink-0 after:size-5 after:bg-black after:mask-[url(/icons/tick.svg)] after:mask-contain after:transition-all after:duration-300 after:ease-in-out',
          isOpen ? 'after:-rotate-90' : 'after:rotate-90'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      <div className={clsx('grid grid-rows-[0fr] tr-d-all overflow-hidden', isOpen && 'grid-rows-[1fr]')}>
        <div className={'flex flex-col gap-4 overflow-hidden'}>
          {items.map(item => {
            if (controlType === 'checkbox') {
              return (
                <Checkbox key={item.label + item.name} name={item.name} value={item.value}>
                  {item.label}
                </Checkbox>
              );
            }

            if (controlType === 'radio') {
              return (
                <Radio key={item.label + item.name} name={item.name} value={item.value}>
                  {item.label}
                </Radio>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
