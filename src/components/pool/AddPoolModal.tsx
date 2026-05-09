'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client/react';
import clsx from 'clsx';

import { Modal } from '@/components/common';
import { Button } from '@/components/ui';
import { GET_COMPANIES } from '@/lib/company/operations';
import { GET_BUSINESSES } from '@/lib/business/operations';
import { BusinessOwnerType } from '@/gql/graphql';
import { useAuth } from '@/lib/auth/AuthContext';

interface SelectProps {
  value: string;
  onChange: (id: string) => void;
  options: { id: string; name: string }[];
  placeholder: string;
  disabled?: boolean;
}

const Select: FC<SelectProps> = ({ value, onChange, options, placeholder, disabled }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedName = options.find(o => o.id === value)?.name;

  return (
    <div ref={ref} className={'relative'}>
      <button
        type={'button'}
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        className={clsx(
          'w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-stroke-primary bg-white text-sm text-left tr-d-all',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-grey-dark',
          open && 'border-grey-dark'
        )}
      >
        <span className={selectedName ? 'text-black' : 'text-label-tertiary'}>
          {selectedName || placeholder}
        </span>
        <svg
          width={'16'}
          height={'16'}
          viewBox={'0 0 16 16'}
          fill={'none'}
          className={clsx('shrink-0 transition-transform duration-200', open && 'rotate-180')}
        >
          <path d={'M4 6l4 4 4-4'} stroke={'#959EB5'} strokeWidth={'1.5'} strokeLinecap={'round'} strokeLinejoin={'round'} />
        </svg>
      </button>

      {open && options.length > 0 && (
        <div className={'absolute top-full left-0 right-0 mt-1 z-50 bg-white rounded-xl border border-stroke-primary shadow-base overflow-hidden'}>
          {options.map(opt => (
            <button
              key={opt.id}
              type={'button'}
              onClick={() => { onChange(opt.id); setOpen(false); }}
              className={clsx(
                'w-full text-left px-3 py-2.5 text-sm cursor-pointer transition-colors hover:bg-blue-light',
                value === opt.id && 'text-blue font-medium'
              )}
            >
              {opt.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface AddPoolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPoolModal: FC<AddPoolModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedBusinessId, setSelectedBusinessId] = useState('');

  const { data: companiesData } = useQuery(GET_COMPANIES, {
    variables: { input: { filter: { ownerId: user?.userId } } },
    skip: !isOpen || !user?.userId,
  });

  const { data: businessesData } = useQuery(GET_BUSINESSES, {
    variables: {
      input: { filter: { ownerId: selectedCompanyId, ownerType: BusinessOwnerType.Company } },
    },
    skip: !selectedCompanyId,
  });

  const companies = (companiesData?.getCompanies ?? []).map(c => ({ id: c.id, name: c.name }));
  const businesses = (businessesData?.getBusinesses ?? []).map(b => ({ id: b.id, name: b.name }));

  useEffect(() => {
    setSelectedBusinessId('');
  }, [selectedCompanyId]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedCompanyId('');
      setSelectedBusinessId('');
    }
  }, [isOpen]);

  const handleCreate = () => {
    if (!selectedBusinessId) return;
    router.push(`/add-pool?businessId=${selectedBusinessId}`);
    onClose();
  };

  return (
    <Modal isOpened={isOpen} closeModal={onClose}>
      <div className={'text-base font-medium px-4 pb-4 border-b border-stroke-primary'}>
        Add new pool
      </div>

      <div className={'px-4 py-5 flex flex-col gap-5'}>
        <div className={'flex flex-col gap-1.5'}>
          <label className={'text-sm font-medium'}>
            Company<span className={'text-red-bright'}>*</span>
          </label>
          <Select
            value={selectedCompanyId}
            onChange={setSelectedCompanyId}
            options={companies}
            placeholder={'Select a company'}
          />
        </div>

        <div className={'flex flex-col gap-1.5'}>
          <label className={'text-sm font-medium'}>
            Project<span className={'text-red-bright'}>*</span>
          </label>
          <Select
            value={selectedBusinessId}
            onChange={setSelectedBusinessId}
            options={businesses}
            placeholder={'Select a project'}
            disabled={!selectedCompanyId}
          />
        </div>
      </div>

      <div className={'px-4 pb-2 flex justify-end'}>
        <Button
          visualType={'quaternary'}
          type={'button'}
          disabled={!selectedBusinessId}
          onClick={handleCreate}
        >
          Create pool
        </Button>
      </div>
    </Modal>
  );
};

export default AddPoolModal;
