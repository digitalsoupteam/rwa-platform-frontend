'use client';

import { useParams } from 'next/navigation';
import React, { FC } from 'react';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Breadcrumbs } from '@/components/dashboard';
import { Title } from '@/components/ui';

const CompanyPage: FC = () => {
  const params = useParams();
  const id = params.id as string;

  // const postData = await API.Service.GetService(slug);

  return (
    <DashboardLayout>
      <section className={'mb-12'}>
        <Wrapper>
          <Breadcrumbs items={[{ name: 'My companies', url: '/dashboard/' }]} currentItem={id} />
          <div className={'border-b-1 border-stroke-primary pb-6'}>
            <Title className={'mb-4'} size={'xs'}>
              GreentechCapital LLC
            </Title>
            <div className={'text-base text-black max-w-[560px]'}>
              GreentechCapital LLC is a forward-thinking company dedicated to the development and implementation of
              innovative green technologies
            </div>
          </div>
        </Wrapper>
      </section>
    </DashboardLayout>
  );
};

export default CompanyPage;
