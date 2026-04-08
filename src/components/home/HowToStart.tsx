'use client';

import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

import { Wrapper } from '@/components/layout';
import { Button, Card, Title } from '@/components/ui';
import Image from 'next/image';

const HowToStart: FC = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const steps = [
    {
      title: 'Connect your wallet to\u00a0the\u00a0platform',
      list: [
        'Click «Connect wallet» in the menu or\u00a0click the\u00a0button below',
        'Enter the address of your wallet',
        'Make sure you have USDT-tokens in your wallet for trading on\u00a0the\u00a0platform',
      ],
      image: '/images/dashboard-mock.jpg',
    },
    {
      title: 'Choose a project you want to\u00a0invest in',
      list: [
        'Go to Marketplace and find a\u00a0fitting project using filters ',
        'Click on a project card to get detailed information',
        'Buy as many tokens of a project as you want',
      ],
      image: '/images/choose-projects.jpg',
    },
    {
      title: 'Manage all stocks in your portfolio',
      list: [
        'Watch and manage all projects that you have',
        'Contact the Product Owner at\u00a0any time',
        'Get rewards — one click, and they go straight to your wallet',
      ],
      image: '/images/manage-stocks.jpg',
    },
  ];

  if (!steps || !steps.length) return null;

  return (
    <section className={'mb-25 md:mb-50'}>
      <Wrapper>
        <Title className={'text-center mb-10 md:mb-20'} size={'lg'} level={2}>
          How to start
        </Title>
        <div className={'grid-cols-2 gap-5 lg:grid'}>
          <div className={'flex flex-col gap-3'}>
            {steps.map(({ title, list, image }, index) => (
              <Card size={'xl'} color={'greyLight'} key={title + 'step'}>
                <button
                  className={
                    'text-start text-black text-xl/[1.2] tracking-[-0.02em] md:text-[2rem] font-semibold max-lg:mb-5 lg:cursor-pointer'
                  }
                  onClick={() => setCurrentItemIndex(index)}
                >
                  {title}
                </button>
                <Image
                  className={'w-full h-auto aspect-[1.636] object-cover rounded-xl mb-5 lg:hidden'}
                  src={image}
                  width={'670'}
                  height={'590'}
                  alt={''}
                />
                <div
                  className={clsx(
                    'grid-rows-[0fr] tr-d-all overflow-hidden max-lg:mt-10 lg:grid',
                    currentItemIndex === index && 'grid-rows-[1fr] md:mt-10'
                  )}
                >
                  <ul className={'overflow-hidden flex flex-col gap-3'}>
                    {list &&
                      list.length > 0 &&
                      list.map(item => (
                        <li
                          className={
                            'flex gap-3 whitespace-pre-wrap text-grey-dark text-base/[1.4] before:shrink-0 before:size-5 before:bg-blue before:mask-[url(/icons/star.svg)] before:mask-contain'
                          }
                          key={item}
                        >
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>
              </Card>
            ))}
            <Button className={'mt-3'} visualType={'secondary'}>
              Connect wallet
            </Button>
          </div>
          <div className={'relative h-full max-lg:hidden'}>
            <AnimatePresence mode='wait'>
              <motion.img
                key={steps[currentItemIndex].image}
                src={steps[currentItemIndex].image}
                className='absolute inset-0 h-full w-full object-cover object-center rounded-[40px]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default HowToStart;
