import Link from 'next/link';
import React, { FC } from 'react';

import TwitterSVG from '/public/icons/twitter.svg';
import TelegramSVG from '/public/icons/telegram.svg';
import DiscordSVG from '/public/icons/discord.svg';

const Socials: FC = () => {
  return (
    <div className={'flex gap-5 md:gap-3'}>
      <Link className={'text-[#dadada] hover:text-blue focus-visible:text-blue tr-d-all'} href={'#'}>
        <TwitterSVG className={'size-9'} />
      </Link>
      <Link className={'text-[#dadada] hover:text-blue focus-visible:text-blue tr-d-all'} href={'#'}>
        <TelegramSVG className={'size-9'} />
      </Link>
      <Link className={'text-[#dadada] hover:text-blue focus-visible:text-blue tr-d-all'} href={'#'}>
        <DiscordSVG className={'size-9'} />
      </Link>
    </div>
  );
};

export default Socials;
