import clsx from 'clsx';
import React, { FC, JSX, HTMLAttributes } from 'react';

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Title: FC<TitleProps> = ({ className, children, level = 1, size }) => {
  const SIZES = {
    xs: 'text-2xl leading-[1.2]',
    sm: 'text-2xl leading-[1.2] md:text-[2rem] md:leading-none md:tracking-tighter',
    md: 'text-xl tracking-[-0.02em] leading-[1.2] md:leading-none md:text-[2rem] md:tracking-tighter',
    lg: 'text-[2rem] leading-none tracking-tighter md:text-[3.25rem] md:tracking-[-0.04em]',
    xl: 'text-[2.875rem] leading-none tracking-[-0.04em] md:text-[4.625rem]',
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag className={clsx(className, 'font-semibold', SIZES[size])}>{children}</Tag>;
};

export default Title;
