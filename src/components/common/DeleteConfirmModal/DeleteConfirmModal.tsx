'use client';

import React, { FC } from 'react';
import { Modal } from '@/components/common';
import { Button } from '@/components/ui';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: FC<DeleteConfirmModalProps> = ({
  isOpen,
  title = 'Delete',
  description = 'This action cannot be undone.',
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
        <p className={'text-base font-semibold mb-2'}>Do you want to delete?</p>
        <p className={'text-sm text-label-secondary'}>{description}</p>
      </div>

      <div className={'px-4 pt-4 flex items-center justify-between'}>
        <Button
          visualType={'quinary'}
          type={'button'}
          disabled={loading}
          onClick={onConfirm}
        >
          Delete
        </Button>
        <Button visualType={'quaternary'} type={'button'} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
