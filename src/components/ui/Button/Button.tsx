import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type ButtonProps =
  | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined });

type IButtonProps = ButtonProps & {
  visualType: 'primary' | 'secondary' | 'tertiary';
};

const Button: FC<IButtonProps> = ({ children, href, visualType, ...props }) => {
  const VISUAL_TYPES = {
    primary: clsx(
      'shadow-button bg-button bg-size-[200%_auto] text-white',
      'hover:not-disabled:bg-position-[100%] focus-visible:not-disabled:bg-position-[100%] disabled:opacity-50'
    ),
    secondary: clsx(
      'bg-blue-dark text-white',
      'hover:not-disabled:bg-blue-hover focus-visible:not-disabled:blue-hover disabled:opacity-50'
    ),
    tertiary: clsx(
      'bg-white text-blue',
      'hover:not-disabled:bg-blue-light focus-visible:not-disabled:blue-light active:bg-blue-dim disabled:opacity-50 disabled:bg-white disabled:text-grey'
    ),
  };

  const className = clsx(
    'not-disabled:cursor-pointer inline-flex items-center justify-center px-6 py-4 text-base/[1.5] font-semibold rounded-2xl tr-d-all',
    VISUAL_TYPES[visualType]
  );
  if (href)
    return (
      <Link className={className} href={href} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        children
      </Link>
    );

  return (
    <button className={className} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};

export default Button;
