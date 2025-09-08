'use client';

import React, { FC } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Wrapper } from '@/components/layout';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SwiperControls, Title } from '@/components/ui';

interface GalleryProps {
  images: string[];
  title: string;
}

const Gallery: FC<GalleryProps> = ({ images, title }) => {
  if (!images || images.length === 0) return null;

  return (
    <section
      className={
        'relative overflow-hidden bg-[url(/images/gallery-bg.png)] bg-cover bg-top bg-no-repeat mb-25 md:mb-50 md:bg-center ' +
        'before:absolute before:block before:top-0 before:left-0 before:right-0 before:h-25 before:bg-gradient-to-b before:from-blue-light before:to-transparent' +
        'after:absolute after:block after:bottom-0 after:left-0 after:right-0 after:h-25 after:bg-gradient-to-t after:from-blue-light after:to-transparent'
      }
    >
      <Wrapper>
        <Swiper
          className={'!overflow-visible [&_.swiper-wrapper]:mb-6 [&_.swiper-wrapper]:md:mb-11'}
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: true }}
          loop={true}
          spaceBetween={12}
          slidesPerView={'auto'}
          centeredSlides={true}
          navigation={{
            nextEl: '[data-name="swiper-nav-next-home-sw"]',
            prevEl: '[data-name="swiper-nav-prev-home-sw"]',
          }}
          pagination={{
            el: '[data-name="swiper-pagination-home-sw"]',
            clickable: true,
          }}
          breakpoints={{
            768: {
              spaceBetween: 47,
            },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide className={'!w-fit'} key={'swiper gallery ' + image + index}>
              <Image
                className={'w-full aspect-[1.5] rounded-3xl max-w-[723px] md:rounded-[40px]'}
                src={image}
                width={'723'}
                height={'483'}
                alt={' '}
              />
            </SwiperSlide>
          ))}
          <Title className={'text-center whitespace-pre-wrap mb-6 md:mb-7'} size={'md'}>
            {title}
          </Title>
          <SwiperControls name={'home-sw'} />
        </Swiper>
      </Wrapper>
    </section>
  );
};

export default Gallery;
