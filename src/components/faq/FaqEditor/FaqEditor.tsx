'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import clsx from 'clsx';
import { toast } from '@/components/ui';

export interface FaqEditorData {
  question: string;
  answer: string;
}

export interface FaqEditorHandle {
  getData(): FaqEditorData | null;
}

interface FaqEditorProps {
  initialQuestion?: string;
  initialAnswer?: string;
}

const FaqEditor = forwardRef<FaqEditorHandle, FaqEditorProps>(({ initialQuestion = '', initialAnswer = '' }, ref) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);
  const [questionError, setQuestionError] = useState('');

  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = questionRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }, []);

  useEffect(() => {
    const el = answerRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }, []);

  useImperativeHandle(ref, () => ({
    getData() {
      const isQuestionValid = question.length > 2;
      const isAnswerValid = answer.trim().length > 2;

      if (!isQuestionValid) setQuestionError('Enter question');
      if (!isAnswerValid) toast('Answer is too short.', 'error');
      if (!isQuestionValid || !isAnswerValid) return null;

      return { question, answer };
    },
  }));

  return (
    <div className={'max-w-[800px] mx-auto mb-6'}>
      <textarea
        ref={questionRef}
        className={clsx(
          'w-full text-[28px] font-semibold md:text-[36px] outline-none placeholder:text-label-tertiary mb-4 resize-none overflow-hidden leading-tight',
          questionError && 'border-b-1 border-red-500'
        )}
        placeholder={'Question'}
        rows={1}
        value={question}
        onChange={e => {
          e.target.style.height = 'auto';
          e.target.style.height = e.target.scrollHeight + 'px';
          if (e.target.value.length > 2) setQuestionError('');
          setQuestion(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === 'ArrowDown' || (e.key === 'Enter' && !e.shiftKey)) {
            e.preventDefault();
            answerRef.current?.focus();
          }
        }}
      />
      <textarea
        ref={answerRef}
        className={'w-full resize-none outline-none placeholder:text-label-tertiary overflow-hidden leading-7'}
        placeholder={'Answer to the question'}
        rows={1}
        value={answer}
        onChange={e => {
          e.target.style.height = 'auto';
          e.target.style.height = e.target.scrollHeight + 'px';
          setAnswer(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === 'ArrowUp') {
            const el = e.currentTarget;
            if (el.selectionStart === 0) questionRef.current?.focus();
          }
        }}
      />
    </div>
  );
});

FaqEditor.displayName = 'FaqEditor';

export default FaqEditor;
