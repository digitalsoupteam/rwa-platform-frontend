'use client';

import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { CommonLayout, DashboardLayout, Wrapper } from '@/components/layout';
import { Icon, Button, Pagination } from '@/components/ui';
import { PortfolioDonutChart, PortfolioStatCard, PortfolioPoolRow } from '@/components/portfolio';
import type { PortfolioPool } from '@/components/portfolio';

// ── Mock data ──────────────────────────────────────────────────────────────────

const MOCK_POOLS: PortfolioPool[] = [
  {
    id: '1',
    name: 'Smart Farm Expansion',
    aiRating: 4.96,
    amount: 5500,
    poolShare: '3.1%',
    returned: 0,
    currentValue: 24.38,
    profit: '4%',
    status: 'collecting',
    collected: 50000,
    goal: 99000,
  },
  {
    id: '2',
    name: 'Smart Farm Expansion',
    aiRating: 4.96,
    amount: 5500,
    poolShare: '3.1%',
    returned: 0,
    currentValue: 24.38,
    profit: '4%',
    status: 'completed',
    collected: 99000,
    goal: 99000,
  },
  {
    id: '3',
    name: 'Urban Solar Grid',
    aiRating: 4.12,
    amount: 3200,
    poolShare: '1.8%',
    returned: 1500,
    currentValue: 18.75,
    profit: '+6.2%',
    status: 'active',
    collected: 72000,
    goal: 120000,
  },
  {
    id: '4',
    name: 'Coastal Aquaculture',
    aiRating: 3.88,
    amount: 8000,
    poolShare: '4.5%',
    returned: 4200,
    currentValue: 42.10,
    profit: '+3.8%',
    status: 'active',
    collected: 95000,
    goal: 150000,
  },
  {
    id: '5',
    name: 'Tech Hub Development',
    aiRating: 4.67,
    amount: 12000,
    poolShare: '6.7%',
    returned: 0,
    currentValue: 63.44,
    profit: '-1.2%',
    status: 'collecting',
    collected: 35000,
    goal: 200000,
  },
  {
    id: '6',
    name: 'Green Logistics Fleet',
    aiRating: 4.31,
    amount: 6750,
    poolShare: '3.8%',
    returned: 6750,
    currentValue: 0,
    profit: '+8.5%',
    status: 'completed',
    collected: 180000,
    goal: 180000,
  },
];

type TabKey = 'all' | 'payouts' | 'favourites';
type SortKey = 'pool' | 'rating' | 'amount' | 'share' | 'returned' | 'value' | 'profit' | 'status';

const ROWS_PER_PAGE = 5;

// ── Component ─────────────────────────────────────────────────────────────────

const Portfolio: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [chartFilter, setChartFilter] = useState<'industry' | 'projects' | 'countries'>('industry');
  const [sortKey, setSortKey] = useState<SortKey>('pool');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const TABS: { key: TabKey; label: string }[] = [
    { key: 'all', label: 'All pools' },
    { key: 'payouts', label: 'Payouts' },
    { key: 'favourites', label: 'Favourites' },
  ];

  const TABLE_COLS: { key: SortKey; label: string; align?: 'left' | 'right' }[] = [
    { key: 'pool', label: 'Pool', align: 'left' },
    { key: 'rating', label: 'AI Rating', align: 'right' },
    { key: 'amount', label: 'Amount (USDT)', align: 'right' },
    { key: 'share', label: 'Pool share', align: 'right' },
    { key: 'returned', label: 'Returned (USDT)', align: 'right' },
    { key: 'value', label: 'Current value (USDT)', align: 'right' },
    { key: 'profit', label: 'Profit', align: 'right' },
    { key: 'status', label: 'Status', align: 'left' },
  ];

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(prev => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const filtered = MOCK_POOLS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  return (
    <DashboardLayout>
      <section className="py-8 md:py-12">
        <Wrapper>
          {/* ── Page title ── */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[36px] font-semibold leading-[1.2] text-black">Portfolio</h1>
            <Button visualType="quaternary" className="flex items-center gap-2 h-[46px]">
              <Icon name="plus" className="size-3.5" />
              New investment
            </Button>
          </div>

          {/* ── Tabs ── */}
          <div className="flex gap-4 border-b border-stroke-primary mb-6">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
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
          <div className="flex gap-2.5 mb-6" style={{ minHeight: 524 }}>
            {/* Left – Donut chart */}
            <div className="flex flex-[1_0_0] min-w-0 rounded-xl p-0">
              <PortfolioDonutChart
                totalUsdt="9,354"
                subtitle="24 industries · 38 pools"
                activeFilter={chartFilter}
                onFilterChange={setChartFilter}
              />
            </div>

            {/* Right – Stats grid */}
            <div className="flex flex-[1_0_0] flex-col gap-2.5 min-w-0 overflow-hidden">
              {/* Row 1 */}
              <div className="flex gap-2.5 flex-1 min-h-0">
                <PortfolioStatCard
                  value="+128.61"
                  label="PNL, USDT"
                  sublabel="REALIZED"
                  valueClassName="text-black"
                  icon={<Icon name="check" className="size-5 text-black" />}
                />
                <PortfolioStatCard
                  value="-16.54"
                  label="PNL, USDT"
                  sublabel="UNREALIZED"
                  valueClassName="text-red"
                  icon={<Icon name="triangle" className="size-5 text-black rotate-180" />}
                />
              </div>
              {/* Row 2 */}
              <div className="flex gap-2.5 flex-1 min-h-0">
                <PortfolioStatCard
                  value="12.4%"
                  label="AVERAGE ROI"
                  valueClassName="text-black"
                  icon={<Icon name="share" className="size-5 text-black" />}
                />
                <PortfolioStatCard
                  value="654"
                  label="AIRDROP POINTS"
                  valueClassName="text-black"
                  icon={<Icon name="plus" className="size-5 text-black" />}
                />
              </div>
              {/* Row 3 */}
              <div className="flex gap-2.5 flex-1 min-h-0">
                <PortfolioStatCard
                  value="47"
                  label="TRADING EARNINGS, USDT"
                  valueClassName="text-black"
                  icon={<Icon name="triangle" className="size-5 text-black" />}
                />
                <PortfolioStatCard
                  value="458"
                  label="CLAIMABLE AMOUNT, USDT"
                  valueClassName="text-black"
                  onAction={() => {}}
                  actionLabel="Withdraw"
                  icon={<Icon name="person" className="size-5 text-black" />}
                />
              </div>
            </div>
          </div>

          {/* ── Table section ── */}
          <div className="flex flex-col gap-6">
            {/* Table controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Pagination at top */}
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search pools..."
                    className="border border-stroke-primary rounded-xl h-[46px] px-4 pr-10 text-sm text-black placeholder:text-label-tertiary bg-white outline-none focus:border-blue tr-d-all w-[220px]"
                  />
                  <Icon name="info" className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-grey" />
                </div>
                {/* Filter button */}
                <button className="flex items-center gap-2 border border-stroke-primary rounded-xl h-[46px] px-4 text-sm font-medium text-grey-dark tr-d-all hover:bg-bg-tertiary">
                  <Icon name="burger" className="size-3.5" />
                  Filter
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-lg border border-stroke-primary">
              {/* Header */}
              <div className="bg-white border-b border-stroke-primary h-[52px] flex items-center px-3 min-w-[1100px]">
                {TABLE_COLS.map(col => (
                  <button
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={clsx(
                      'flex items-center gap-1 text-sm font-medium text-grey-dark tr-d-all hover:text-black',
                      col.key === 'pool' ? 'flex-[2_0_0] text-left' : 'flex-[1_0_0]',
                      col.align === 'right' ? 'justify-end' : 'justify-start'
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
                <div className="flex-[1_0_0] text-sm font-medium text-grey-dark text-right">Collected</div>
              </div>

              {/* Rows */}
              <div className="min-w-[1100px]">
                {paginated.length === 0 ? (
                  <div className="py-12 text-center text-sm text-label-tertiary">No pools found.</div>
                ) : (
                  paginated.map(pool => <PortfolioPoolRow key={pool.id} pool={pool} />)
                )}
              </div>
            </div>

            {/* Bottom pagination */}
            <div className="flex items-center">
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </div>
        </Wrapper>
      </section>
    </DashboardLayout>
  );
};

export default Portfolio;
