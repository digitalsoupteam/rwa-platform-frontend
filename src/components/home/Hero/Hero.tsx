import { Wrapper } from '@/components/layout';
import React, { FC } from 'react';
import { Button, Card, Title } from '@/components/ui';
import Image from 'next/image';

const Hero: FC = () => {
  const projectBadges = [
    {
      network: 'WRY',
      category: 'AT',
      profit: '4',
    },
    {
      network: 'GRW',
      category: 'Real estate',
      profit: '7',
    },
    {
      network: 'TRX',
      category: 'IE',
      profit: '5',
    },
    {
      network: 'CAP',
      category: 'US',
      profit: '8',
    },
    {
      network: 'SOL',
      category: 'Entertainment',
      profit: '6',
    },
  ];

  return (
    <section
      className={
        'bg-[url(/images/hero-bg.png)] bg-center bg-black bg-cover pt-30.5 mb-25 md:mb-50 md:pt-47 md:bg-[url(/images/hero-bg-d.png)]'
      }
    >
      <Wrapper>
        <div className={'flex flex-col items-center'}>
          <Title className={'text-white text-center mb-4'} size={'xl'} level={1}>
            <span className={'text-grey'}>Buy real assets,</span>
            <br /> get real returns
          </Title>
          <p className={'text-base/[1.4] text-center text-white mb-8'}>
            Buy and trade RWAs of diverse projects. <br />
            Build wealth that grows with time
          </p>
          <Button className={'w-full mb-15 md:w-fit'} visualType={'primary'}>
            Start trading
          </Button>

          <div
            className={
              'w-screen px-3 flex gap-5 mb-21 max-md:overflow-x-scroll md:px-0 md:max-w-[670px] md:flex-wrap md:justify-center'
            }
          >
            {projectBadges &&
              projectBadges.length > 0 &&
              projectBadges.map(({ network, category, profit }) => (
                <Card
                  className={'shrink-0 !bg-grey-transparent backdrop-blur-sm'}
                  size={'xs'}
                  key={network + category + profit}
                >
                  <div className={'flex items-center gap-3 mb-2'}>
                    <span
                      className={'text-white text-sm/[1.4] px-3 font-medium bg-blue-transparent rounded-[0.625rem]'}
                    >
                      {category}
                    </span>
                    <span className={'text-blue-ultra text-base/[1.2] font-semibold'}>{network}</span>
                  </div>
                  <div className={'text-white text-sm/[1.4]'}>
                    <span className={'text-green'}>~{profit}% </span>/ monthly profit
                  </div>
                </Card>
              ))}
          </div>

          <div className={'w-full grid grid-cols-2 gap-3 mb-3 lg:grid-cols-5'}>
            <Card size={'sm'}>
              <div className={'text-2xl/[1.2] font-semibold'}>4 357+</div>
              <div className={'text-sm/[1.4]'}>Projects on&nbsp;Marketplace</div>
            </Card>
            <Card size={'sm'}>
              <div className={'text-2xl/[1.2] font-semibold'}>11 786</div>
              <div className={'text-sm/[1.4]'}>
                Active <br className={'sm:hidden'} />
                users
              </div>
            </Card>
            <Card size={'sm'}>
              <div className={'text-2xl/[1.2] font-semibold'}>$10</div>
              <div className={'text-sm/[1.4]'}>Smallest entry price</div>
            </Card>
            <Card size={'sm'}>
              <div className={'text-2xl/[1.2] font-semibold'}>AI</div>
              <div className={'text-sm/[1.4]'}>Powered rating system</div>
            </Card>
            <Card className={'col-span-2 lg:col-span-1'} size={'sm'}>
              <div className={'text-2xl/[1.2] font-semibold'}>DAO</div>
              <div className={'text-sm/[1.4]'}>Platform run by users</div>
            </Card>
          </div>

          <Card className={'w-full'} size={'sm'}>
            <div className={'text-2xl/[1.2] font-semibold md:text-[2rem]/[1] tracking-tighter mb-4'}>Backed By</div>
            <div className={'grid grid-cols-2 gap-1 md:gap-3 md:grid-cols-4 lg:grid-cols-8'}>
              <div className={'flex items-center justify-center rounded-xl h-[58px] !bg-grey-light md:rounded-[1.25rem]'}>
                <Image
                  className={'h-[42px] w-[116px] object-contain object-center'}
                  src={'/images/emc.svg'}
                  width={'150'}
                  height={'50'}
                  alt={'baza logo'}
                />
              </div>
              <div className={'flex items-center justify-center rounded-xl h-[58px] !bg-grey-light md:rounded-[1.25rem]'}>
                <Image
                  className={'h-[42px] w-[116px] object-contain object-center'}
                  src={'/images/eenviro.svg'}
                  width={'150'}
                  height={'50'}
                  alt={'baza logo'}
                />
              </div>
              <div className={'flex items-center justify-center rounded-xl h-[58px] !bg-grey-light md:rounded-[1.25rem]'}>
                <Image
                  className={'h-[42px] w-[116px] object-contain object-center'}
                  src={'/images/coreapp.svg'}
                  width={'150'}
                  height={'50'}
                  alt={'baza logo'}
                />
              </div>
              <div className={'flex items-center justify-center rounded-xl h-[58px] !bg-grey-light md:rounded-[1.25rem]'}>
                <Image
                  className={'h-[42px] w-[116px] object-contain object-center'}
                  src={'/images/baza.svg'}
                  width={'150'}
                  height={'50'}
                  alt={'baza logo'}
                />
              </div>
              <div className={'flex items-center justify-center rounded-xl h-[58px] !bg-grey-light md:rounded-[1.25rem]'}>
                <Image
                  className={'h-[42px] w-[116px] object-contain object-center'}
                  src={'/images/emc.svg'}
                  width={'150'}
                  height={'50'}
                  alt={'baza logo'}
                />
              </div>
              <div className={'flex items-center justify-center rounded-xl h-[58px] !bg-grey-light md:rounded-[1.25rem]'}>
                <Image
                  className={'h-[42px] w-[116px] object-contain object-center'}
                  src={'/images/eenviro.svg'}
                  width={'150'}
                  height={'50'}
                  alt={'baza logo'}
                />
              </div>
              <div className={'flex items-center justify-center rounded-xl h-[58px] !bg-grey-light md:rounded-[1.25rem]'}>
                <Image
                  className={'h-[42px] w-[116px] object-contain object-center'}
                  src={'/images/coreapp.svg'}
                  width={'150'}
                  height={'50'}
                  alt={'baza logo'}
                />
              </div>
              <div className={'flex items-center justify-center rounded-xl h-[58px] !bg-grey-light md:rounded-[1.25rem]'}>
                <Image
                  className={'h-[42px] w-[116px] object-contain object-center'}
                  src={'/images/baza.svg'}
                  width={'150'}
                  height={'50'}
                  alt={'baza logo'}
                />
              </div>
            </div>
          </Card>
        </div>
      </Wrapper>
    </section>
  );
};

export default Hero;
