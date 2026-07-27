import React, { FC, PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={'min-h-screen flex flex-col bg-bg-primary'}>
      <Header />
      <main className={'grow'}>{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
