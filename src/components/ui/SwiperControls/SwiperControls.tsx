import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

import './SwiperControls.css';

interface SwiperControlsProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
}

const SwiperControls: FC<SwiperControlsProps> = ({ className, name }) => {
  return (
    <div className={clsx('swiper-controls flex gap-4 items-center w-fit mx-auto', className)}>
      <button
        className={
          'not-disabled:cursor-pointer shrink-0 size-6 bg-grey mask-[url(/icons/tick.svg)] mask-contain tr-d-all rotate-180 ' +
          'hover:bg-blue-hover focus-visible:bg-blue-hover active:bg-grey disabled:bg-grey/50'
        }
        data-name={'swiper-nav-prev-' + name}
      >
        <span className={'visually-hidden'}>previous slide</span>
      </button>
      <div data-name={'swiper-pagination-' + name} />
      <button
        className={
          'not-disabled:cursor-pointer shrink-0 size-6 bg-grey mask-[url(/icons/tick.svg)] mask-contain tr-d-all ' +
          'hover:bg-blue-hover focus-visible:bg-blue-hover active:bg-grey disabled:bg-grey/50'
        }
        data-name={'swiper-nav-next-' + name}
      >
        <span className={'visually-hidden'}>next slide</span>
      </button>
    </div>
  );
};

export default SwiperControls;
