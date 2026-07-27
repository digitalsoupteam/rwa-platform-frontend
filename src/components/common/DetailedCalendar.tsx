'use client';

import React, { FC, useEffect, useState } from 'react';
import clsx from 'clsx';

export interface DateRange {
  from: string; // ISO yyyy-mm-dd
  to: string; // ISO yyyy-mm-dd
}

interface DetailedCalendarProps {
  value: DateRange | null;
  onApply: (range: DateRange) => void;
  onClear: () => void;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function toIso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatDisplay(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
}

// Strips everything but digits and auto-inserts the dd.mm.yyyy dots as the
// user types, so the field only ever contains digits/dots — never letters.
function maskDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean).join('.');
}

// Accepts dd.mm.yyyy as typed by the user; returns an ISO yyyy-mm-dd string,
// or null if the text isn't a valid calendar date (including 31.02-style overflow).
function parseDisplay(text: string): string | null {
  const match = text.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null;
  return toIso(d);
}

function addDays(d: Date, days: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function addMonths(d: Date, months: number): Date {
  const copy = new Date(d);
  copy.setMonth(copy.getMonth() + months);
  return copy;
}

const PRESETS: { label: string; range: () => DateRange }[] = [
  { label: 'Last 7 days', range: () => ({ from: toIso(addDays(new Date(), -6)), to: toIso(new Date()) }) },
  { label: 'Last 1 month', range: () => ({ from: toIso(addMonths(new Date(), -1)), to: toIso(new Date()) }) },
  { label: 'Last 6 months', range: () => ({ from: toIso(addMonths(new Date(), -6)), to: toIso(new Date()) }) },
  { label: 'Last 1 year', range: () => ({ from: toIso(addMonths(new Date(), -12)), to: toIso(new Date()) }) },
];

const PrevIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8l4-4" stroke="#4A5363" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NextIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4l4 4-4 4" stroke="#4A5363" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MonthGrid: FC<{
  year: number;
  month: number;
  draftFrom: string;
  draftTo: string;
  onSelectDay: (iso: string) => void;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}> = ({ year, month, draftFrom, draftTo, onSelectDay, onPrev, onNext, className = 'flex' }) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = new Date(year, month).toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const isoOf = (day: number) => toIso(new Date(year, month, day));
  const isInRange = (iso: string) => !!draftFrom && !!draftTo && iso >= draftFrom && iso <= draftTo;

  return (
    <div className={clsx('flex-col gap-6 shrink-0 w-[266px]', className)}>
      <div className="flex items-center justify-between w-full">
        <button type="button" onClick={onPrev} className="size-4 shrink-0 cursor-pointer" aria-label="Previous month">
          <PrevIcon />
        </button>
        <span className="text-base font-medium text-grey-dark">{monthLabel}</span>
        <button type="button" onClick={onNext} className="size-4 shrink-0 cursor-pointer" aria-label="Next month">
          <NextIcon />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-7">
          {WEEKDAYS.map(d => (
            <div key={d} className="flex items-center justify-center">
              <span className="text-xs font-medium text-label-tertiary">{d}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((day, ci) => {
            if (!day) return <div key={ci} className="h-[38px]" />;

            const colInRow = ci % 7;
            const iso = isoOf(day);
            const isStart = iso === draftFrom;
            const isEnd = iso === draftTo;
            const inRange = isInRange(iso);

            const prevCell = cells[ci - 1];
            const nextCell = cells[ci + 1];
            const prevInRange = colInRow > 0 && !!prevCell && isInRange(isoOf(prevCell));
            const nextInRange = colInRow < 6 && !!nextCell && isInRange(isoOf(nextCell));

            return (
              <button
                key={ci}
                type="button"
                onClick={() => onSelectDay(iso)}
                className={clsx(
                  'h-[38px] flex items-center justify-center cursor-pointer',
                  inRange && 'bg-[#d9e4ff]',
                  inRange && !prevInRange && 'rounded-l-full',
                  inRange && !nextInRange && 'rounded-r-full'
                )}
              >
                <span
                  className={clsx(
                    'size-[38px] rounded-full flex items-center justify-center text-sm',
                    isStart || isEnd ? 'bg-blue text-white' : 'text-black'
                  )}
                >
                  {day}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DetailedCalendar: FC<DetailedCalendarProps> = ({ value, onApply, onClear }) => {
  const init = value?.from ? new Date(value.from) : new Date();
  const [baseYear, setBaseYear] = useState(init.getFullYear());
  const [baseMonth, setBaseMonth] = useState(init.getMonth());
  const [draftFrom, setDraftFrom] = useState(value?.from ?? '');
  const [draftTo, setDraftTo] = useState(value?.to ?? '');
  const [startText, setStartText] = useState(formatDisplay(draftFrom));
  const [endText, setEndText] = useState(formatDisplay(draftTo));

  // Keep the text fields in sync whenever the selection changes via the
  // calendar or a preset — but not while the user is actively typing there.
  useEffect(() => {
    setStartText(formatDisplay(draftFrom));
  }, [draftFrom]);
  useEffect(() => {
    setEndText(formatDisplay(draftTo));
  }, [draftTo]);

  const jumpTo = (iso: string) => {
    const d = new Date(iso);
    setBaseYear(d.getFullYear());
    setBaseMonth(d.getMonth());
  };

  const handlePreset = (preset: (typeof PRESETS)[number]) => {
    const range = preset.range();
    setDraftFrom(range.from);
    setDraftTo(range.to);
    jumpTo(range.from);
  };

  const handleSelectDay = (iso: string) => {
    if (!draftFrom || (draftFrom && draftTo)) {
      setDraftFrom(iso);
      setDraftTo('');
      return;
    }
    if (iso < draftFrom) {
      setDraftTo(draftFrom);
      setDraftFrom(iso);
    } else {
      setDraftTo(iso);
    }
  };

  const handleStartTextChange = (raw: string) => {
    const masked = maskDateInput(raw);
    setStartText(masked);
    const iso = parseDisplay(masked);
    if (!iso) return;
    setDraftFrom(iso);
    if (draftTo && iso > draftTo) setDraftTo('');
    jumpTo(iso);
  };

  const handleEndTextChange = (raw: string) => {
    const masked = maskDateInput(raw);
    setEndText(masked);
    const iso = parseDisplay(masked);
    if (!iso) return;
    setDraftTo(iso);
    if (draftFrom && iso < draftFrom) setDraftFrom('');
  };

  // On blur, anything left that never resolved to a valid date snaps back to
  // the last value the calendar actually committed.
  const revertStartText = () => setStartText(formatDisplay(draftFrom));
  const revertEndText = () => setEndText(formatDisplay(draftTo));

  const handleClear = () => {
    setDraftFrom('');
    setDraftTo('');
    onClear();
  };

  const handleApply = () => {
    if (!draftFrom || !draftTo) return;
    onApply({ from: draftFrom, to: draftTo });
  };

  const prevMonth = () => {
    const d = addMonths(new Date(baseYear, baseMonth, 1), -1);
    setBaseYear(d.getFullYear());
    setBaseMonth(d.getMonth());
  };
  const nextMonth = () => {
    const d = addMonths(new Date(baseYear, baseMonth, 1), 1);
    setBaseYear(d.getFullYear());
    setBaseMonth(d.getMonth());
  };
  const rightDate = addMonths(new Date(baseYear, baseMonth, 1), 1);

  const activePresetLabel = PRESETS.find(p => {
    const r = p.range();
    return r.from === draftFrom && r.to === draftTo;
  })?.label;

  return (
    <div className="flex flex-col gap-8 p-4 w-full max-w-[328px] lg:w-auto lg:max-w-none">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2 shrink-0 lg:w-[157px] w-full">
          {PRESETS.map(preset => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handlePreset(preset)}
              className={clsx(
                'border border-stroke-primary rounded-[10px] px-4 py-3 text-sm font-medium cursor-pointer whitespace-nowrap',
                activePresetLabel === preset.label ? 'bg-blue text-white border-blue' : 'text-grey-dark'
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-8 items-start w-full">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4 w-full lg:flex lg:w-auto lg:items-center lg:gap-6">
            <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-2">
              <span className="text-sm font-medium text-grey-dark">Start</span>
              <div className="border border-stroke-primary rounded-lg px-2 py-3 w-full lg:w-[120px]">
                <input
                  type="text"
                  inputMode="numeric"
                  value={startText}
                  onChange={e => handleStartTextChange(e.target.value)}
                  onBlur={revertStartText}
                  onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
                  placeholder="dd.mm.yyyy"
                  className="w-full text-sm text-black placeholder:text-label-tertiary outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-2">
              <span className="text-sm font-medium text-grey-dark">End</span>
              <div className="border border-stroke-primary rounded-lg px-2 py-3 w-full lg:w-[120px]">
                <input
                  type="text"
                  inputMode="numeric"
                  value={endText}
                  onChange={e => handleEndTextChange(e.target.value)}
                  onBlur={revertEndText}
                  onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
                  placeholder="dd.mm.yyyy"
                  className="w-full text-sm text-black placeholder:text-label-tertiary outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex items-start gap-6 w-full">
            <MonthGrid
              year={baseYear}
              month={baseMonth}
              draftFrom={draftFrom}
              draftTo={draftTo}
              onSelectDay={handleSelectDay}
              onPrev={prevMonth}
              onNext={nextMonth}
            />

            <MonthGrid
              year={rightDate.getFullYear()}
              month={rightDate.getMonth()}
              draftFrom={draftFrom}
              draftTo={draftTo}
              onSelectDay={handleSelectDay}
              onPrev={prevMonth}
              onNext={nextMonth}
              className="hidden lg:flex"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2.5 rounded-lg border border-stroke-primary text-sm font-medium text-grey-dark cursor-pointer"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleApply}
          disabled={!draftFrom || !draftTo}
          className="px-4 py-2.5 rounded-lg bg-blue text-sm font-medium text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DetailedCalendar;
