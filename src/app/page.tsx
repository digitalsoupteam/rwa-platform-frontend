import React, { FC } from 'react';

import { Hero, HowItWorks } from '@/components/home';
import { FAQ } from '@/components/common';
import { Wrapper } from '@/components/layout';
import { Button, Card, Title } from '@/components/ui';
import Image from 'next/image';
import clsx from 'clsx';
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
          <div className={'grid gap-3 mb-6 md:mb-5 md:gap-5 md:grid-cols-2 lg:grid-cols-3 '}>
            {projects &&
              projects.length > 0 &&
              projects.map((project, index) => (
                <ProjectCard className={clsx(index > 3 && 'max-md:hidden')} project={project} key={project.id}/>
              ))}
          </div>
          <Button className={'w-full'} visualType={'secondary'} href={'#'}>
            See 999 more projects
          </Button>
        </Wrapper>
      </section>
      <FAQ />
    </>
  );
};

export default Home;
