'use client';

import React, { FC } from 'react';
import { useQuery } from '@apollo/client/react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button, ButtonBorderDash, Card, Title } from '@/components/ui';
import { GET_POOLS } from '@/lib/pool/operations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pool = any;

function formatAmount(raw: string | null | undefined): string {
  if (!raw) return '0';
  try {
    const val = Number(BigInt(raw) / BigInt(10) ** BigInt(15)) / 1000;
    return val.toLocaleString('en-US', { maximumFractionDigits: 2 });
  } catch {
    return '0';
  }
}

function formatPercent(raw: string | null | undefined): string {
  if (!raw) return '0';
  try {
    return (Number(raw) / 100).toFixed(2);
  } catch {
    return '0';
  }
}

function formatDate(ts: number | null | undefined): string {
  if (!ts) return '—';
  return new Date(ts * 1000).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function getPoolStatus(pool: Pool): string {
  if (pool.paused) return 'Paused';
  if (pool.isFullyReturned) return 'Completed';
  const now = Date.now() / 1000;
  if (pool.poolAddress) {
    if (pool.entryPeriodStart && pool.entryPeriodExpired) {
      if (now >= pool.entryPeriodStart && now <= pool.entryPeriodExpired) return 'Collecting';
    }
    return 'Active';
  }
  return 'Pending';
}

function getProgressPercent(pool: Pool): number {
  try {
    const current = pool.realHoldReserve ? Number(BigInt(pool.realHoldReserve)) : 0;
    const target = pool.expectedHoldAmount ? Number(BigInt(pool.expectedHoldAmount)) : 0;
    if (!target) return 0;
    return Math.min(100, (current / target) * 100);
  } catch {
    return 0;
  }
}

function getPoolPrice(pool: Pool): string {
  try {
    if (pool.virtualHoldReserve && pool.virtualRwaReserve) {
      const hold = Number(BigInt(pool.virtualHoldReserve) / BigInt(10) ** BigInt(15)) / 1000;
      const rwa = Number(BigInt(pool.virtualRwaReserve) / BigInt(10) ** BigInt(15)) / 1000;
      if (rwa > 0) return (hold / rwa).toFixed(2);
    }
    if (pool.expectedHoldAmount && pool.expectedRwaAmount) {
      const hold = Number(BigInt(pool.expectedHoldAmount) / BigInt(10) ** BigInt(15)) / 1000;
      const rwa = Number(BigInt(pool.expectedRwaAmount) / BigInt(10) ** BigInt(15)) / 1000;
      if (rwa > 0) return (hold / rwa).toFixed(2);
    }
  } catch {
    // fall through
  }
  return '—';
}

const CHAIN_NAMES: Record<string, string> = {
  '97': 'BSC Testnet',
  '56': 'BSC',
};

function getNetworkName(chainId: string | null | undefined): string {
  if (!chainId) return 'BSC Testnet';
  return CHAIN_NAMES[chainId] ?? `Chain ${chainId}`;
}

const PoolCard: FC<{ pool: Pool; companyId: string; projectId: string }> = ({ pool, companyId, projectId }) => {
  const isPending = !pool.poolAddress;
  const status = getPoolStatus(pool);
  const progress = getProgressPercent(pool);
  const price = getPoolPrice(pool);
  const token = getNetworkName(pool.chainId);
  const href = `/dashboard/my-companies/${companyId}/projects/${projectId}/pool/${pool.id}`;

  return (
    <Link href={href} className="block">
    <Card size={'sm'} color={'greyLight'} className={isPending ? 'opacity-50' : undefined}>
      <div className={'mb-4'}>
        <div className={'font-bold text-base truncate'}>{pool.name}</div>
      </div>

      <div className={'mb-2'}>
        <div className={'relative overflow-hidden rounded-lg bg-blue-dim h-8 flex items-center justify-center'}>
          <div
            className={'z-0 absolute top-0 left-0 bottom-0 bg-blue-accent'}
            style={{ width: `${progress}%` }}
          />
          <div className={'z-1 relative text-black text-sm font-bold'}>
            {formatAmount(pool.realHoldReserve)} / {formatAmount(pool.expectedHoldAmount)}
          </div>
        </div>
      </div>

      <div className={'flex items-center justify-between text-sm text-grey-dark mb-4'}>
        <span>Status: {status}</span>
        <span>Closes: {formatDate(pool.entryPeriodExpired)}</span>
      </div>

      <div className={'border-t border-grey/40 pt-4'}>
        <div className={'flex items-start justify-between gap-2'}>
          <div>
            <div className={'text-black text-xl font-bold mb-1'}>
              {price} HOLD{' '}
              <span className={'text-grey-dark text-base font-normal'}>/ 1 RWA</span>
            </div>
            <div className={'py-1 px-3 rounded-[20px] bg-blue-dim w-fit text-sm'}>
              ~{formatPercent(pool.rewardPercent)}% monthly profit
            </div>
          </div>
          <div className={'py-1 px-3 rounded-[20px] bg-blue-dim text-blue text-sm font-medium shrink-0'}>
            {token}
          </div>
        </div>
      </div>
    </Card>
    </Link>
  );
};

interface PoolsSectionProps {
  projectId: string;
}

const PoolsSection: FC<PoolsSectionProps> = ({ projectId }) => {
  const params = useParams();
  const companyId = params.id as string;

  const { data } = useQuery(GET_POOLS, {
    variables: { input: { filter: { businessId: projectId } } },
    skip: !projectId,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pools: Pool[] = (data as any)?.getPools ?? [];

  return (
    <>
      <div className={'flex items-center justify-between mb-6'}>
        <Title size={'xs'} level={2}>Pools</Title>
        {pools.length > 0 && (
          <Button visualType={'quaternary'} href={`/dashboard/add-pool?businessId=${projectId}`}>
            + Add pool
          </Button>
        )}
      </div>

      {pools.length === 0 ? (
        <div className={'max-w-110'}>
          <ButtonBorderDash href={`/dashboard/add-pool?businessId=${projectId}`} className={'min-h-74.5'}>
            Add pool
          </ButtonBorderDash>
        </div>
      ) : (
        <div className={'grid grid-cols-2 gap-4'}>
          {pools.map((pool: Pool) => (
            <PoolCard key={pool.id} pool={pool} companyId={companyId} projectId={projectId} />
          ))}
        </div>
      )}
    </>
  );
};

export default PoolsSection;
