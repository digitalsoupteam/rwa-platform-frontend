'use client';

import React, { FC } from 'react';
import { Modal } from '@/components/common';
import { Button } from '@/components/ui';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  heading?: string;
  description?: string;
  confirmText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  title = 'Delete',
  heading = 'Do you want to delete?',
  description = 'This action cannot be undone.',
  confirmText = 'Delete',
  loading = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpened={isOpen} closeModal={onCancel}>
      <div className={'text-base font-medium px-4 pb-4 border-b border-stroke-primary'}>
        {title}
      </div>

      <div className={'px-4 py-6 text-center'}>
        <p className={'text-base font-semibold mb-2'}>{heading}</p>
        <p className={'text-sm text-label-secondary'}>{description}</p>
      </div>

      <div className={'px-4 pt-4 flex items-center justify-between'}>
        <Button visualType={'quinary'} type={'button'} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          visualType={'quaternary'}
          type={'button'}
          disabled={loading}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;