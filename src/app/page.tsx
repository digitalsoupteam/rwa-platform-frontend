import React, { FC } from 'react';
import clsx from 'clsx';

import { Hero, HowItWorks, HowToStart } from '@/components/home';
import { FAQ } from '@/components/common';
import { Wrapper } from '@/components/layout';
import { Button, Card, Title } from '@/components/ui';
import { ProjectCard } from '@/components/project';

const Home: FC = () => {
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
      <Hero />
      <HowItWorks />
      <section className={'mb-25 md:mb-50'}>
        <Wrapper>
          <div className={'text-center mb-10 md:mb-20'}>
            <Title className={'mb-3 md:mb-6'} size={'lg'} level={2}>
              Choose from hundreds <br />
              of&nbsp;promising projects
            </Title>
            <p className={'text-grey-dark text-base/[1.4]'}>Find assets that meet your goals</p>
          </div>
          <div className={'grid gap-3 mb-6 md:mb-5 md:gap-5 sm:grid-cols-2 lg:grid-cols-3'}>
            {projects &&
              projects.length > 0 &&
              projects.map((project, index) => (
                <ProjectCard className={clsx(index > 3 && 'max-md:hidden')} project={project} key={project.id} />
              ))}
          </div>
          <Button className={'w-full'} visualType={'secondary'} href={'#'}>
            See 999 more projects
          </Button>
        </Wrapper>
      </section>
      <section className={'mb-25 md:mb-50'}>
        <Wrapper>
          <Title className={'text-center mb-10 md:mb-20'} size={'lg'} level={2}>
            Ready to earn more? <br />
            Trade your assets
          </Title>
          <div className={'grid gap-3 mb-10 md:mb-15 md:grid-cols-2 md:gap-5'}>
            <Card size={'xl'} color={'white'}>
              <div className={'size-9 bg-blue-gradient mask-[url(/icons/rocket.svg)] mask-contain] mb-10'} />
              <Title className={'mb-3'} size={'md'} level={4}>
                For early buyers
              </Title>
              <p className={'text-grey-dark text-base[1.4] font-medium'}>
                Sell your tokens to late buyers at a profit up to 300% without waiting for payments
              </p>
            </Card>
            <Card size={'xl'} color={'greyLight'}>
              <div className={'size-9 bg-blue-gradient mask-[url(/icons/finish.svg)] mask-contain] mb-10'} />
              <Title className={'mb-3'} size={'md'} level={4}>
                For late buyers
              </Title>
              <p className={'text-grey-dark text-base[1.4] font-medium'}>
                Buy project tokens even after the fundraising has ended and get payments in the future
              </p>
            </Card>
          </div>
          <Title className={'text-center mb-7 md:mb-10 lg:text-start'} size={'sm'}>
            Join most active projects
          </Title>
          <div className={'grid gap-3 mb-6 md:mb-5 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
            {projects &&
              projects.length > 0 &&
              projects.slice(0,4).map((project) => (
                <ProjectCard project={project} key={'rdy2earn' + project.id} />
              ))}
          </div>
          <Button className={'w-full'} visualType={'secondary'} href={'#'}>
            See 999 more projects
          </Button>
        </Wrapper>
      </section>
      <HowToStart/>
      <FAQ />
    </>
  );
};

export default Home;
