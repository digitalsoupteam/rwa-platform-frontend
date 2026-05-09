import React, {AnchorHTMLAttributes, FC} from 'react';
import Link from 'next/link';

const ButtonLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, children }) => {
  if (!href) return null;

  return (
    <Link href={href} className={'text-white text-base/[1.4] font-medium tr-d-all hover:text-blue-accent focus-visible:text-blue-accent active:text-white'}>
      {children}
    </Link>
  );
};

export default ButtonLink;
