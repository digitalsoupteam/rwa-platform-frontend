import React, { FC, HTMLAttributes } from 'react';
import Link, { LinkProps } from 'next/link';

import PlusTightSVG from '../../../../public/icons/plus-tight.svg';
import clsx from 'clsx';

const dashRect = (
  <svg className='absolute inset-0.5 w-full h-full pointer-events-none' preserveAspectRatio='none'>
    <rect
      className={'w-[calc(100%-2px)] h-[calc(100%-2px)]'}
      x='1'
      y='1'
      width='100%'
      height='100%'
      rx='16'
      ry='16'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeDasharray='10 10'
    />
  </svg>
);

const innerContent = (children: React.ReactNode) => (
  <span className={'inline-flex items-center justify-center gap-2'}>
    <PlusTightSVG className='size-6' />
    {children}
  </span>
);

const baseClass =
  'cursor-pointer relative flex items-center justify-center p-4 с-border-dash rounded-xl w-full text-label-tertiary text-lg font-medium';

type ButtonBorderDashProps =
  | (HTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (Omit<LinkProps, 'className'> & { className?: string; children?: React.ReactNode; href: string });

const ButtonBorderDash: FC<ButtonBorderDashProps> = ({ className, children, ...props }) => {
  if (props.href !== undefined) {
    const { href, ...linkProps } = props as Omit<LinkProps, 'className'> & { className?: string; children?: React.ReactNode };
    return (
      <Link href={href} className={clsx(baseClass, className)} {...linkProps}>
        {dashRect}
        {innerContent(children)}
      </Link>
    );
  }

  return (
    <button className={clsx(baseClass, className)} {...(props as HTMLAttributes<HTMLButtonElement>)}>
      {dashRect}
      {innerContent(children)}
    </button>
  );
};

export default ButtonBorderDash;