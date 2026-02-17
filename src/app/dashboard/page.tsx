'use client';

import React, { FC } from 'react';
import AuthGuard from '@/lib/auth/AuthGuard';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { CompanyList } from '@/components/dashboard';
import { useAuth } from '@/lib/auth/AuthContext';

const page: FC = () => {
  const { user } = useAuth();

  return (
    <AuthGuard>
      <DashboardLayout>
        <section className={'mb-12'}>
          <Wrapper>
            <div className={'border-b-1 border-stroke-primary pb-6'}>
              {user?.userId && <span className={'text-xl font-semibold'}>Your id - {user.userId}</span>}
              <br />
              {user?.wallet && (
                <span className={'text-base'}>
                  Your wallet - {user.wallet.slice(0, 6) + '...' + user.wallet.slice(-6)}
                </span>
              )}
            </div>
          </Wrapper>
        </section>

        <CompanyList />
      </DashboardLayout>
    </AuthGuard>
  );
};

export default page;
