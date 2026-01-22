import React, { FC } from 'react';
import AuthGuard from '@/lib/auth/AuthGuard';
import { DashboardLayout } from '@/components/layout';

const page: FC = () => {
  return (
    <AuthGuard>
      <DashboardLayout>
        <div className={'h-screen bg-black text-white pt-100 text-center'}>Dashboard</div>;
      </DashboardLayout>
    </AuthGuard>
  );
};

export default page;
