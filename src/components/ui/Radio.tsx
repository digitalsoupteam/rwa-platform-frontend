'use client';

import React, { FC, InputHTMLAttributes, useId } from 'react';
import clsx from 'clsx';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Radio: FC<RadioProps> = ({ label, className, id, ...props }) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={clsx(
        'flex items-center gap-3 cursor-pointer group',
        props.disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
    >
      <input id={inputId} type="radio" className="sr-only" {...props} />
      <span
        className={clsx(
          'shrink-0 size-5 rounded-full border border-stroke-primary bg-transparent tr-d-all',
          'flex items-center justify-center',
          'group-has-[:checked]:border-blue'
        )}
      >
        <span
          className={clsx(
            'size-2.5 rounded-full bg-blue tr-d-all',
            'opacity-0 scale-0 group-has-[:checked]:opacity-100 group-has-[:checked]:scale-100'
          )}
        />
      </span>
      {label && (
        <span className="text-base leading-[1.4] text-grey-dark select-none">{label}</span>
      )}
    </label>
  );
};

export default Radio;