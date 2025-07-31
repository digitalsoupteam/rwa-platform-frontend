import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Slices',
  description: 'RWA Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
