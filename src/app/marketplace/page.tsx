'use client';

import React, { FC, useState } from 'react';
import { CommonLayout, Wrapper } from '@/components/layout';
import { Button, Title } from '@/components/ui';
import { FAQ } from '@/components/common';
import { MarketplaceCard, MarketplaceFilters } from '@/components/marketplace';
import type { MarketplaceProject } from '@/components/marketplace';
import clsx from 'clsx';

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
      <section
        className={
          'bg-[url(/images/tokenization-bg-m.png)] bg-top bg-cover bg-no-repeat pt-[96px] pb-25 md:bg-size-[100%_660px] md:pb-37.5 md:pt-[184px] md:bg-[url(/images/tokenization-bg-d.png)]'
        }
      >
        <Wrapper>
          <div className={'flex flex-col items-center'}>
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
      <section className={'mb-25 md:mb-50'}>
        <Wrapper>
          {/* Filter chips + mobile filter toggle */}
          <div className={'flex items-center gap-2 mb-6 md:mb-8'}>
            <div className={'flex gap-2 overflow-x-auto scrollbar-hidden flex-1'}>
              {activeChips.map(chip => (
                <button
                  key={chip}
                  onClick={() => removeChip(chip)}
                  className={
                    'shrink-0 flex items-center gap-1.5 bg-blue-light text-blue text-sm font-medium px-3 py-1.5 rounded-full tr-d-all hover:bg-blue-dim'
                  }
                >
                  {chip}
                  <span className={'size-3 mask-contain mask-[url(/icons/cross.svg)] bg-blue'} />
                </button>
              ))}
              {activeChips.length === 0 && (
                <span className={'text-sm text-grey-dark py-1.5'}>No active filters</span>
              )}
            </div>
            <button
              className={
                'lg:hidden shrink-0 flex items-center gap-1.5 border-1 border-stroke-primary bg-white text-sm font-medium px-3 py-1.5 rounded-full tr-d-all hover:bg-grey-light'
              }
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <span className={'size-4 mask-contain mask-[url(/icons/burger.svg)] bg-black'} />
              Filters
            </button>
          </div>

          {/* Mobile filters drawer */}
          {mobileFiltersOpen && (
            <div className={'lg:hidden mb-6'}>
              <MarketplaceFilters />
            </div>
          )}

          {/* Main layout */}
          <div className={'flex gap-5 items-start'}>
            {/* Sidebar */}
            <div className={'hidden lg:block w-[272px] shrink-0 sticky top-24'}>
              <MarketplaceFilters />
            </div>

            {/* Cards + load more */}
            <div className={'flex-1 min-w-0'}>
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
    </CommonLayout>
  );
};

export default Marketplace;