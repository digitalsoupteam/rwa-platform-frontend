import React, { FC } from 'react';

import { CommonLayout, Wrapper } from '@/components/layout';
import { Title } from '@/components/ui';

const ToS: FC = () => {
  return (
    <CommonLayout>
      <section
        className={
          'bg-[url(/images/tos-bg-m.png)] bg-size-[100%_2455px] bg-no-repeat pt-[128px] pb-25 md:bg-size-[100%_923px] md:bg-[url(/images/tos-bg-d.png)] md:pb-50 md:pt-[184px]'
        }
      >
        <Wrapper>
          <div className={'z-1 relative max-w-[670px] mx-auto'}>
            <Title className={'text-white text-center mb-4 max-md:text-5xl md:mb-6'} size={'lg'} level={2}>
              Terms & Conditions
            </Title>
            <div className={'text-white mb-25 text-center md:mb-[175px]'}>Last modified on December 1, 2020</div>

            <h2 className={'text-black text-xl font-semibold mb-4 md:text-2xl'}>1. Acceptance of Terms</h2>
            <div className={'text-grey-dark text-base mb-10'}>
              By accessing this platform, you agree to comply with all terms and conditions set forth herein. Your use
              of the services provided is contingent upon your acceptance of these terms. If you do not agree with any
              part of these terms, you must refrain from using the platform. Your continued use signifies your
              acceptance of any modifications to these terms.
            </div>

            <h2 className={'text-black text-xl font-semibold mb-4 md:text-2xl'}>2. Description of Service</h2>
            <div className={'text-grey-dark text-base mb-10'}>
              Our investment platform is meticulously designed to empower users with an extensive suite of innovative
              tools aimed at enhancing the management and growth of their financial assets. Users can explore a diverse
              range of investment options, including stocks, bonds, ETFs, and mutual funds, each tailored to accommodate
              various financial objectives and risk appetites. The platform guarantees a secure environment for all
              transactions, employing state-of-the-art encryption technologies to protect user data and ensure privacy.
              Additionally, it provides real-time analytics and insights, equipping users with the essential information
              needed to make informed decisions based on current market trends and their unique financial aspirations.
              By engaging with our services, you acknowledge your understanding of the inherent risks associated with
              investing and agree to adhere to our terms and conditions. We strongly encourage users to leverage our
              educational resources, which offer valuable insights into market dynamics and investment strategies,
              ensuring you are well-equipped to navigate the complexities of the financial landscape. Our unwavering
              commitment to user satisfaction is reflected in our continuous updates and enhancements to the platform,
              ensuring you have access to the latest tools and information to optimize your investment journey.
              Furthermore, we provide personalized support and guidance to help you achieve your financial goals, making
              your experience with us not only secure but also enriching and empowering.
            </div>

            <h2 className={'text-black text-xl font-semibold mb-4 md:text-2xl'}>3. Rules of Behavior</h2>
            <div className={'text-grey-dark text-base mb-10'}>
              Our investment platform is crafted to provide users with a comprehensive array of advanced tools designed
              to enhance the management and growth of their financial portfolios. Users can delve into a wide variety of
              investment opportunities, including equities, fixed income securities, exchange-traded funds, and mutual
              funds, each customized to meet diverse financial goals and risk tolerances. The platform ensures a secure
              transaction environment, utilizing cutting-edge encryption methods to safeguard user information and
              maintain confidentiality. Additionally, it offers real-time data analytics and insights, empowering users
              with critical information necessary for making informed investment choices based on prevailing market
              conditions and personal financial objectives. By utilizing our services, you acknowledge the inherent
              risks of investing and agree to comply with our terms and conditions. We highly recommend that users take
              advantage of our educational resources, which provide essential knowledge about market trends and
              investment tactics, equipping you to effectively navigate the intricacies of the financial world. Our
              steadfast dedication to user satisfaction is evident in our ongoing updates and improvements to the
              platform, ensuring you have access to the latest tools and insights to enhance your investment experience.
              Moreover, we offer tailored support and guidance to assist you in reaching your financial aspirations,
              making your journey with us both secure and enriching.
            </div>
          </div>
        </Wrapper>
      </section>
    </CommonLayout>
  );
};

export default ToS;
