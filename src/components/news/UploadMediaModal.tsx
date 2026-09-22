'use client';

import React, { DragEvent, FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface UploadMediaModalProps {
  uploading: boolean;
  onClose: () => void;
  onFileSelected: (file: File) => void;
}

const UploadMediaModal: FC<UploadMediaModalProps> = ({ uploading, onClose, onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [onClose]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) onFileSelected(file);
  };

  return (
    <>
      <div className={'md:hidden fixed inset-0 z-50 bg-[#494A53]/60'} onClick={onClose} />
      <div
        ref={panelRef}
        className={'absolute top-full left-[-3rem] z-50 mt-1 w-[370px] max-md:fixed max-md:top-1/2 max-md:left-1/2 max-md:mt-0 max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:w-[calc(100vw-2rem)] max-md:max-h-[calc(100dvh-2rem)] max-md:overflow-y-auto max-md:max-w-[370px] bg-white rounded-xl border border-stroke-primary shadow-[0_4px_24px_rgba(0,0,0,0.08)]'}
      >
        <div className={'p-3'}>
          <div
            className={clsx(
              'flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed py-8 cursor-pointer transition-colors',
              isDragging ? 'border-blue bg-blue-light/40' : 'border-stroke-primary',
              !uploading && !isDragging && 'hover:border-blue hover:bg-blue-light/30',
              uploading && 'pointer-events-none opacity-60'
            )}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <svg
              width={'20'} height={'20'} viewBox={'0 0 20 20'} fill={'none'}
              xmlns={'http://www.w3.org/2000/svg'}
              className={'text-label-tertiary'}
            >
              <path
                d={'M11.667 1.667H5a1.667 1.667 0 0 0-1.667 1.666v13.334A1.667 1.667 0 0 0 5 18.333h10a1.667 1.667 0 0 0 1.667-1.666V7.5l-5-5.833Z'}
                stroke={'currentColor'} strokeWidth={'1.5'} strokeLinecap={'round'} strokeLinejoin={'round'}
              />
              <path
                d={'M11.667 1.667V7.5H17.5'}
                stroke={'currentColor'} strokeWidth={'1.5'} strokeLinecap={'round'} strokeLinejoin={'round'}
              />
            </svg>
            <span className={'text-sm text-grey-dark font-medium'}>
              {uploading ? 'Uploading…' : 'Choose a file'}
            </span>
            <span className={'text-xs text-label-tertiary'}>The maximum size per file is 5 MB</span>
          </div>
          <input
            ref={fileInputRef}
            type={'file'}
            accept={'image/*'}
            className={'hidden'}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </>
  );
};

export default UploadMediaModal;
