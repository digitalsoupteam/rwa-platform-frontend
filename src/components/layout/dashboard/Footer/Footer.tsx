import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Wrapper } from '@/components/layout';
import { Socials } from '@/components/ui';

const Footer: FC = () => {
  return (
    <footer className={'bg-bg-tertiary pt-6 pb-4 md:py-10'}>
      <Wrapper>
        <div className={'grid grid-cols-2 gap-12 lg:flex lg:justify-between'}>
          <div className={'flex gap-12 max-md:flex-col max-md:col-span-full md:gap-17'}>
            <div className={'flex flex-col gap-4 text-base font-medium'}>
              <Link href={'/marketplace/'}>Marketplace</Link>
              <Link href={'/tokenization/'}>Tokenize your business</Link>
            </div>
            <div className={'flex flex-col gap-4 text-base font-medium'}>
              <Link href={'/#'}>Whitepaper</Link>
              <Link href={'/#'}>Privacy Policy</Link>
              <Link href={'/terms-of-service/'}>Terms of service</Link>
            </div>
            <div className={'flex flex-col gap-4 text-base font-medium'}>
              For business and support
              <Link className={'text-blue'} href={'mailto:hello@slices.finance'}>
                hello@slices.finance
              </Link>
            </div>
          </div>

          <div className={'flex flex-col gap-4 md:gap-12.5 lg:order-first'}>
            <Link className={'w-[125px] md:w-40'} href='/'>
              <Image src={'/images/logo-dark.svg'} width={120} height={34} alt={''} />
            </Link>
            <div className={'text-[#9B9BA5] text-sm'}>
              Copyright © <br className={'md:hidden'} />
              2026 Slices
            </div>
          </div>
          <div className={'flex flex-col items-end gap-4 md:gap-12.5'}>
            <Socials color={'dark'} gap={'sm'} />
            <div className={'text-[#9B9BA5] text-sm text-end'}>
              Design by <br className={'md:hidden'} />
              OUT.AGENCY
            </div>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
