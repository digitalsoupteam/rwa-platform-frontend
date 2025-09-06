'use client';

import React, { FC, useLayoutEffect, useRef, useState } from 'react';

import { Wrapper } from '@/components/layout';
import { Card, Title } from '@/components/ui';
import clsx from 'clsx';

const PoolProgress: FC = () => {
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardLeft, setCardLeft] = useState(0);

  const periods = [
    { value: '520 USDT', text: '1 days after\u00a0pool ends' },
    { value: '520 USDT', text: '2 days after\u00a0pool ends' },
    { value: '520 USDT', text: '3 days after\u00a0pool ends' },
    { value: '520 USDT', text: '4 days after\u00a0pool ends' },
    { value: '520 USDT', text: '5 days after\u00a0pool ends' },
    { value: '520 USDT', text: '6 days after\u00a0pool ends' },
    { value: '520 USDT', text: '7 days after\u00a0pool ends' },
    { value: '520 USDT', text: '8 days after\u00a0pool ends' },
    { value: '520 USDT', text: '9 days after\u00a0pool ends' },
    { value: '520 USDT', text: '125 days after\u00a0pool ends' },
    { value: '520 USDT', text: '11 days after\u00a0pool ends' },
    { value: '520 USDT', text: '12 days after\u00a0pool ends' },
    { value: '520 USDT', text: '13 days after\u00a0pool ends' },
    { value: '520 USDT', text: '14 days after\u00a0pool ends' },
    { value: '520 USDT', text: '15 days after\u00a0pool ends' },
    { value: '520 USDT', text: '16 days after\u00a0pool ends' },
    { value: '520 USDT', text: '17 days after\u00a0pool ends' },
  ];

  useLayoutEffect(() => {
    const updatePosition = () => {
      if (!containerRef.current || !cardRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const activeButton = containerRef.current.querySelectorAll('button')[currentPeriodIndex];
      if (!activeButton) return;

      const buttonRect = activeButton.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();

      // центр кнопки относительно контейнера
      let left = buttonRect.left + buttonRect.width / 2 - containerRect.left;

      // корректируем так, чтобы карточка не выходила за пределы
      const halfWidth = cardRect.width / 2;
      const minLeft = halfWidth;
      const maxLeft = containerRect.width - halfWidth;

      left = Math.max(minLeft, Math.min(left, maxLeft));
      setCardLeft(left);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [currentPeriodIndex]);

  return (
    <section className={'mb-25 md:mb-50'}>
      <Wrapper>
        <div className={'grid gap-3 md:gap-5 lg:grid-cols-[5fr_7fr]'}>
          <Card size={'xl'} color={'white'}>
            <Title className={'mb-5 md:mb-13'} size={'lg'} level={2}>
              Most stable backing of assets
            </Title>
            <ul className={'grid gap-4 md:gap-6'}>
              <li
                className={
                  'flex gap-3 text-grey-dark text-base/[1.4] before:shrink-0 before:size-6 before:bg-blue before:mask-[url(/icons/star.svg)] before:mask-contain lg:max-w-[460px]'
                }
              >
                No wasting earned money on commissions to&nbsp;banks&nbsp;or&nbsp;brokers
              </li>
              <li
                className={
                  'flex gap-3 text-grey-dark text-base/[1.4] before:shrink-0 before:size-6 before:bg-blue before:mask-[url(/icons/star.svg)] before:mask-contain lg:max-w-[460px]'
                }
              >
                Your money is always accessible: there is no&nbsp;way to&nbsp;block&nbsp;your account, unlike
                in&nbsp;classic investing
              </li>
              <li
                className={
                  'flex gap-3 text-grey-dark text-base/[1.4] before:shrink-0 before:size-6 before:bg-blue before:mask-[url(/icons/star.svg)] before:mask-contain lg:max-w-[460px]'
                }
              >
                Transactions are always anonymous and transparent at&nbsp;the same time
              </li>
            </ul>
          </Card>

          <Card size={'xl'} color={'greyLight'}>
            <div className={'flex items-center flex-wrap justify-between gap-3 mb-5 md:mb-8'}>
              <Title size={'md'} level={4}>
                Pool progress
              </Title>
              <div className={'ml-auto py-1 px-2.5 rounded-[20px] bg-blue-dim text-base[1.2] font-semibold text-blue'}>
                Flexible pool
              </div>
            </div>
            <div
              className={
                'relative overflow-hidden rounded-2xl bg-blue-dim h-14.5 flex items-center justify-center mb-5 md:mb-8'
              }
            >
              <div
                className={'z-0 absolute top-0 left-0 bottom-0 right-0 bg-blue-accent'}
                style={{ width: `${(15_500 / 35_500) * 100}%` }}
              />
              <div
                className={'z-1 relative text-base/[1.4] tracking-tight font-medium md:font-semibold md:text-xl/[1.2]'}
              >
                15 500 out of 35 500 USDT
              </div>
            </div>
            <div className={'bg-white p-5 rounded-xl md:p-6 md:rounded-2xl'}>
              <div className={'text-xl/[1.2] tracking-tight font-semibold mb-21 md:mb-9 md:text-2xl/[1.2]'}>
                Debt paying schedule
              </div>
              <div className={'relative grid gap-1 md:gap-1.5'}>
                <div
                  ref={cardRef}
                  className={
                    'absolute bottom-[calc(100%+8px)] min-w-[166px] bg-white p-3 rounded-xl shadow-[0_2px_6px_0_rgba(21,36,77,0.23)] w-fit tr-d-all md:min-w-[188px]'
                  }
                  style={{ left: cardLeft, transform: 'translateX(-50%)' }}
                >
                  <div className={'text-blue text-center text-sm/[1.4] font-bold mb-1'}>
                    {periods[currentPeriodIndex].value}
                  </div>
                  <div className={'text-grey-dark text-center text-xs/[1.3] font-medium'}>
                    {periods[currentPeriodIndex].text}
                  </div>
                </div>
                <div
                  className={'flex gap-1 justify-between items-center p-2 bg-blue-light rounded-[29px]'}
                  onTouchMove={evt => {
                    const touch = evt.touches[0];
                    const element = document.elementFromPoint(touch.clientX, touch.clientY);

                    if (!(element instanceof HTMLButtonElement)) return;

                    const index = element.getAttribute('data-index');
                    if (index) setCurrentPeriodIndex(parseInt(index));
                  }}
                  ref={containerRef}
                >
                  {periods &&
                    periods.length > 0 &&
                    periods.map(({ text }, index) => (
                      <button
                        className={clsx(
                          'cursor-pointer rounded-full tr-d-all',
                          index === 0 || index === periods.length - 1 ? 'size-4 md:size-6' : 'size-2 md:size-4',
                          currentPeriodIndex === index ? 'bg-blue' : 'bg-blue-dim'
                        )}
                        onClick={() => setCurrentPeriodIndex(index)}
                        data-index={index}
                        key={text}
                      >
                        <span className={'visually-hidden'}>Select period № {index + 1}</span>
                      </button>
                    ))}
                </div>
                <div className={'flex gap-3 justify-between text-grey-dark text-sm/[1.4] '}>
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </Card>

          <div className={'grid gap-3 md:gap-5 lg:grid-cols-3 lg:col-span-full'}>
            <Card size={'lg'} color={'white'}>
              <div className={'text-xl/[1.2] tracking-tight font-semibold mb-3 md:mb-7'}>
                Most stable backing of assets
              </div>
              <div className={'text-grey text-base/[1.4]'}>
                Assets from different sectors and classes reduce risk and&nbsp;increase the&nbsp;potential of your
                portfolio
              </div>
            </Card>
            <Card size={'lg'} color={'white'}>
              <div className={'text-xl/[1.2] tracking-tight font-semibold mb-3 md:mb-7'}>Inflation-hedged capital</div>
              <div className={'text-grey text-base/[1.4]'}>
                Put money in assets like real estate and&nbsp;ommodities that retain or&nbsp;increase their&nbsp;value
                even amidst inflation{' '}
              </div>
            </Card>
            <Card size={'lg'} color={'white'}>
              <div className={'text-xl/[1.2] tracking-tight font-semibold mb-3 md:mb-7'}>Steady portfolio growth</div>
              <div className={'text-grey text-base/[1.4]'}>
                Real world assets provide stable and recurrent income that grows over time
              </div>
            </Card>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default PoolProgress;
