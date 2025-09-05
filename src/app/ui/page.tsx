'use client';

import React, { FC, useState } from 'react';
import { Button, ButtonLink, Card, Input, Socials, Title } from '@/components/ui';

const UIPage: FC = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={'mb-100'}>
      <div className={'bg-black h-25'} />
      <section className={'p-4 pt-22'}>
        <div className={'text-white bg-grey-dark p-4 rounded-md'}>
          <Title className={'mb-2'} size={'xl'} level={1}>
            Buttons
          </Title>
          <div className={'flex flex-wrap gap-5'}>
            <div className={'flex flex-col gap-2 items-start'}>
              <Title className={'mb-2'} size={'md'} level={3}>
                Primary
              </Title>
              <Button visualType={'primary'}>Primary normal</Button>
              <Button visualType={'primary'} disabled={true}>
                Primary disabled
              </Button>
            </div>
            <div className={'flex flex-col gap-2 items-start'}>
              <Title className={'mb-2'} size={'md'} level={3}>
                Secondary
              </Title>
              <Button visualType={'secondary'}>Secondary normal</Button>
              <Button visualType={'secondary'} disabled={true}>
                Secondary disabled
              </Button>
            </div>
            <div className={'flex flex-col gap-2 items-start'}>
              <Title className={'mb-2'} size={'md'} level={3}>
                Secondary
              </Title>
              <Button visualType={'tertiary'}>Tertiary normal</Button>
              <Button visualType={'tertiary'} disabled={true}>
                Tertiary disabled
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className={'p-4'}>
        <div className={'text-white bg-grey-dark p-4 rounded-md'}>
          <Title className={'mb-2'} size={'xl'} level={1}>
            Title
          </Title>
          <div className={'flex flex-col gap-2 items-start'}>
            <Title className={'mb-2'} size={'sm'} level={3}>
              xs - H4 Heading
            </Title>
            <Title className={'mb-2'} size={'sm'} level={3}>
              sm - H4/H3 Heading
            </Title>
            <Title className={'mb-2'} size={'md'} level={3}>
              md - H5/H3 Heading
            </Title>
            <Title className={'mb-2'} size={'lg'} level={3}>
              lg - H3/H2 Heading
            </Title>
            <Title className={'mb-2'} size={'xl'} level={3}>
              xl - H1 Heading
            </Title>
          </div>
        </div>
      </section>
      <section className={'p-4'}>
        <div className={'bg-grey-dark p-4 rounded-md'}>
          <Title className={'mb-2 text-white'} size={'xl'} level={1}>
            Socials
          </Title>
          <Socials />
        </div>
      </section>
      <section className={'p-4'}>
        <div className={'bg-grey-dark p-4 rounded-md'}>
          <Title className={'mb-2 text-white'} size={'xl'} level={1}>
            Cards
          </Title>
          <Title className={'mb-2 text-white'} size={'md'} level={3}>
            Sizes
          </Title>
          <div className={'flex flex-wrap gap-2 items-start mb-4'}>
            <Card size={'xl'}>
              padding 24 / border-radius 24 <br /> md: padding 40 / border-radius 40
            </Card>
            <Card size={'lg'}>
              padding 24 / border-radius 24 <br /> md: padding 32 / border-radius 40
            </Card>
            <Card size={'md'}>
              padding 24 / border-radius 24 <br /> md: padding 24 / border-radius 40
            </Card>
            <Card size={'sm'}>padding 24 / border-radius 24</Card>
            <Card size={'xs'}>
              padding 16 / border-radius 12 <br /> md: padding 24 / border-radius 20
            </Card>
            <Card size={'xs'}>
              padding 12 / border-radius 12 <br /> md: padding 32 / border-radius 20
            </Card>
          </div>
          <Title className={'mb-2 text-white'} size={'md'} level={3}>
            Colors
          </Title>
          <div className={'flex flex-wrap gap-2 items-start mb-4'}>
            <Card className={'!bg-grey flex flex-wrap gap-4'}>
              <Card size={'md'} color={'white'}>
                white
              </Card>
              <Card size={'md'} color={'greyLight'}>
                light-grey
              </Card>
              <Card size={'md'} color={'blueDim'}>
                dim-blue
              </Card>
            </Card>
          </div>
        </div>
      </section>
      <section className={'p-4'}>
        <div className={'bg-grey-dark p-4 rounded-md'}>
          <Title className={'mb-2 text-white'} size={'xl'} level={1}>
            Button Link
          </Title>
          <div className={'flex flex-wrap gap-2 items-start mb-4'}>
            <ButtonLink href={'#'}>Button Link</ButtonLink>
          </div>
        </div>
      </section>
      <section className={'p-4'}>
        <div className={'bg-grey-dark p-4 rounded-md'}>
          <Title className={'mb-2 text-white'} size={'xl'} level={1}>
            Inputs
          </Title>
          <div className={'flex flex-wrap gap-2 items-start mb-4'}>
            <Input
              placeholder={'Email'}
              name={'email'}
              type={'email'}
              value={inputValue}
              onChange={evt => setInputValue(evt.target.value)}
            />
            <Input
              placeholder={'Email'}
              name={'email'}
              type={'email'}
              value={inputValue}
              errorMessage={'Email is not valid'}
              onChange={evt => setInputValue(evt.target.value)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UIPage;
