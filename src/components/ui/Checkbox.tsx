'use client';

import React, { FC, InputHTMLAttributes, useId } from 'react';
import clsx from 'clsx';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Checkbox: FC<CheckboxProps> = ({ label, className, id, ...props }) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={clsx('flex items-center gap-2.5 cursor-pointer', props.disabled && 'opacity-40 cursor-not-allowed', className)}
    >
      <input
        id={inputId}
        type={'checkbox'}
        className={'size-4 rounded accent-blue-600 cursor-pointer shrink-0 disabled:cursor-not-allowed'}
        {...props}
      />
      {label && <span className={'text-sm select-none'}>{label}</span>}
    </label>
  );
};

export default Checkbox;
