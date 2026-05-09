'use client';

import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import { Wrapper } from '@/components/layout';
import { SwiperControls, Title } from '@/components/ui';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface WideGalleryProps {
  images: string[];
  id: string;
  title: string;
}

const WideGallery: FC<WideGalleryProps> = ({ images, title, id }) => {
  return (
    <section className={'mb-25 md:mb-50 overflow-hidden'}>
      <Wrapper>
        <Title className={'text-center mb-10 md:mb-20'} size={'lg'} level={2}>
          {title}
        </Title>
        <Swiper
          className={'!overflow-visible [&_.swiper-wrapper]:mb-6 [&_.swiper-wrapper]:md:mb-11'}
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: true }}
          loop={true}
          spaceBetween={12}
          slidesPerView={'auto'}
          centeredSlides={true}
          navigation={{
            nextEl: `[data-name="swiper-nav-next-wg-${id}"]`,
            prevEl: `[data-name="swiper-nav-prev-wg-${id}"]`,
          }}
          pagination={{
            el: `[data-name="swiper-pagination-wg-${id}"]`,
            clickable: true,
          }}
          breakpoints={{
            768: {
              spaceBetween: 40,
            },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide className={'!w-fit'} key={'swiper gallery ' + image + index}>
              <Image
                className={'w-full aspect-[1.85] object-cover rounded-3xl md:rounded-[40px]'}
                src={image}
                width={'723'}
                height={'483'}
                alt={' '}
              />
            </SwiperSlide>
          ))}
          <SwiperControls name={'wg-' + id} />
        </Swiper>
      </Wrapper>
    </section>
  );
};

export default WideGallery;
