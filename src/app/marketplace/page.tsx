'use client';

import React, { FC, useState } from 'react';
import { CommonLayout, Wrapper } from '@/components/layout';
import { Button, Title } from '@/components/ui';
import { FAQ } from '@/components/common';
import { MarketplaceCard, MarketplaceFilters, MobileFiltersModal } from '@/components/marketplace';
import type { MarketplaceProject } from '@/components/marketplace';
import { Icon } from '@/components/ui';

const ALL_PROJECTS: MarketplaceProject[] = [
  { id: 'proj-1',  name: 'EcoGrow',      tokenTicker: 'ECG', price: '71.03 USDT',  monthlyProfit: '6',   collected: 71000,  total: 100000, dueDate: '30.06.26', iconBg: 'linear-gradient(135deg, #1D58E9, #38abe3)' },
  { id: 'proj-2',  name: 'UrbanVault',   tokenTicker: 'URV', price: '64.55 USDT',  monthlyProfit: '4.5', collected: 48000,  total: 80000,  dueDate: '15.07.26', iconBg: 'linear-gradient(135deg, #18E53A, #1D58E9)' },
  { id: 'proj-3',  name: 'MediChain',    tokenTicker: 'MDC', price: '71.03 USDT',  monthlyProfit: '7',   collected: 22000,  total: 120000, dueDate: '01.08.26', iconBg: 'linear-gradient(135deg, #BE142A, #1D58E9)' },
  { id: 'proj-4',  name: 'ArtVault',     tokenTicker: 'ATV', price: '22.00 USDT',  monthlyProfit: '5',   collected: 15000,  total: 50000,  dueDate: '20.06.26', iconBg: 'linear-gradient(135deg, #6DBDFF, #1D58E9)' },
  { id: 'proj-5',  name: 'GridLink',     tokenTicker: 'GRL', price: '51.01 USDT',  monthlyProfit: '6.8', collected: 63000,  total: 90000,  dueDate: '10.07.26', iconBg: 'linear-gradient(135deg, #38abe3, #18E53A)' },
  { id: 'proj-6',  name: 'LuxeToken',    tokenTicker: 'LXT', price: '71.03 USDT',  monthlyProfit: '3.9', collected: 95000,  total: 100000, dueDate: '30.05.26', iconBg: 'linear-gradient(135deg, #202E46, #6DBDFF)' },
  { id: 'proj-7',  name: 'EnterpriseDAO',tokenTicker: 'END', price: '64.55 USDT',  monthlyProfit: '5.5', collected: 41000,  total: 150000, dueDate: '01.09.26', iconBg: 'linear-gradient(135deg, #1D58E9, #BE142A)' },
  { id: 'proj-8',  name: 'StageFund',    tokenTicker: 'STF', price: '22.00 USDT',  monthlyProfit: '8',   collected: 18000,  total: 60000,  dueDate: '15.08.26', iconBg: 'linear-gradient(135deg, #38abe3, #6DBDFF)' },
  { id: 'proj-9',  name: 'BridgeCapital',tokenTicker: 'BRC', price: '71.03 USDT',  monthlyProfit: '4.2', collected: 85000,  total: 110000, dueDate: '20.07.26', iconBg: 'linear-gradient(135deg, #202E46, #1D58E9)' },
  { id: 'proj-10', name: 'GreenField',   tokenTicker: 'GRF', price: '51.01 USDT',  monthlyProfit: '5.9', collected: 8000,   total: 75000,  dueDate: '30.09.26', iconBg: 'linear-gradient(135deg, #18E53A, #38abe3)' },
  { id: 'proj-11', name: 'CityBlock',    tokenTicker: 'CTB', price: '64.55 USDT',  monthlyProfit: '4.8', collected: 92000,  total: 100000, dueDate: '10.06.26', iconBg: 'linear-gradient(135deg, #6DBDFF, #18E53A)' },
  { id: 'proj-12', name: 'DataCore',     tokenTicker: 'DTC', price: '22.00 USDT',  monthlyProfit: '6.3', collected: 35000,  total: 80000,  dueDate: '25.08.26', iconBg: 'linear-gradient(135deg, #1D58E9, #202E46)' },
];

const ACTIVE_FILTER_CHIPS = ['Active', 'Blockchain', 'Commodity'];

const FAQ_LIST = [
  {
    question: 'How am I protected from fraud?',
    answer: (
      <>
        <p>We aim to create a safe and secure environment for all users by combining these measures:</p>
        <ul>
          <li>We use Know Your Client (KYC) protocols to verify every project</li>
          <li>Our platform uses audited smart contracts to ensure that transactions are secure and tamper-proof</li>
          <li>We provide resources to educate users on common scams and best practices for online security</li>
          <li>Our platform has a dispute resolution system in place to handle any issues that may arise during transactions</li>
        </ul>
      </>
    ),
  },
  {
    question: 'What are the legal implications of tokenizing my business assets?',
    answer: (
      <p>
        Tokenization of business assets involves legal considerations that vary by jurisdiction. Our team ensures all
        projects comply with applicable regulations, including securities law and AML requirements. Each project
        undergoes thorough legal review before being listed on the marketplace.
      </p>
    ),
  },
  {
    question: 'How can I ensure the security of my tokens?',
    answer: (
      <p>
        All tokens on Slices are backed by audited smart contracts on reputable blockchains. You retain full
        ownership of your private keys, and all transactions are transparent and verifiable on-chain. We also
        recommend using a hardware wallet for additional security.
      </p>
    ),
  },
];

const VISIBLE_COUNT = 9;

const Marketplace: FC = () => {
  const [activeChips, setActiveChips] = useState(ACTIVE_FILTER_CHIPS);
  const [showAll, setShowAll] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const removeChip = (chip: string) => setActiveChips(prev => prev.filter(c => c !== chip));

  const visibleProjects = showAll ? ALL_PROJECTS : ALL_PROJECTS.slice(0, VISIBLE_COUNT);

  return (
    <CommonLayout>
      {/* Hero */}
      <section className={'relative pt-[96px] pb-25 md:pb-37.5 md:pt-[184px]'}>
        <div
          className={
            'absolute inset-x-0 top-0 -bottom-[360px] md:-bottom-[110px] ' +
            'bg-[url(/images/market-bg-m.png)] bg-top bg-cover bg-no-repeat ' +
            'md:bg-[url(/images/market-bg-d.png)] md:bg-size-[100%_660px] -z-10'
          }
        />
        <Wrapper>
          <div className={'relative flex flex-col items-center'}>
            <Title className={'text-white text-center mb-4 max-w-[860px]'} size={'xl'} level={1}>
              Choose from hundreds of promising projects
            </Title>
            <p className={'text-base/[1.4] text-center text-white max-w-[560px]'}>
              Select pools by price, rating, or industry — and start earning today
            </p>
          </div>
        </Wrapper>
      </section>

      {/* Marketplace content */}
      <section className={'relative z-10 mb-25 md:mb-50'}>
        <Wrapper>
          {/* Main layout */}
          <div className={'flex gap-5 items-start'}>
            {/* Sidebar (desktop only) */}
            <div className={'hidden lg:block w-[272px] shrink-0 sticky top-24'}>
              <MarketplaceFilters />
            </div>

            {/* Content column */}
            <div className={'flex-1 min-w-0'}>
              {/* Mobile: section title + filter trigger */}
              <div className={'lg:hidden flex flex-col gap-6 mb-10'}>
                <div className={'flex flex-col gap-3 text-center'}>
                  <p className={'text-[32px] font-semibold leading-none tracking-[-1.5px] text-black'}>
                    Choose from hundreds of promising projects
                  </p>
                  <p className={'text-base leading-[1.4] text-grey-dark'}>
                    Find assets that meet your goals
                  </p>
                </div>
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className={'w-full flex items-center justify-between border border-grey rounded-xl h-[40px] px-5 tr-d-all'}
                >
                  <span className={'text-base leading-[1.4] text-grey-dark'}>Filters</span>
                  <Icon name={'tick'} className={'size-5 shrink-0 rotate-90 text-grey-dark'} />
                </button>
              </div>

              {/* Filter chips (desktop only) */}
              <div className={'hidden lg:flex flex-wrap gap-3 mb-9'}>
                {activeChips.map(chip => (
                  <button
                    key={chip}
                    onClick={() => removeChip(chip)}
                    className={
                      'shrink-0 flex items-center gap-4 bg-blue-dim text-black text-sm font-normal px-4 py-2 rounded-full tr-d-all hover:bg-blue-dim/70'
                    }
                  >
                    {chip}
                    <span className={'size-2 mask-contain mask-[url(/icons/cross.svg)] bg-black'} />
                  </button>
                ))}
                {activeChips.length === 0 && (
                  <span className={'text-sm text-grey-dark py-2'}>No active filters</span>
                )}
                {activeChips.length > 0 && (
                  <button
                    onClick={() => setActiveChips([])}
                    className={'shrink-0 flex items-center gap-2 text-black text-sm font-normal py-2 tr-d-all hover:text-grey-dark'}
                  >
                    <span className={'size-5 mask-contain mask-[url(/icons/cross.svg)] bg-black'} />
                    Clear all
                  </button>
                )}
              </div>

              <div className={'grid gap-3 sm:grid-cols-2 xl:grid-cols-3 mb-5'}>
                {visibleProjects.map(project => (
                  <MarketplaceCard key={project.id} project={project} />
                ))}
              </div>
              {!showAll && ALL_PROJECTS.length > VISIBLE_COUNT && (
                <Button
                  className={'w-full'}
                  visualType={'secondary'}
                  onClick={() => setShowAll(true)}
                >
                  Show more projects
                </Button>
              )}
            </div>
          </div>
        </Wrapper>
      </section>

      <FAQ title={'You might want to know'} faqList={FAQ_LIST} />

      {/* Mobile filters modal */}
      {mobileFiltersOpen && (
        <MobileFiltersModal
          activeChips={activeChips}
          onRemoveChip={removeChip}
          onClearAll={() => setActiveChips([])}
          onClose={() => setMobileFiltersOpen(false)}
        />
      )}
    </CommonLayout>
  );
};

export default Marketplace;