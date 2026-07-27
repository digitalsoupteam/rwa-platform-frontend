'use client';

import React, { FC, useRef, useState } from 'react';
import clsx from 'clsx';
import Icon from '@/components/ui/Icon';

export interface DonutSegment {
  label: string;
  value: number;
  poolCount: number;
}

interface PortfolioDonutChartProps {
  totalUsdt: string;
  subtitle: string;
  segments?: DonutSegment[];
  activeFilter: 'industry' | 'projects' | 'countries';
  onFilterChange: (filter: 'industry' | 'projects' | 'countries') => void;
  poolStats?: { active: number; completed: number; failed: number };
}

const SIZE = 396;
const RADIUS = 160;
const STROKE = 30;
const GAP_PX = 5;

const DEFAULT_SEGMENTS: DonutSegment[] = [
  { label: 'Agriculture', value: 1450, poolCount: 6 },
  { label: 'Real estate', value: 3254, poolCount: 7 },
  { label: 'Energy', value: 980, poolCount: 4 },
  { label: 'Logistics', value: 760, poolCount: 3 },
  { label: 'Technology', value: 1120, poolCount: 5 },
  { label: 'Manufacturing', value: 640, poolCount: 3 },
  { label: 'Hospitality', value: 420, poolCount: 2 },
  { label: 'Healthcare', value: 230, poolCount: 2 },
  { label: 'Retail', value: 100, poolCount: 1 },
  { label: 'Mining', value: 0, poolCount: 1 },
  { label: 'Aquaculture', value: 0, poolCount: 1 },
  { label: 'Forestry', value: 0, poolCount: 1 },
  { label: 'Other', value: 0, poolCount: 2 },
];

const PortfolioDonutChart: FC<PortfolioDonutChartProps> = ({
  totalUsdt,
  subtitle,
  segments = DEFAULT_SEGMENTS,
  activeFilter,
  onFilterChange,
  poolStats,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 'countries' is hidden until the backend supports it — keep the type for when it's ready.
  const FILTERS: { key: 'industry' | 'projects' | 'countries'; label: string }[] = [
    { key: 'industry', label: 'Industry' },
    { key: 'projects', label: 'Projects' },
  ];

  const circumference = 2 * Math.PI * RADIUS;
  const segmentsTotal = segments.reduce((sum, s) => sum + s.value, 0);

  // Each wedge's length is proportional to its share of the total; a small
  // gap is carved out of the visible stroke while offsets stay cumulative
  // over the full (un-trimmed) share so wedges don't drift apart.
  let cumulativeOffset = 0;
  const segmentArcs = segments.map(seg => {
    const rawLen = segmentsTotal > 0 ? (seg.value / segmentsTotal) * circumference : 0;
    const arcLen = Math.max(rawLen - GAP_PX, 0);
    const offset = cumulativeOffset;
    cumulativeOffset += rawLen;
    return { arcLen, offset };
  });

  const selected = selectedIndex !== null ? segments[selectedIndex] : null;
  const selectedPercent = selected && segmentsTotal > 0 ? Math.round((selected.value / segmentsTotal) * 100) : 0;

  const handleSegmentHover = (i: number) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setSelectedIndex(i);
  };

  const handleSegmentLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => setSelectedIndex(null), 60);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="text-base text-grey-dark uppercase">Total Contributed</span>
            <Icon name="info" className="size-[18px] text-grey" />
          </div>
          <span className="text-sm text-grey-dark">
            {poolStats
              ? `${poolStats.active} active · ${poolStats.completed} completed · ${poolStats.failed} failed`
              : '5 active · 28 completed · 3 failed'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              className={clsx(
                'px-4 py-3 rounded-[10px] text-sm font-medium tr-d-all',
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

      {/* Segmented ring */}
      <div className="grow-1 relative flex items-center justify-center mx-auto" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <g transform={`translate(${SIZE / 2}, ${SIZE / 2}) rotate(-90)`}>
            {segmentsTotal > 0 ? (
              segments.map((seg, i) => {
                const { arcLen, offset } = segmentArcs[i];
                const isSelected = selectedIndex === i;
                const isDimmed = selectedIndex !== null && !isSelected;
                return (
                  <circle
                    key={seg.label}
                    r={RADIUS}
                    cx={0}
                    cy={0}
                    fill="transparent"
                    stroke={isDimmed ? '#9DBDF9' : '#1D58E9'}
                    strokeWidth={STROKE}
                    strokeDasharray={`${arcLen} ${circumference - arcLen}`}
                    strokeDashoffset={-offset}
                    className="tr-d-all"
                    pointerEvents="visibleStroke"
                    onMouseEnter={() => handleSegmentHover(i)}
                    onMouseLeave={handleSegmentLeave}
                  />
                );
              })
            ) : (
              <circle
                r={RADIUS}
                cx={0}
                cy={0}
                fill="transparent"
                stroke="#9B9BA5"
                strokeWidth={STROKE}
              />
            )}
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 pointer-events-none">
          {selected ? (
            <>
              <span className="text-base font-medium text-label-tertiary">{selectedPercent}%</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[36px] font-semibold leading-[1.2] text-black">
                  {selected.value.toLocaleString()}
                </span>
                <Icon name="usdt" className="size-8" />
                <span className="text-[36px] font-semibold leading-[1.2] text-black">USDT</span>
              </div>
              <span className="text-base font-medium text-label-tertiary">
                {selected.label} · {selected.poolCount} {selected.poolCount === 1 ? 'pool' : 'pools'}
              </span>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="text-[36px] font-semibold leading-[1.2] text-black">{totalUsdt}</span>
                <Icon name="usdt" className="size-8" />
                <span className="text-[36px] font-semibold leading-[1.2] text-black">USDT</span>
              </div>
              <span className="text-base font-medium text-label-tertiary">{subtitle}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDonutChart;