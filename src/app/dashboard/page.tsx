import React, { FC } from 'react';
import AuthGuard from '@/lib/auth/AuthGuard';
import { DashboardLayout } from '@/components/layout';

const page: FC = () => {
  return (
    <AuthGuard>
      <DashboardLayout>welcome</DashboardLayout>
    </AuthGuard>
  );
};

export default page;
