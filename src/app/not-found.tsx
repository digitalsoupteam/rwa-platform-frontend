import React, { FC } from 'react';

import { Wrapper } from '@/components/layout';
import { Title, Button } from '@/components/ui';

import './not-found.css';

const notFound: FC = () => {
  return (
    <>
      <section className={'pt-30 pb-25 [&>div]:h-full'} data-not-found-page={true}>
        <Wrapper>
          <div className={'flex flex-col justify-center items-center h-full text-center'}>
            <Title className={'text-white mb-4 md:mb-6'} size={'lg'} level={2}>
              Page not found
            </Title>
            <p className={'text-white text-base mb-8 md:mb-10'}>Oops! We can’t find the page you’re looking for.</p>
            <Button className={'max-sm:w-full'} visualType={'primary'} href={'/'}>
              Go Home
            </Button>
          </div>
        </Wrapper>
      </section>
    </>
  );
};

export default notFound;
