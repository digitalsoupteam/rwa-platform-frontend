'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface CalendarProps {
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
  minDate?: string;
}

const Calendar: FC<CalendarProps> = ({ value, onChange, onClose, minDate }) => {
  const ref = useRef<HTMLDivElement>(null);
  const init = value ? new Date(value) : new Date();
  const [viewMonth, setViewMonth] = useState(init.getMonth());
  const [viewYear, setViewYear] = useState(init.getFullYear());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const selected = value ? new Date(value) : null;
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const monthLabel = new Date(viewYear, viewMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const minDateObj = minDate ? new Date(minDate) : null;

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else setViewMonth(m => m + 1);
  };

  const selectDay = (day: number) => {
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(iso);
    onClose();
  };

  const isPast = (day: number) => {
    if (!minDateObj) return false;
    const d = new Date(viewYear, viewMonth, day);
    return d < new Date(minDateObj.getFullYear(), minDateObj.getMonth(), minDateObj.getDate());
  };

  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-1 z-50 bg-white rounded-2xl border border-stroke-primary shadow-base p-4 w-72"
    >
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="p-1 rounded-lg hover:bg-blue-light cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="#202E46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-blue-dark">{monthLabel}</span>
        <button type="button" onClick={nextMonth} className="p-1 rounded-lg hover:bg-blue-light cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="#202E46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-center text-xs text-grey py-1 font-medium">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const isSelected =
            selected && selected.getDate() === day && selected.getMonth() === viewMonth && selected.getFullYear() === viewYear;
          const disabled = isPast(day);
          return (
            <button
              key={day}
              type="button"
              onClick={() => !disabled && selectDay(day)}
              disabled={disabled}
              className={clsx(
                'text-center text-sm py-1 rounded-lg transition-colors',
                disabled ? 'text-grey-light cursor-not-allowed' : 'cursor-pointer hover:bg-blue-light',
                isSelected && '!bg-blue !text-white hover:!bg-blue'
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
