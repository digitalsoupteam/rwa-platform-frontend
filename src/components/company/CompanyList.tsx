'use client';

import React, { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { Wrapper } from '@/components/layout';
import {
  Button,
  ButtonBorderDash,
  CountrySelect,
  EMPTY_SOCIALS,
  Input,
  socialsToArray,
  SocialsErrors,
  SocialsInput,
  SocialsValue,
  TextArea,
  Title,
  toast,
  validateSocials,
} from '@/components/ui';
import { CountryChip, Modal, SocialLinksRow } from '@/components/common';
import { useMutation, useQuery } from '@apollo/client/react';
import { CREATE_COMPANY, GET_COMPANIES } from '@/lib/company/operations';
import { useAuth } from '@/lib/auth/AuthContext';
import clsx from 'clsx';
import Link from 'next/link';

const CompanyList: FC = () => {
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [aboutValue, setAboutValue] = useState('');
  const [countryValue, setCountryValue] = useState<string | null>(null);
  const [socialsValue, setSocialsValue] = useState<SocialsValue>(EMPTY_SOCIALS);
  const [socialsErrors, setSocialsErrors] = useState<SocialsErrors>({});
  const [errors, setErrors] = useState({
    name: '',
    about: '',
    country: '',
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
  const validateCountry = (value?: string | null) => Boolean(value ?? countryValue);

  const nameChangeHandler: ChangeEventHandler<HTMLInputElement> = evt => {
    if (validateName(evt.target.value)) setErrors(prev => ({ ...prev, name: '' }));
    setNameValue(evt.target.value);
  };
  const aboutChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = evt => {
    if (validateAbout(evt.target.value)) setErrors(prev => ({ ...prev, about: '' }));
    setAboutValue(evt.target.value);
  };
  const countryChangeHandler = (code: string) => {
    if (validateCountry(code)) setErrors(prev => ({ ...prev, country: '' }));
    setCountryValue(code);
  };
  const formSubmitHandler: FormEventHandler<HTMLFormElement> = async evt => {
    evt.preventDefault();

    const currentErrors = { ...errors };

    const isNameValid = validateName();
    const isAboutValid = validateAbout();
    const isCountryValid = validateCountry();
    const newSocialsErrors = validateSocials(socialsValue);

    if (!isNameValid) currentErrors.name = 'Enter company name';
    if (!isAboutValid) currentErrors.about = 'Enter about';
    if (!isCountryValid) currentErrors.country = 'Select country';

    setErrors(currentErrors);
    setSocialsErrors(newSocialsErrors);

    if (!isAboutValid || !isNameValid || !isCountryValid || Object.keys(newSocialsErrors).length > 0) return;

    try {
      const result = await createCompany({
        variables: {
          input: {
            name: nameValue,
            description: aboutValue,
            country: countryValue,
            socials: socialsToArray(socialsValue),
          },
        },
      });

      if (result.error) throw result.error;

      await refetchUserCompanies();
      setIsCreateModalOpened(false);
      setNameValue('');
      setAboutValue('');
      setCountryValue(null);
      setSocialsValue(EMPTY_SOCIALS);
      setSocialsErrors({});
      setErrors({ name: '', about: '', country: '' });
      toast('Company successfully created!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create company. Please try again.';
      toast(message, 'error');
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
                  <div className={'flex items-center gap-2 mb-3'}>
                    <div className={'text-xl font-semibold'}>{company.name}</div>
                    <CountryChip code={company.country} />
                  </div>
                  <div className={'text-base mb-3'}>{company.description}</div>
                  <SocialLinksRow socials={company.socials} />
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
              Country
              <span className={'text-red-bright'}>*</span>
            </div>
            <CountrySelect value={countryValue} onChange={countryChangeHandler} errorMessage={errors.country} />
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
          <div className={'px-4 mb-6'}>
            <div className={'text-sm font-medium uppercase mb-3'}>Socials</div>
            <SocialsInput value={socialsValue} onChange={setSocialsValue} errors={socialsErrors} />
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
