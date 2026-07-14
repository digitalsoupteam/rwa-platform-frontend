'use client';

import React, { FC, useMemo, useState } from 'react';
import clsx from 'clsx';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';
import { useQuery } from '@apollo/client/react';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Icon, Button, Pagination } from '@/components/ui';
import { PortfolioDonutChart, PortfolioStatCard, PortfolioPoolRow } from '@/components/portfolio';
import type { PortfolioPool, DonutSegment } from '@/components/portfolio';
import {
  GET_BALANCES,
  GET_POOLS_FOR_PORTFOLIO,
  GET_POOL_TRANSACTIONS_FOR_PORTFOLIO,
} from '@/lib/portfolio/operations';
import type { TokenBalance, Pool, PoolTransaction } from '@/gql/graphql';

// ── Constants ─────────────────────────────────────────────────────────────────

type TabKey = 'all' | 'payouts' | 'favourites';
type SortKey = 'pool' | 'rating' | 'amount' | 'share' | 'returned' | 'value' | 'profit';

const ROWS_PER_PAGE = 11;

const TABLE_COLS: { key: SortKey; label: string; width: string }[] = [
  { key: 'pool', label: 'Pool', width: 'w-[200px]' },
  { key: 'rating', label: 'AI Rating', width: 'flex-1' },
  { key: 'amount', label: 'Amount (USDT)', width: 'flex-1' },
  { key: 'share', label: 'Pool share', width: 'flex-1' },
  { key: 'returned', label: 'Returned (USDT)', width: 'flex-1' },
  { key: 'value', label: 'Current value (USDT)', width: 'flex-1' },
  { key: 'profit', label: 'Profit', width: 'flex-1' },
];

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All pools' },
  { key: 'payouts', label: 'Payouts' },
  { key: 'favourites', label: 'Favourites' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function safeFloat(v: string | null | undefined): number {
  if (!v) return 0;
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
}

// HOLD (USDT) amounts are indexed as raw 18-decimal wei strings, unlike RWA
// amounts which are plain integers — see BuyTokenWidget/pool pages for the
// same convention.
function holdToNum(v: string | null | undefined): number {
  if (!v) return 0;
  try {
    return Number(formatUnits(BigInt(v), 18));
  } catch {
    return 0;
  }
}

function deriveStatus(pool: Pool): PortfolioPool['status'] {
  const now = Date.now() / 1000;
  if (pool.isFullyReturned) return 'completed';
  if (pool.isTargetReached) return 'paying_out';
  if (pool.entryPeriodExpired && now > pool.entryPeriodExpired) return 'failed';
  return 'collecting';
}

function fmtStat(n: number, decimals = 2): string {
  if (!isFinite(n) || n === 0) return '0';
  const sign = n > 0 ? '+' : '';
  return sign + n.toLocaleString('en-US', { maximumFractionDigits: decimals });
}

// ── Derivation ────────────────────────────────────────────────────────────────

interface PoolDerivedData {
  pool: PortfolioPool;
  currentValue: number;
  realizedPNL: number;
  unrealizedPNL: number;
  totalInvested: number;
  status: PortfolioPool['status'];
}

function derivePortfolioData(
  balances: TokenBalance[],
  pools: Pool[],
  txns: PoolTransaction[],
): {
  poolRows: PoolDerivedData[];
  industrySegments: DonutSegment[];
  projectSegments: DonutSegment[];
  totalContributed: number;
  realizedPNL: number;
  unrealizedPNL: number;
  avgROI: number;
  tradingEarnings: number;
  claimableAmount: number;
  poolStats: { active: number; completed: number; failed: number };
} {
  const poolByAddress = new Map<string, Pool>();
  for (const p of pools) {
    if (p.poolAddress) poolByAddress.set(p.poolAddress.toLowerCase(), p);
  }

  const txnsByPool = new Map<string, PoolTransaction[]>();
  for (const tx of txns) {
    const key = tx.poolAddress.toLowerCase();
    if (!txnsByPool.has(key)) txnsByPool.set(key, []);
    txnsByPool.get(key)!.push(tx);
  }

  let totalContributed = 0;
  let totalRealizedPNL = 0;
  let totalUnrealizedPNL = 0;
  let totalInvestedAll = 0;
  let tradingEarnings = 0;
  let claimableAmount = 0;

  const industryMap = new Map<string, { value: number; count: number }>();
  const projectMap = new Map<string, { value: number; count: number }>();
  const poolStats = { active: 0, completed: 0, failed: 0 };

  const poolRows: PoolDerivedData[] = [];

  for (const tx of txns) {
    tradingEarnings += holdToNum(tx.bonusAmount);
  }

  for (const bal of balances) {
    const pool = poolByAddress.get(bal.poolAddress.toLowerCase());
    if (!pool) continue;

    const vHold = holdToNum(pool.virtualHoldReserve);
    const vRwa = safeFloat(pool.virtualRwaReserve);
    const price = vRwa > 0 ? vHold / vRwa : 0;
    const currentValue = bal.balance * price;

    const awaitingRwa = safeFloat(pool.awaitingRwaAmount);
    const poolSharePct = awaitingRwa > 0 ? (bal.balance / awaitingRwa) * 100 : 0;

    const poolTxns = txnsByPool.get(bal.poolAddress.toLowerCase()) ?? [];
    const mintTxns = poolTxns.filter(t => t.transactionType === 'MINT');
    const burnTxns = poolTxns.filter(t => t.transactionType === 'BURN');

    const totalBuyHold = mintTxns.reduce((s, t) => s + holdToNum(t.holdAmount), 0);
    const totalSellHold = burnTxns.reduce((s, t) => s + holdToNum(t.holdAmount), 0);
    const totalBuyRwa = mintTxns.reduce((s, t) => s + safeFloat(t.rwaAmount), 0);
    const avgBuyPrice = totalBuyRwa > 0 ? totalBuyHold / totalBuyRwa : price;

    const realizedPNL = totalSellHold - burnTxns.reduce((s, t) => s + safeFloat(t.rwaAmount), 0) * avgBuyPrice;
    const unrealizedPNL = currentValue - bal.balance * avgBuyPrice;

    const profitNum = totalBuyHold > 0
      ? ((currentValue + totalSellHold - totalBuyHold) / totalBuyHold) * 100
      : 0;
    const profitStr = totalBuyHold > 0 ? `${profitNum >= 0 ? '+' : ''}${profitNum.toFixed(1)}%` : '—';

    const status = deriveStatus(pool);
    const collected = holdToNum(pool.realHoldReserve);
    const goal = holdToNum(pool.expectedHoldAmount);

    poolRows.push({
      pool: {
        id: pool.id,
        name: pool.name,
        aiRating: pool.riskScore ?? 0,
        amount: totalBuyHold,
        poolShare: `${poolSharePct.toFixed(1)}%`,
        returned: totalSellHold,
        currentValue,
        profit: profitStr,
        status,
        collected,
        goal,
      },
      currentValue,
      realizedPNL,
      unrealizedPNL,
      totalInvested: totalBuyHold,
      status,
    });

    totalContributed += currentValue;
    totalRealizedPNL += realizedPNL;
    totalUnrealizedPNL += unrealizedPNL;
    totalInvestedAll += totalBuyHold;

    if (status === 'collecting' || status === 'paying_out') claimableAmount += currentValue;
    if (status === 'completed') poolStats.completed++;
    else if (status === 'failed') poolStats.failed++;
    else poolStats.active++;

    // Donut — industry
    const industry = (pool.tags && pool.tags.length > 0) ? pool.tags[0] : 'Other';
    const ind = industryMap.get(industry) ?? { value: 0, count: 0 };
    industryMap.set(industry, { value: ind.value + currentValue, count: ind.count + 1 });

    // Donut — project
    const proj = projectMap.get(pool.name) ?? { value: 0, count: 0 };
    projectMap.set(pool.name, { value: proj.value + currentValue, count: proj.count + 1 });
  }

  const avgROI = totalInvestedAll > 0
    ? ((totalRealizedPNL + totalUnrealizedPNL) / totalInvestedAll) * 100
    : 0;

  const industrySegments: DonutSegment[] = Array.from(industryMap.entries()).map(([label, d]) => ({
    label,
    value: Math.round(d.value),
    poolCount: d.count,
  }));

  const projectSegments: DonutSegment[] = Array.from(projectMap.entries()).map(([label, d]) => ({
    label,
    value: Math.round(d.value),
    poolCount: d.count,
  }));

  return {
    poolRows,
    industrySegments,
    projectSegments,
    totalContributed,
    realizedPNL: totalRealizedPNL,
    unrealizedPNL: totalUnrealizedPNL,
    avgROI,
    tradingEarnings,
    claimableAmount,
    poolStats,
  };
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

const SkeletonRow = () => (
  <div className="bg-bg-primary border border-stroke-primary h-[52px] animate-pulse bg-bg-tertiary/40" />
);

// ── Component ─────────────────────────────────────────────────────────────────

const Portfolio: FC = () => {
  const { address } = useAccount();

  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [chartFilter, setChartFilter] = useState<'industry' | 'projects' | 'countries'>('industry');
  const [sortKey, setSortKey] = useState<SortKey>('pool');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  // owner/userAddress are stored checksummed on the backend (straight from
  // decoded blockchain events) — do not lowercase, or the exact-match filter
  // silently returns nothing.
  const wallet = address ?? '';

  // Query 1: user's token balances
  const { data: balancesData, loading: balancesLoading } = useQuery(GET_BALANCES, {
    variables: { input: { filter: { owner: wallet } } },
    skip: !wallet,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const balances: TokenBalance[] = (balancesData as any)?.getBalances ?? [];
  const poolAddresses = useMemo(() => balances.map(b => b.poolAddress), [balances]);

  // Query 2: pool metadata for those addresses (fires after balances resolve)
  const { data: poolsData, loading: poolsLoading } = useQuery(GET_POOLS_FOR_PORTFOLIO, {
    variables: { input: { filter: { poolAddress: { $in: poolAddresses } } } },
    skip: !wallet || poolAddresses.length === 0,
  });

  // Query 3: user's trading transactions (parallel with query 1)
  const { data: txnsData, loading: txnsLoading } = useQuery(GET_POOL_TRANSACTIONS_FOR_PORTFOLIO, {
    variables: { input: { filter: { userAddress: wallet } } },
    skip: !wallet,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pools: Pool[] = (poolsData as any)?.getPools ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const txns: PoolTransaction[] = (txnsData as any)?.getPoolTransactions ?? [];

  const isLoading = balancesLoading || poolsLoading || txnsLoading;

  // Derive everything
  const derived = useMemo(
    () => derivePortfolioData(balances, pools, txns),
    [balances, pools, txns],
  );

  // Tab filter
  const tabFiltered = useMemo(() => {
    const rows = derived.poolRows;
    if (activeTab === 'payouts') return rows.filter(r => r.status === 'paying_out');
    if (activeTab === 'favourites') return [];
    return rows;
  }, [derived.poolRows, activeTab]);

  // Sort
  const sorted = useMemo(() => {
    const rows = [...tabFiltered];
    rows.sort((a, b) => {
      let av = 0, bv = 0;
      switch (sortKey) {
        case 'pool':     av = a.pool.name.localeCompare(b.pool.name); return sortAsc ? av : -av;
        case 'rating':   av = a.pool.aiRating; bv = b.pool.aiRating; break;
        case 'amount':   av = a.pool.amount; bv = b.pool.amount; break;
        case 'share':    av = parseFloat(a.pool.poolShare); bv = parseFloat(b.pool.poolShare); break;
        case 'returned': av = a.pool.returned; bv = b.pool.returned; break;
        case 'value':    av = a.currentValue; bv = b.currentValue; break;
        case 'profit':   av = a.pool.amount > 0 ? (a.currentValue + a.pool.returned - a.pool.amount) / a.pool.amount : 0;
                         bv = b.pool.amount > 0 ? (b.currentValue + b.pool.returned - b.pool.amount) / b.pool.amount : 0; break;
      }
      return sortAsc ? av - bv : bv - av;
    });
    return rows;
  }, [tabFiltered, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / ROWS_PER_PAGE));
  const paginated = sorted.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const chartView = useMemo(() => {
    const filter = chartFilter as 'industry' | 'projects';
    const segments = filter === 'projects' ? derived.projectSegments : derived.industrySegments;
    const total = segments.reduce((s, seg) => s + seg.value, 0);
    const uniqueLabels = segments.length;
    const label = filter === 'projects' ? 'projects' : 'industries';
    return {
      totalUsdt: Math.round(total).toLocaleString('en-US'),
      subtitle: `${uniqueLabels} ${label} · ${derived.poolRows.length} pools`,
      segments,
    };
  }, [chartFilter, derived]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(prev => !prev);
    else { setSortKey(key); setSortAsc(true); }
    setPage(1);
  };

  return (
    <DashboardLayout>
      <section className="py-8 md:py-12">
        <Wrapper>
          {/* ── Page title ── */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[36px] font-semibold leading-[1.2] text-black">Portfolio</h1>
            <Button visualType="quaternary" className="flex items-center gap-2 h-[46px] rounded-xl">
              <Icon name="plus" className="size-3.5" />
              New investment
            </Button>
          </div>

          {/* ── Tabs ── */}
          <div className="flex gap-4 border-b border-stroke-primary mb-6">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setPage(1); }}
                className={clsx(
                  'flex flex-col gap-3 pb-0 text-base font-medium tr-d-all',
                  activeTab === tab.key ? 'text-black' : 'text-label-tertiary'
                )}
              >
                <span className="flex items-center gap-1">
                  {tab.label}
                  <Icon name="info" className="size-4 text-grey" />
                </span>
                <span
                  className={clsx(
                    'h-0.5 rounded-full w-full transition-all',
                    activeTab === tab.key ? 'bg-blue' : 'bg-transparent'
                  )}
                />
              </button>
            ))}
          </div>

          {/* ── Main two-column layout ── */}
          <div className="flex gap-2.5 mb-6">
            {/* Left – Donut chart */}
            <div className="flex flex-[1_0_0] min-w-0">
              <PortfolioDonutChart
                key={chartFilter}
                totalUsdt={chartView.totalUsdt}
                subtitle={chartView.subtitle}
                segments={chartView.segments}
                activeFilter={chartFilter}
                onFilterChange={setChartFilter}
                poolStats={derived.poolStats}
              />
            </div>

            {/* Right – Stats grid */}
            <div className="flex flex-[1_0_0] flex-col gap-2.5 min-w-0">
              <div className="flex gap-2.5">
                <PortfolioStatCard
                  value={fmtStat(derived.realizedPNL)}
                  sublabel="REALIZED"
                  label="PNL, USDT"
                  icon={<Icon name="tickSquared" className="size-5 text-black" />}
                />
                <PortfolioStatCard
                  value={fmtStat(derived.unrealizedPNL)}
                  sublabel="UNREALIZED"
                  label="PNL, USDT"
                  icon={<Icon name="chartSquared" className="size-5 text-black" />}
                />
              </div>
              <div className="flex gap-2.5">
                <PortfolioStatCard
                  value={`${fmtStat(derived.avgROI, 1)}%`}
                  label="AVERAGE ROI"
                  icon={<Icon name="percent" className="size-5 text-black" />}
                />
                <PortfolioStatCard
                  value="—"
                  label="AIRDROP POINTS"
                  icon={<Icon name="gift" className="size-5 text-black" />}
                />
              </div>
              <div className="flex gap-2.5">
                <PortfolioStatCard
                  value={fmtStat(derived.tradingEarnings)}
                  label="TRADING EARNINGS, USDT"
                  icon={<Icon name="flash" className="size-5 text-black" />}
                />
                <PortfolioStatCard
                  value={fmtStat(derived.claimableAmount)}
                  label="CLAIMABLE AMOUNT, USDT"
                  onAction={() => {}}
                  actionLabel="Withdraw"
                  icon={<Icon name="wallet" className="size-5 text-black" />}
                />
              </div>
            </div>
          </div>

          {/* ── Table section ── */}
          <div className="flex flex-col gap-4">
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

            <div className="rounded-lg overflow-hidden">
              {/* Filter row */}
              <div className="bg-bg-primary border border-stroke-primary rounded-t-lg flex justify-end px-3 py-4">
                <button className="flex items-center gap-2 border border-stroke-primary rounded-lg pl-3 pr-4 py-3 text-sm font-medium text-grey-dark tr-d-all hover:bg-bg-tertiary">
                  <Icon name="burger" className="size-3.5" />
                  Filter
                </button>
              </div>

              {/* Header */}
              <div className="bg-bg-primary border-x border-b border-stroke-primary h-[52px] flex items-center px-3 gap-2">
                {TABLE_COLS.map(col => (
                  <button
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={clsx(
                      'flex items-center gap-1 text-sm font-medium text-grey-dark tr-d-all hover:text-black',
                      col.width,
                      col.key === 'pool' ? 'shrink-0 justify-start' : 'justify-end'
                    )}
                  >
                    {col.label}
                    <Icon
                      name="tick"
                      className={clsx(
                        'size-3.5 shrink-0 transition-transform',
                        sortKey === col.key && !sortAsc ? '-rotate-90' : 'rotate-90',
                        sortKey === col.key ? 'text-blue' : 'text-grey'
                      )}
                    />
                  </button>
                ))}
                <div className="w-[110px] shrink-0 text-sm font-medium text-grey-dark text-right">Status</div>
                <div className="w-[213px] shrink-0 text-sm font-medium text-grey-dark text-right">Collected</div>
              </div>

              {/* Rows */}
              <div className="flex flex-col">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="-mt-px"><SkeletonRow /></div>
                  ))
                ) : paginated.length === 0 ? (
                  <div className="py-12 text-center text-sm text-label-tertiary border-x border-b border-stroke-primary">
                    No pools found.
                  </div>
                ) : (
                  paginated.map(({ pool }) => (
                    <div key={pool.id} className="-mt-px">
                      <PortfolioPoolRow pool={pool} />
                    </div>
                  ))
                )}
              </div>
            </div>

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </Wrapper>
      </section>
    </DashboardLayout>
  );
};

export default Portfolio;
