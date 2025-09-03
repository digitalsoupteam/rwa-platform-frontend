'use client';

import React, { FC, useState } from 'react';
import { Wrapper } from '@/components/layout';
import { Card, Title } from '@/components/ui';
import clsx from 'clsx';
import { CallbackForm } from '@/components/common';

const FAQ: FC = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const faqList = [
    {
      question: 'How am I protected from fraud?',
      answer: (
        <>
          <p>We aim to create a safe and secure environment for all users by combining these measures:</p>
          <ul>
            <li>We use Know Your Client (KYC) protocols to verify every project</li>
            <li>Our platform uses audited smart contracts to ensure that transactions are secure and tamper-proof</li>
            <li>We provide resources to educate users on common scams and best practices for online security</li>
            <li>
              Our platform has a dispute resolution system in place to handle any issues that may arise during
              transactions
            </li>
          </ul>
        </>
      ),
    },
    {
      question: 'Can I get investing advice?',
      answer: (
        <>
          <p>
            Every project on Slices is evaluated by AI and our users - you can check the rating on each project card and
            make an informed decision.
          </p>
        </>
      ),
    },
    {
      question: 'Is RWA investing risky?',
      answer: (
        <>
          <p>
            As any other investment, RWA investments depend on market volatility. However, they can also offer higher
            returns if managed well, as they tap into the value of real-world assets.
          </p>
        </>
      ),
    },
  ];

  return (
    <section className={'z-1 relative'}>
      <Wrapper>
        <Title className={'text-center mb-10 md:mb-20'} size={'lg'}>
          You might want to know
        </Title>
        <ul className={'grid gap-3 mb-3'}>
          {faqList &&
            faqList.length > 0 &&
            faqList.map(({ question, answer }, index) => (
              <li className={''} key={question}>
                <Card size={'xl'} color={'greyLight'}>
                  <button
                    className={'cursor-pointer w-full flex justify-between gap-4'}
                    onClick={() => setCurrentItemIndex(index === currentItemIndex ? -1 : index)}
                  >
                    <Title className={'text-start'} size={'sm'} level={3}>
                      {question}
                    </Title>
                    <div className={'shrink-0 relative size-7'}>
                      <span
                        className={clsx(
                          'absolute top-1/2 -translate-y-1/2 left-0 h-[3px] w-7 bg-grey-dark rounded-sm tr-d-all',
                          currentItemIndex === index && '!top-0 !translate-0'
                        )}
                      />
                      <span
                        className={clsx(
                          'absolute top-0 left-1/2 -translate-x-1/2 h-7 w-[3px] bg-grey-dark rounded-sm tr-d-all',
                          currentItemIndex === index && 'scale-y-0'
                        )}
                      />
                    </div>
                  </button>
                  <div
                    className={clsx(
                      'grid grid-rows-[0fr] tr-d-all overflow-hidden',
                      currentItemIndex === index && 'grid-rows-[1fr] mt-6'
                    )}
                  >
                    <div
                      className={
                        'overflow-hidden text-grey-dark text-base/[1.4] max-w-[1030px] [&_p]:not-last:mb-3 [&_ul]:list-disc [&_ul]:pl-6'
                      }
                    >
                      {answer}
                    </div>
                  </div>
                </Card>
              </li>
            ))}
        </ul>
        <Card size={'xl'} color={'white'}>
          <Title className={'mb-3'} size={'md'}>Got a question?</Title>
          <p className={'text-grey-dark text-base/[1.4] mb-5 md:mb-6'}>Submit it in this form, and we will send a reply to your e-mail in 1-2 days</p>
          <CallbackForm />
        </Card>
      </Wrapper>
    </section>
  );
};

export default FAQ;
