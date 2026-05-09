import React, { FC } from 'react';

import { Wrapper } from '@/components/layout';
import { Card, Title } from '@/components/ui';

const HowItWorks: FC = () => {
  return (
    <section className={'mb-25 md:mb-50'}>
      <Wrapper>
        <Title className={'text-center mb-10 md:mb-15'} size={'lg'} level={2}>
          How it Works
        </Title>
        <div className={'grid gap-3 md:grid-cols-2 lg:gap-5 lg:grid-cols-12 lg:grid-rows-[minmax(240px,auto)_minmax(340px,auto)]'}>
          <Card
            className={
              'relative flex flex-col justify-end gap-3 overflow-hidden min-h-[321px] !bg-grey-light bg-[url(/images/hiw-market.png)] bg-cover md:col-span-2 lg:col-span-4 lg:row-span-2 lg:bg-[url(/images/hiw-market-d.png)]'
            }
            size={'lg'}
          >
            <div className={'z-1 relative flex flex-col gap-3'}>
              <Title className={'text-white'} size={'md'} level={4}>
                Choose RWAs on Marketplace
              </Title>
              <p className={'text-white text-base/[1.4]'}>
                Discover profitable and prospective projects. Filter them by price, category and payment frequency
              </p>
            </div>
          </Card>
          <Card className={'flex flex-col justify-end gap-3 !bg-grey-light lg:col-span-3'} size={'lg'}>
            <Title size={'md'} level={4}>
              Purchase RWAs with crypto
            </Title>
            <p className={'text-grey-dark text-base/[1.4]'}>
              Connect your wallet to our platform in seconds. Buy and trade RWAs with USDTs
            </p>
          </Card>
          <Card className={'flex flex-col justify-end gap-3 !bg-grey-light lg:col-span-5'} size={'lg'}>
            <Title size={'md'} level={4}>
              Diversify your portfolio
            </Title>
            <p className={'text-grey-dark text-base/[1.4]'}>
              Collect RWAs of real estate, cars, enterprises, or anything else for a steady portfolio
            </p>
          </Card>
          <Card className={'flex flex-col justify-end gap-3 !bg-grey-light bg-[url(/images/bg-overlay.png)] bg-cover lg:col-span-3 lg:order-last'} size={'lg'}>
            <Title className={'text-white'} size={'md'} level={4}>
              Earn passively while others are trading
            </Title>
            <p className={'text-white text-base/[1.4]'}>
              Add liquidity to token pools and get comission every time other people buy and sell tokens
            </p>
          </Card>
          <Card className={'flex flex-col justify-end gap-3 !bg-grey-light lg:col-span-5'} size={'lg'}>
            <Title size={'md'} level={4}>
          Return your money <br/>and get more
            </Title>
            <p className={'text-grey-dark text[-base/[1.4]'}>
          Receive debt repayments and then interest
            </p>
          </Card>
        </div>
      </Wrapper>
    </section>
  );
};

export default HowItWorks;
