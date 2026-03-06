'use client';

import React, { FC } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Breadcrumbs } from '@/components/dashboard';
import { Title } from '@/components/ui';
import { useQuery } from '@apollo/client/react';
import { GET_BUSINESS } from '@/lib/business/operations';
import { GET_COMPANY } from '@/lib/company/operations';
import { NewsList } from '@/components/news';

const ProjectPage: FC = () => {
  const params = useParams();
  const companyId = params.id as string;
  const projectId = params.projectId as string;

  const { data: companyData } = useQuery(GET_COMPANY, {
    variables: { id: companyId },
    skip: !companyId,
  });

  const { data: businessData } = useQuery(GET_BUSINESS, {
    variables: { id: projectId },
    skip: !projectId,
  });

  const company = companyData?.getCompany;
  const project = businessData?.getBusiness;
  return (
    <DashboardLayout>
      <section className={'mb-12'}>
        <Wrapper>
          <Breadcrumbs
            items={[
              { name: 'My companies', url: '/dashboard/' },
              { name: company?.name ?? '...', url: `/dashboard/my-companies/${companyId}` },
            ]}
            currentItem={project?.name ?? '...'}
          />
          {project && (
            <div className={'border-b-1 border-stroke-primary pb-6'}>
              <Title className={'mb-4'} size={'xs'}>
                {project.name}
              </Title>
              <div className={'text-base text-black max-w-[560px]'}>{project.description}</div>
            </div>
          )}
        </Wrapper>
      </section>

      <section className={'mb-12'}>
        <Wrapper>
          <NewsList projectId={projectId} projectName={project?.name} />
        </Wrapper>
      </section>
    </DashboardLayout>
  );
};

export default ProjectPage;