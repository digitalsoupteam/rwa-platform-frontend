'use client';

import React, { FC } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Wrapper } from '@/components/layout';
import { Button, Card, Title } from '@/components/ui';

export const GetStartedSection: FC = () => {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();

  return (
    <section id={'get-started'} className={'mb-25 md:mb-50'}>
      <Wrapper>
        <Title className={'text-center mb-10 md:mb-15'} size={'lg'} level={2}>
          Get started with this
        </Title>
        <div className={'grid gap-3 md:grid-cols-2 lg:gap-5 lg:grid-cols-12 lg:grid-rows-[340px_240px]'}>
          <Card
            className={
              'flex flex-col justify-between gap-3 !bg-grey-light bg-[url(/images/bg-overlay.png)] bg-cover lg:col-span-3'
            }
            size={'lg'}
          >
            <Title className={'text-white'} size={'md'} level={4}>
              Connect your Web3&nbsp;wallet
            </Title>
            <Button
              className={'w-fit'}
              visualType={'tertiary'}
              onClick={address ? undefined : openConnectModal}
              href={address ? '/faucet/' : undefined}
            >
              {address ? 'Claim' : 'Connect wallet'}
            </Button>
          </Card>
          <Card className={'flex flex-col justify-between gap-3 !bg-grey-light lg:col-span-5'} size={'lg'}>
            <Title size={'md'} level={4}>
              Claim test USDTs and try all platform features
            </Title>
            <p className={'text-grey-dark text-base/[1.4]'}>
              Explore all the functionality of the service in practice without risking your personal funds
            </p>
          </Card>
          <Card
            className={
              'relative flex flex-col justify-end gap-3 overflow-hidden min-h-[321px] !bg-grey-light bg-[url(/images/ref-earn.jpg)] bg-cover md:col-span-2 lg:col-span-4 lg:row-span-2'
            }
            size={'lg'}
          >
            <div className={'z-1 relative flex flex-col gap-3'}>
              <Title className={'text-white'} size={'md'} level={4}>
                Invite friends and earn even&nbsp;more points
              </Title>
              <p className={'text-white text-base/[1.4]'}>
                Receive 5 % of their points before airdrop, and 10% of their referral fees after
              </p>
            </div>
          </Card>
          <Card className={'flex flex-col justify-between gap-3 !bg-grey-light lg:col-span-8'} size={'lg'}>
            <Title size={'md'} level={4}>
              Get DAO tokens for points at the end of the testnet
            </Title>
            <p className={'text-grey-dark text[-base/[1.4]'}>
              DAO tokens give you governance rights and platform benefits after launch
            </p>
          </Card>
        </div>
      </Wrapper>
    </section>
  );
};