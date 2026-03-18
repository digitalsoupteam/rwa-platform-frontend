'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import { ButtonBorderDash, Title } from '@/components/ui';
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
      <Title className={'mb-6'} size={'xs'} level={2}>
        Pools
      </Title>

      {pools.length === 0 ? (
        <div>
          <ButtonBorderDash
            href={`/dashboard/add-pool?businessId=${projectId}`}
            className={'block w-full max-w-110 min-h-74'}
          >
            Add pool
          </ButtonBorderDash>
        </div>
      ) : (
        <div className={'grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
          {pools.map((pool: Pool) => (
            <PoolCard key={pool.id} pool={pool} projectId={projectId} />
          ))}
          <ButtonBorderDash
            href={`/dashboard/add-pool?businessId=${projectId}`}
            className={'block w-full max-w-110 min-h-74'}
          >
            Add pool
          </ButtonBorderDash>
        </div>
      )}
    </>
  );
};

export default PoolsSection;