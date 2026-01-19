import React, { FC } from 'react';
import AuthGuard from '@/lib/auth/AuthGuard';

const page: FC = () => {
  return (
    <AuthGuard>
      <div className={'h-screen bg-black text-white pt-100 text-center'}>Dashboard</div>;
    </AuthGuard>
  );
};

export default page;
