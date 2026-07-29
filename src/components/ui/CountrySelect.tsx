'use client';

import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { COUNTRIES, getCountryByCode } from '@/lib/countries';
import Icon from './Icon';

interface CountrySelectProps {
  value: string | null;
  onChange: (code: string) => void;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
}

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange, placeholder = 'Select country', errorMessage, className }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const selected = getCountryByCode(value);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(c => c.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div ref={ref} className={clsx('relative w-full', className)}>
      <button
        type={'button'}
        onClick={() => setOpen(v => !v)}
        className={clsx(
          'w-full flex items-center justify-between gap-2 pl-2 pr-3 py-3 rounded-lg border-1 border-stroke-primary bg-white text-sm tr-d-all',
          errorMessage && '!border-red-bright'
        )}
      >
        <span className={'flex items-center gap-2 min-w-0'}>
          {selected ? (
            <>
              <span className={'text-base leading-none'}>{selected.flag}</span>
              <span className={'text-black truncate'}>{selected.name}</span>
            </>
          ) : (
            <span className={'text-label-tertiary'}>{placeholder}</span>
          )}
        </span>
        <Icon name={'arrowDown'} className={clsx('size-3.5 shrink-0 text-label-tertiary tr-d-all', open && 'rotate-180')} />
      </button>

      {errorMessage && <div className={'pt-3 text-xs/[1] text-red-bright'}>{errorMessage}</div>}

      {open && (
        <div
          className={
            'absolute top-full left-0 mt-1 z-50 w-full max-h-[280px] flex flex-col rounded-lg border-1 border-stroke-primary bg-white shadow-[0px_2px_13.4px_0px_rgba(0,0,0,0.2)] overflow-hidden'
          }
        >
          <div className={'border-b border-stroke-primary px-3 py-2.5 shrink-0'}>
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={'Search'}
              className={'w-full outline-0 text-sm text-black placeholder:text-label-tertiary'}
            />
          </div>
          <div className={'flex-1 overflow-y-auto py-1'}>
            {filtered.length === 0 && <div className={'px-3 py-2 text-sm text-label-tertiary'}>No countries found</div>}
            {filtered.map(country => (
              <button
                key={country.code}
                type={'button'}
                onClick={() => {
                  onChange(country.code);
                  setOpen(false);
                  setSearch('');
                }}
                className={
                  'w-full flex items-center justify-between gap-2 px-3 py-1.5 mx-1 rounded text-sm hover:bg-bg-tertiary tr-d-all'
                }
                style={{ width: 'calc(100% - 8px)' }}
              >
                <span className={'flex items-center gap-2 min-w-0'}>
                  <span className={'text-base leading-none'}>{country.flag}</span>
                  <span className={'text-black truncate'}>{country.name}</span>
                </span>
                {value === country.code && <Icon name={'check'} className={'size-3.5 shrink-0 text-blue'} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
