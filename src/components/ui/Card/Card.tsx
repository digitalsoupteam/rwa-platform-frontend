import React, { FC, HTMLAttributes } from 'react';

import styles from './Card.module.scss';
import clsx from 'clsx';

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'white' | 'greyLight' | 'blueDim';
}

const Card: FC<ICardProps> = ({ children, className, size = 'md', color = 'white' }) => {
  const SIZES = {
    xs: 'p-4 rounded-2xl',
    sm: 'p-6 rounded-3xl',
    md: 'p-6 rounded-3xl md:rounded-[2.5rem]',
    lg: 'p-6 rounded-3xl md:p-8 md:rounded-[2.5rem]',
    xl: 'p-6 rounded-3xl md:p-10 md:rounded-[2.5rem]',
  };
  const COLORS = {
    white: 'bg-white',
    greyLight: 'bg-grey-light',
    blueDim: 'bg-blue-dim',
  };

  return <div className={clsx(SIZES[size], COLORS[color], className)}>{children}</div>;
};

export default Card;
