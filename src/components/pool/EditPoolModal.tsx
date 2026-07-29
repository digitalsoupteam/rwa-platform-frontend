'use client';

import React, { FC, ChangeEventHandler, DragEvent, FormEventHandler, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useMutation } from '@apollo/client/react';
import { EDIT_POOL } from '@/lib/pool/operations';
import { Button, Input, TextArea, toast } from '@/components/ui';
import { Modal } from '@/components/common';
import { CategoryCheckboxes } from '@/components/dashboard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPool = any;

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:443';

async function uploadPoolImage(poolId: string, file: File): Promise<string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('poolId', poolId);
  const res = await fetch(`${API_ENDPOINT}/api/pool/uploadImage`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to upload image');
  }
  const json = await res.json();
  return json.imageUrl as string;
}

const STEP_COUNT = 3;

interface EditPoolModalProps {
  pool: AnyPool;
  isOpen: boolean;
  onClose: () => void;
}

const EditPoolModal: FC<EditPoolModalProps> = ({ pool, isOpen, onClose }) => {
  const [step, setStep] = useState(0);

  // Step 1 — Info
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [errors, setErrors] = useState({ name: '', description: '' });

  // Step 2 — Image
  const [imageLink, setImageLink] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 3 — Categories
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && pool) {
      setStep(0);
      setNameValue(pool.name ?? '');
      setDescriptionValue(pool.description ?? '');
      setSelectedTags(pool.tags ?? []);
      setImageLink(pool.image ?? null);
      setErrors({ name: '', description: '' });
    }
  }, [isOpen, pool]);

  const [editPool, { loading }] = useMutation(EDIT_POOL);

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadPoolImage(pool.id, file);
      setImageLink(url);
    } catch {
      toast('Failed to upload image', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  // ── Step validation & navigation ──────────────────────────────────────────
  const validateStep0 = () => {
    const nameValid = nameValue.trim().length > 2;
    const descValid = descriptionValue.trim().length > 2;
    setErrors({ name: nameValid ? '' : 'Enter pool name', description: descValid ? '' : 'Enter description' });
    return nameValid && descValid;
  };

  const handleNext = () => {
    if (step === 0 && !validateStep0()) return;
    setStep(s => s + 1);
  };

  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    try {
      const result = await editPool({
        variables: {
          input: {
            id: pool.id,
            updateData: {
              name: nameValue,
              description: descriptionValue,
              tags: selectedTags,
              ...(imageLink !== null && { image: imageLink }),
            },
          },
        },
      });

      if (result.error) throw result.error;

      onClose();
      toast('Pool successfully updated!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update pool. Please try again.';
      toast(message, 'error');
    }
  };

  const nameChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.value.trim().length > 2) setErrors(prev => ({ ...prev, name: '' }));
    setNameValue(e.target.value);
  };

  const descriptionChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = e => {
    if (e.target.value.trim().length > 2) setErrors(prev => ({ ...prev, description: '' }));
    setDescriptionValue(e.target.value);
  };

  const imageSrc = imageLink;

  const step0NextHandler: FormEventHandler<HTMLFormElement> = evt => {
    evt.preventDefault();
    handleNext();
  };

  return (
    <Modal isOpened={isOpen} closeModal={onClose}>
      {/* Header */}
      <div className={'pr-14 pb-4.5 pl-4 border-b-1 border-stroke-primary mb-6'}>
        <div className={'text-base font-medium'}>Update pool</div>
        <div className={'text-xs text-text-secondary mt-0.5'}>Step {step + 1} of {STEP_COUNT}</div>
      </div>

      {/* Step 0 — Info */}
      {step === 0 && (
        <form onSubmit={step0NextHandler}>
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
          <div className={'px-4 flex justify-end'}>
            <Button visualType={'quaternary'} type={'submit'}>
              Next
            </Button>
          </div>
        </form>
      )}

      {/* Step 1 — Image */}
      {step === 1 && (
        <div>
          <div className={'px-4 mb-6'}>
            <div
              className={clsx(
                'relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-8 cursor-pointer tr-d-all overflow-hidden',
                isDragging
                  ? 'border-blue bg-blue-light/40'
                  : 'border-stroke-primary hover:border-blue hover:bg-blue-light/30'
              )}
              onClick={() => !uploading && fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {imageSrc && !uploading ? (
                <div className={'relative w-full h-36'}>
                  <Image src={imageSrc} alt='Pool image' fill className='object-contain rounded-lg' />
                </div>
              ) : (
                <>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' className={clsx('transition-colors', isDragging ? 'text-blue' : 'text-label-tertiary')}>
                    <rect x='3' y='3' width='18' height='18' rx='3' stroke='currentColor' strokeWidth='1.5' />
                    <circle cx='8.5' cy='8.5' r='1.5' stroke='currentColor' strokeWidth='1.5' />
                    <path d='M3 15l5-5 4 4 3-3 6 6' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                  <span className={clsx('text-sm font-medium', isDragging ? 'text-blue' : 'text-grey-dark')}>
                    {uploading ? 'Uploading…' : 'Choose an image or drag it here'}
                  </span>
                  <span className={'text-xs text-label-tertiary'}>Supports PNG, JPG, WEBP</span>
                </>
              )}
              {uploading && (
                <div className={'absolute inset-0 bg-white/70 flex items-center justify-center'}>
                  <span className={'text-sm text-grey-dark animate-pulse'}>Uploading…</span>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type='file' accept='image/*' className='hidden' onChange={handleFileChange} />
            {imageSrc && !uploading && (
              <button
                type='button'
                onClick={e => { e.stopPropagation(); setImageLink(null); }}
                className={'mt-3 text-xs text-label-tertiary hover:text-red cursor-pointer tr-d-all'}
              >
                Remove image
              </button>
            )}
          </div>
          <div className={'px-4 flex justify-between'}>
            <Button visualType={'quinary'} type={'button'} onClick={handleBack}>
              Back
            </Button>
            <Button visualType={'quaternary'} type={'button'} onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Step 2 — Categories */}
      {step === 2 && (
        <div>
          <div className={'px-4 mb-6'}>
            <CategoryCheckboxes selected={selectedTags} onChange={setSelectedTags} title='Pool categories' />
          </div>
          <div className={'px-4 flex justify-between'}>
            <Button visualType={'quinary'} type={'button'} onClick={handleBack}>
              Back
            </Button>
            <Button visualType={'quaternary'} type={'button'} onClick={handleSubmit} disabled={loading || uploading}>
              {loading ? 'Saving…' : 'Apply'}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditPoolModal;
