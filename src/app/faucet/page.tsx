'use client';

import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Button, Title, toast } from '@/components/ui';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_UNLOCK_TIME, REQUEST_GAS, REQUEST_HOLD, REQUEST_PLATFORM } from '@/lib/faucet/operations';
import { useAuth } from '@/lib/auth/AuthContext';
import { useKeepInViewport } from '@/lib/useKeepInViewport';

function formatUnlock(ts: number): string {
  if (!ts || ts <= Date.now() / 1000) return 'Available now';
  const diff = Math.ceil(ts - Date.now() / 1000);
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  if (h > 0) return `Available in ${h}h ${m}m`;
  return `Available in ${m}m`;
}

// Same duration math as formatUnlock, without the "Available in/now" prefix — used
// once a token is already claimed, both in the hover tooltip and the click toast below.
function formatCooldown(ts: number): string {
  const diff = Math.max(0, Math.ceil(ts - Date.now() / 1000));
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// Small hover bubble for a claimed button, mirroring ui/Tooltip's own bubble markup
// (same arrow, same viewport-clamping hook) without nesting another <button> inside
// the claim Button itself.
const CooldownTooltip: FC<{ open: boolean; text: string }> = ({ open, text }) => {
  const { ref, shift } = useKeepInViewport<HTMLDivElement>(open);
  if (!open) return null;
  return (
    <div
      ref={ref}
      className={'absolute bottom-full left-1/2 z-50 mb-2 flex flex-col items-center w-44 pointer-events-none'}
      style={{ transform: `translateX(calc(-50% + ${shift}px))`, filter: 'drop-shadow(0px 2px 7px rgba(0,0,0,0.1))' }}
    >
      <div className={'bg-bg-primary rounded-xl px-3 py-2 w-full text-center -mb-px'}>
        <p className={'text-xs leading-[1.2] text-grey-dark break-words'}>{text}</p>
      </div>
      <svg
        width={'20'}
        height={'9'}
        viewBox={'0 0 28 12'}
        fill={'none'}
        xmlns={'http://www.w3.org/2000/svg'}
        style={{ transform: `translateX(${-shift}px)` }}
      >
        <path
          d={
            'M13.1 0.001L0.72 0C0.49 0 0.25 0.067 0.13 0.259C-0.1 0.635 -0.02 1.105 0.37 1.419L13.08 11.589C13.57 11.98 14.37 11.98 14.86 11.589L27.57 1.419C27.97 1.105 28.04 0.635 27.81 0.259C27.69 0.067 27.45 0 27.22 0L14.86 0.001H13.1Z'
          }
          fill={'var(--color-bg-primary, #FDFEFF)'}
        />
      </svg>
    </div>
  );
};

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
  // "Claimed" (locked) is only shown once we actually know the unlock time, so the
  // buttons don't flash into the claimed state while auth/unlock data is still loading.
  const holdClaimed = !notReady && unlockTime?.holdUnlockTime > now;
  const gasClaimed = !notReady && unlockTime?.gasUnlockTime > now;
  const platformClaimed = !notReady && unlockTime?.platformUnlockTime > now;

  const [tipOpen, setTipOpen] = useState<'hold' | 'gas' | 'platform' | null>(null);
  const openTip = (key: 'hold' | 'gas' | 'platform') => setTipOpen(key);
  const closeTip = (key: 'hold' | 'gas' | 'platform') => setTipOpen(t => (t === key ? null : t));

  const [requestHold, { loading: claimingHold }] = useMutation(REQUEST_HOLD);
  const [requestGas, { loading: claimingGas }] = useMutation(REQUEST_GAS);
  const [requestPlatform, { loading: claimingPlatform }] = useMutation(REQUEST_PLATFORM);

  const handleClaimHold = async () => {
    if (holdClaimed) {
      toast(`1 claim available in ${formatCooldown(unlockTime.holdUnlockTime)}`, 'warning');
      return;
    }
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
    if (gasClaimed) {
      toast(`1 claim available in ${formatCooldown(unlockTime.gasUnlockTime)}`, 'warning');
      return;
    }
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
    if (platformClaimed) {
      toast(`1 claim available in ${formatCooldown(unlockTime.platformUnlockTime)}`, 'warning');
      return;
    }
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
              <div
                className={'relative mt-auto'}
                onMouseEnter={() => holdClaimed && openTip('hold')}
                onMouseLeave={() => closeTip('hold')}
              >
                <CooldownTooltip
                  open={holdClaimed && tipOpen === 'hold'}
                  text={`1 claim available in ${unlockTime ? formatCooldown(unlockTime.holdUnlockTime) : ''}`}
                />
                <Button
                  className={clsx('w-full', holdClaimed && '!bg-grey-light !text-grey-dark')}
                  visualType={'quaternary'}
                  disabled={notReady || claimingHold}
                  onClick={handleClaimHold}
                >
                  {claimingHold ? 'Claiming…' : holdClaimed ? 'Claimed' : 'Claim HOLD'}
                </Button>
              </div>
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
              <div
                className={'relative mt-auto'}
                onMouseEnter={() => gasClaimed && openTip('gas')}
                onMouseLeave={() => closeTip('gas')}
              >
                <CooldownTooltip
                  open={gasClaimed && tipOpen === 'gas'}
                  text={`1 claim available in ${unlockTime ? formatCooldown(unlockTime.gasUnlockTime) : ''}`}
                />
                <Button
                  className={clsx('w-full', gasClaimed && '!bg-grey-light !text-grey-dark')}
                  visualType={'quaternary'}
                  disabled={notReady || claimingGas}
                  onClick={handleClaimGas}
                >
                  {claimingGas ? 'Claiming…' : gasClaimed ? 'Claimed' : 'Claim BNB'}
                </Button>
              </div>
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
              <div
                className={'relative mt-auto'}
                onMouseEnter={() => platformClaimed && openTip('platform')}
                onMouseLeave={() => closeTip('platform')}
              >
                <CooldownTooltip
                  open={platformClaimed && tipOpen === 'platform'}
                  text={`1 claim available in ${unlockTime ? formatCooldown(unlockTime.platformUnlockTime) : ''}`}
                />
                <Button
                  className={clsx('w-full', platformClaimed && '!bg-grey-light !text-grey-dark')}
                  visualType={'quaternary'}
                  disabled={notReady || claimingPlatform}
                  onClick={handleClaimPlatform}
                >
                  {claimingPlatform ? 'Claiming…' : platformClaimed ? 'Claimed' : 'Claim PLT'}
                </Button>
              </div>
            </div>
          </div>
        </Wrapper>
      </section>
    </DashboardLayout>
  );
};

export default FaucetPage;
