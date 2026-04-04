'use client';

import React, { FC, useMemo, useState, useRef, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_OHLC_PRICE_DATA } from '@/lib/pool/operations';

export type TimeFilter = '1H' | '1D' | '1W' | '1M' | '6M' | '1Y';

// ── Chart layout constants ────────────────────────────────────────────────────
// No left gutter — Y labels are rendered as absolute HTML over the SVG
const VB_W = 800;
const VB_H = 280;
const PAD_L = 0;
const PAD_R = 0;
const PAD_T = 16;
const PAD_B = 8;
const CHART_W = VB_W - PAD_L - PAD_R;
const CHART_H = VB_H - PAD_T - PAD_B;

// ── Filter → OHLC interval + window ──────────────────────────────────────────
const FILTER_CONFIG: Record<TimeFilter, { interval: string; seconds: number }> = {
  '1H':  { interval: '1m',  seconds: 3600 },
  '1D':  { interval: '30m', seconds: 86400 },
  '1W':  { interval: '2h',  seconds: 604800 },
  '1M':  { interval: '6h',  seconds: 2592000 },
  '6M':  { interval: '1d',  seconds: 15552000 },
  '1Y':  { interval: '1w',  seconds: 31536000 },
};


// Prices come from the backend in 18-decimal wei format
function parseWeiPrice(raw: string): number {
  try {
    return Number(BigInt(raw) / BigInt(10) ** BigInt(15)) / 1000;
  } catch {
    return 0;
  }
}

// ── Smooth Catmull-Rom path ───────────────────────────────────────────────────
function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return '';
  const T = 0.35;
  const d: string[] = [`M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1[0] + (p2[0] - p0[0]) * T;
    const cp1y = p1[1] + (p2[1] - p0[1]) * T;
    const cp2x = p2[0] - (p3[0] - p1[0]) * T;
    const cp2y = p2[1] - (p3[1] - p1[1]) * T;
    d.push(`C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`);
  }
  return d.join(' ');
}

// ── Formatters ────────────────────────────────────────────────────────────────
function fmtYLabel(price: number): string {
  return price.toFixed(4).replace('.', ',') + ' USDT';
}

function fmtTooltipPrice(price: number): string {
  return price.toFixed(4) + ' USDT';
}

function fmtTooltipDate(ts: number, filter: TimeFilter): string {
  const d = new Date(ts * 1000);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  if (filter === '1H' || filter === '1D') {
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}, ${hh}:${mm}`;
  }
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function fmtXLabel(ts: number, filter: TimeFilter): string {
  const d = new Date(ts * 1000);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  if (filter === '1H' || filter === '1D') return `${hh}:${mm}`;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

// ── Component ─────────────────────────────────────────────────────────────────
interface PriceChartProps {
  poolAddress: string;
  filter: TimeFilter;
  fallback?: React.ReactNode;
}

const PriceChart: FC<PriceChartProps> = ({ poolAddress, filter, fallback = null }) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const now = useMemo(() => Math.floor(Date.now() / 1000), []);
  const { seconds, interval } = FILTER_CONFIG[filter];
  const startTime = now - seconds;

  const { data: ohlcQueryData, loading: ohlcLoading } = useQuery(GET_OHLC_PRICE_DATA, {
    variables: { input: { poolAddress, interval, startTime, endTime: now } },
    skip: !poolAddress,
    fetchPolicy: 'cache-and-network',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ohlcRaw: { timestamp: number; close: string }[] = (ohlcQueryData as any)?.getOhlcPriceData ?? [];
  const ohlcData = useMemo(
    () => ohlcRaw.map(d => ({ timestamp: d.timestamp, price: parseWeiPrice(d.close) })).filter(d => d.price > 0),
    [ohlcRaw]
  );

  // When the selected period is empty always fall back to 1Y (1w candles).
  // This covers any gap — if 1H/1D/1M have no trades but 1W does, 1Y will too.
  const skipFallback = !poolAddress || ohlcLoading || ohlcData.length > 0 || filter === '1Y';
  const { data: fallbackQueryData, loading: fallbackLoading } = useQuery(GET_OHLC_PRICE_DATA, {
    variables: { input: { poolAddress, interval: '1w', startTime: now - FILTER_CONFIG['1Y'].seconds, endTime: now } },
    skip: skipFallback,
    fetchPolicy: 'cache-and-network',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fallbackRaw: { timestamp: number; close: string }[] = (fallbackQueryData as any)?.getOhlcPriceData ?? [];
  const fallbackData = useMemo(
    () => fallbackRaw.map(d => ({ timestamp: d.timestamp, price: parseWeiPrice(d.close) })).filter(d => d.price > 0),
    [fallbackRaw]
  );

  const loading = ohlcLoading || fallbackLoading;
  const data = ohlcData.length > 0 ? ohlcData : fallbackData;

  const pts = useMemo<[number, number][]>(() => {
    if (data.length === 0) return [];
    // Pad to at least 2 points so a single candle renders as a horizontal line
    const padded = data.length === 1 ? [data[0], data[0]] : data;
    const prices = padded.map(d => d.price);
    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);
    const rangeP = maxP - minP || 1;
    return padded.map((d, i) => [
      PAD_L + (i / (padded.length - 1)) * CHART_W,
      PAD_T + (1 - (d.price - minP) / rangeP) * CHART_H,
    ]);
  }, [data]);

  const path = useMemo(() => smoothPath(pts), [pts]);

  const prices = data.map(d => d.price);
  const minP = prices.length ? Math.min(...prices) : 0;
  const maxP = prices.length ? Math.max(...prices) : 1;

  const toY = (p: number) => PAD_T + (1 - (p - minP) / (maxP - minP || 1)) * CHART_H;

  const yLevels = [maxP, (maxP + minP) / 2, minP];

  const xCount = 9;
  const xLabels = data.length >= 1
    ? Array.from({ length: xCount }, (_, i) => {
        const idx = Math.round((i / (xCount - 1)) * (data.length - 1));
        return {
          x: PAD_L + (idx / (data.length - 1)) * CHART_W,
          label: fmtXLabel(data[idx].timestamp, filter),
        };
      })
    : [];

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg || data.length < 1) return;
    const rect = svg.getBoundingClientRect();
    const svgX = (e.clientX - rect.left) * (VB_W / rect.width);
    const idx = Math.round(((svgX - PAD_L) / CHART_W) * (data.length - 1));
    setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)));
  }, [data.length]);

  if (loading && data.length === 0) {
    return <div className='flex items-center justify-center py-16 text-sm text-label-tertiary'>Loading…</div>;
  }

  if (!loading && data.length === 0) {
    return <>{fallback}</>;
  }

  // Need pts to be ready before rendering SVG
  if (pts.length === 0) return null;

  const hoverPt = hoverIdx != null && pts[hoverIdx] ? pts[hoverIdx] : null;
  const hoverDatum = hoverIdx != null ? data[hoverIdx] : null;

  // Tooltip position as % of container — flip horizontally past 70%, flip vertically past 70%
  const tipPctX = hoverPt ? hoverPt[0] / VB_W : 0;
  const tipPctY = hoverPt ? hoverPt[1] / VB_H : 0;
  const tipTransform = [
    tipPctX > 0.7 ? 'translateX(calc(-100% - 10px))' : 'translateX(10px)',
    tipPctY > 0.7 ? 'translateY(calc(-100% - 4px))' : 'translateY(4px)',
  ].join(' ');

  return (
    <>
    {/* Chart area — relative container so Y labels and tooltip can be absolutely positioned */}
    <div className='relative w-full overflow-visible' style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className='absolute inset-0 w-full h-full overflow-visible'
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIdx(null)}
        style={{ cursor: 'crosshair' }}
      >
        {/* Horizontal dashed grid lines */}
        {yLevels.slice(1).map((p, i) => (
          <line key={i}
            x1={0} y1={toY(p)} x2={VB_W} y2={toY(p)}
            stroke='#E8ECF2' strokeWidth='1' strokeDasharray='4 4'
          />
        ))}

        {/* Price line */}
        <path d={path} fill='none' stroke='#1ABF97' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />

        {/* Hover: crosshair + dot only (tooltip is HTML) */}
        {hoverPt && hoverDatum && (
          <>
            <line x1={hoverPt[0]} y1={PAD_T} x2={hoverPt[0]} y2={PAD_T + CHART_H}
              stroke='#9B9BA5' strokeWidth='1' strokeDasharray='4 4' />
            <line x1={0} y1={hoverPt[1]} x2={VB_W} y2={hoverPt[1]}
              stroke='#9B9BA5' strokeWidth='1' strokeDasharray='4 4' />
            <circle cx={hoverPt[0]} cy={hoverPt[1]} r='6' fill='#1ABF97' />
            <circle cx={hoverPt[0]} cy={hoverPt[1]} r='3' fill='white' />
          </>
        )}
      </svg>

      {/* Y-axis labels — absolute HTML on top of the SVG, line goes under them */}
      {yLevels.map((p, i) => (
        <div
          key={i}
          className='absolute left-0 text-xs text-[#9B9BA5] pointer-events-none leading-none'
          style={{ top: `${(toY(p) / VB_H) * 100}%`, transform: 'translateY(-100%)' }}
        >
          {fmtYLabel(p)}
        </div>
      ))}

      {/* HTML tooltip — z-50 so it's above Y labels, crosshair, everything */}
      {hoverPt && hoverDatum && (
        <div
          className='absolute z-50 pointer-events-none bg-white rounded-xl border border-[#E8ECF2] shadow-md px-3 py-2 whitespace-nowrap'
          style={{
            left: `${tipPctX * 100}%`,
            top: `${tipPctY * 100}%`,
            transform: tipTransform,
          }}
        >
          <p className='text-sm font-semibold text-[#1D1D1F]'>{fmtTooltipPrice(hoverDatum.price)}</p>
          <p className='text-xs text-[#9B9BA5] mt-0.5'>{fmtTooltipDate(hoverDatum.timestamp, filter)}</p>
        </div>
      )}
    </div>

    <div className='pt-3 border-t border-[#C2D0EB] flex items-center justify-between text-sm text-label-tertiary'>
      {xLabels.map((l, i) => (
        <span key={i} className={i > 0 && i < xLabels.length - 1 ? 'max-lg:hidden' : ''}>
          {l.label}
        </span>
      ))}
    </div>
    </>
  );
};

export default PriceChart;
