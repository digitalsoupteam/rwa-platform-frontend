'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Wrapper } from '@/components/layout';
import { Button, SwiperControls, Title } from '@/components/ui';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface AppDemoProps {
  slides: {
    title: string;
    image: string;
  }[];
}

const AppDemo: FC<AppDemoProps> = ({ slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  if (!slides || slides.length === 0) return null;

  return (
    <section className={'overflow-hidden mb-25 md:mb-50'}>
      <Wrapper>
        <div className={'flex flex-col mb-10 md:mb-20'}>
          <Title className={'text-center max-w-[760px] mx-auto mb-3 md:mb-6'} size={'lg'} level={2}>
            Start trading now and get more DAO tokens during airdrop
          </Title>
          <p className={'text-grey-dark max-w-[624px] mx-auto  text-base/[1.4] text-center mb-6 md:mb-10'}>
            Get points for selling tokens, staking PLTs and inviting your friends to the platform. Get one governance
            token (GOV) for each point and manage the platform
          </p>
          <Button className={'w-full mx-auto md:w-fit'} visualType={'primary'} href={'/marketplace/'}>
            Start trading
          </Button>
        </div>

        <Swiper
          className={
            'max-w-[890px] !overflow-visible [&_.swiper-wrapper]:mb-6 [&_.swiper-wrapper]:md:mb-11 md:!overflow-hidden ' +
            'before:z-2 before:absolute before:top-0 before:left-[-177px] before:w-[233px] before:h-[433px] before:bg-blue-light before:blur-3xl md:before:h-[794px] md:before:left-[-103px] ' +
            'after:z-2 after:absolute after:top-0 after:right-[-177px] after:w-[233px] after:h-[433px] after:bg-blue-light after:blur-3xl md:after:h-[794px] md:after:right-[-103px]'
          }
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: true }}
          // loop={true}
          spaceBetween={21}
          slidesPerView={'auto'}
          centeredSlides={true}
          navigation={{
            nextEl: '[data-name="swiper-nav-next-demo"]',
            prevEl: '[data-name="swiper-nav-prev-demo"]',
          }}
          pagination={{
            el: '[data-name="swiper-pagination-demo"]',
            clickable: true,
          }}
          onSlideChange={swiper => setCurrentSlideIndex(swiper.activeIndex)}
          breakpoints={{
            768: {
              spaceBetween: 53,
            },
          }}
        >
          {slides.map(({ image, title }) => (
            <SwiperSlide className={'!w-fit'} key={'swiper gallery ' + title}>
              <Image
                className={'w-[157px] h-[344px] rounded-3xl mt-1.5 md:w-[260px] md:h-[569px] md:mt-2.5'}
                src={image}
                width={'723'}
                height={'483'}
                alt={' '}
              />
            </SwiperSlide>
          ))}
          <Image
            className={
              'pointer-events-none z-1 absolute top-0 left-0 right-0 mx-auto w-[174px] h-[356px] md:w-[289px] md:h-[590px]'
            }
            src={'/images/iphone.png'}
            width={'284'}
            height={'590'}
            alt={' '}
          />
          <Title
            className={'text-center whitespace-pre-wrap mx-auto max-w-[610px] mb-6 max-sm:min-h-[72px] md:mb-7'}
            size={'md'}
            level={4}
          >
            {slides[currentSlideIndex].title}
          </Title>
          <SwiperControls name={'demo'} />
        </Swiper>
      </Wrapper>
    </section>
  );
};

export default AppDemo;
