'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { ChangeEventHandler, FC, FormEventHandler, useEffect, useState } from 'react';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Breadcrumbs } from '@/components/dashboard';
import { Button, Input, TextArea, Title, toast } from '@/components/ui';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_COMPANY, UPDATE_COMPANY, DELETE_COMPANY } from '@/lib/company/operations';
import { Modal } from '@/components/common';

const CompanyPage: FC = () => {
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [deletingCompanyStatus, setDeletingCompanyStatus] = useState<'idle' | 'approve' | 'pending'>('idle');
  const [nameValue, setNameValue] = useState('');
  const [aboutValue, setAboutValue] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    about: '',
  });
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const {
    data: companyData,
    loading: companyDataLoading,
  } = useQuery(GET_COMPANY, {
    variables: { id },
  });

  const [updateCompany, { data: updatedCompany, loading: updatingCompany }] = useMutation(UPDATE_COMPANY);

  const [deleteCompany] = useMutation(DELETE_COMPANY);

  const validateName = (value?: string) => (value || nameValue).length > 2;
  const validateAbout = (value?: string) => (value || aboutValue).length > 2;

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

    if (!isNameValid) currentErrors.name = 'Enter company name';
    if (!isAboutValid) currentErrors.about = 'Enter about';

    setErrors(currentErrors);

    if (!isAboutValid || !isNameValid) return;

    try {
      await updateCompany({
        variables: {
          input: {
            id,
            updateData: {
              name: nameValue,
              description: aboutValue,
            },
          },
        },
      });

      setIsEditModalOpened(false);
      toast('Company successfully updated!');
    } catch (err) {
      toast('Failed to update company. Please try again.', 'error');
    }
  };

  const deleteCompanyHandler = async () => {
    if (deletingCompanyStatus === 'idle') setDeletingCompanyStatus('approve');
    if (deletingCompanyStatus === 'approve') {
      setDeletingCompanyStatus('pending');

      try {
        await deleteCompany({
          variables: {
            id,
          },
        });

        toast('Company deleted.');
        setIsEditModalOpened(false);
        router.push('/dashboard/');
      } catch (err) {
        setDeletingCompanyStatus('approve');
        toast('Failed to delete company. Please try again.', 'error');
      }
    }
  };

  useEffect(() => {
    if (!companyData) return;

    setNameValue(companyData.getCompany.name);
    setAboutValue(companyData.getCompany.description);
  }, [companyData]);

  return (
    <DashboardLayout>
      <section className={'mb-12'}>
        <Wrapper>
          {companyDataLoading && 'Loading...'}
          {companyData && (
            <>
              <Breadcrumbs
                items={[{ name: 'My companies', url: '/dashboard/' }]}
                currentItem={updatedCompany?.updateCompany.name || companyData.getCompany.name}
              />
              <div className={'flex flex-col gap-6 border-b-1 border-stroke-primary pb-6 lg:grid lg:grid-cols-2'}>
                <div>
                  <Title className={'mb-4'} size={'xs'}>
                    {updatedCompany?.updateCompany.name || companyData.getCompany.name}
                  </Title>
                  <div className={'text-base text-black max-w-[560px]'}>
                    {updatedCompany?.updateCompany.description || companyData.getCompany.description}
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
            </>
          )}
        </Wrapper>
      </section>
      <Modal isOpened={isEditModalOpened} closeModal={() => setIsEditModalOpened(false)}>
        <div className={'text-base font-medium pr-14 pb-4.5 pl-4 border-b-1 border-stroke-primary mb-6'}>
          Edit company
        </div>
        <form onSubmit={formSubmitHandler}>
          <div className={'px-4 mb-6'}>
            <div className={'text-sm font-medium mb-3'}>
              Company name
              <span className={'text-red-bright'}>*</span>
            </div>
            <Input
              placeholder={'For example, «GreentechCapital LLC» or «John Doe, Ltd»'}
              size={'sm'}
              colorScheme={'light'}
              errorMessage={errors.name}
              type={'text'}
              name={'companyName'}
              value={nameValue}
              onChange={nameChangeHandler}
            />
          </div>
          <div className={'px-4 mb-6'}>
            <div className={'text-sm font-medium mb-3'}>
              About
              <span className={'text-red-bright'}>*</span>
            </div>
            <TextArea
              className={'h-[110px]'}
              maxLength={250}
              errorMessage={errors.about}
              placeholder={'Write a short description for your company'}
              name={'companyAbout'}
              value={aboutValue}
              onChange={aboutChangeHandler}
            />
          </div>
          <div className={'px-4 flex justify-between'}>
            <Button className={'relative'} visualType={'quinary'} type={'button'} onClick={deleteCompanyHandler}>
              {deletingCompanyStatus === 'idle' && <span>Delete company</span>}
              {deletingCompanyStatus === 'approve' && (
                <>
                  <span>Yes. I'm sure</span>
                  <span className={'pointer-events-none text-start absolute w-max text-red-500 left-full ml-2'}>
                    Are your sure? <br />
                    You cannot cancel this.
                  </span>
                </>
              )}
              {deletingCompanyStatus === 'pending' && <span>Loading..</span>}
            </Button>
            <Button visualType={'quaternary'} type={'submit'} disabled={updatingCompany}>
              Apply
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default CompanyPage;
