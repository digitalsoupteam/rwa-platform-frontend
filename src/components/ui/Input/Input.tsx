'use client';

import React, { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  ariaInvalid?: boolean;
  errorMessage?: string;
}

const Input: FC<InputProps> = ({
  className,
  type,
  name,
  placeholder,
  onInput,
  onChange,
  errorMessage,
  value,
}) => {
  return (
    <div className={'relative'}>
      <input
        className={clsx(
          'w-full text-black text-base/[1.4] bg-white border-1 border-grey px-5 py-4 rounded-2xl tr-d-all outline-0 placeholder:text-grey-dark hover:border-grey-dark focus-visible:border-grey-dark',
          errorMessage && 'border-red text-red placeholder:text-red',
          className
        )}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onInput={onInput}
        value={value}
      />
      {errorMessage && <div className={'absolute top-full pt-2 text-red text-xs/[1.3]'}>{errorMessage}</div>}
    </div>
  );
};

export default Input;
