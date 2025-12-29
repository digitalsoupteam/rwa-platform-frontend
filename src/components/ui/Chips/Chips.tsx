import React, { FC } from 'react';
import clsx from 'clsx';

interface ChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: string[];
}

const Chips: FC<ChipsProps> = ({ className, items }) => {
  if (items.length === 0) return null;

  return (
    <div className='w-full overflow-hidden'>
      <div className={clsx('flex gap-3 items-center overflow-x-auto min-w-0 w-full lg:flex-wrap', className)}>
        {items.map((item, index) => (
          <span key={index} className='shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-blue-dim rounded-full'>
            {item}
            <button
              className={'size-5 before:block before:bg-black before:size-5 before:mask-[url(/icons/cross.svg)]'}
              aria-label={'remove ' + item}
            ></button>
          </span>
        ))}
        <button
          className={
            'shrink-0 flex items-center gap-2 px-4 py-2 before:black before:bg-black before:size-5 before:mask-[url(/icons/cross.svg)]'
          }
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default Chips;
