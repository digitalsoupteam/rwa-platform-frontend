'use client';

import clsx from 'clsx';
import React, { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Wrapper } from '@/components/layout';

import { Button, Icon } from '@/components/ui';
import { AddPoolModal } from '@/components/pool';
import { useAuth } from '@/lib/auth/AuthContext';

const Header: FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isProfileOpened, setIsProfileOpened] = useState(false);
  const [isAddPoolModalOpen, setIsAddPoolModalOpen] = useState(false);
  const profileContainerRef = useRef<HTMLDivElement | null>(null);
  const { logout } = useAuth();
  const pathname = usePathname();

  const navLinkClassName = (href: string) => {
    const isActive = pathname === href || `${pathname}/` === href;

    return clsx(
      'p-4 rounded-xl',
      isActive ? 'bg-blue text-white font-semibold border-1 border-transparent' : 'text-grey-dark border-1 border-stroke-primary'
    );
  };

  const menuOutSideClick: MouseEventHandler<HTMLDivElement> = evt => {
    if (evt.currentTarget === evt.target) setIsMenuOpened(false);
  };

  const closeProfileMenu = (evt: MouseEvent) => {
    if (!evt.target || !profileContainerRef.current) return;
    if (profileContainerRef.current.contains(evt.target as Node)) return;

    setIsProfileOpened(false);
  };

  useEffect(() => {
    if (isProfileOpened) window.addEventListener('click', closeProfileMenu);
    if (!isProfileOpened) window.removeEventListener('click', closeProfileMenu);

    return () => window.removeEventListener('click', closeProfileMenu);
  }, [isProfileOpened]);

  return (
    <>
      <header className={'pt-2.5 max-md:pb-8 md:pt-5 md:mb-12'}>
        <Wrapper>
          <div className={'flex gap-5 items-center justify-between'}>
            <Link className={'flex items-center justify-center w-[81px] md:w-[95px]'} href={'/'}>
              <Image className={'w-full h-auto'} src={'/images/logo-dark.svg'} width={'85'} height={'24'} alt={' '} />
            </Link>

            <div className={'max-lg:hidden flex items-center justify-center gap-2'}>
              <Link className={navLinkClassName('/marketplace/')} href={'/marketplace/'}>
                Marketplace
              </Link>
              <Link className={navLinkClassName('/testnet/')} href={'/testnet/'}>
                Testnet
              </Link>
              <Link className={navLinkClassName('/debt-repayments/')} href={'/debt-repayments/'}>
                Debt repayments
              </Link>
              <Link className={navLinkClassName('/withdrawals/')} href={'/withdrawals/'}>
                Withdrawals
              </Link>
              <Link className={navLinkClassName('/portfolio/')} href={'/portfolio/'}>
                Portfolio
              </Link>
            </div>

            <div className={'flex gap-2.5'}>
              <div className={'relative'} ref={profileContainerRef}>
                <button
                  className={clsx(
                    'cursor-pointer flex justify-center items-center bg-bg-tertiary text-black size-11.5 rounded-xl max-lg:hidden',
                    isProfileOpened ? 'outline-2 outline-stroke-secondary' : 'outline-transparent'
                  )}
                  onClick={() => setIsProfileOpened(!isProfileOpened)}
                >
                  <Icon className={'size-5'} name={'person'} />
                </button>
                <div
                  className={clsx(
                    'absolute top-full right-0 mt-2 w-max rounded-lg border-1 border-stroke-primary pt-2 bg-white shadow-base',
                    isProfileOpened ? 'block' : 'hidden'
                  )}
                >
                  <div className={'flex flex-col gap-0.5 text-sm font-regular'}>
                    <Link className={'px-3 py-1.5'} href={'/my-companies/'}>
                      My companies
                    </Link>
                    <Link className={'px-3 py-1.5'} href={'/rwa-platform-frontend/public'}>
                      Tranches
                    </Link>
                    <Link className={'px-3 py-1.5'} href={'/dao/'}>
                      Governance
                    </Link>
                    <button
                      className={
                        'cursor-pointer flex items-center justify-between gap-2 py-2.5 pl-3 pr-2 mt-2 text-red-bright border-t-1 border-stroke-primary'
                      }
                      onClick={logout}
                    >
                      Logout
                      <Icon className={'size-4'} name={'logout'} />
                    </button>
                  </div>
                </div>
              </div>
              <button
                className={
                  'cursor-pointer flex justify-center items-center bg-bg-tertiary text-black size-11.5 rounded-xl lg:hidden'
                }
                onClick={() => setIsMenuOpened(!isMenuOpened)}
              >
                <Icon className={'size-5'} name={'burger'} />
              </button>
              <Button className={'rounded-xl max-lg:hidden'} visualType={'quaternary'} onClick={() => setIsAddPoolModalOpen(true)}>
                <Icon name={'plus'} />
                Add pool
              </Button>
            </div>
          </div>
        </Wrapper>
      </header>
      <div
        className={clsx(
          'fixed top-0 right-0 bottom-0 left-0 h-screen w-screen tr-d-all bg-transparent lg:hidden',
          isMenuOpened && '!bg-[#494A53]/60 pointer-events-auto',
          !isMenuOpened && 'pointer-events-none'
        )}
        aria-hidden={!isMenuOpened}
        onClick={menuOutSideClick}
      >
        <div
          className={clsx(
            'flex flex-col gap-3 pt-2 px-4 pb-4 bg-white rounded-l-[18px] h-full max-w-[300px] ml-auto translate-x-full tr-d-all',
            isMenuOpened && '!translate-x-0'
          )}
        >
          <div className={'flex items-center justify-between gap-5'}>
            <Link className={'flex items-center justify-center w-[81px] md:w-[95px]'} href={'/'}>
              <Image className={'w-full h-auto'} src={'/images/logo-dark.svg'} width={'85'} height={'24'} alt={' '} />
            </Link>
            <Button className={'rounded-xl'} visualType={'quaternary'} onClick={() => setIsAddPoolModalOpen(true)}>
              <Icon name={'plus'} />
              Add pool
            </Button>
          </div>
          <div className={'grow flex flex-col gap-2'}>
            <Link className={navLinkClassName('/marketplace/')} href={'/marketplace/'}>
              Marketplace
            </Link>
            <Link className={navLinkClassName('/testnet/')} href={'/testnet/'}>
              Testnet
            </Link>
            <Link className={navLinkClassName('/debt-repayments/')} href={'/debt-repayments/'}>
              Debt repayments
            </Link>
            <Link className={navLinkClassName('/withdrawals/')} href={'/withdrawals/'}>
              Withdrawals
            </Link>
            <Link className={navLinkClassName('/portfolio/')} href={'/portfolio/'}>
              Portfolio
            </Link>
          </div>
          <div className={'flex flex-col'}>
            <Link className={'py-2.5 text-base'} href={'/my-companies'}>
              My companies
            </Link>
            <Link className={'py-2.5 text-base'} href={'/my-companies'}>
              Tranches
            </Link>
            <Link className={'py-2.5 text-base'} href={'/my-companies'}>
              Contact support
            </Link>
            <Link className={'py-2.5 text-base'} href={'/dao'}>
              Governance
            </Link>
            <button
              className={
                'flex items-center gap-2 py-2.5 text-base text-red-bright mt-2 border-t-1 border-stroke-primary'
              }
              onClick={logout}
            >
              <Icon className={'size-4.5'} name={'logout'} />
              Logout
            </button>
          </div>
        </div>
      </div>
      <AddPoolModal isOpen={isAddPoolModalOpen} onClose={() => setIsAddPoolModalOpen(false)} />
    </>
  );
};

export default Header;
