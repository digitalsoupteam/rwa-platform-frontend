'use client';

import React, { ChangeEventHandler, FC, FormEventHandler, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Breadcrumbs } from '@/components/dashboard';
import { Button, Input, TextArea, Title, toast } from '@/components/ui';
import { useMutation, useQuery } from '@apollo/client/react';
import { EDIT_BUSINESS, GET_BUSINESS } from '@/lib/business/operations';
import { GET_COMPANY } from '@/lib/company/operations';
import { NewsList } from '@/components/news';
import { Modal } from '@/components/common';

const ProjectPage: FC = () => {
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [aboutValue, setAboutValue] = useState('');
  const [errors, setErrors] = useState({ name: '', about: '' });

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

  const [editBusiness, { data: updatedBusiness, loading: updatingBusiness }] = useMutation(EDIT_BUSINESS);

  const company = companyData?.getCompany;
  const project = businessData?.getBusiness;

  const validateName = (value?: string) => (value ?? nameValue).length > 2;
  const validateAbout = (value?: string) => (value ?? aboutValue).length > 2;

  const nameChangeHandler: ChangeEventHandler<HTMLInputElement> = evt => {
    if (validateName(evt.target.value)) setErrors(prev => ({ ...prev, name: '' }));
    setNameValue(evt.target.value);
  };

  const aboutChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = evt => {
    if (validateAbout(evt.target.value)) setErrors(prev => ({ ...prev, about: '' }));
    setAboutValue(evt.target.value);
  };

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = async evt => {
    evt.preventDefault();

    const currentErrors = { ...errors };
    const isNameValid = validateName();
    const isAboutValid = validateAbout();

    if (!isNameValid) currentErrors.name = 'Enter project name';
    if (!isAboutValid) currentErrors.about = 'Enter description';

    setErrors(currentErrors);
    if (!isNameValid || !isAboutValid) return;

    try {
      await editBusiness({
        variables: {
          input: {
            id: projectId,
            updateData: {
              name: nameValue,
              description: aboutValue,
            },
          },
        },
      });

      setIsEditModalOpened(false);
      toast('Project successfully updated!');
    } catch {
      toast('Failed to update project. Please try again.', 'error');
    }
  };

  useEffect(() => {
    if (!project) return;
    setNameValue(project.name);
    setAboutValue(project.description ?? '');
  }, [project]);

  return (
    <DashboardLayout>
      <section className={'mb-12'}>
        <Wrapper>
          <Breadcrumbs
            items={[
              { name: 'My companies', url: '/dashboard/' },
              { name: company?.name ?? '...', url: `/dashboard/my-companies/${companyId}` },
            ]}
            currentItem={updatedBusiness?.editBusiness.name ?? project?.name ?? '...'}
          />
          {project && (
            <div className={'flex flex-col gap-6 border-b-1 border-stroke-primary pb-6 lg:grid lg:grid-cols-2'}>
              <div>
                <Title className={'mb-4'} size={'xs'}>
                  {updatedBusiness?.editBusiness.name ?? project.name}
                </Title>
                <div className={'text-base text-black max-w-[560px]'}>
                  {updatedBusiness?.editBusiness.description ?? project.description}
                </div>
              </div>
              <div className={'flex gap-2 lg:items-end lg:justify-end'}>
                <Button
                  className={
                    'max-md:w-full before:size-3.5 before:mask-[url(/icons/edit.svg)] mask-contain before:bg-current'
                  }
                  visualType={'quinary'}
                  onClick={() => setIsEditModalOpened(true)}
                >
                  Update
                </Button>
                <Button
                  className={
                    'max-md:w-full before:size-3.5 before:mask-[url(/icons/share.svg)] mask-contain before:bg-current'
                  }
                  visualType={'quinary'}
                >
                  Share
                </Button>
              </div>
            </div>
          )}
        </Wrapper>
      </section>

      <section className={'mb-12'}>
        <Wrapper>
          <NewsList projectId={projectId} projectName={project?.name} />
        </Wrapper>
      </section>

      <Modal isOpened={isEditModalOpened} closeModal={() => setIsEditModalOpened(false)}>
        <div className={'text-base font-medium pr-14 pb-4.5 pl-4 border-b-1 border-stroke-primary mb-6'}>
          Edit project
        </div>
        <form onSubmit={formSubmitHandler}>
          <div className={'px-4 mb-6'}>
            <div className={'text-sm font-medium mb-3'}>
              Project name<span className={'text-red-bright'}>*</span>
            </div>
            <Input
              placeholder={'For example, «Green Fund Series A»'}
              size={'sm'}
              colorScheme={'light'}
              errorMessage={errors.name}
              type={'text'}
              name={'projectName'}
              value={nameValue}
              onChange={nameChangeHandler}
            />
          </div>
          <div className={'px-4 mb-6'}>
            <div className={'text-sm font-medium mb-3'}>
              Description<span className={'text-red-bright'}>*</span>
            </div>
            <TextArea
              className={'h-[110px]'}
              maxLength={250}
              errorMessage={errors.about}
              placeholder={'Write a short description for your project'}
              name={'projectAbout'}
              value={aboutValue}
              onChange={aboutChangeHandler}
            />
          </div>
          <div className={'px-4 flex justify-end'}>
            <Button visualType={'quaternary'} type={'submit'} disabled={updatingBusiness}>
              Apply
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default ProjectPage;
