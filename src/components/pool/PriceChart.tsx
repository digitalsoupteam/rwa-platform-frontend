'use client';

import React, { FC, useMemo, useRef, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { createChart, CandlestickSeries, HistogramSeries, ColorType, CrosshairMode, LineStyle } from 'lightweight-charts';
import { GET_OHLC_PRICE_DATA, GET_VOLUME_DATA } from '@/lib/pool/operations';

export type TimeFilter = '1H' | '1D' | '1W' | '1M' | '6M' | '1Y';

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

// ── Component ─────────────────────────────────────────────────────────────────
interface PriceChartProps {
  poolAddress: string;
  filter: TimeFilter;
  fallback?: React.ReactNode;
}

const PriceChart: FC<PriceChartProps> = ({ poolAddress, filter, fallback = null }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const candleSeriesRef = useRef<ReturnType<typeof createChart>['addSeries'] | null>(null);
  const volumeSeriesRef = useRef<ReturnType<typeof createChart>['addSeries'] | null>(null);
  const [ready, setReady] = useState(false);

  const now = useMemo(() => Math.floor(Date.now() / 1000), []);
  const { seconds, interval } = FILTER_CONFIG[filter];
  const startTime = now - seconds;

  // ── OHLC data ──────────────────────────────────────────────────────────────
  const { data: ohlcQueryData, loading: ohlcLoading } = useQuery(GET_OHLC_PRICE_DATA, {
    variables: { input: { poolAddress, interval, startTime, endTime: now } },
    skip: !poolAddress,
    fetchPolicy: 'cache-and-network',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ohlcRaw: { timestamp: number; open: string; high: string; low: string; close: string }[] = (ohlcQueryData as any)?.getOhlcPriceData ?? [];
  const ohlcData = useMemo(
    () => ohlcRaw
      .map(d => ({
        time: d.timestamp as any,
        open: parseWeiPrice(d.open),
        high: parseWeiPrice(d.high),
        low: parseWeiPrice(d.low),
        close: parseWeiPrice(d.close),
      }))
      .filter(d => d.close > 0)
      .sort((a, b) => (a.time as number) - (b.time as number)),
    [ohlcRaw]
  );

  // ── Volume data ────────────────────────────────────────────────────────────
  const { data: volumeQueryData } = useQuery(GET_VOLUME_DATA, {
    variables: { input: { poolAddress, interval, startTime, endTime: now } },
    skip: !poolAddress,
    fetchPolicy: 'cache-and-network',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const volumeRaw: { timestamp: number; mintVolume: string; burnVolume: string }[] = (volumeQueryData as any)?.getVolumeData ?? [];
  const volumeData = useMemo(
    () => volumeRaw
      .map(d => {
        const mint = Number(BigInt(d.mintVolume || '0') / BigInt(10) ** BigInt(15)) / 1000;
        const burn = Number(BigInt(d.burnVolume || '0') / BigInt(10) ** BigInt(15)) / 1000;
        const total = mint + burn;
        return {
          time: d.timestamp as any,
          value: total,
          color: mint >= burn ? '#26a69a' : '#ef5350',
        };
      })
      .filter(d => d.value > 0)
      .sort((a, b) => (a.time as number) - (b.time as number)),
    [volumeRaw]
  );

  // ── Fallback when empty ────────────────────────────────────────────────────
  const skipFallback = !poolAddress || ohlcLoading || ohlcData.length > 0 || filter === '1Y';
  const { data: fallbackQueryData, loading: fallbackLoading } = useQuery(GET_OHLC_PRICE_DATA, {
    variables: { input: { poolAddress, interval: '1w', startTime: now - FILTER_CONFIG['1Y'].seconds, endTime: now } },
    skip: skipFallback,
    fetchPolicy: 'cache-and-network',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fallbackRaw: { timestamp: number; open: string; high: string; low: string; close: string }[] = (fallbackQueryData as any)?.getOhlcPriceData ?? [];
  const fallbackData = useMemo(
    () => fallbackRaw
      .map(d => ({
        time: d.timestamp as any,
        open: parseWeiPrice(d.open),
        high: parseWeiPrice(d.high),
        low: parseWeiPrice(d.low),
        close: parseWeiPrice(d.close),
      }))
      .filter(d => d.close > 0)
      .sort((a, b) => (a.time as number) - (b.time as number)),
    [fallbackRaw]
  );

  const loading = ohlcLoading || fallbackLoading;
  const candleData = ohlcData.length > 0 ? ohlcData : fallbackData;

  // ── Init chart ─────────────────────────────────────────────────────────────
  // Re-run when data becomes available — early returns above prevent the
  // container from being in the DOM on first render, so the effect must
  // re-fire once candleData is non-empty and the container is actually mounted.
  const hasData = candleData.length > 0;
  useEffect(() => {
    if (!chartContainerRef.current || !hasData) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#9B9BA5',
        fontSize: 11,
      },
      grid: {
        vertLines: { color: '#E8ECF2' },
        horzLines: { color: '#E8ECF2' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 1,
          color: '#2962FF',
          style: LineStyle.Dashed,
        },
        horzLine: {
          width: 1,
          color: '#2962FF',
          style: LineStyle.Dashed,
        },
      },
      rightPriceScale: {
        borderColor: '#E8ECF2',
      },
      timeScale: {
        borderColor: '#E8ECF2',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: false,
      handleScale: false,
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: true,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      borderUpColor: '#26a69a',
      borderDownColor: '#ef5350',
      priceFormat: {
        type: 'price',
        precision: 4,
        minMove: 0.0001,
      },
    });

    candleSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.3,
      },
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: '',
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.7,
        bottom: 0,
      },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries as any;
    volumeSeriesRef.current = volumeSeries as any;
    setReady(true);

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.offsetWidth,
          height: chartContainerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
      volumeSeriesRef.current = null;
      setReady(false);
    };
  }, [hasData]);

  // ── Update data when it changes ────────────────────────────────────────────
  useEffect(() => {
    if (!ready || !candleSeriesRef.current || !volumeSeriesRef.current) return;
    if (candleData.length > 0) {
      (candleSeriesRef.current as any).setData(candleData);
    }
    if (volumeData.length > 0) {
      (volumeSeriesRef.current as any).setData(volumeData);
    }
  }, [candleData, volumeData, ready]);

  // ── Fit content ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (ready && chartRef.current && candleData.length > 0) {
      chartRef.current.timeScale().fitContent();
    }
  }, [candleData, ready]);

  // ── Loading / empty states ─────────────────────────────────────────────────
  if (loading && candleData.length === 0) {
    return <div className='flex items-center justify-center py-16 text-sm text-label-tertiary'>Loading…</div>;
  }

  if (!loading && candleData.length === 0) {
    return <>{fallback}</>;
  }

  return (
    <div className='w-full'>
      <div ref={chartContainerRef} className='w-full' style={{ height: 400 }} />
    </div>
  );
};

export default PriceChart;
