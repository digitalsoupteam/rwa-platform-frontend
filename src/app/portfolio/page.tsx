'use client';

import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Icon, Button, Pagination } from '@/components/ui';
import { PortfolioDonutChart, PortfolioStatCard, PortfolioPoolRow } from '@/components/portfolio';
import type { PortfolioPool, DonutSegment } from '@/components/portfolio';

// ── Mock data ──────────────────────────────────────────────────────────────────

const MOCK_POOLS: PortfolioPool[] = [
  { id: '1', name: 'Smart Farm Expansion', aiRating: 4.96, amount: 5500, poolShare: '3.1%', returned: 0, currentValue: 24.38, profit: '4%', status: 'collecting', collected: 50000, goal: 99000 },
  { id: '2', name: 'Smart Farm Expansion', aiRating: 4.96, amount: 5500, poolShare: '3.1%', returned: 0, currentValue: 24.38, profit: '4%', status: 'paying_out', collected: 99000, goal: 99000 },
  { id: '3', name: 'Smart Farm Expansion', aiRating: 4.96, amount: 5500, poolShare: '3.1%', returned: 0, currentValue: 24.38, profit: '4%', status: 'completed', collected: 99000, goal: 99000 },
  { id: '4', name: 'Smart Farm Expansion', aiRating: 4.96, amount: 5500, poolShare: '3.1%', returned: 0, currentValue: 24.38, profit: '4%', status: 'completed', collected: 99000, goal: 99000 },
  { id: '5', name: 'Smart Farm Expansion', aiRating: 4.96, amount: 5500, poolShare: '3.1%', returned: 0, currentValue: 24.38, profit: '4%', status: 'completed', collected: 99000, goal: 99000 },
  { id: '6', name: 'Smart Farm Expansion', aiRating: 4.96, amount: 5500, poolShare: '3.1%', returned: 0, currentValue: 24.38, profit: '4%', status: 'completed', collected: 99000, goal: 99000 },
  { id: '7', name: 'Smart Farm Expansion', aiRating: 4.96, amount: 5500, poolShare: '3.1%', returned: 0, currentValue: 24.38, profit: '4%', status: 'completed', collected: 99000, goal: 99000 },
  { id: '8', name: 'Smart Farm Expansion', aiRating: 4.96, amount: 5500, poolShare: '3.1%', returned: 0, currentValue: 24.38, profit: '4%', status: 'completed', collected: 99000, goal: 99000 },
  { id: '9', name: 'Smart Farm Expansion', aiRating: 4.96, amount: 5500, poolShare: '3.1%', returned: 0, currentValue: 24.38, profit: '4%', status: 'completed', collected: 99000, goal: 99000 },
  { id: '10', name: 'Smart Farm Expansion', aiRating: 4.96, amount: 5500, poolShare: '3.1%', returned: 0, currentValue: 24.38, profit: '4%', status: 'completed', collected: 99000, goal: 99000 },
  { id: '11', name: 'Smart Farm Expansion', aiRating: 4.96, amount: 5500, poolShare: '3.1%', returned: 0, currentValue: 24.38, profit: '4%', status: 'failed', collected: 50000, goal: 99000 },
];

// Both breakdowns regroup the same 9,354 USDT across the same 38 pools — only the grouping differs.
const INDUSTRY_SEGMENTS: DonutSegment[] = [
  { label: 'Agriculture', value: 1450, poolCount: 6 },
  { label: 'Real estate', value: 3254, poolCount: 7 },
  { label: 'Energy', value: 980, poolCount: 4 },
  { label: 'Logistics', value: 760, poolCount: 3 },
  { label: 'Technology', value: 1120, poolCount: 5 },
  { label: 'Manufacturing', value: 640, poolCount: 3 },
  { label: 'Hospitality', value: 420, poolCount: 2 },
  { label: 'Healthcare', value: 230, poolCount: 2 },
  { label: 'Retail', value: 100, poolCount: 1 },
  { label: 'Mining', value: 120, poolCount: 1 },
  { label: 'Aquaculture', value: 90, poolCount: 1 },
  { label: 'Forestry', value: 70, poolCount: 1 },
  { label: 'Other', value: 120, poolCount: 2 },
];

const PROJECT_SEGMENTS: DonutSegment[] = [
  { label: 'Smart Farm Expansion', value: 2340, poolCount: 8 },
  { label: 'Urban Solar Grid', value: 2020, poolCount: 7 },
  { label: 'Coastal Aquaculture', value: 1280, poolCount: 6 },
  { label: 'Tech Hub Development', value: 980, poolCount: 5 },
  { label: 'Green Logistics Fleet', value: 870, poolCount: 4 },
  { label: 'Med Park Residences', value: 640, poolCount: 3 },
  { label: 'Highland Vineyards', value: 520, poolCount: 2 },
  { label: 'Riverside Logistics Hub', value: 410, poolCount: 2 },
  { label: 'Sunrise Hospitality Group', value: 294, poolCount: 1 },
];

const CHART_VIEWS = {
  industry: { totalUsdt: '9,354', subtitle: '24 industries · 38 pools', segments: INDUSTRY_SEGMENTS },
  projects: { totalUsdt: '9,354', subtitle: '9 projects · 38 pools', segments: PROJECT_SEGMENTS },
} as const;

type TabKey = 'all' | 'payouts' | 'favourites';
type SortKey = 'pool' | 'rating' | 'amount' | 'share' | 'returned' | 'value' | 'profit';

const ROWS_PER_PAGE = 11;
const TOTAL_MOCK_PAGES = 10;

// ── Component ─────────────────────────────────────────────────────────────────

const Portfolio: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [chartFilter, setChartFilter] = useState<'industry' | 'projects' | 'countries'>('industry');
  const [sortKey, setSortKey] = useState<SortKey>('pool');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const TABS: { key: TabKey; label: string }[] = [
    { key: 'all', label: 'All pools' },
    { key: 'payouts', label: 'Payouts' },
    { key: 'favourites', label: 'Favourites' },
  ];

  const TABLE_COLS: { key: SortKey; label: string; width: string }[] = [
    { key: 'pool', label: 'Pool', width: 'w-[200px]' },
    { key: 'rating', label: 'AI Rating', width: 'flex-1' },
    { key: 'amount', label: 'Amount (USDT)', width: 'flex-1' },
    { key: 'share', label: 'Pool share', width: 'flex-1' },
    { key: 'returned', label: 'Returned (USDT)', width: 'flex-1' },
    { key: 'value', label: 'Current value (USDT)', width: 'flex-1' },
    { key: 'profit', label: 'Profit', width: 'flex-1' },
  ];

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(prev => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const totalPages = TOTAL_MOCK_PAGES;
  const paginated = MOCK_POOLS.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);
  // 'countries' has no button yet (backend not ready), so this only ever sees 'industry' | 'projects'.
  const chartView = CHART_VIEWS[chartFilter as 'industry' | 'projects'] ?? CHART_VIEWS.industry;

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
              />
            </div>

            {/* Right – Stats grid */}
            <div className="flex flex-[1_0_0] flex-col gap-2.5 min-w-0">
              <div className="flex gap-2.5">
                <PortfolioStatCard
                  value="+128.61"
                  sublabel="REALIZED"
                  label="PNL, USDT"
                  icon={<Icon name="check" className="size-5 text-black" />}
                />
                <PortfolioStatCard
                  value="-16.54"
                  sublabel="UNREALIZED"
                  label="PNL, USDT"
                  icon={<Icon name="triangle" className="size-5 text-black rotate-180" />}
                />
              </div>
              <div className="flex gap-2.5">
                <PortfolioStatCard
                  value="8.5%"
                  label="AVERAGE ROI"
                  icon={<Icon name="share" className="size-5 text-black" />}
                />
                <PortfolioStatCard
                  value="654"
                  label="AIRDROP POINTS"
                  icon={<Icon name="plus" className="size-5 text-black" />}
                />
              </div>
              <div className="flex gap-2.5">
                <PortfolioStatCard
                  value="47"
                  label="TRADING EARNINGS, USDT"
                  icon={<Icon name="triangle" className="size-5 text-black" />}
                />
                <PortfolioStatCard
                  value="458"
                  label="CLAIMABLE AMOUNT, USDT"
                  onAction={() => {}}
                  actionLabel="Withdraw"
                  icon={<Icon name="person" className="size-5 text-black" />}
                />
              </div>
            </div>
          </div>

          {/* ── Table section ── */}
          <div className="flex flex-col gap-4">
            {/* Top pagination */}
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
                {paginated.length === 0 ? (
                  <div className="py-12 text-center text-sm text-label-tertiary border-x border-b border-stroke-primary">
                    No pools found.
                  </div>
                ) : (
                  paginated.map(pool => (
                    <div key={pool.id} className="-mt-px">
                      <PortfolioPoolRow pool={pool} />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom pagination */}
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </Wrapper>
      </section>
    </DashboardLayout>
  );
};

export default Portfolio;
