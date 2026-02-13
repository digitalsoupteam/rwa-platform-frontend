import './globals.css';
import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/lib/providers';
import '@rainbow-me/rainbowkit/styles.css';

export const metadata: Metadata = {
  title: 'Slices',
  description: 'RWA Platform',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
