'use client';

import React, { FC } from 'react';
import clsx from 'clsx';

import InstagramSVG from '../../assets/icons/instagram.svg';
import XSVG from '../../assets/icons/x.svg';
import FacebookSVG from '../../assets/icons/facebook.svg';
import YouTubeSVG from '../../assets/icons/youtube.svg';

export interface SocialLinkValue {
  type: string;
  url: string;
}

export interface SocialsValue {
  instagram: string;
  twitter: string;
  facebook: string;
  youtube: string;
}

export const EMPTY_SOCIALS: SocialsValue = { instagram: '', twitter: '', facebook: '', youtube: '' };

// Mirrors SOCIAL_URL_PATTERNS in rwa-platform-backend/services/gateway/src/services/validation.service.ts
const SOCIAL_URL_PATTERNS: Record<keyof SocialsValue, RegExp> = {
  twitter: /^https?:\/\/(x\.com|twitter\.com)\/.+/i,
  instagram: /^https?:\/\/(www\.)?instagram\.com\/.+/i,
  facebook: /^https?:\/\/(www\.)?facebook\.com\/.+/i,
  youtube: /^https?:\/\/(www\.)?youtube\.com\/.+/i,
};

const SOCIAL_DOMAIN_LABELS: Record<keyof SocialsValue, string> = {
  instagram: 'instagram.com',
  twitter: 'x.com or twitter.com',
  facebook: 'facebook.com',
  youtube: 'youtube.com',
};

export type SocialsErrors = Partial<Record<keyof SocialsValue, string>>;

export function validateSocials(socials: SocialsValue): SocialsErrors {
  const errors: SocialsErrors = {};
  for (const key of Object.keys(socials) as (keyof SocialsValue)[]) {
    const url = socials[key].trim();
    if (!url) continue;
    if (!SOCIAL_URL_PATTERNS[key].test(url)) {
      errors[key] = `Must be a valid ${SOCIAL_DOMAIN_LABELS[key]} link`;
    }
  }
  return errors;
}

export function socialsToArray(socials: SocialsValue): SocialLinkValue[] {
  return (Object.entries(socials) as [keyof SocialsValue, string][])
    .filter(([, url]) => url.trim().length > 0)
    .map(([type, url]) => ({ type, url: url.trim() }));
}

export function socialsFromArray(links?: SocialLinkValue[] | null): SocialsValue {
  const value = { ...EMPTY_SOCIALS };
  for (const link of links ?? []) {
    if (link.type in value) {
      value[link.type as keyof SocialsValue] = link.url;
    }
  }
  return value;
}

const PLATFORMS: { key: keyof SocialsValue; label: string; placeholder: string; icon: FC<{ className?: string }> }[] = [
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...', icon: InstagramSVG },
  { key: 'twitter', label: 'X / Twitter', placeholder: 'https://x.com/...', icon: XSVG },
  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...', icon: FacebookSVG },
  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/...', icon: YouTubeSVG },
];

interface SocialsInputProps {
  value: SocialsValue;
  onChange: (value: SocialsValue) => void;
  errors?: SocialsErrors;
  className?: string;
}

const SocialsInput: FC<SocialsInputProps> = ({ value, onChange, errors, className }) => {
  return (
    <div className={clsx('flex flex-col gap-3 w-full', className)}>
      {PLATFORMS.map(({ key, label, placeholder, icon: PlatformIcon }) => (
        <div key={key} className={'flex flex-col w-full'}>
          <div className={'flex items-center gap-3 w-full'}>
            <div className={'flex flex-1 items-center gap-2 min-w-0'}>
              <span className={'shrink-0 size-7 rounded-full bg-black flex items-center justify-center'}>
                <PlatformIcon className={'size-3.5 text-white'} />
              </span>
              <span className={'text-sm font-medium text-black whitespace-nowrap'}>{label}</span>
            </div>
            <input
              value={value[key]}
              onChange={e => onChange({ ...value, [key]: e.target.value })}
              placeholder={placeholder}
              className={clsx(
                'flex-1 min-w-0 px-2 py-3 rounded-lg border-1 border-stroke-primary bg-white text-sm text-black placeholder:text-label-tertiary outline-0 tr-d-all',
                errors?.[key] && '!border-red-bright text-red-bright'
              )}
            />
          </div>
          {errors?.[key] && <div className={'pt-1 text-xs/[1] text-red-bright'}>{errors[key]}</div>}
        </div>
      ))}
    </div>
  );
};

export default SocialsInput;
