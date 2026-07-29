import React, { FC } from 'react';
import clsx from 'clsx';
import type { SocialLinkValue } from '@/components/ui';

import InstagramSVG from '../../assets/icons/instagram.svg';
import XSVG from '../../assets/icons/x.svg';
import FacebookSVG from '../../assets/icons/facebook.svg';
import YouTubeSVG from '../../assets/icons/youtube.svg';

const PLATFORM_ICONS: Record<string, FC<{ className?: string }>> = {
  instagram: InstagramSVG,
  twitter: XSVG,
  facebook: FacebookSVG,
  youtube: YouTubeSVG,
};

interface SocialLinksRowProps {
  socials?: SocialLinkValue[] | null;
  className?: string;
}

const SocialLinksRow: FC<SocialLinksRowProps> = ({ socials, className }) => {
  const links = (socials ?? []).filter(link => link.url);
  if (links.length === 0) return null;

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {links.map(link => {
        const PlatformIcon = PLATFORM_ICONS[link.type];
        if (!PlatformIcon) return null;
        return (
          <a
            key={link.type}
            href={link.url}
            target={'_blank'}
            rel={'noopener noreferrer'}
            className={'shrink-0 size-7 rounded-full bg-blue-dark flex items-center justify-center text-white hover:opacity-80 tr-d-all'}
          >
            <PlatformIcon className={'size-3.5'} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinksRow;
