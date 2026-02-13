import React, { FC } from 'react';
import { CommonLayout, Wrapper } from '@/components/layout';
import { Button, Card, Title } from '@/components/ui';
import { FAQ } from '@/components/common';
import clsx from 'clsx';

const Testnet: FC = () => {
  return (
    <CommonLayout>
      <section
        className={
          'bg-[url(/images/tokenization-bg-m.png)] bg-top bg-cover bg-no-repeat pt-[96px] mb-25 md:bg-size-[100%_838px] md:mb-50 md:pt-[184px] md:bg-[url(/images/tokenization-bg-d.png)]'
        }
      >
        <Wrapper>
          <div className={'flex flex-col items-center mb-33 md:mb-37.5'}>
            <Title className={'text-white text-center mb-4 max-w-[1122px]'} size={'xl'} level={1}>
              Join our public testnet & shape the future of the platform
            </Title>
            <p className={'text-base/[1.4] text-center text-white mb-8'}>
              Earn points for testing features. Points will convert into DAO tokens after testnet
            </p>
            <Button className={'w-full mb-15 md:w-fit'} visualType={'primary'}>
              Start collecting points
            </Button>
          </div>
          <div className={'grid gap-3 md:gap-5 lg:grid-cols-3'}>
            <Card className={'flex flex-col justify-between lg:min-h-[270px]'} size={'lg'}>
              <Title className={'mb-3'} size={'sm'} level={3}>
                Become a stakeholder
              </Title>
              <p className={'text-grey-dark text-base'}>Get a piece of the protocol and benefit as it grows</p>
            </Card>
            <Card className={'flex flex-col justify-between lg:min-h-[270px]'} size={'lg'}>
              <Title className={'mb-3'} size={'sm'} level={3}>
                Earn without risking funds
              </Title>
              <p className={'text-grey-dark text-base'}>
                Tokens can be bought and sold by investors from all over the world, expanding the market of your
                potential buyers
              </p>
            </Card>
            <Card className={'flex flex-col justify-between lg:min-h-[270px]'} size={'lg'}>
              <Title className={'mb-3'} size={'sm'} level={3}>
                Help build what you’ll use
              </Title>
              <p className={'text-grey-dark text-base'}>
                Vote on fees, features, and future upgrades. Your voice actually counts
              </p>
            </Card>
          </div>
        </Wrapper>
      </section>
      <section className={'mb-25 md:mb-50'}>
        <Wrapper>
          <Card
            className={
              '!bg-black bg-[url(/images/testnet-m.jpg)] bg-cover bg-center bg-no-repeat text-white pb-[332px] md:pb-[447px] lg:bg-[url(/images/testnet-d.jpg)]'
            }
            size={'lg'}
          >
            <div>
              <Title
                className={
                  'flex items-center gap-1 mb-3 before:size-8 before:bg-white before:mask-[url(/icons/sparkles.svg)] before:mask-contain md:gap-4'
                }
                size={'lg'}
                level={2}
              >
                What is testnet?
              </Title>
              <p className={'text-base font-medium max-w-[480px]'}>
                The testnet lets you try all platform features without risk.You’ll get test USDT to create pools, add
                liquidity, withdraw, vote, and stake — all in a safe sandbox. Every action you take helps us polish
                Slices before the main launch.
              </p>
            </div>
          </Card>
        </Wrapper>
      </section>
      <section className={'mb-25 md:mb-50'}>
        <Wrapper>
          <Title className={'text-center mb-10 md:mb-20'} size={'lg'} level={2}>
            Things to try during testnet
          </Title>
          <div className={'grid gap-3 md:gap-5 md:grid-cols-2 lg:grid-cols-3'}>
            <Card size={'lg'}>
              <Title
                className={
                  'flex flex-col gap-6 mb-3 before:size-9 before:mask-[urL(/icons/chart.svg)] before:bg-blue-gradient before:mask-contain before:background- md:gap-10'
                }
                size={'md'}
                level={3}
              >
                Add liquidity to pools
              </Title>
              <p className={'text-grey-dark text-base font-medium'}>
                Deposit test USDT into any pool to simulate real investment scenarios & track your returns
              </p>
            </Card>
            <Card size={'lg'}>
              <Title
                className={
                  'flex flex-col gap-6 mb-3 before:size-9 before:mask-[urL(/icons/hand-coins.svg)] before:bg-blue-gradient before:mask-contain before:background- md:gap-10'
                }
                size={'md'}
                level={3}
              >
                Withdraw funds
              </Title>
              <p className={'text-grey-dark text-base font-medium'}>
                Remove your assets from pools and verify that all withdrawal mechanics work correctly
              </p>
            </Card>
            <Card size={'lg'}>
              <Title
                className={
                  'flex flex-col gap-6 mb-3 before:size-9 before:mask-[urL(/icons/rocket.svg)] before:bg-blue-gradient before:mask-contain before:background- md:gap-10'
                }
                size={'md'}
                level={3}
              >
                Create pools
              </Title>
              <p className={'text-grey-dark text-base font-medium'}>
                Build new liquidity pools and test how they behave under different market conditions
              </p>
            </Card>
            <Card size={'lg'}>
              <Title
                className={
                  'flex flex-col gap-6 mb-3 before:size-9 before:mask-[urL(/icons/coins.svg)] before:bg-blue-gradient before:mask-contain before:background- md:gap-10'
                }
                size={'md'}
                level={3}
              >
                Use DAO tokens
              </Title>
              <p className={'text-grey-dark text-base font-medium'}>
                Claim and interact with DAO tokens to test how governance power works
              </p>
            </Card>
            <Card size={'lg'}>
              <Title
                className={
                  'flex flex-col gap-6 mb-3 before:size-9 before:mask-[urL(/icons/hand.svg)] before:bg-blue-gradient before:mask-contain before:background- md:gap-10'
                }
                size={'md'}
                level={3}
              >
                Vote
              </Title>
              <p className={'text-grey-dark text-base font-medium'}>
                Try voting to see how future DAO decisions will be made
              </p>
            </Card>
            <Card size={'lg'}>
              <Title
                className={
                  'flex flex-col gap-6 mb-3 before:size-9 before:mask-[urL(/icons/judge-hammer.svg)] before:bg-blue-gradient before:mask-contain before:background- md:gap-10'
                }
                size={'md'}
                level={3}
              >
                Stake PLT tokens
              </Title>
              <p className={'text-grey-dark text-base font-medium'}>
                Test how staking works in the interface (locking, balances, stats)
              </p>
            </Card>
            <Card
              className={clsx(
                'flex flex-col text-white !bg-blue-gradient md:col-span-2 lg:col-span-3 lg:flex-row lg:justify-between lg:items-center',
                'overflow-hidden relative after:pointer-events-none after:absolute after:inset-0 after:bg-[url(/images/noise.png)]'
              )}
              size={'lg'}
            >
              <div>
                <Title className={'mb-3'} size={'md'} level={3}>
                  Get additional bounty for bug hunting
                </Title>
                <p className={'text-base mb-10 lg:max-w-100'}>
                  Report UX issues and receive additional rewards in DAO tokens →
                </p>
              </div>
              <Button className={'max-md:w-full'} visualType={'tertiary'}>
                Report a bug
              </Button>
            </Card>
          </div>
        </Wrapper>
      </section>
      <section className={'mb-25 md:mb-50'}>
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
              <Button className={'w-fit'} visualType={'tertiary'}>
                Connect wallet
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
      <FAQ
        title={'Useful information before you start'}
        faqList={[
          {
            question: 'What are the test tokens?',
            answer: (
              <p>
                Test tokens are simulations of real tokens within the platform. They have no financial value and allow
                you to test all platform features for free
              </p>
            ),
          },
          {
            question: 'Do I need to invest real funds?',
            answer: <p>No, you can test all features without any real investment or risk</p>,
          },
          {
            question: 'When will DAO tokens be distributed?',
            answer: <>text</>,
          },
          {
            question: 'How can I track my progress?',
            answer: <>text</>,
          },
        ]}
      />
    </CommonLayout>
  );
};

export default Testnet;
