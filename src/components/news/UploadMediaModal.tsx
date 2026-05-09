'use client';

import React, { DragEvent, FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type Tab = 'upload' | 'embed';

interface UploadMediaModalProps {
  uploading: boolean;
  onClose: () => void;
  onFileSelected: (file: File) => void;
  onEmbedLink: (url: string) => void;
}

const UploadMediaModal: FC<UploadMediaModalProps> = ({ uploading, onClose, onFileSelected, onEmbedLink }) => {
  const [tab, setTab] = useState<Tab>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const [embedError, setEmbedError] = useState('');
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

  const handleApplyLink = () => {
    const url = embedUrl.trim();
    if (!url) return;
    const isImageUrl = /\.(jpe?g|png|gif|webp|svg)(\?.*)?$/i.test(url);
    if (!isImageUrl) {
      setEmbedError('The link does not lead to media content');
      return;
    }
    setEmbedError('');
    onEmbedLink(url);
  };

  return (
    <div
      ref={panelRef}
      className={'absolute top-full left-[-3rem] z-50 mt-1 w-[370px] bg-white rounded-xl border border-stroke-primary shadow-[0_4px_24px_rgba(0,0,0,0.08)]'}
    >
      {/* Tabs */}
      <div className={'flex border-b border-stroke-primary'}>
        {(['upload', 'embed'] as const).map(t => (
          <button
            key={t}
            type={'button'}
            onClick={() => setTab(t)}
            className={clsx(
              'relative px-4 py-3 text-sm font-medium transition-colors',
              tab === t ? 'text-blue' : 'text-label-tertiary hover:text-grey-dark'
            )}
          >
            {t === 'upload' ? 'Upload' : 'Embed link'}
            {tab === t && (
              <span className={'absolute bottom-0 left-0 right-0 h-0.5 bg-blue rounded-t-sm'} />
            )}
          </button>
        ))}
      </div>

      {/* Upload tab */}
      {tab === 'upload' && (
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
      )}

      {/* Embed link tab */}
      {tab === 'embed' && (
        <div className={'p-3 flex flex-col gap-2'}>
          <input
            type={'text'}
            placeholder={'Embed link'}
            value={embedUrl}
            onChange={e => { setEmbedUrl(e.target.value); setEmbedError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleApplyLink()}
            className={clsx(
              'w-full rounded-lg border px-3 py-2 text-sm outline-none placeholder:text-label-tertiary tr-d-all',
              embedError
                ? 'border-red-bright text-red-bright focus:border-red-bright'
                : 'border-stroke-primary focus:border-blue'
            )}
          />
          {embedError && (
            <p className={'text-xs text-red-bright -mt-1'}>{embedError}</p>
          )}
          <div className={'flex items-center justify-between gap-2'}>
            <span className={'text-xs text-label-tertiary leading-snug'}>
              Works with PDFs, Google Drive,<br />Google Maps...
            </span>
            <button
              type={'button'}
              onClick={handleApplyLink}
              className={'shrink-0 bg-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-hover transition-colors'}
            >
              Apply link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMediaModal;
