'use client';

import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { useConnectModal, useAccountModal } from '@rainbow-me/rainbowkit';

import { Wrapper } from '@/components/layout';
import { Button, ButtonLink } from '@/components/ui';
import { useAccount } from 'wagmi';

const Header: FC = () => {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const [opened, setOpened] = useState(false);

  const navLinks = [
    {
      text: 'Marketplace',
      link: '/marketplace/',
    },
    {
      text: 'Tokenize a business',
      link: '/tokenization/',
    },
    { text: 'AirDrop', link: '#' },
    { text: 'Support', link: '#' },
  ];

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', opened);

    return () => document.body.classList.remove('overflow-hidden');
  }, [opened]);

  return (
    <header className={'absolute top-0 right-0 left-0'}>
      <div
        aria-hidden={!opened}
        className={clsx(
          'z-2 fixed w-full h-dvh bg-[url(/images/menu-bg.png)] bg-grey bg-cover tr-d-all',
          opened ? 'top-0' : '-top-[120%]'
        )}
      >
        <Wrapper>
          <div className={'pt-30 pb-10 flex flex-col items-center justify-center gap-5 h-dvh'}>
            <ul className={'flex flex-col gap-10 items-center my-auto'}>
              {navLinks &&
                navLinks.length > 0 &&
                navLinks.map(({ text, link }) => (
                  <li key={text + 'menu'}>
                    <Link className={'text-white text-xl/[1.2] tracking-[-0.02em] font-semibold'} href={link}>
                      {text}
                    </Link>
                  </li>
                ))}
            </ul>
            <Button className={'w-full'} visualType={'primary'}>
              Start trading
            </Button>
          </div>
        </Wrapper>
      </div>
      <Wrapper>
        <div className={'relative z-2 pt-5 flex justify-between items-center md:pt-8'}>
          <Link className={'flex items-center justify-center w-[85px] md:w-[147px]'} href={'/public'}>
            <Image className={'w-full h-auto'} src={'/images/logo.svg'} width={'85'} height={'24'} alt={' '} />
          </Link>
          <div className={'flex gap-4 items-center lg:hidden'}>
            <div className='lg:hidden'>
              {!address && (
                <button className={'text-white text-base/[1.2] font-semibold'} onClick={openConnectModal}>
                  Sign in
                </button>
              )}
            </div>
            <button
              className={'cursor-pointer flex flex-col items-center justify-center gap-[3.5px] size-8 lg:hidden'}
              onClick={() => setOpened(!opened)}
            >
              <span
                className={clsx('rounded-4xl h-[2.5px] w-6 bg-white tr-d-all', opened && 'rotate-45 translate-y-1.5')}
              />
              <span className={clsx('rounded-4xl h-[2.5px] w-6 bg-white tr-d-all', opened && 'rotate-45')} />
              <span
                className={clsx('rounded-4xl h-[2.5px] w-6 bg-white tr-d-all', opened && '-rotate-45 -translate-y-1.5')}
              />
            </button>
          </div>
          <ul className={'max-lg:hidden flex flex-wrap items-center gap-8'}>
            {navLinks &&
              navLinks.length > 0 &&
              navLinks.map(({ text, link }) => (
                <li key={text + 'menu'}>
                  <ButtonLink href={link}>{text}</ButtonLink>
                </li>
              ))}
          </ul>
          <div className={'max-lg:hidden'}>
            {!address && (
              <Button visualType={'secondary'} onClick={openConnectModal}>
                Sign In
              </Button>
            )}
            {address && (
              <Button visualType={'primary'} href={'/dashboard/'}>
                Dashboard
              </Button>
            )}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
