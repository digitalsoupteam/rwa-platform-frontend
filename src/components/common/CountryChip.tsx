import React, { FC } from 'react';
import clsx from 'clsx';
import { getCountryByCode } from '@/lib/countries';

interface CountryChipProps {
  code?: string | null;
  className?: string;
}

const CountryChip: FC<CountryChipProps> = ({ code, className }) => {
  const country = getCountryByCode(code);
  if (!country) return null;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-bg-tertiary text-base leading-none shrink-0',
        className
      )}
    >
      <span className={'leading-none'}>{country.flag}</span>
      <span className={'text-black'}>{country.name}</span>
    </span>
  );
};

export default CountryChip;
