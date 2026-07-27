'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Button, Icon, toast } from '@/components/ui';

interface ShareMenuProps {
  url?: string;
  title?: string;
  className?: string;
}

const ShareMenu: FC<ShareMenuProps> = ({ url, title, className }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title ?? (typeof document !== 'undefined' ? document.title : '');

  const links = [
    { label: 'Instagram', href: `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}` },
    {
      label: 'X / Twitter',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { label: 'E-mail', href: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}` },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => toast('Link copied!'));
    setOpen(false);
  };

  return (
    <div ref={ref} className={clsx('relative', className)}>
      <Button
        className={'max-md:w-full before:size-3.5 before:mask-[url(/icons/share.svg)] mask-contain before:bg-current'}
        visualType={'quinary'}
        onClick={() => setOpen(v => !v)}
      >
        Share
      </Button>
      {open && (
        <div className={'absolute top-full right-0 mt-1 z-50 w-[199px]'}>
          <div
            className={
              'bg-white border border-stroke-primary rounded-lg shadow-[0px_2px_13.4px_0px_rgba(0,0,0,0.2)] overflow-clip pt-2'
            }
          >
            <div className={'flex flex-col gap-0.5 px-1'}>
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={'_blank'}
                  rel={'noopener noreferrer'}
                  onClick={() => setOpen(false)}
                  className={
                    'flex items-center justify-between gap-16 px-2 py-1.5 rounded text-sm text-blue hover:bg-bg-tertiary tr-d-all'
                  }
                >
                  {link.label}
                  <Icon name={'externalLink'} className={'size-4 shrink-0'} />
                </a>
              ))}
            </div>
            <button
              type={'button'}
              onClick={handleCopyLink}
              className={
                'flex items-center justify-between w-full border-t border-stroke-primary px-3 py-2.5 text-sm text-black hover:bg-bg-tertiary tr-d-all'
              }
            >
              Copy Link
              <Icon name={'copy'} className={'size-4 shrink-0'} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareMenu;
