'use client';

import React, { FC, useState } from 'react';
import { Wrapper } from '@/components/layout';
import { ProjectCardType } from '@/components/project/ProjectCard/ProjectCard';
import { ProjectCard } from '@/components/project';
import { Chips, FilterItem } from '@/components/ui';

interface MarketArchiveProps {
  projects: ProjectCardType[];
}

const MarketArchive: FC<MarketArchiveProps> = ({ projects }) => {
  return (
    <section className={'mb-25 -mt-[214px] md:mb-50 lg:-mt-15'}>
      <Wrapper>
        <div className={'grid lg:grid-cols-[325px_1fr] lg:gap-5'}>
          <div className={'row-span-2'}>
            <FilterItem
              title={'Sort by'}
              controlType={'radio'}
              items={[
                {
                  label: 'Newest first',
                  name: 'sort_by',
                  value: 'newest_first',
                },
                {
                  label: 'Token price: hight to low',
                  name: 'sort_by',
                  value: 'price_to_low',
                },
                {
                  label: 'Token price: low to high',
                  name: 'sort_by',
                  value: 'price_to_high',
                },
                {
                  label: 'Funding goal: hight to low',
                  name: 'sort_by',
                  value: 'funding_to_low',
                },
                {
                  label: 'Funding goal: low to high',
                  name: 'sort_by',
                  value: 'funding_to_high',
                },
              ]}
            />
          </div>
          <Chips
            className={'mb-15'}
            items={[
              'High ROI',
              'Verified',
              'Real estate',
              'Entertainment',
              'High ROI',
              'Verified',
              'Real estate',
              'Entertainment',
            ]}
          />
          <div className={'grid gap-3 md:gap-5 md:grid-cols-2 xl:grid-cols-3'}>
            {projects &&
              projects.length > 0 &&
              projects.map(project => <ProjectCard project={project} key={project.id} />)}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default MarketArchive;
