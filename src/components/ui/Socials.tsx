import Link from 'next/link';
import React, { FC } from 'react';

import TwitterSVG from '../../assets/icons/twitter.svg';
import TelegramSVG from '../../assets/icons/telegram.svg';
import DiscordSVG from '../../assets/icons/discord.svg';
import clsx from 'clsx';

interface SocialsProps {
  color: 'dark' | 'light';
  gap: 'md' | 'sm';
}

const Socials: FC<SocialsProps> = ({ color = 'light', gap = 'md' }) => {
  const COLORS = {
    light: 'text-[#dadada] hover:text-blue focus-visible:text-blue',
    dark: 'text-blue-dark',
  };

  const GAPS = {
    md: 'gap-5 md:gap-3',
    sm: 'gap-2 md:gap-3',
  };

  return (
    <div className={clsx('flex', GAPS[gap])}>
      <Link className={clsx('tr-d-all', COLORS[color])} href={'#'}>
        <TwitterSVG className={'size-9'} />
      </Link>
      <Link className={clsx('tr-d-all', COLORS[color])} href={'#'}>
        <TelegramSVG className={'size-9'} />
      </Link>
      <Link className={clsx('tr-d-all', COLORS[color])} href={'#'}>
        <DiscordSVG className={'size-9'} />
      </Link>
    </div>
  );
};

export default Socials;
