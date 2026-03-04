'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui';

const Onboarding: FC = () => {
  const [onboardingStep, setOnboardingStep] = useState<number>(-1);
  const [isNarrow, setIsNarrow] = useState(true);
  const [coordinates, setCoordinates] = useState({
    top: 0,
    left: 0,
  });

  const steps = [
    {
      title: 'Create a company profile',
      text: 'Start by creating a company. You’ll add projects and pools next',
      targetElementId: 'createCompanyButton',
      arrowStyle: {
        narrow: {
          top: 'calc(100% + 12px)',
          left: '45%',
          transform: 'rotate(-180deg)',
        },
        wide: {
          top: '-80px',
          left: '-50px',
          transform: 'rotate(-45deg)',
        },
      },
    },
  ];

  const onButtonClick = () => {
    const nextStep = onboardingStep + 1;

    if (onboardingStep === steps.length - 1) {
      setOnboardingStep(-1);
      localStorage.setItem('onboardingStep', String(nextStep));
      return;
    }

    setOnboardingStep(nextStep);
    localStorage.setItem('onboardingStep', String(nextStep));
  };

  const calculateAndSetCoordinates = () => {
    const currentStep = steps[onboardingStep];
    if (!currentStep) return;

    const targetEl = document.querySelector(`#${currentStep.targetElementId}`);
    if (!targetEl) return;

    const targetElRect = targetEl.getBoundingClientRect();
    const top = isNarrow ? targetElRect.top - targetElRect.height / 1.5 : targetElRect.top + targetElRect.height;
    const left = isNarrow ? targetElRect.left : targetElRect.left + targetElRect.width + 50;

    setCoordinates({ left: left, top: top });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onboardingStep = Number(localStorage.getItem('onboardingStep'));

    if (!onboardingStep) localStorage.setItem('onboardingStep', '0');

    setOnboardingStep(onboardingStep === steps.length ? -1 : onboardingStep);

    const mediaQuery = '(max-width: 1024px)';
    setIsNarrow(window.matchMedia(mediaQuery).matches);

    window.addEventListener('resize', () => setIsNarrow(window.matchMedia(mediaQuery).matches));

    return () => window.removeEventListener('resize', () => setIsNarrow(window.matchMedia(mediaQuery).matches));
  }, []);

  useEffect(calculateAndSetCoordinates, [isNarrow]);

  useEffect(() => {
    calculateAndSetCoordinates();

    if (onboardingStep >= 0) document.body.classList.add('locked');

    return () => document.body.classList.remove('locked');
  }, [onboardingStep]);

  if (onboardingStep === -1) return null;

  return (
    <section className={'fixed top-0 right-0 bottom-0 left-0'}>
      <div
        className={'absolute bg-white w-fit rounded-lg shadow-base max-sm:max-w-[328px]'}
        style={{
          top: `${coordinates.top}px`,
          left: `${coordinates.left}px`,
        }}
      >
        <Image
          className={'absolute w-[67px] h-[67px]'}
          style={isNarrow ? steps[onboardingStep].arrowStyle.narrow : steps[onboardingStep].arrowStyle.wide}
          src={'/images/dash-arrow.svg'}
          width={67}
          height={6}
          alt={''}
        />
        <div className={'text-base/[1] p-4 border-b-1 border-stroke-primary mb-2'}>
          {onboardingStep + 1} / {steps.length}
        </div>
        <div className={'p-4'}>
          <div className={'mb-2'}>{steps[onboardingStep].title}</div>
          <div className={'mb-6'}>{steps[onboardingStep].text}</div>
          <Button visualType={'quaternary'} onClick={onButtonClick}>
            {onboardingStep === steps.length - 1 ? 'OK' : 'Next'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
