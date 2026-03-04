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
    <span className='flex items-center justify-center size-11.5 rounded-full shrink-0'>
      <svg width='46' height='46' viewBox='0 0 46 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g opacity='0.15'>
          <rect width='46' height='46' rx='23' fill='#4BF979' />
        </g>
        <path
          d='M23.0002 9C20.0994 9 17.2637 9.86018 14.8518 11.4718C12.4399 13.0834 10.56 15.374 9.44994 18.054C8.33985 20.734 8.0494 23.6829 8.61532 26.528C9.18123 29.373 10.5781 31.9864 12.6293 34.0376C14.6804 36.0887 17.2938 37.4856 20.1388 38.0515C22.9839 38.6174 25.9329 38.327 28.6129 37.2169C31.2928 36.1068 33.5835 34.2269 35.1951 31.815C36.8066 29.4031 37.6668 26.5675 37.6668 23.6667C37.6668 19.7768 36.1216 16.0463 33.3711 13.2958C30.6205 10.5452 26.89 9 23.0002 9ZM20.9049 29.5229L15.6668 24.2848L17.3325 22.619L20.9049 26.1914L28.6678 18.4286L30.3398 20.0901L20.9049 29.5229Z'
          fill='#4BF979'
        />
      </svg>
    </span>
  ),
  error: (
    <span className='flex items-center justify-center size-11.5 rounded-full shrink-0'>
      <svg width='46' height='46' viewBox='0 0 46 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g opacity='0.15'>
          <rect width='46' height='46' rx='23' fill='#F51532' />
        </g>
        <path
          d='M22.9997 8.33398C31.1103 8.33398 37.6663 14.89 37.6663 23.0007C37.6663 31.1113 31.1103 37.6673 22.9997 37.6673C14.889 37.6673 8.33301 31.1113 8.33301 23.0007C8.33301 14.89 14.889 8.33398 22.9997 8.33398ZM28.265 15.6673L22.9997 20.9327L17.7343 15.6673L15.6663 17.7353L20.9317 23.0007L15.6663 28.266L17.7343 30.334L22.9997 25.0686L28.265 30.334L30.333 28.266L25.0677 23.0007L30.333 17.7353L28.265 15.6673Z'
          fill='#F51532'
        />
      </svg>
    </span>
  ),
  warning: (
    <span className='flex items-center justify-center size-11.5 rounded-full bg-[#f59e0b] shrink-0'>
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
        <path d='M8 4v5M8 11.5v.5' stroke='white' strokeWidth='2' strokeLinecap='round' />
      </svg>
    </span>
  ),
  info: (
    <span className='flex items-center justify-center size-11.5 rounded-full shrink-0'>
      <svg width='46' height='46' viewBox='0 0 46 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g opacity='0.15'>
          <rect width='46' height='46' rx='23' fill='#9B9BA5' />
        </g>
        <g clip-path='url(#clip0_11205_31191)'>
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M16.6501 8.33301H29.3662C34.3383 8.33301 37.6676 11.8237 37.6676 17.0158V29C37.6676 34.1774 34.3383 37.6667 29.3662 37.6667H16.6501C11.678 37.6667 8.33398 34.1774 8.33398 29V17.0158C8.33398 11.8237 11.678 8.33301 16.6501 8.33301ZM22.9861 18.6893C22.2968 18.6893 21.7248 18.1158 21.7248 17.4132C21.7248 16.6946 22.2968 16.1226 23.0155 16.1226C23.7195 16.1226 24.2915 16.6946 24.2915 17.4132C24.2915 18.1158 23.7195 18.6893 22.9861 18.6893ZM24.2768 28.5454C24.2768 29.2494 23.7048 29.8214 22.9861 29.8214C22.2821 29.8214 21.7101 29.2494 21.7101 28.5454V22.0626C21.7101 21.3572 22.2821 20.7719 22.9861 20.7719C23.7048 20.7719 24.2768 21.3572 24.2768 22.0626V28.5454Z'
            fill='#9B9BA5'
          />
        </g>
        <defs>
          <clipPath id='clip0_11205_31191'>
            <rect x='8.33398' y='8.33301' width='29.3337' height='29.3337' rx='14.6668' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </span>
  ),
};

function Toast({ id, message, variant = 'success' }: ToastProps) {
  return (
    <div className='flex items-center gap-4 w-full max-w-[432px] bg-black rounded-xl px-4 py-3 shadow-lg'>
      {ICONS[variant]}
      <p className='flex-1 text-white text-base leading-snug'>{message}</p>
      <button
        onClick={() => sonnerToast.dismiss(id)}
        className='size-11.5 shrink-0 bg-label-tertiary mask-[url(/icons/cross.svg)] mask-contain focus-visible:bg-white hover:bg-white transition-colors cursor-pointer p-1'
        aria-label='Dismiss'
      />
    </div>
  );
}

export function toast(message: string, variant: ToastVariant = 'success') {
  return sonnerToast.custom(id => <Toast id={id} message={message} variant={variant} />);
}

export { Toast };
