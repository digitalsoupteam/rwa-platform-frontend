'use client';

import React, { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  errorMessage?: string;
  size: 'sm' | 'md';
  colorScheme: 'dark' | 'light';
}

const Input: FC<InputProps> = ({ className, size, colorScheme, errorMessage, ...props }) => {
  const SIZES = {
    sm: 'px-2 py-3 rounded-lg text-sm/[1]',
    md: 'px-5 py-4 rounded-2xl text-base/[1.4]',
  };

  const COlOR_SCHEMES = {
    light: {
      input: 'text-black placeholder:text-label-tertiary bg-white border-1 border-stroke-primary',
      inputError: '!border-red-bright text-red-bright',
      errorMessage: 'pt-3 text-xs/[1] text-red-bright',
    },
    dark: {
      input:
        'text-black placeholder:text-grey-dark hover:border-grey-dark focus-visible:border-grey-dark bg-white border-1 border-grey',
      inputError: '!border-red text-red placeholder:text-red',
      errorMessage: 'absolute top-full pt-2 text-xs/[1.3] text-red',
    },
  };

  return (
    <div className={'relative'}>
      <input
        className={clsx(
          'w-full tr-d-all outline-0',
          SIZES[size],
          COlOR_SCHEMES[colorScheme].input,
          errorMessage && COlOR_SCHEMES[colorScheme].inputError,
          className
        )}
        {...props}
      />
      {errorMessage && <div className={COlOR_SCHEMES[colorScheme].errorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default Input;
