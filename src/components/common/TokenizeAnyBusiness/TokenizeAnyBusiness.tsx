'use client';

import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Wrapper } from '@/components/layout';
import { Button, Card, Title } from '@/components/ui';

import 'swiper/css';

interface TokenizeCardProps {
  card: {
    label: string;
    title: string;
    text: string;
    image: string;
  };
}

const TokenizeCard: FC<TokenizeCardProps> = ({ card }) => {
  return (
    <Card
      className={'text-white !bg-grey-dark bg-center bg-cover h-full'}
      style={{ backgroundImage: `url(${card.image})` }}
      size={'lg'}
    >
      <div className={'w-fit text-blue text-sm bg-blue-dim py-[3px] px-2.5 rounded-[20px] mb-[146px] md:mb-[210px]'}>
        {card.label}
      </div>
      <Title className={'mb-3'} size={'md'} level={4}>
        {card.title}
      </Title>
      <p className={'text-base whitespace-pre-wrap'}>{card.text}</p>
    </Card>
  );
};

const CTA: FC = () => {
  return (
    <Card className={'h-full flex flex-col text-white !bg-blue-gradient'} size={'lg'}>
      <Title className={'mb-3'} size={'md'} level={4}>
        Not sure what you could tokenize?
      </Title>
      <p className={'text-base whitespace-pre-wrap mb-auto'}>
        Sign up as a project owner and ask our AI-assistant for advice. Start getting funds today!
      </p>
      <Button className={'w-fit mt-10.5'} visualType={'tertiary'}>
        Sign up
      </Button>
    </Card>
  );
};

const TokenizeAnyBusiness: FC = () => {
  const cards = [
    {
      label: 'Real Estate',
      title: 'Turn buildings into blockchain-backed assets',
      text: 'Tokenize rental properties, development projects, or land, enabling fractional ownership and global investor access',
      image: '/images/tokenize-1.png',
    },
    {
      label: 'Agriculture',
      title: 'Raise funds for equipment or farmland expansion',
      text: 'Access capital for innovative agri-tech, smart irrigation, or organic certifications — with returns structured around your growth cycles',
      image: '/images/tokenize-2.png',
    },
    {
      label: 'Manufacturing',
      title: 'Finance production and scale faster',
      text: 'Tokenize machinery, factories, or supply chains to attract capital without giving up equity',
      image: '/images/tokenize-3.png',
    },
    {
      label: 'Green Energy & Sustainability',
      title: 'Power your clean energy project with global backing',
      text: 'Tokenize solar farms, carbon credits, or recycling initiatives and give impact investors a way to participate',
      image: '/images/tokenize-4.png',
    },
    {
      label: 'Logistics & Trade',
      title: 'Streamline global trade and unlock working capital',
      text: 'Tokenize shipping contracts, freight invoices, or inventory to access real-time liquidity',
      image: '/images/tokenize-5.png',
    },
    {
      label: 'Health & Biotech',
      title: 'Fund research, equipment, or clinical phases',
      text: 'Let investors support innovation while tracking performance transparently through smart contracts',
      image: '/images/tokenize-6.png',
    },
    {
      label: 'Creative & Entertainment',
      title: 'Let fans invest directly in your success',
      text: 'Tokenize film production, music rights, or publishing projects and build loyal investor communitie',
      image: '/images/tokenize-7.png',
    },
    {
      label: 'Education & EdTech',
      title: 'Bring learning innovations to life',
      text: 'Tokenize school expansions, course platforms, or certification programs and connect with mission-aligned supporters',
      image: '/images/tokenize-8.png',
    },
  ];

  return (
    <section className={'mb-25 md:mb-50 overflow-hidden'}>
      <Wrapper>
        <Title className={'text-center mb-10 md:mb-20'} size={'lg'} level={2}>
          Tokenize any business
        </Title>
        <div className={'grid grid-cols-3 gap-5 max-lg:hidden'}>
          {cards.map(card => (
            <TokenizeCard card={card} key={'grid' + card.title} />
          ))}
          <CTA />
        </div>
        <div className={'lg:hidden'}>
          <Swiper className={'!overflow-visible'} loop={true} spaceBetween={12} slidesPerView={'auto'}>
            {cards.map(card => (
              <SwiperSlide className={'!w-[320px] !h-100'} key={'swiper' + card.title}>
                <TokenizeCard card={card} />
              </SwiperSlide>
            ))}
            <SwiperSlide className={'!w-[320px] !h-100'}>
              <CTA />
            </SwiperSlide>
          </Swiper>
        </div>
      </Wrapper>
    </section>
  );
};

export default TokenizeAnyBusiness;
