'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Wrapper } from '@/components/layout';
import { Button, Card, Title } from '@/components/ui';
import { useAuth } from '@/lib/auth/AuthContext';

export const EasyStartSection: FC = () => {
  const { openConnectModal } = useConnectModal();
  const { isAuthenticated } = useAuth();

  return (
    <section className={'mb-25 md:mb-50 overflow-hidden'}>
      <Wrapper>
        <div className={'grid gap-3 md:gap-5 lg:grid-cols-2'}>
          <Card className={'h-full flex flex-col text-white !bg-blue-gradient'} size={'lg'}>
            <Title className={'mb-3'} size={'sm'} level={3}>
              Easy start
            </Title>
            <p className={'text-base max-w-100 mb-10'}>
              Create your first pool today to get necessary funding faster. Add project info later
            </p>
            <Button
              className={'mt-auto md:w-fit'}
              visualType={'tertiary'}
              onClick={isAuthenticated ? undefined : openConnectModal}
              href={isAuthenticated ? '/add-pool/' : undefined}
            >
              Create first pool
            </Button>
          </Card>
          <Card size={'lg'}>
            <Title className={'mb-6 md:mb-10'} size={'sm'} level={3}>
              Projects that already use Slices
            </Title>
            <div className={'grid gap-2.5 md:grid-cols-2'}>
              <div className={'flex items-center justify-center p-0 bg-blue-light rounded-2xl h-[70px]'}>
                <Image src={'/images/ondo.svg'} width={'103'} height={'40'} alt={''} />
              </div>
              <div className={'flex items-center justify-center p-0 bg-blue-light rounded-2xl h-[70px]'}>
                <Image src={'/images/centrifuge.svg'} width={'126'} height={'40'} alt={''} />
              </div>
              <div className={'flex items-center justify-center p-0 bg-blue-light rounded-2xl h-[70px]'}>
                <Image src={'/images/synthetix.svg'} width={'213'} height={'40'} alt={''} />
              </div>
              <div className={'flex items-center justify-center p-0 bg-blue-light rounded-2xl h-[70px]'}>
                <Image src={'/images/polymesh.svg'} width={'145'} height={'18'} alt={''} />
              </div>
            </div>
          </Card>
        </div>
      </Wrapper>
    </section>
  );
};