import React, { FC } from 'react';
import { Wrapper } from '@/components/layout';
import { Title } from '@/components/ui';
import { FAQ } from '@/components/common';
import { MarketArchive } from '@/components/market';

const page: FC = () => {
  const projects = [
    {
      id: 'project-1',
      name: 'Short project name',
      logo: '/images/mock-project-logo.png',
      network: 'WRY',
      relativeProfitUSDT: 71.55,
      profit: 7,
      pool: {
        current: 50_000,
        target: 99_000,
        dueDate: '2026-01-01',
      },
    },
    {
      id: 'project-2',
      name: 'Long project name that will be truncated',
      logo: '/images/mock-project-logo.png',
      network: 'WRY',
      relativeProfitUSDT: 68.55,
      profit: 7,
      pool: {
        current: 110_000,
        target: 150_000,
        dueDate: '2026-01-01',
      },
    },
    {
      id: 'project-3',
      name: 'Short project name',
      logo: '/images/mock-project-logo.png',
      network: 'WRY',
      relativeProfitUSDT: 71.55,
      profit: 7,
      pool: {
        current: 50_000,
        target: 99_000,
        dueDate: '2026-01-01',
      },
    },
    {
      id: 'project-4',
      name: 'Long project name that will be truncated',
      logo: '/images/mock-project-logo.png',
      network: 'WRY',
      relativeProfitUSDT: 68.55,
      profit: 7,
      pool: {
        current: 110_000,
        target: 150_000,
        dueDate: '2026-01-01',
      },
    },
    {
      id: 'project-5',
      name: 'Short project name',
      logo: '/images/mock-project-logo.png',
      network: 'WRY',
      relativeProfitUSDT: 71.55,
      profit: 7,
      pool: {
        current: 50_000,
        target: 99_000,
        dueDate: '2026-01-01',
      },
    },
    {
      id: 'project-6',
      name: 'Long project name that will be truncated',
      logo: '/images/mock-project-logo.png',
      network: 'WRY',
      relativeProfitUSDT: 68.55,
      profit: 7,
      pool: {
        current: 110_000,
        target: 150_000,
        dueDate: '2026-01-01',
      },
    },
    {
      id: 'project-7',
      name: 'Short project name',
      logo: '/images/mock-project-logo.png',
      network: 'WRY',
      relativeProfitUSDT: 71.55,
      profit: 7,
      pool: {
        current: 50_000,
        target: 99_000,
        dueDate: '2026-01-01',
      },
    },
    {
      id: 'project-8',
      name: 'Long project name that will be truncated',
      logo: '/images/mock-project-logo.png',
      network: 'WRY',
      relativeProfitUSDT: 68.55,
      profit: 7,
      pool: {
        current: 110_000,
        target: 150_000,
        dueDate: '2026-01-01',
      },
    },
    {
      id: 'project-9',
      name: 'Short project name',
      logo: '/images/mock-project-logo.png',
      network: 'WRY',
      relativeProfitUSDT: 71.55,
      profit: 7,
      pool: {
        current: 50_000,
        target: 99_000,
        dueDate: '2026-01-01',
      },
    },
  ];

  return (
    <>
      <section
        className={
          'bg-[url(/images/marketplace-m.png)] bg-top bg-cover bg-no-repeat pt-[96px] pb-[416px] md:pb-[260px] md:bg-size-[100%_838px] md:pt-[184px] md:bg-[url(/images/marketplace-d.png)]'
        }
      >
        <Wrapper>
          <div className={'flex flex-col items-center mb-33 md:mb-37.5'}>
            <Title className={'text-white text-center mb-4 max-w-[1122px]'} size={'xl'} level={1}>
              Choose from hundreds of promising projects
            </Title>
            <p className={'text-base/[1.4] text-center text-white mb-8'}>
              Select pools by price, rating, or industry — and start earning today
            </p>
          </div>
        </Wrapper>
      </section>
      <MarketArchive projects={projects} />
      <FAQ
        faqList={[
          {
            question: 'How am I protected from fraud?',
            answer: (
              <>
                <p>We aim to create a safe and secure environment for all users by combining these measures:</p>
                <ul>
                  <li>We use Know Your Client (KYC) protocols to verify every project</li>
                  <li>
                    Our platform uses audited smart contracts to ensure that transactions are secure and tamper-proof
                  </li>
                  <li>We provide resources to educate users on common scams and best practices for online security</li>
                  <li>
                    Our platform has a dispute resolution system in place to handle any issues that may arise during
                    transactions
                  </li>
                </ul>
              </>
            ),
          },
          {
            question: 'Can I get investing advice?',
            answer: (
              <>
                <p>
                  Every project on Slices is evaluated by AI and our users - you can check the rating on each project
                  card and make an informed decision.
                </p>
              </>
            ),
          },
          {
            question: 'Is RWA investing risky?',
            answer: (
              <>
                <p>
                  As any other investment, RWA investments depend on market volatility. However, they can also offer
                  higher returns if managed well, as they tap into the value of real-world assets.
                </p>
              </>
            ),
          },
        ]}
      />
    </>
  );
};

export default page;
