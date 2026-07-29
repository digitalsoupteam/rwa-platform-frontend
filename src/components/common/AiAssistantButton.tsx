'use client';

import React, { FC, useState } from 'react';

import { useAuth } from '@/lib/auth/AuthContext';
import AiSparkleSVG from '../../assets/icons/ai-sparkle.svg';
import AiAssistantPanel from './AiAssistantPanel';

const AiAssistantButton: FC = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated) return null;

  return (
    <>
      <button
        className={
          'fixed bottom-6 right-6 z-40 size-[54px] rounded-full bg-blue-dark/85 flex items-center justify-center shadow-lg hover:opacity-80 tr-d-all'
        }
        onClick={() => setIsOpen(open => !open)}
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
      >
        <AiSparkleSVG className={'size-6'} />
      </button>
      <AiAssistantPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default AiAssistantButton;
