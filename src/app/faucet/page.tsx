'use client';

import React, { FC } from 'react';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Button, Title, toast } from '@/components/ui';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_UNLOCK_TIME, REQUEST_GAS, REQUEST_HOLD, REQUEST_PLATFORM } from '@/lib/faucet/operations';
import { useAuth } from '@/lib/auth/AuthContext';

function formatUnlock(ts: number): string {
  if (!ts || ts <= Date.now() / 1000) return 'Available now';
  const diff = Math.ceil(ts - Date.now() / 1000);
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  if (h > 0) return `Available in ${h}h ${m}m`;
  return `Available in ${m}m`;
}

const FaucetPage: FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const {
    data: unlockData,
    loading: unlockLoading,
    refetch,
  } = useQuery(GET_UNLOCK_TIME, { fetchPolicy: 'network-only', skip: !isAuthenticated });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unlockTime = (unlockData as any)?.getUnlockTime;

  const now = Date.now() / 1000;
  const notReady = authLoading || !isAuthenticated || unlockLoading;
  const holdLocked = notReady || unlockTime?.holdUnlockTime > now;
  const gasLocked = notReady || unlockTime?.gasUnlockTime > now;
  const platformLocked = notReady || unlockTime?.platformUnlockTime > now;

  const [requestHold, { loading: claimingHold }] = useMutation(REQUEST_HOLD);
  const [requestGas, { loading: claimingGas }] = useMutation(REQUEST_GAS);
  const [requestPlatform, { loading: claimingPlatform }] = useMutation(REQUEST_PLATFORM);

  const handleClaimHold = async () => {
    try {
      await requestHold({ variables: { input: { amount: 500 } } });
      await refetch();
      toast('500 HOLD tokens sent to your wallet!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to claim HOLD';
      toast(msg, 'error');
    }
  };

  const handleClaimGas = async () => {
    try {
      await requestGas({ variables: { input: { amount: 0.01 } } });
      await refetch();
      toast('0.01 BNB sent to your wallet!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to claim gas';
      toast(msg, 'error');
    }
  };

  const handleClaimPlatform = async () => {
    try {
      await requestPlatform({ variables: { input: { amount: 10000 } } });
      await refetch();
      toast('10 000 PLT tokens sent to your wallet!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to claim PLT';
      toast(msg, 'error');
    }
  };

  return (
    <DashboardLayout>
      <section className={'mb-12'}>
        <Wrapper>
          <Title className={'mb-2'} size={'xs'}>Testnet Faucet</Title>
          <p className={'text-base text-label-tertiary mb-10'}>
            Claim test tokens to use platform features on BSC Testnet.
          </p>

          <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl'}>
            <div className={'h-full p-6 border border-stroke-primary rounded-xl flex flex-col gap-4'}>
              <div>
                <div className={'text-lg font-semibold mb-1'}>HOLD Token</div>
                <div className={'text-sm text-label-tertiary min-h-10'}>Required to deploy projects and pools</div>
              </div>
              <div className={'text-2xl font-bold'}>500 HOLD</div>
              <div className={'text-sm text-label-tertiary'}>
                {unlockTime ? formatUnlock(unlockTime.holdUnlockTime) : '—'}
              </div>
              <Button
                className={'mt-auto'}
                visualType={'quaternary'}
                disabled={holdLocked || claimingHold}
                onClick={handleClaimHold}
              >
                {claimingHold ? 'Claiming…' : 'Claim HOLD'}
              </Button>
            </div>

            <div className={'h-full p-6 border border-stroke-primary rounded-xl flex flex-col gap-4'}>
              <div>
                <div className={'text-lg font-semibold mb-1'}>BNB Gas</div>
                <div className={'text-sm text-label-tertiary min-h-10'}>Required to pay transaction fees</div>
              </div>
              <div className={'text-2xl font-bold'}>0.01 BNB</div>
              <div className={'text-sm text-label-tertiary'}>
                {unlockTime ? formatUnlock(unlockTime.gasUnlockTime) : '—'}
              </div>
              <Button
                className={'mt-auto'}
                visualType={'quaternary'}
                disabled={gasLocked || claimingGas}
                onClick={handleClaimGas}
              >
                {claimingGas ? 'Claiming…' : 'Claim BNB'}
              </Button>
            </div>

            <div className={'h-full p-6 border border-stroke-primary rounded-xl flex flex-col gap-4'}>
              <div>
                <div className={'text-lg font-semibold mb-1'}>PLT Token</div>
                <div className={'text-sm text-label-tertiary min-h-10'}>Required to stake and participate in governance</div>
              </div>
              <div className={'text-2xl font-bold'}>10 000 PLT</div>
              <div className={'text-sm text-label-tertiary'}>
                {unlockTime ? formatUnlock(unlockTime.platformUnlockTime) : '—'}
              </div>
              <Button
                className={'mt-auto'}
                visualType={'quaternary'}
                disabled={platformLocked || claimingPlatform}
                onClick={handleClaimPlatform}
              >
                {claimingPlatform ? 'Claiming…' : 'Claim PLT'}
              </Button>
            </div>
          </div>
        </Wrapper>
      </section>
    </DashboardLayout>
  );
};

export default FaucetPage;
