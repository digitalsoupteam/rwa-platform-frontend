import { FC } from 'react';

import { Hero, HowItWorks } from '@/components/home';
import { FAQ } from '@/components/common';

const Home: FC = () => {
  return (
    <>
      <Hero />
      <HowItWorks/>
      <FAQ/>
    </>
  );
};

export default Home;
