'use client';

import React, { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { Wrapper } from '@/components/layout';
import { Button, ButtonBorderDash, Input, TextArea, Title, toast } from '@/components/ui';
import { Modal } from '@/components/common';
import { useMutation, useQuery } from '@apollo/client/react';
import { CREATE_COMPANY, GET_COMPANIES } from '@/lib/company/operations';
import { useAuth } from '@/lib/auth/AuthContext';
import clsx from 'clsx';
import Link from 'next/link';

const CompanyList: FC = () => {
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [aboutValue, setAboutValue] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    about: '',
  });
  const { user } = useAuth();

  const [createCompany] = useMutation(CREATE_COMPANY);

  const {
    data: userCompanies,
    loading: userCompaniesLoading,
    refetch: refetchUserCompanies,
  } = useQuery(GET_COMPANIES, {
    variables: { input: { filter: { ownerId: user?.userId } } },
  });

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
      await createCompany({
        variables: {
          input: {
            name: nameValue,
            description: aboutValue,
          },
        },
      });

      await refetchUserCompanies();
      setIsCreateModalOpened(false);
      toast('Company successfully created!');
    } catch (err) {
      toast('Failed to create company. Please try again.', 'error');
    }
  };

  return (
    <>
      <section className={'mb-12'}>
        <Wrapper>
          <Title className={'mb-6'} size={'xs'} level={2}>
            Companies
          </Title>
          <div className={'grid lg:grid-cols-2 gap-4'}>
            {userCompanies?.getCompanies &&
              userCompanies.getCompanies.length > 0 &&
              userCompanies.getCompanies.map(company => (
                <Link
                  className={'p-4 border-1 border-stroke-primary rounded-xl'}
                  href={`/company/${company.id}`}
                  key={company.id}
                >
                  <div className={'text-xl font-semibold mb-3'}>{company.name}</div>
                  <div className={'text-base'}>{company.description}</div>
                </Link>
              ))}
            <ButtonBorderDash
              className={clsx(
                userCompanies?.getCompanies && userCompanies?.getCompanies.length > 0
                  ? 'min-h-[98px]'
                  : 'min-h-[297px] max-w-110'
              )}
              id={'createCompanyButton'}
              onClick={() => setIsCreateModalOpened(true)}
            >
              Create company
            </ButtonBorderDash>
          </div>
        </Wrapper>
      </section>
      <Modal isOpened={isCreateModalOpened} closeModal={() => setIsCreateModalOpened(false)}>
        <div className={'text-base font-medium pr-14 pb-4.5 pl-4 border-b-1 border-stroke-primary mb-6'}>
          Add new company
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
          <div className={'px-4 flex justify-end'}>
            <Button visualType={'quaternary'} type={'submit'} disabled={userCompaniesLoading}>
              Apply
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CompanyList;
