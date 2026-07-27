'use client';

import React, { FC, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useAccount } from 'wagmi';
import { useQuery } from '@apollo/client/react';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Button, Icon, Pagination, toast } from '@/components/ui';
import {
  WithdrawalsPoolRow,
  WithdrawModal,
  WithdrawalFilterModal,
  TransactionHistoryTable,
  STATUS_LABELS,
  TX_STATUS_LABELS,
} from '@/components/withdrawals';
import type {
  WithdrawalPool,
  WithdrawalStatus,
  FilterCategory,
  WithdrawalTx,
  WithdrawModalPoolContext,
  AmountRange,
  PeriodRange,
} from '@/components/withdrawals';
import {
  GET_BALANCES_FOR_WITHDRAWALS,
  GET_POOLS_FOR_WITHDRAWALS,
  GET_BUSINESSES_FOR_WITHDRAWALS,
  GET_COMPANIES_FOR_WITHDRAWALS,
  GET_WITHDRAWAL_TRANSACTIONS,
} from '@/lib/withdrawals/operations';
import type { TokenBalance, Pool, Business, Company, Transaction } from '@/gql/graphql';

// ── Constants ─────────────────────────────────────────────────────────────────

type TabKey = 'pools' | 'history';

const ROWS_PER_PAGE = 11;
const ZERO = BigInt(0);
const HOLD_DECIMALS = 18;
const HOLD_DIVISOR = BigInt(10) ** BigInt(HOLD_DECIMALS);

// TODO(remove): temporary mock data for reviewing the Transaction history tab
// without a connected wallet — see historyTxs below.
const MOCK_HISTORY_TXS: WithdrawalTx[] = [
  { id: 'mock-1', poolName: 'Smart Farm Expansion', date: 1744732800, amountRwa: 5500, status: 'pending', txHash: '0x690B9c2f4a1e7d8b3c5f6a9d0e1b2c3d4e5f6a7b' },
  { id: 'mock-2', poolName: 'Smart Farm Expansion', date: 1744646400, amountRwa: 5500, status: 'completed', txHash: '0x71a2C990e4b5d6c7f8a9b0c1d2e3f4a5b6c7d8e9' },
  { id: 'mock-3', poolName: 'Sustainable Irrigation Fund', date: 1744560000, amountRwa: 12000, status: 'failed', txHash: '0x82b3D001f5c6e7d8a9b0c1d2e3f4a5b6c7d8e9f0' },
  { id: 'mock-4', poolName: 'Gallery Launch', date: 1744473600, amountRwa: 8250, status: 'in_progress', txHash: '0x93c4E112a6d7f8e9b0c1d2e3f4a5b6c7d8e9f0a1' },
  { id: 'mock-5', poolName: 'Smart Farm Expansion', date: 1744387200, amountRwa: 5500, status: 'completed', txHash: '0xa4d5F223b7e8f9a0c1d2e3f4a5b6c7d8e9f0a1b2' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function safeFloat(v: string | null | undefined): number {
  if (!v) return 0;
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
}

function holdWeiToNum(wei: bigint): number {
  return Number(wei) / Number(HOLD_DIVISOR);
}

function computeUsdtFromRwa(rwaAmt: number, pool: Pool): number {
  try {
    if (!rwaAmt) return 0;
    const rwaWei = BigInt(Math.floor(rwaAmt));
    const virtualHold = BigInt(pool.virtualHoldReserve || '0');
    const realHold = BigInt(pool.realHoldReserve || '0');
    const virtualRwa = BigInt(pool.virtualRwaReserve || '0');
    const exitFee = BigInt(pool.exitFeePercent || '100');
    if (!virtualHold || !virtualRwa) return 0;

    const effectiveHold = virtualHold + realHold;
    const k = effectiveHold * virtualRwa;

    const newRwaReserve = virtualRwa + rwaWei;
    const newHoldReserve = k / newRwaReserve;
    const holdAmount = effectiveHold > newHoldReserve ? effectiveHold - newHoldReserve : ZERO;

    const fee = (holdAmount * exitFee) / BigInt(10000);
    return holdWeiToNum(holdAmount - fee);
  } catch {
    return 0;
  }
}

function deriveWithdrawalStatus(pool: Pool, userBalance: number): WithdrawalStatus {
  const now = Date.now() / 1000;
  if (pool.entryPeriodExpired && !pool.isTargetReached && now > pool.entryPeriodExpired) return 'failed';
  if (!pool.isTargetReached) return 'collecting';
  return userBalance > 0 ? 'ready_to_withdraw' : 'already_withdrawn';
}

// ── Component ─────────────────────────────────────────────────────────────────

const SkeletonRow: FC = () => <div className={'bg-bg-primary border border-stroke-primary h-[62px] animate-pulse bg-bg-tertiary/40'} />;

const WithdrawalsPage: FC = () => {
  const { address } = useAccount();
  const wallet = address ?? '';

  const [activeTab, setActiveTab] = useState<TabKey>('pools');
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilterCategory, setActiveFilterCategory] = useState<FilterCategory>('Status');
  const [filterSelections, setFilterSelections] = useState<Record<string, string[]>>({});
  const [amountRange, setAmountRange] = useState<AmountRange | null>(null);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(ROWS_PER_PAGE);
  const [withdrawTarget, setWithdrawTarget] = useState<(WithdrawalPool & WithdrawModalPoolContext) | null>(null);

  const [historyFilterOpen, setHistoryFilterOpen] = useState(false);
  const [historyActiveFilterCategory, setHistoryActiveFilterCategory] = useState<FilterCategory>('Status');
  const [historyFilterSelections, setHistoryFilterSelections] = useState<Record<string, string[]>>({});
  const [historyAmountRange, setHistoryAmountRange] = useState<AmountRange | null>(null);
  const [historyPeriodRange, setHistoryPeriodRange] = useState<PeriodRange | null>(null);

  // Query 1: user's token balances (one per pool the user has ever held RWA in)
  const { data: balancesData, loading: balancesLoading } = useQuery(GET_BALANCES_FOR_WITHDRAWALS, {
    variables: { input: { filter: { owner: wallet } } },
    skip: !wallet,
  });
  const balances: TokenBalance[] = (balancesData as { getBalances?: TokenBalance[] })?.getBalances ?? [];
  const poolAddresses = useMemo(() => [...new Set(balances.map(b => b.poolAddress))], [balances]);

  // Query 2: pool metadata for those addresses
  const { data: poolsData, loading: poolsLoading } = useQuery(GET_POOLS_FOR_WITHDRAWALS, {
    variables: { input: { filter: { poolAddress: { $in: poolAddresses } } } },
    skip: !wallet || poolAddresses.length === 0,
  });
  const pools: Pool[] = (poolsData as { getPools?: Pool[] })?.getPools ?? [];

  const businessIds = useMemo(() => [...new Set(pools.map(p => p.businessId).filter(Boolean))], [pools]);

  // Query 3: businesses ("Project" column) for those pools
  const { data: businessesData } = useQuery(GET_BUSINESSES_FOR_WITHDRAWALS, {
    variables: { input: { filter: { _id: { $in: businessIds } } } },
    skip: businessIds.length === 0,
  });
  const businesses: Business[] = (businessesData as { getBusinesses?: Business[] })?.getBusinesses ?? [];

  const companyIds = useMemo(
    () => [...new Set(businesses.filter(b => b.ownerType === 'company').map(b => b.ownerId).filter(Boolean))],
    [businesses]
  );

  // Query 4: companies ("Company" column) owning those businesses
  const { data: companiesData } = useQuery(GET_COMPANIES_FOR_WITHDRAWALS, {
    variables: { input: { filter: { _id: { $in: companyIds } } } },
    skip: companyIds.length === 0,
  });
  const companies: Company[] = (companiesData as { getCompanies?: Company[] })?.getCompanies ?? [];

  // Query 5: the user's outgoing (withdrawal) transactions, for the history tab
  const { data: txData, loading: txLoading } = useQuery(GET_WITHDRAWAL_TRANSACTIONS, {
    variables: { input: { filter: { from: wallet } } },
    skip: !wallet,
  });
  const rawTxs: Transaction[] = (txData as { getTransactions?: Transaction[] })?.getTransactions ?? [];

  const isLoading = balancesLoading || poolsLoading;

  const businessById = useMemo(() => new Map(businesses.map(b => [b.id, b])), [businesses]);
  const companyById = useMemo(() => new Map(companies.map(c => [c.id, c])), [companies]);
  const balanceByPoolAddress = useMemo(() => new Map(balances.map(b => [b.poolAddress.toLowerCase(), b.balance])), [balances]);

  const derivedPools = useMemo(() => {
    return pools
      .map(pool => {
        const balance = balanceByPoolAddress.get((pool.poolAddress ?? '').toLowerCase()) ?? 0;
        const status = deriveWithdrawalStatus(pool, balance);
        const business = pool.businessId ? businessById.get(pool.businessId) : undefined;
        const companyName =
          business?.ownerType === 'company' ? companyById.get(business.ownerId)?.name ?? '—' : '—';

        const withdrawalPool: WithdrawalPool & WithdrawModalPoolContext = {
          id: pool.id,
          poolAddress: pool.poolAddress ?? '',
          rwaAddress: pool.rwaAddress,
          name: pool.name,
          companyId: business?.ownerType === 'company' ? business.ownerId : undefined,
          companyName,
          projectName: business?.name ?? '—',
          collected: Math.round(holdWeiToNum(BigInt(pool.realHoldReserve || '0'))),
          goal: Math.round(holdWeiToNum(BigInt(pool.expectedHoldAmount || '0'))),
          status,
          virtualHoldReserve: pool.virtualHoldReserve,
          realHoldReserve: pool.realHoldReserve,
          virtualRwaReserve: pool.virtualRwaReserve,
          exitFeePercent: pool.exitFeePercent,
        };

        return { withdrawalPool, balance };
      })
      .sort((a, b) => {
        const c = a.withdrawalPool.companyName.localeCompare(b.withdrawalPool.companyName);
        if (c !== 0) return c;
        return a.withdrawalPool.projectName.localeCompare(b.withdrawalPool.projectName);
      });
  }, [pools, balanceByPoolAddress, businessById, companyById]);

  const totalWithdrawableUsdt = useMemo(() => {
    return pools.reduce((sum, pool) => {
      const balance = balanceByPoolAddress.get((pool.poolAddress ?? '').toLowerCase()) ?? 0;
      if (deriveWithdrawalStatus(pool, balance) !== 'ready_to_withdraw') return sum;
      return sum + computeUsdtFromRwa(balance, pool);
    }, 0);
  }, [pools, balanceByPoolAddress]);

  const categoryOptions = useMemo<Partial<Record<FilterCategory, string[]>>>(
    () => ({
      Status: Object.values(STATUS_LABELS),
      Pool: [...new Set(derivedPools.map(r => r.withdrawalPool.name))],
    }),
    [derivedPools]
  );

  // "Amount" filters on each pool's collected (progress) USDT value.
  const amountBounds = useMemo<AmountRange>(() => {
    if (derivedPools.length === 0) return { min: 0, max: 0 };
    const collected = derivedPools.map(r => r.withdrawalPool.collected);
    return { min: Math.min(...collected), max: Math.max(...collected) };
  }, [derivedPools]);

  const activeFilterCount = useMemo(
    () => Object.values(filterSelections).filter(v => v.length > 0).length + (amountRange ? 1 : 0),
    [filterSelections, amountRange]
  );

  const handleToggle = (category: FilterCategory, value: string) => {
    if (value === '__all__') {
      setFilterSelections(prev => ({ ...prev, [category]: [] }));
      return;
    }
    setFilterSelections(prev => {
      const current = prev[category] ?? [];
      const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
      return { ...prev, [category]: next };
    });
  };

  const filteredPools = useMemo(() => {
    let rows = derivedPools;

    const statusSel = filterSelections['Status'] ?? [];
    if (statusSel.length > 0) {
      rows = rows.filter(r => statusSel.includes(STATUS_LABELS[r.withdrawalPool.status]));
    }

    const poolSel = filterSelections['Pool'] ?? [];
    if (poolSel.length > 0) {
      rows = rows.filter(r => poolSel.includes(r.withdrawalPool.name));
    }

    if (amountRange) {
      rows = rows.filter(
        r => r.withdrawalPool.collected >= amountRange.min && r.withdrawalPool.collected <= amountRange.max
      );
    }

    return rows;
  }, [derivedPools, filterSelections, amountRange]);

  const totalPages = Math.max(1, Math.ceil(filteredPools.length / ROWS_PER_PAGE));
  const paginatedPools = filteredPools.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);
  const mobilePools = filteredPools.slice(0, mobileVisibleCount);

  useEffect(() => {
    setMobileVisibleCount(ROWS_PER_PAGE);
  }, [filterSelections, amountRange]);

  const historyTxs: WithdrawalTx[] = useMemo(() => {
    const poolByAddress = new Map(pools.map(p => [(p.poolAddress ?? '').toLowerCase(), p]));
    const real = rawTxs
      .map(tx => ({
        id: tx.id,
        poolName: poolByAddress.get(tx.poolAddress.toLowerCase())?.name ?? '—',
        date: tx.createdAt,
        amountRwa: tx.amount,
        status: 'completed' as const,
        txHash: tx.transactionHash,
      }))
      .sort((a, b) => b.date - a.date);

    // TODO(remove): temporary mock rows for design review — only shown when
    // there's no real transaction data, e.g. no wallet connected.
    if (real.length > 0) return real;
    return MOCK_HISTORY_TXS;
  }, [rawTxs, pools]);

  const historyCategoryOptions = useMemo<Partial<Record<FilterCategory, string[]>>>(
    () => ({
      Status: Object.values(TX_STATUS_LABELS),
      Pool: [...new Set(historyTxs.map(tx => tx.poolName))],
    }),
    [historyTxs]
  );

  const historyAmountBounds = useMemo<AmountRange>(() => {
    if (historyTxs.length === 0) return { min: 0, max: 0 };
    const amounts = historyTxs.map(tx => tx.amountRwa);
    return { min: Math.min(...amounts), max: Math.max(...amounts) };
  }, [historyTxs]);

  const historyActiveFilterCount = useMemo(
    () =>
      Object.values(historyFilterSelections).filter(v => v.length > 0).length +
      (historyAmountRange ? 1 : 0) +
      (historyPeriodRange ? 1 : 0),
    [historyFilterSelections, historyAmountRange, historyPeriodRange]
  );

  const handleHistoryToggle = (category: FilterCategory, value: string) => {
    if (value === '__all__') {
      setHistoryFilterSelections(prev => ({ ...prev, [category]: [] }));
      return;
    }
    setHistoryFilterSelections(prev => {
      const current = prev[category] ?? [];
      const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
      return { ...prev, [category]: next };
    });
  };

  const filteredHistoryTxs = useMemo(() => {
    let rows = historyTxs;

    const statusSel = historyFilterSelections['Status'] ?? [];
    if (statusSel.length > 0) {
      rows = rows.filter(tx => statusSel.includes(TX_STATUS_LABELS[tx.status]));
    }

    const poolSel = historyFilterSelections['Pool'] ?? [];
    if (poolSel.length > 0) {
      rows = rows.filter(tx => poolSel.includes(tx.poolName));
    }

    if (historyAmountRange) {
      rows = rows.filter(tx => tx.amountRwa >= historyAmountRange.min && tx.amountRwa <= historyAmountRange.max);
    }

    if (historyPeriodRange) {
      const fromTs = new Date(historyPeriodRange.from).getTime() / 1000;
      const toTs = new Date(historyPeriodRange.to).getTime() / 1000 + 86400; // inclusive of the whole "to" day
      rows = rows.filter(tx => tx.date >= fromTs && tx.date < toTs);
    }

    return rows;
  }, [historyTxs, historyFilterSelections, historyAmountRange, historyPeriodRange]);

  const historyTotalPages = Math.max(1, Math.ceil(filteredHistoryTxs.length / ROWS_PER_PAGE));
  const [historyPage, setHistoryPage] = useState(1);
  const paginatedHistory = filteredHistoryTxs.slice((historyPage - 1) * ROWS_PER_PAGE, historyPage * ROWS_PER_PAGE);
  const [historyMobileVisibleCount, setHistoryMobileVisibleCount] = useState(ROWS_PER_PAGE);
  const mobileHistory = filteredHistoryTxs.slice(0, historyMobileVisibleCount);

  useEffect(() => {
    setHistoryMobileVisibleCount(ROWS_PER_PAGE);
    setHistoryPage(1);
  }, [historyFilterSelections, historyAmountRange, historyPeriodRange]);

  const handleWithdrawn = () => {
    toast('Refresh the page to see your updated balance.');
  };

  return (
    <DashboardLayout>
      <section className={'py-8 md:py-12'}>
        <Wrapper>
          {wallet && (
            <div
              className={
                'flex items-center gap-2 bg-bg-tertiary rounded-full px-3 py-2 w-fit mb-4 text-sm text-grey-dark'
              }
            >
              {wallet.slice(0, 6)}...{wallet.slice(-6)}
            </div>
          )}

          <p className={'flex items-center gap-1.5 text-3xl lg:text-4xl font-bold text-[#1D1D1F] mb-8'}>
            USDT
            <Icon className={'size-6 lg:size-8'} name={'usdt'} />
            {totalWithdrawableUsdt.toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </p>

          <div className={'flex gap-4 border-b border-stroke-primary mb-6'}>
            {(
              [
                { key: 'pools', label: 'Pool list' },
                { key: 'history', label: 'Transaction history' },
              ] as const
            ).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={clsx(
                  'flex flex-col gap-3 pb-0 text-base font-medium tr-d-all',
                  activeTab === tab.key ? 'text-black' : 'text-label-tertiary'
                )}
              >
                <span className={'flex items-center gap-1'}>
                  {tab.label}
                  <Icon name={'info'} className={'size-4 text-grey'} />
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

          {activeTab === 'pools' ? (
            <div className={'flex flex-col gap-4'}>
              <div className={'max-lg:hidden'}>
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>

              <div className={'flex flex-col'}>
                <div
                  className={
                    'bg-bg-primary border border-stroke-primary rounded-t-lg flex justify-start px-3 py-4 relative z-10 ' +
                    'max-lg:bg-transparent max-lg:border-0 max-lg:rounded-none max-lg:px-0 max-lg:py-0'
                  }
                >
                  <Button visualType={'quinary'} onClick={() => setFilterOpen(prev => !prev)}>
                    <Icon name={'plus'} className={'size-3.5'} />
                    Filter
                    {activeFilterCount > 0 && (
                      <span
                        className={
                          'bg-blue text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center leading-none'
                        }
                      >
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                  <WithdrawalFilterModal
                    open={filterOpen}
                    categories={['Status', 'Amount', 'Pool']}
                    activeCategory={activeFilterCategory}
                    onCategoryChange={setActiveFilterCategory}
                    selections={filterSelections}
                    onToggle={handleToggle}
                    categoryOptions={categoryOptions}
                    amountBounds={amountBounds}
                    amountRange={amountRange}
                    onAmountRangeChange={setAmountRange}
                  />

                  {/* Active-filter pills — mobile only; desktop shows the count badge on the Filter button instead */}
                  <div className={'lg:hidden flex items-center gap-2 overflow-x-auto ml-2'}>
                    {(filterSelections['Status'] ?? []).length > 0 && (
                      <button
                        type={'button'}
                        onClick={() => {
                          setActiveFilterCategory('Status');
                          setFilterOpen(true);
                        }}
                        className={'shrink-0 flex items-center gap-1.5 pl-2 pr-3 py-2 rounded-full border border-stroke-primary text-xs whitespace-nowrap'}
                      >
                        <span
                          role={'button'}
                          tabIndex={0}
                          onClick={e => {
                            e.stopPropagation();
                            handleToggle('Status', '__all__');
                          }}
                          className={'flex items-center'}
                        >
                          <Icon name={'plus'} className={'size-3 rotate-45 text-grey-dark'} />
                        </span>
                        <span className={'text-grey-dark'}>Status</span>
                        <span className={'text-blue font-medium'}>
                          {filterSelections['Status'].length === 1
                            ? filterSelections['Status'][0]
                            : `${filterSelections['Status'].length} selected`}
                        </span>
                      </button>
                    )}

                    {amountRange && (
                      <button
                        type={'button'}
                        onClick={() => {
                          setActiveFilterCategory('Amount');
                          setFilterOpen(true);
                        }}
                        className={'shrink-0 flex items-center gap-1.5 pl-2 pr-3 py-2 rounded-full border border-stroke-primary text-xs whitespace-nowrap'}
                      >
                        <span
                          role={'button'}
                          tabIndex={0}
                          onClick={e => {
                            e.stopPropagation();
                            setAmountRange(null);
                          }}
                          className={'flex items-center'}
                        >
                          <Icon name={'plus'} className={'size-3 rotate-45 text-grey-dark'} />
                        </span>
                        <span className={'text-grey-dark'}>Amount</span>
                        <span className={'text-blue font-medium'}>
                          {amountRange.min.toLocaleString()} - {amountRange.max.toLocaleString()}
                        </span>
                      </button>
                    )}

                    {(filterSelections['Pool'] ?? []).length > 0 && (
                      <button
                        type={'button'}
                        onClick={() => {
                          setActiveFilterCategory('Pool');
                          setFilterOpen(true);
                        }}
                        className={'shrink-0 flex items-center gap-1.5 pl-2 pr-3 py-2 rounded-full border border-stroke-primary text-xs whitespace-nowrap'}
                      >
                        <span
                          role={'button'}
                          tabIndex={0}
                          onClick={e => {
                            e.stopPropagation();
                            handleToggle('Pool', '__all__');
                          }}
                          className={'flex items-center'}
                        >
                          <Icon name={'plus'} className={'size-3 rotate-45 text-grey-dark'} />
                        </span>
                        <span className={'text-grey-dark'}>Pool</span>
                        <span className={'text-blue font-medium'}>
                          {filterSelections['Pool'].length === 1
                            ? filterSelections['Pool'][0]
                            : `${filterSelections['Pool'].length} selected`}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Desktop table */}
                <div className={'max-lg:hidden overflow-hidden rounded-b-lg'}>
                  <div
                    className={
                      'bg-bg-primary border-x border-b border-stroke-primary h-[52px] flex items-center px-3 gap-2'
                    }
                  >
                    <span className={'text-sm font-medium text-grey-dark w-[200px] shrink-0'}>Company</span>
                    <span className={'text-sm font-medium text-grey-dark w-[200px] shrink-0'}>Project</span>
                    <span className={'text-sm font-medium text-grey-dark flex-1'}>Pool</span>
                    <span className={'text-sm font-medium text-grey-dark w-[180px] shrink-0'}>Progress</span>
                    <span className={'text-sm font-medium text-grey-dark w-[170px] shrink-0'}>Status</span>
                    <span className={'text-sm font-medium text-grey-dark w-[110px] shrink-0 text-right'}>Action</span>
                  </div>

                  <div className={'flex flex-col'}>
                    {isLoading ? (
                      Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className={'-mt-px'}>
                          <SkeletonRow />
                        </div>
                      ))
                    ) : !wallet ? (
                      <div
                        className={
                          'py-12 text-center text-sm text-label-tertiary border-x border-b border-stroke-primary'
                        }
                      >
                        Connect your wallet to see your pools.
                      </div>
                    ) : paginatedPools.length === 0 ? (
                      <div
                        className={
                          'py-12 text-center text-sm text-label-tertiary border-x border-b border-stroke-primary'
                        }
                      >
                        No pools found.
                      </div>
                    ) : (
                      paginatedPools.map(({ withdrawalPool }, i) => {
                        const prev = paginatedPools[i - 1]?.withdrawalPool;
                        const showCompany = !prev || prev.companyName !== withdrawalPool.companyName;
                        const showProject = showCompany || prev.projectName !== withdrawalPool.projectName;
                        return (
                          <div key={withdrawalPool.id} className={'-mt-px'}>
                            <WithdrawalsPoolRow
                              pool={withdrawalPool}
                              showCompany={showCompany}
                              showProject={showProject}
                              onWithdraw={() => setWithdrawTarget(withdrawalPool)}
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Mobile cards */}
                <div className={'lg:hidden flex flex-col gap-3'}>
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
                  ) : !wallet ? (
                    <div className={'py-12 text-center text-sm text-label-tertiary'}>
                      Connect your wallet to see your pools.
                    </div>
                  ) : mobilePools.length === 0 ? (
                    <div className={'py-12 text-center text-sm text-label-tertiary'}>No pools found.</div>
                  ) : (
                    <>
                      {mobilePools.map(({ withdrawalPool }, i) => {
                        const prev = mobilePools[i - 1]?.withdrawalPool;
                        const showCompany = !prev || prev.companyName !== withdrawalPool.companyName;
                        const showProject = showCompany || prev.projectName !== withdrawalPool.projectName;
                        return (
                          <WithdrawalsPoolRow
                            key={withdrawalPool.id}
                            pool={withdrawalPool}
                            showCompany={showCompany}
                            showProject={showProject}
                            onWithdraw={() => setWithdrawTarget(withdrawalPool)}
                          />
                        );
                      })}
                      {mobileVisibleCount < filteredPools.length && (
                        <Button
                          visualType={'quinary'}
                          className={'w-full justify-center'}
                          onClick={() => setMobileVisibleCount(c => c + ROWS_PER_PAGE)}
                        >
                          Show more
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className={'max-lg:hidden'}>
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            </div>
          ) : (
            <div className={'flex flex-col gap-4'}>
              <div className={'max-lg:hidden'}>
                <Pagination page={historyPage} totalPages={historyTotalPages} onPageChange={setHistoryPage} />
              </div>

              <div className={'flex flex-col'}>
                <div
                  className={
                    'bg-bg-primary border border-stroke-primary rounded-t-lg flex justify-start px-3 py-4 relative z-10 ' +
                    'max-lg:bg-transparent max-lg:border-0 max-lg:rounded-none max-lg:px-0 max-lg:py-0'
                  }
                >
                  <Button visualType={'quinary'} onClick={() => setHistoryFilterOpen(prev => !prev)}>
                    <Icon name={'plus'} className={'size-3.5'} />
                    Filter
                    {historyActiveFilterCount > 0 && (
                      <span
                        className={
                          'bg-blue text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center leading-none'
                        }
                      >
                        {historyActiveFilterCount}
                      </span>
                    )}
                  </Button>
                  <WithdrawalFilterModal
                    open={historyFilterOpen}
                    categories={['Status', 'Amount', 'Period', 'Pool']}
                    activeCategory={historyActiveFilterCategory}
                    onCategoryChange={setHistoryActiveFilterCategory}
                    selections={historyFilterSelections}
                    onToggle={handleHistoryToggle}
                    categoryOptions={historyCategoryOptions}
                    amountBounds={historyAmountBounds}
                    amountRange={historyAmountRange}
                    onAmountRangeChange={setHistoryAmountRange}
                    periodRange={historyPeriodRange}
                    onPeriodRangeChange={setHistoryPeriodRange}
                  />

                  {/* Active-filter pills — mobile only; desktop shows the count badge on the Filter button instead */}
                  <div className={'lg:hidden flex items-center gap-2 overflow-x-auto ml-2'}>
                    {(historyFilterSelections['Status'] ?? []).length > 0 && (
                      <button
                        type={'button'}
                        onClick={() => {
                          setHistoryActiveFilterCategory('Status');
                          setHistoryFilterOpen(true);
                        }}
                        className={'shrink-0 flex items-center gap-1.5 pl-2 pr-3 py-2 rounded-full border border-stroke-primary text-xs whitespace-nowrap'}
                      >
                        <span
                          role={'button'}
                          tabIndex={0}
                          onClick={e => {
                            e.stopPropagation();
                            handleHistoryToggle('Status', '__all__');
                          }}
                          className={'flex items-center'}
                        >
                          <Icon name={'plus'} className={'size-3 rotate-45 text-grey-dark'} />
                        </span>
                        <span className={'text-grey-dark'}>Status</span>
                        <span className={'text-blue font-medium'}>
                          {historyFilterSelections['Status'].length === 1
                            ? historyFilterSelections['Status'][0]
                            : `${historyFilterSelections['Status'].length} selected`}
                        </span>
                      </button>
                    )}

                    {historyAmountRange && (
                      <button
                        type={'button'}
                        onClick={() => {
                          setHistoryActiveFilterCategory('Amount');
                          setHistoryFilterOpen(true);
                        }}
                        className={'shrink-0 flex items-center gap-1.5 pl-2 pr-3 py-2 rounded-full border border-stroke-primary text-xs whitespace-nowrap'}
                      >
                        <span
                          role={'button'}
                          tabIndex={0}
                          onClick={e => {
                            e.stopPropagation();
                            setHistoryAmountRange(null);
                          }}
                          className={'flex items-center'}
                        >
                          <Icon name={'plus'} className={'size-3 rotate-45 text-grey-dark'} />
                        </span>
                        <span className={'text-grey-dark'}>Amount</span>
                        <span className={'text-blue font-medium'}>
                          {historyAmountRange.min.toLocaleString()} - {historyAmountRange.max.toLocaleString()}
                        </span>
                      </button>
                    )}

                    {historyPeriodRange && (
                      <button
                        type={'button'}
                        onClick={() => {
                          setHistoryActiveFilterCategory('Period');
                          setHistoryFilterOpen(true);
                        }}
                        className={'shrink-0 flex items-center gap-1.5 pl-2 pr-3 py-2 rounded-full border border-stroke-primary text-xs whitespace-nowrap'}
                      >
                        <span
                          role={'button'}
                          tabIndex={0}
                          onClick={e => {
                            e.stopPropagation();
                            setHistoryPeriodRange(null);
                          }}
                          className={'flex items-center'}
                        >
                          <Icon name={'plus'} className={'size-3 rotate-45 text-grey-dark'} />
                        </span>
                        <span className={'text-grey-dark'}>Period</span>
                        <span className={'text-blue font-medium'}>
                          {historyPeriodRange.from} - {historyPeriodRange.to}
                        </span>
                      </button>
                    )}

                    {(historyFilterSelections['Pool'] ?? []).length > 0 && (
                      <button
                        type={'button'}
                        onClick={() => {
                          setHistoryActiveFilterCategory('Pool');
                          setHistoryFilterOpen(true);
                        }}
                        className={'shrink-0 flex items-center gap-1.5 pl-2 pr-3 py-2 rounded-full border border-stroke-primary text-xs whitespace-nowrap'}
                      >
                        <span
                          role={'button'}
                          tabIndex={0}
                          onClick={e => {
                            e.stopPropagation();
                            handleHistoryToggle('Pool', '__all__');
                          }}
                          className={'flex items-center'}
                        >
                          <Icon name={'plus'} className={'size-3 rotate-45 text-grey-dark'} />
                        </span>
                        <span className={'text-grey-dark'}>Pool</span>
                        <span className={'text-blue font-medium'}>
                          {historyFilterSelections['Pool'].length === 1
                            ? historyFilterSelections['Pool'][0]
                            : `${historyFilterSelections['Pool'].length} selected`}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                <div className={'max-lg:hidden'}>
                  <TransactionHistoryTable txs={paginatedHistory} isLoading={txLoading} />
                </div>
                <div className={'lg:hidden flex flex-col gap-3'}>
                  <TransactionHistoryTable txs={mobileHistory} isLoading={txLoading} />
                  {historyMobileVisibleCount < filteredHistoryTxs.length && (
                    <Button
                      visualType={'quinary'}
                      className={'w-full justify-center'}
                      onClick={() => setHistoryMobileVisibleCount(c => c + ROWS_PER_PAGE)}
                    >
                      Show more
                    </Button>
                  )}
                </div>
              </div>

              <div className={'max-lg:hidden'}>
                <Pagination page={historyPage} totalPages={historyTotalPages} onPageChange={setHistoryPage} />
              </div>
            </div>
          )}
        </Wrapper>
      </section>

      <WithdrawModal pool={withdrawTarget} onClose={() => setWithdrawTarget(null)} onWithdrawn={handleWithdrawn} />
    </DashboardLayout>
  );
};

export default WithdrawalsPage;
