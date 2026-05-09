import React, { FC, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
}

const TextArea: FC<TextAreaProps> = ({ className, errorMessage, ...props }) => {
  return (
    <div className={'relative'}>
      <div className={'relative'}>
        <textarea
          className={clsx(
            'w-full tr-d-all outline-0 px-2 py-3 rounded-lg text-sm/[1] resize-none text-black placeholder:text-label-tertiary bg-white border-1 border-stroke-primary',
            errorMessage && '!border-red-bright text-red-bright',
            className
          )}
          {...props}
        />
        {props.maxLength && (
          <div className={'absolute right-2 bottom-2 text-xs font-medium text-label-tertiary'}>
            {String(props.value)?.length || 0}/{props.maxLength}
          </div>
        )}
      </div>
      {errorMessage && <div className={'pt-3 text-xs/[1] text-red-bright'}>{errorMessage}</div>}
    </div>
  );
};

export default TextArea;
