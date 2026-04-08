'use client';

import React, { FC, HTMLAttributes, useEffect } from 'react';
import clsx from 'clsx';

import CrossSVG from '../../../public/icons/cross.svg';

interface ModalProps extends HTMLAttributes<HTMLElement> {
  isOpened: boolean;
  closeModal: () => void;
}

const Modal: FC<ModalProps> = ({ children, isOpened, closeModal }) => {
  useEffect(() => {
    if (isOpened) document.body.classList.add('locked');
    if (!isOpened) document.body.classList.remove('locked');
  }, [isOpened]);

  return (
    <section
      className={clsx(
        'z-1 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-[#494A53]/60 px-4',
        isOpened ? 'block' : 'hidden'
      )}
      onClick={evt => evt.currentTarget === evt.target && closeModal()}
    >
      <div className={'relative py-4 bg-white w-full max-w-[448px] rounded-lg'}>
        <button className={'absolute top-3.5 right-4 size-6'} onClick={closeModal}>
          <CrossSVG className={'size-6'} />
        </button>
        {children}
      </div>
    </section>
  );
};

export default Modal;
