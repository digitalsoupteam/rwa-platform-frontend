'use client';

import React, { FC, ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { EDIT_POOL } from '@/lib/pool/operations';
import { Button, Input, TextArea, toast } from '@/components/ui';
import { Modal } from '@/components/common';
import { CategoryCheckboxes } from '@/components/dashboard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPool = any;

interface EditPoolModalProps {
  pool: AnyPool;
  isOpen: boolean;
  onClose: () => void;
}

const EditPoolModal: FC<EditPoolModalProps> = ({ pool, isOpen, onClose }) => {
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errors, setErrors] = useState({ name: '', description: '' });

  useEffect(() => {
    if (isOpen && pool) {
      setNameValue(pool.name ?? '');
      setDescriptionValue(pool.description ?? '');
      setSelectedTags(pool.tags ?? []);
      setErrors({ name: '', description: '' });
    }
  }, [isOpen, pool]);

  const [editPool, { loading }] = useMutation(EDIT_POOL);

  const validateName = (v?: string) => (v ?? nameValue).trim().length > 2;
  const validateDescription = (v?: string) => (v ?? descriptionValue).trim().length > 2;

  const nameChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    if (validateName(e.target.value)) setErrors(prev => ({ ...prev, name: '' }));
    setNameValue(e.target.value);
  };

  const descriptionChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = e => {
    if (validateDescription(e.target.value)) setErrors(prev => ({ ...prev, description: '' }));
    setDescriptionValue(e.target.value);
  };

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();

    const nameValid = validateName();
    const descValid = validateDescription();
    setErrors({ name: nameValid ? '' : 'Enter pool name', description: descValid ? '' : 'Enter description' });
    if (!nameValid || !descValid) return;

    try {
      await editPool({
        variables: {
          input: {
            id: pool.id,
            updateData: { name: nameValue, description: descriptionValue, tags: selectedTags },
          },
        },
      });
      onClose();
      toast('Pool successfully updated!');
    } catch {
      toast('Failed to update pool. Please try again.', 'error');
    }
  };

  return (
    <Modal isOpened={isOpen} closeModal={onClose}>
      <div className={'text-base font-medium pr-14 pb-4.5 pl-4 border-b-1 border-stroke-primary mb-6'}>
        Edit pool
      </div>
      <form onSubmit={formSubmitHandler}>
        <div className={'px-4 mb-6'}>
          <div className={'text-sm font-medium mb-3'}>
            Pool name<span className={'text-red-bright'}>*</span>
          </div>
          <Input
            placeholder={'For example, «Growth Pool Series A»'}
            size={'sm'}
            colorScheme={'light'}
            errorMessage={errors.name}
            type={'text'}
            name={'poolName'}
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
            errorMessage={errors.description}
            placeholder={'Write a short description for this pool'}
            name={'poolDescription'}
            value={descriptionValue}
            onChange={descriptionChangeHandler}
          />
        </div>
        <div className={'px-4 mb-6'}>
          <CategoryCheckboxes selected={selectedTags} onChange={setSelectedTags} title='Pool categories' />
        </div>
        <div className={'px-4 flex justify-end'}>
          <Button visualType={'quaternary'} type={'submit'} disabled={loading}>
            Apply
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPoolModal;
