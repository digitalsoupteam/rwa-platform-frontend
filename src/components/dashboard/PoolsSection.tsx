'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import { Title } from '@/components/ui';
import { GET_POOLS } from '@/lib/pool/operations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pool = any;

function formatAmount(raw: string | null | undefined): string {
  if (!raw) return '—';
  try {
    const val = Number(BigInt(raw) / BigInt(10) ** BigInt(15)) / 1000;
    return val.toLocaleString('en-US', { maximumFractionDigits: 2 });
  } catch {
    return '—';
  }
}

function formatPercent(raw: string | null | undefined): string {
  if (!raw) return '—';
  try {
    return (Number(raw) / 100).toFixed(2);
  } catch {
    return '—';
  }
}

function formatDate(ts: number | null | undefined): string {
  if (!ts) return '—';
  return new Date(ts * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const PoolCard: FC<{ pool: Pool; projectId: string }> = ({ pool }) => (
  <div className={'flex flex-col gap-3 p-4 border border-stroke-primary rounded-xl bg-white'}>
    <div className={'flex items-start justify-between gap-2'}>
      <div className={'font-semibold text-base truncate'}>{pool.name}</div>
      <span
        className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
          pool.poolAddress
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        }`}
      >
        {pool.poolAddress ? 'Deployed' : 'Pending'}
      </span>
    </div>
    <div className={'grid grid-cols-2 gap-x-4 gap-y-1 text-sm'}>
      <div className={'text-label-tertiary'}>Goal</div>
      <div className={'font-medium'}>{formatAmount(pool.expectedHoldAmount)} USDT</div>
      <div className={'text-label-tertiary'}>Profitability</div>
      <div className={'font-medium'}>{formatPercent(pool.rewardPercent)}%</div>
      <div className={'text-label-tertiary'}>Entry opens</div>
      <div className={'font-medium'}>{formatDate(pool.entryPeriodStart)}</div>
      <div className={'text-label-tertiary'}>Entry closes</div>
      <div className={'font-medium'}>{formatDate(pool.entryPeriodExpired)}</div>
    </div>
  </div>
);

const AddPoolDashCard: FC<{ projectId: string }> = ({ projectId }) => (
  <Link
    href={`/dashboard/add-pool?businessId=${projectId}`}
    className={
      'relative flex items-center justify-center p-4 rounded-xl w-full min-h-[160px] text-label-tertiary text-lg font-medium hover:text-blue transition-colors'
    }
  >
    <svg
      className={'absolute inset-0.5 w-[calc(100%-4px)] h-[calc(100%-4px)] pointer-events-none'}
      preserveAspectRatio={'none'}
    >
      <rect
        x={'1'}
        y={'1'}
        width={'100%'}
        height={'100%'}
        rx={'16'}
        ry={'16'}
        fill={'none'}
        stroke={'currentColor'}
        strokeWidth={'2'}
        strokeDasharray={'10 10'}
      />
    </svg>
    <span className={'inline-flex items-center gap-2'}>
      <svg width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} stroke={'currentColor'} strokeWidth={'2'} strokeLinecap={'round'} strokeLinejoin={'round'}>
        <line x1={'12'} y1={'5'} x2={'12'} y2={'19'} />
        <line x1={'5'} y1={'12'} x2={'19'} y2={'12'} />
      </svg>
      Add pool
    </span>
  </Link>
);

interface PoolsSectionProps {
  projectId: string;
}

const PoolsSection: FC<PoolsSectionProps> = ({ projectId }) => {
  const { data } = useQuery(GET_POOLS, {
    variables: { input: { filter: { businessId: projectId } } },
    skip: !projectId,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pools: Pool[] = (data as any)?.getPools ?? [];

  return (
    <>
      <Title className={'mb-6'} size={'xs'} level={2}>Pools</Title>

      {pools.length === 0 ? (
        <div className={'max-w-[280px]'}>
          <AddPoolDashCard projectId={projectId} />
        </div>
      ) : (
        <div className={'grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
          {pools.map((pool: Pool) => (
            <PoolCard key={pool.id} pool={pool} projectId={projectId} />
          ))}
          <AddPoolDashCard projectId={projectId} />
        </div>
      )}
    </>
  );
};

export default PoolsSection;