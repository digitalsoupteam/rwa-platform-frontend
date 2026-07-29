'use client';

import React, { FC } from 'react';
import { Radio } from '@/components/ui';
import { BusinessType } from '@/gql/graphql';

const BUSINESS_TYPE_OPTIONS: { value: BusinessType; label: string }[] = [
  { value: BusinessType.Growth, label: 'Growth' },
  { value: BusinessType.Startup, label: 'Startup' },
  { value: BusinessType.Franchise, label: 'Franchise' },
];

interface BusinessTypeSelectProps {
  value: BusinessType | null;
  onChange: (value: BusinessType) => void;
  title?: string;
}

const BusinessTypeSelect: FC<BusinessTypeSelectProps> = ({ value, onChange, title = 'Business type' }) => {
  return (
    <div>
      <div className={'text-sm font-medium mb-3'}>
        {title}<span className={'text-red-bright'}>*</span>
      </div>
      <div className={'flex flex-wrap gap-x-8 gap-y-3'}>
        {BUSINESS_TYPE_OPTIONS.map(option => (
          <Radio
            key={option.value}
            label={option.label}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessTypeSelect;
