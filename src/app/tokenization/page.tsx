import React, { FC } from 'react';
import { Wrapper } from '@/components/layout';
import { Button, Card, Title } from '@/components/ui';
import Image from 'next/image';
import { FAQ, Gallery, TokenizeAnyBusiness, WideGallery } from '@/components/common';
import { ProjectCard } from '@/components/project';
import { HowToStart } from '@/components/home';

const Tokenization: FC = () => {
  return (
    <>
      <section
        className={
          'bg-[url(/images/tokenization-bg-m.png)] bg-top bg-cover bg-no-repeat pt-[96px] mb-25 md:bg-size-[100%_838px] md:mb-50 md:pt-[184px] md:bg-[url(/images/tokenization-bg-d.png)]'
        }
      >
        <Wrapper>
          <div className={'flex flex-col items-center mb-33 md:mb-37.5'}>
            <Title className={'text-white text-center mb-4'} size={'xl'} level={1}>
              Unlock full potential of your <br />
              business
              <span className={'text-grey'}> with tokenization</span>
            </Title>
            <p className={'text-base/[1.4] text-center text-white mb-8'}>
              Make your assets accessible to a wider range of investors
            </p>
            <Button className={'w-full mb-15 md:w-fit'} visualType={'primary'}>
              Start trading
            </Button>
          </div>
          <div className={'grid gap-3 md:gap-5 lg:grid-cols-3'}>
            <Card className={'flex flex-col justify-between lg:min-h-[270px]'} size={'lg'}>
              <Title className={'mb-3'} size={'sm'} level={3}>
                Increase liquidity and raise your capital
              </Title>
              <p className={'text-grey-dark text-base'}>
                Brake down your assets into small shares and make your project available to a wider range of investors
              </p>
            </Card>
            <Card className={'flex flex-col justify-between lg:min-h-[270px]'} size={'lg'}>
              <Title className={'mb-3'} size={'sm'} level={3}>
                Expand <br className={'max-lg:hidden'} />
                your reach
              </Title>
              <p className={'text-grey-dark text-base'}>
                Tokens can be bought and sold by investors from all over the world, expanding the market of your
                potential buyers
              </p>
            </Card>
            <Card className={'flex flex-col justify-between lg:min-h-[270px]'} size={'lg'}>
              <Title className={'mb-3'} size={'sm'} level={3}>
                Be progressive
              </Title>
              <p className={'text-grey-dark text-base'}>
                Earn a reputation as a progressive company that keeps pace with the future
              </p>
            </Card>
          </div>
        </Wrapper>
      </section>
      <TokenizeAnyBusiness />
      <section className={'mb-25 md:mb-50'}>
        <Wrapper>
          <Title className={'text-center mb-10 md:mb-20'} size={'lg'} level={2}>
            How it Works
          </Title>
          <div className={'grid gap-3 lg:grid-cols-2'}>
            <Card
              className={
                'flex flex-col justify-end min-h-[321px] text-white bg-[url(/images/select.jpg)] bg-cover md:min-h-[460px] lg:row-span-2'
              }
              size={'xl'}
              color={'blueDim'}
            >
              <Title className={'flex items-center gap-4 mb-3 md:mb-3'} size={'md'} level={4}>
                1. Select an asset you own
              </Title>
              <p className={'text-base/[1.4] font-medium mb-4'}>
                Choose something that is profitable and stable enough to attract investors
              </p>
            </Card>
            <Card className={'flex flex-col justify-between'} size={'xl'} color={'greyLight'}>
              <Title className={'mb-3 md:mb-8'} size={'md'} level={4}>
                2. Create a project page
              </Title>
              <p className={'text-grey-dark text-base/[1.4]'}>
                Sign up and create a project page that will hold your liquidity pools. Describe your business and
                funding goals
              </p>
            </Card>
            <Card className={'flex flex-col justify-between'} size={'xl'} color={'greyLight'}>
              <Title className={'mb-3 md:mb-8'} size={'md'} level={4}>
                3. Set up a pool and raise funds
              </Title>
              <p className={'text-grey-dark text-base/[1.4]'}>
                Get funds in 1-3 months. Use them to develop your projects and return to investors with more profitable
                offers
              </p>
            </Card>
          </div>
        </Wrapper>
      </section>
      <section className={'mb-25 md:mb-50'}>
        <Wrapper>
          <Title className={'text-center mb-10 md:mb-20'} size={'lg'} level={2}>
            Choose a fitting <br />
            payout system
          </Title>
          <div className={'grid gap-3 mb-10 md:mb-15 md:grid-cols-2 md:gap-5'}>
            <Card size={'xl'} color={'greyLight'}>
              <div className={'size-9 bg-blue-gradient mask-[url(/icons/hand-coins.svg)] mask-contain mb-10'} />
              <Title className={'mb-6'} size={'md'} level={4}>
                Principal Repayment Only
              </Title>
              <ul className={'grid gap-3'}>
                <li
                  className={
                    'flex gap-3 text-grey-dark text-base/[1.4] before:shrink-0 before:size-5 before:bg-blue before:mask-[url(/icons/star.svg)] before:mask-contain'
                  }
                >
                  Lower financial pressure. No need to generate extra returns
                </li>
                <li
                  className={
                    'flex gap-3 text-grey-dark text-base/[1.4] before:shrink-0 before:size-5 before:bg-blue before:mask-[url(/icons/star.svg)] before:mask-contain'
                  }
                >
                  Best for community-driven or early-stage projects
                </li>
              </ul>
            </Card>
            <Card size={'xl'} color={'white'}>
              <div className={'size-9 bg-blue-gradient mask-[url(/icons/coins.svg)] mask-contain mb-10'} />
              <Title className={'mb-6'} size={'md'} level={4}>
                Principal + Interest
              </Title>
              <ul className={'grid gap-3'}>
                <li
                  className={
                    'flex gap-3 text-grey-dark text-base/[1.4] before:shrink-0 before:size-5 before:bg-blue before:mask-[url(/icons/star.svg)] before:mask-contain'
                  }
                >
                  Lower financial pressure. No need to generate extra returns
                </li>
                <li
                  className={
                    'flex gap-3 text-grey-dark text-base/[1.4] before:shrink-0 before:size-5 before:bg-blue before:mask-[url(/icons/star.svg)] before:mask-contain'
                  }
                >
                  Best for community-driven or early-stage projects
                </li>
              </ul>
            </Card>
          </div>
        </Wrapper>
      </section>
      <WideGallery
        id={'promoting-page'}
        title={'Create a promoting page for your project'}
        images={[
          '/images/gallery-mock5.jpg',
          '/images/gallery-mock5.jpg',
          '/images/gallery-mock5.jpg',
          '/images/gallery-mock5.jpg',
          '/images/gallery-mock5.jpg',
        ]}
      />
      <Gallery
        id={'monitoring-page'}
        title={'Monitor investor interest and funding process in real time'}
        text={
          'Get a clear view of your token’s price movement and funds collection progress. Use these insights to make informed decisions'
        }
        images={[
          '/images/gallery-mock2.jpg',
          '/images/gallery-mock3.jpg',
          '/images/gallery-mock4.jpg',
          '/images/gallery-mock2.jpg',
          '/images/gallery-mock3.jpg',
          '/images/gallery-mock4.jpg',
        ]}
      />
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
              <Button className={'mt-auto md:w-fit'} visualType={'tertiary'}>
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
      <FAQ
        faqList={[
          {
            question: 'How am I protected from fraud?',
            answer: (
              <>
                <p>We aim to create a safe and secure environment for all users by combining these measures:</p>
                <ul>
                  <li>We use Know Your Client (KYC) protocols to verify every project</li>
                  <li>
                    Our platform uses audited smart contracts to ensure that transactions are secure and tamper-proof
                  </li>
                  <li>We provide resources to educate users on common scams and best practices for online security</li>
                  <li>
                    Our platform has a dispute resolution system in place to handle any issues that may arise during
                    transactions
                  </li>
                </ul>
              </>
            ),
          },
          {
            question: 'What are the legal implications of tokenizing my business assets?',
            answer: (
              <>
                <p>
                  Make sure the tokens follow local laws to avoid legal problems. It's a good idea to consult with a
                  legal expert in blockchain and securities law before or after tokenizing your assets.
                </p>
              </>
            ),
          },
          {
            question: 'How can I ensure the security of my tokens?',
            answer: (
              <>
                <p>
                  Slices platform is securely protected from fraud. Be mindful and avoid sharing private keys anywhere
                  to ensure safety.
                </p>
              </>
            ),
          },
        ]}
      />
    </>
  );
};

export default Tokenization;
