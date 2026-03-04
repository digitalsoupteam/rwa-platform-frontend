'use client';

import React from 'react';
import { toast as sonnerToast } from 'sonner';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string | number;
  message: string;
  variant?: ToastVariant;
}

const ICONS: Record<ToastVariant, React.ReactNode> = {
  success: (
    <span className='flex items-center justify-center w-8 h-8 rounded-full bg-[#22c55e] shrink-0'>
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
        <path d='M3 8.5L6.5 12L13 5' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    </span>
  ),
  error: (
    <span className='flex items-center justify-center w-8 h-8 rounded-full bg-[#ef4444] shrink-0'>
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
        <path d='M4 4L12 12M12 4L4 12' stroke='white' strokeWidth='2' strokeLinecap='round' />
      </svg>
    </span>
  ),
  warning: (
    <span className='flex items-center justify-center w-8 h-8 rounded-full bg-[#f59e0b] shrink-0'>
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
        <path d='M8 4v5M8 11.5v.5' stroke='white' strokeWidth='2' strokeLinecap='round' />
      </svg>
    </span>
  ),
  info: (
    <span className='flex items-center justify-center w-8 h-8 rounded-full bg-[#3b82f6] shrink-0'>
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
        <path d='M8 7v5M8 4.5v.5' stroke='white' strokeWidth='2' strokeLinecap='round' />
      </svg>
    </span>
  ),
};

function Toast({ id, message, variant = 'success' }: ToastProps) {
  return (
    <div className='flex items-center gap-3 w-full max-w-[360px] bg-[#1c1c1e] rounded-2xl px-4 py-3 shadow-lg'>
      {ICONS[variant]}
      <p className='flex-1 text-white text-sm font-medium leading-snug'>{message}</p>
      <button
        onClick={() => sonnerToast.dismiss(id)}
        className='shrink-0 text-[#6b7280] hover:text-white transition-colors cursor-pointer p-1'
        aria-label='Dismiss'
      >
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <path d='M3 3L13 13M13 3L3 13' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' />
        </svg>
      </button>
    </div>
  );
}

export function toast(message: string, variant: ToastVariant = 'success') {
  return sonnerToast.custom((id) => <Toast id={id} message={message} variant={variant} />);
}

export { Toast };