import React, { FC } from 'react';
import clsx from 'clsx';

const Radio: FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ children, name, value }) => {
  return (
    <label className={'group flex items-center gap-3'}>
      <span
        className={clsx(
          'shrink-0 inline-flex items-center justify-center size-5 rounded-sm border-grey border-1 overflow-hidden',
          'group-has-checked:bg-blue group-has-checked:border-transparent',
          'group-has-checked:before:bg-white group-has-checked:before:w-3 group-has-checked:before:h-[9px] group-has-checked:before:mask-[url(/icons/check.svg)] group-has-checked:before:mask-contain'
        )}
      />
      <input className={'sr-only'} name={name} value={value} type={'radio'} />
      <span className={'text-grey-dark text-base'}>{children}</span>
    </label>
  );
};

export default Radio;
