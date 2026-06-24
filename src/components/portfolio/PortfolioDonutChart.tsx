'use client';

import React, { FC } from 'react';
import clsx from 'clsx';
import Icon from '@/components/ui/Icon';

interface Segment {
  label: string;
  value: number;
  color: string;
}

interface PortfolioDonutChartProps {
  totalUsdt: string;
  subtitle: string;
  segments?: Segment[];
  activeFilter: 'industry' | 'projects' | 'countries';
  onFilterChange: (filter: 'industry' | 'projects' | 'countries') => void;
}

const DEFAULT_SEGMENTS: Segment[] = [
  { label: 'Agriculture', value: 28, color: '#1D58E9' },
  { label: 'Technology', value: 22, color: '#1ABF97' },
  { label: 'Real Estate', value: 18, color: '#F5A623' },
  { label: 'Energy', value: 15, color: '#E91D58' },
  { label: 'Finance', value: 10, color: '#9B59B6' },
  { label: 'Other', value: 7, color: '#C2D0EB' },
];

function buildDonutPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

const PortfolioDonutChart: FC<PortfolioDonutChartProps> = ({
  totalUsdt,
  subtitle,
  segments = DEFAULT_SEGMENTS,
  activeFilter,
  onFilterChange,
}) => {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let cumulative = 0;

  const FILTERS: { key: 'industry' | 'projects' | 'countries'; label: string }[] = [
    { key: 'industry', label: 'Industry' },
    { key: 'projects', label: 'Projects' },
    { key: 'countries', label: 'Countries' },
  ];

  return (
    <div className="flex flex-col items-center justify-between h-full w-full gap-4">
      {/* Chart header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm uppercase text-grey-dark tracking-wide">Total Contributed</span>
            <Icon name="info" className="size-4 text-grey" />
          </div>
          <span className="text-xs text-grey-dark">5 active · 28 completed · 3 failed</span>
        </div>
        <div className="flex gap-2">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              className={clsx(
                'px-4 py-2 rounded-[10px] text-sm font-medium tr-d-all',
                activeFilter === f.key
                  ? 'bg-blue text-white'
                  : 'border border-stroke-primary text-grey-dark hover:bg-bg-tertiary'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Donut */}
      <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
        <svg width={280} height={280} viewBox="0 0 280 280">
          {segments.map((seg, i) => {
            const startAngle = (cumulative / total) * 360 - 90;
            cumulative += seg.value;
            const endAngle = (cumulative / total) * 360 - 90;
            const path = buildDonutPath(140, 140, 120, startAngle, endAngle);
            return <path key={i} d={path} fill={seg.color} />;
          })}
          <circle cx={140} cy={140} r={80} fill="#FDFEFF" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-3xl font-semibold text-black">{totalUsdt}</span>
            <Icon name="usdt" className="size-7" />
            <span className="text-3xl font-semibold text-black">USDT</span>
          </div>
          <span className="text-sm text-label-tertiary">{subtitle}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 w-full">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-full shrink-0" style={{ background: seg.color }} />
            <span className="text-xs text-grey-dark">{seg.label}</span>
            <span className="text-xs text-label-tertiary">{((seg.value / total) * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioDonutChart;
