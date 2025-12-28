'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Wrapper } from '@/components/layout';
import { SwiperControls, Title } from '@/components/ui';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface GalleryProps {
  id: string;
  images: string[];
  title?: string;
  text?: string;
}

const Gallery: FC<GalleryProps> = ({ images, title, text, id }) => {
  if (!images || images.length === 0) return null;

  return (
    <section
      className={clsx(
        'relative overflow-hidden mb-25 md:mb-50 md:bg-center',
        'before:absolute before:block before:top-0 before:left-0 before:right-0 before:h-25 before:bg-gradient-to-b before:from-blue-light before:to-transparent',
        'after:absolute after:block after:bottom-0 after:left-0 after:right-0 after:h-25 after:bg-gradient-to-t after:from-blue-light after:to-transparent',
        'bg-[url(/images/gallery-bg.png)] bg-cover bg-top bg-no-repeat'
      )}
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
            nextEl: `[data-name="swiper-nav-next-gallery-${id}"]`,
            prevEl: `[data-name="swiper-nav-prev-gallery-${id}"]`,
          }}
          pagination={{
            el: `[data-name="swiper-pagination-gallery-${id}"]`,
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
                className={'w-full aspect-[1.5] object-cover rounded-3xl max-w-[723px] md:rounded-[40px]'}
                src={image}
                width={'723'}
                height={'483'}
                alt={' '}
              />
            </SwiperSlide>
          ))}
          <div className={'text-center max-w-[494px] mx-auto mb-6 md:mb-7'}>
            <Title className={'whitespace-pre-wrap'} size={'md'}>
              {title}
            </Title>
            <p className={'mt-3'}>{text}</p>
          </div>
          <SwiperControls name={'gallery-' + id} />
        </Swiper>
      </Wrapper>
    </section>
  );
};

export default Gallery;
