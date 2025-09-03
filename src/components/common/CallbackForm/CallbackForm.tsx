'use client';

import React, { FC, HTMLAttributes, useState } from 'react';
import { Button, Input } from '@/components/ui';
import clsx from 'clsx';

const CallbackForm: FC<HTMLAttributes<HTMLFormElement>> = ({onSubmit, className}) => {
  const [emailValue, setEmailValue] = useState('');
  const [questionValue, setQuestionValue] = useState('');

  return (
    <form className={clsx('flex flex-col gap-3 md:grid md:grid-cols-[260px_1fr_max-content]', className)} onSubmit={onSubmit}>
      <Input
        placeholder={'Email'}
        name={'email'}
        type={'email'}
        value={emailValue}
        onChange={evt => setEmailValue(evt.target.value)}
      />
      <Input
        placeholder={'Your question'}
        name={'question'}
        type={'text'}
        value={questionValue}
        onChange={evt => setQuestionValue(evt.target.value)}
      />
      <Button visualType={'secondary'}>Submit</Button>
    </form>
  );
};

export default CallbackForm;
