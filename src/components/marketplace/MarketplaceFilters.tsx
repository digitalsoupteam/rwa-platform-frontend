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
}

const COUNTRIES = [
  'Abkhazia', 'Australia', 'Austria', 'Azerbaijan', 'Albania',
  'American Samoa', 'Anguilla', 'Angola', 'Andorra', 'Argentina',
  'Armenia', 'Belgium', 'Brazil', 'Canada', 'China',
  'Denmark', 'Estonia', 'Finland', 'France', 'Germany',
];

const MarketplaceFilters: FC<MarketplaceFiltersProps> = ({ className }) => {
  const [countrySearch, setCountrySearch] = useState('');

  const filteredCountries = COUNTRIES.filter(c =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <div className={clsx('flex flex-col', className)}>
      <FilterSection title={'Sort by'}>
        <Checkbox label={'Newest first'} />
        <Checkbox label={'Token price: high to low'} defaultChecked />
        <Checkbox label={'Token price: low to high'} />
        <Checkbox label={'Funding goal: high to low'} defaultChecked />
        <Checkbox label={'Funding goal: low to high'} />
      </FilterSection>

      <FilterSection title={'AI rating'}>
        <Checkbox label={'High ROI'} defaultChecked />
        <Checkbox label={'Verified'} defaultChecked />
        <Checkbox label={'Low risk'} />
        <Checkbox label={'New'} />
      </FilterSection>

      <FilterSection title={'Field'}>
        <Checkbox label={'Real estate'} defaultChecked />
        <Checkbox label={'Startups'} />
        <Checkbox label={'Entertainment'} defaultChecked />
        <Checkbox label={'Art and collecting'} />
        <Checkbox label={'Education'} />
        <Checkbox label={'Intellectual property'} defaultChecked />
        <Checkbox label={'Medicine'} />
      </FilterSection>

      <FilterSection title={'Pool stage'}>
        <Checkbox label={'Collecting'} defaultChecked />
        <Checkbox label={'Paying debt'} />
        <Checkbox label={'Paying profit'} />
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
