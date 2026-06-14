'use client';

import React, { FC, useEffect, useMemo, useState } from 'react';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Pagination, toast } from '@/components/ui';
import { Modal } from '@/components/common';
import { useAccount } from 'wagmi';
import { useQuery, useMutation } from '@apollo/client/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAuth } from '@/lib/auth/AuthContext';
import clsx from 'clsx';

import {
  GET_REFERRALS,
  GET_REFERRER_CLAIM_HISTORY,
  GET_REFERRER_WITHDRAWS,
  GET_FEES,
  CREATE_REFERRER_WITHDRAW_TASK,
  REGISTER_REFERRAL,
} from '@/lib/referrals/operations';
import { HOLD_TOKEN_ADDRESS } from '@/lib/contracts';
import type {
  Referral as GqlReferral,
  ReferrerClaimHistory as GqlClaimHistory,
  ReferrerWithdraw as GqlWithdraw,
  Fees as GqlFees,
  Mutation as GqlMutation,
} from '@/gql/graphql';

const CHAIN_ID = '97'; // BSC Testnet
const PAGE_SIZE = 10;
const REF_STORAGE_KEY = 'slices_ref_id';

function formatCooldown(ts: number): string {
  const now = Date.now() / 1000;
  if (!ts || ts <= now) return 'Available now';
  const diff = Math.ceil(ts - now);
  const d = Math.floor(diff / 86400);
  const h = Math.floor((diff % 86400) / 3600);
  const m = Math.floor((diff % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function truncateWallet(addr: string): string {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function fmtAmount(raw: string | number): string {
  const n = typeof raw === 'string' ? parseFloat(raw) : raw;
  if (isNaN(n) || n === 0) return '—';
  return n.toLocaleString('en-US', { maximumFractionDigits: 4 });
}

function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

/* Copy icon */
const CopyIcon = () => (
  <svg width='14' height='14' viewBox='0 0 16 16' fill='none' className={'shrink-0'} aria-hidden>
    <rect x='5.5' y='5.5' width='8' height='9' rx='1.5' stroke='currentColor' />
    <path d='M2 2.5A1.5 1.5 0 0 1 3.5 1h7A1.5 1.5 0 0 1 12 2.5v1' stroke='currentColor' strokeLinecap='round' />
  </svg>
);

const SkeletonRow = () => (
  <div className={'border border-stroke-primary border-t-0 h-[52px] w-full animate-pulse bg-bg-tertiary/40'} />
);

/* Stat card used in the summary row */
const StatCard: FC<{ label: string; value: React.ReactNode; className?: string }> = ({ label, value, className }) => (
  <div className={clsx('flex flex-col gap-1 p-4 rounded-xl border border-stroke-primary', className)}>
    <span className={'text-xs font-medium text-label-tertiary'}>{label}</span>
    <span className={'text-xl font-semibold text-label-primary'}>{value}</span>
  </div>
);

/* Claim modal */
interface ClaimModalProps {
  isOpen: boolean;
  amount: string;
  setAmount: (v: string) => void;
  tokenAddress: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

const ClaimModal: FC<ClaimModalProps> = ({ isOpen, amount, setAmount, tokenAddress, onClose, onConfirm, loading }) => (
  <Modal isOpened={isOpen} closeModal={onClose}>
    <div className={'px-6 pb-4 flex flex-col gap-4'}>
      <h2 className={'text-xl font-semibold mt-2'}>Claim Referral Reward</h2>
      <p className={'text-xs text-label-tertiary break-all'}>
        Token: {truncateWallet(tokenAddress)}
      </p>
      <div className={'flex flex-col gap-1'}>
        <label className={'text-sm font-medium text-label-secondary'}>Amount</label>
        <input
          type={'number'}
          min={'0'}
          step={'any'}
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder={'0.00'}
          className={
            'px-3 py-2 rounded-lg border border-stroke-primary text-sm outline-none focus:border-blue transition-colors'
          }
        />
      </div>
      <div className={'flex gap-2 justify-end'}>
        <button
          type={'button'}
          onClick={onClose}
          className={'px-4 py-2 rounded-lg border border-stroke-primary text-sm font-medium text-label-secondary hover:bg-bg-tertiary transition-colors'}
        >
          Cancel
        </button>
        <button
          type={'button'}
          onClick={onConfirm}
          disabled={loading || !amount || Number(amount) <= 0}
          className={clsx(
            'px-4 py-2 rounded-lg bg-blue text-white text-sm font-semibold transition-colors',
            'disabled:opacity-50 not-disabled:hover:bg-blue-dark'
          )}
        >
          {loading ? 'Claiming…' : 'Confirm Claim'}
        </button>
      </div>
    </div>
  </Modal>
);

/* Cooldown modal */
const CooldownModal: FC<{ isOpen: boolean; cooldownUntil: number | null; onClose: () => void }> = ({
  isOpen, cooldownUntil, onClose,
}) => (
  <Modal isOpened={isOpen} closeModal={onClose}>
    <div className={'px-6 pb-4 flex flex-col gap-4'}>
      <h2 className={'text-xl font-semibold mt-2 text-red-bright'}>Claim Not Available</h2>
      <p className={'text-sm text-label-secondary leading-relaxed'}>
        {cooldownUntil
          ? `You can claim again in ${formatCooldown(cooldownUntil)}.`
          : 'Your next claim is not available yet. Please try again later.'}
      </p>
      <button
        type={'button'}
        onClick={onClose}
        className={'w-fit px-4 py-2 rounded-lg bg-blue text-white text-sm font-semibold hover:bg-blue-dark transition-colors'}
      >
        Got it
      </button>
    </div>
  </Modal>
);

const ReferralsPage: FC = () => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [claimOpen, setClaimOpen] = useState(false);
  const [claimAmount, setClaimAmount] = useState('');
  const [cooldownOpen, setCooldownOpen] = useState(false);

  /* Save ?ref=<userId> from URL to localStorage on first visit */
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref');
    if (ref && !localStorage.getItem(REF_STORAGE_KEY)) {
      localStorage.setItem(REF_STORAGE_KEY, ref);
    }
  }, []);

  const [registerReferral] = useMutation(REGISTER_REFERRAL);

  /* On wallet connect: register referral if a ref was saved, then clear storage */
  useEffect(() => {
    if (!address) return;
    const savedRef = localStorage.getItem(REF_STORAGE_KEY);
    if (!savedRef) return;
    registerReferral({ variables: { input: { referrerId: savedRef } } })
      .then(() => localStorage.removeItem(REF_STORAGE_KEY))
      .catch(() => {}); // backend handles duplicate registration gracefully
  }, [address, registerReferral]);

  const walletFilter = address ? { userWallet: address.toLowerCase() } : undefined;
  const referrerFilter = address ? { referrerWallet: address.toLowerCase() } : undefined;

  const { data: referralsData, loading: referralsLoading } = useQuery<{ getReferrals: GqlReferral[] }>(
    GET_REFERRALS,
    { variables: { input: { filter: referrerFilter } }, skip: !address }
  );

  const { data: claimHistoryData } = useQuery<{ getReferrerClaimHistory: GqlClaimHistory[] }>(
    GET_REFERRER_CLAIM_HISTORY,
    { variables: { input: { filter: referrerFilter } }, skip: !address }
  );

  const { data: withdrawsData, refetch: refetchWithdraws } = useQuery<{ getReferrerWithdraws: GqlWithdraw[] }>(
    GET_REFERRER_WITHDRAWS,
    { variables: { input: { filter: walletFilter } }, skip: !address, fetchPolicy: 'network-only' }
  );

  const { data: feesData } = useQuery<{ getFees: GqlFees[] }>(
    GET_FEES,
    { variables: { input: { filter: walletFilter } }, skip: !address }
  );

  const [createWithdrawTask, { loading: claiming }] = useMutation<Pick<GqlMutation, 'createReferrerWithdrawTask'>>(
    CREATE_REFERRER_WITHDRAW_TASK
  );

  /* Aggregate earned per referral wallet from claim history */
  const earnedByWallet = useMemo<Map<string, number>>(() => {
    const map = new Map<string, number>();
    for (const h of claimHistoryData?.getReferrerClaimHistory ?? []) {
      const w = h.referralWallet.toLowerCase();
      map.set(w, (map.get(w) ?? 0) + parseFloat(h.amount || '0'));
    }
    return map;
  }, [claimHistoryData]);

  const { totalEarned, claimable, claimTokenAddress, myUserId } = useMemo(() => {
    const fees = feesData?.getFees ?? [];
    const withdraws = withdrawsData?.getReferrerWithdraws ?? [];
    const fee = fees[0];
    const withdraw = withdraws.find(w => w.tokenAddress === fee?.tokenAddress) ?? withdraws[0];

    const totalEarned = parseFloat(fee?.referralRewardAmount || '0');
    const totalWithdrawn = parseFloat(withdraw?.totalWithdrawnAmount || '0');

    return {
      totalEarned,
      claimable: Math.max(0, totalEarned - totalWithdrawn),
      claimTokenAddress: fee?.tokenAddress ?? HOLD_TOKEN_ADDRESS,
      myUserId: fee?.userId,
    };
  }, [feesData, withdrawsData]);

  const referrals = referralsData?.getReferrals ?? [];
  const totalPages = Math.ceil(referrals.length / PAGE_SIZE);
  const pageReferrals = referrals.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const globalWithdraw = withdrawsData?.getReferrerWithdraws?.[0] ?? null;
  const cooldownUntil = globalWithdraw?.taskCooldown ?? null;
  const isOnCooldown = cooldownUntil ? cooldownUntil > Date.now() / 1000 : false;

  // user.userId is saved in localStorage by authService on login — always available once authenticated
  const referrerId = user?.userId ?? myUserId ?? referrals[0]?.referrerId;
  const referralLink = referrerId
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://slices.finance'}/?ref=${referrerId}`
    : null;

  const handleCopyLink = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink).then(() => toast('Referral link copied!'));
  };

  const handleClaimClick = () => {
    if (isOnCooldown) { setCooldownOpen(true); return; }
    if (claimable <= 0) { toast('Nothing to claim yet', 'error'); return; }
    setClaimAmount(String(claimable));
    setClaimOpen(true);
  };

  const handleConfirmClaim = async () => {
    if (!claimAmount || Number(claimAmount) <= 0) return;
    try {
      const result = await createWithdrawTask({
        variables: { input: { tokenAddress: claimTokenAddress, amount: claimAmount, chainId: CHAIN_ID } },
      });
      const newCooldown = result.data?.createReferrerWithdrawTask?.taskCooldown ?? null;
      setClaimOpen(false);
      await refetchWithdraws();
      toast(newCooldown
        ? `Claim submitted! Next claim in ${formatCooldown(newCooldown)}`
        : 'Claim submitted successfully!'
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Claim failed';
      if (msg.toLowerCase().includes('cooldown') || msg.toLowerCase().includes('wait')) {
        setClaimOpen(false);
        setCooldownOpen(true);
      } else {
        toast(msg, 'error');
      }
    }
  };

  if (!address) {
    return (
      <DashboardLayout>
        <Wrapper>
          <div className={'py-20 flex flex-col items-center gap-4 text-center'}>
            <p className={'text-label-secondary'}>Connect your wallet to view referrals</p>
            <button
              type={'button'}
              onClick={() => openConnectModal?.()}
              className={'px-6 py-3 rounded-xl bg-blue text-white text-sm font-semibold hover:bg-blue-dark transition-colors'}
            >
              Connect Wallet
            </button>
          </div>
        </Wrapper>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Wrapper>
        {/* Title */}
        <h1 className={'text-[36px] font-semibold leading-[1.2] text-[#1d1d1f] mb-6'}>Referrals</h1>

        {/* Referral link */}
        <div className={'border-b border-stroke-primary pb-5 mb-8'}>
          <span className={'text-sm font-medium text-label-primary mr-2'}>Your referral link</span>
          {referralLink ? (
            <button
              type={'button'}
              onClick={handleCopyLink}
              className={'inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:opacity-75 transition-opacity'}
            >
              <span className={'max-w-[220px] truncate sm:max-w-none'}>{referralLink}</span>
              <CopyIcon />
            </button>
          ) : (
            <span className={'text-sm text-label-tertiary animate-pulse'}>Loading…</span>
          )}
        </div>

        {/* Summary stats */}
        <div className={'grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8'}>
          <StatCard label={'Total referrals'} value={referrals.length || '—'} />
          <StatCard label={'Total earned'} value={fmtAmount(totalEarned)} />

          {/* Claim card — spans full width on mobile so button doesn't get squished */}
          <div className={clsx(
            'col-span-2 sm:col-span-1 flex items-center justify-between gap-4 p-4 rounded-xl border',
            claimable > 0 ? 'border-blue bg-blue/5' : 'border-stroke-primary'
          )}>
            <div className={'flex flex-col gap-1'}>
              <span className={'text-xs font-medium text-label-tertiary'}>Available to claim</span>
              <span className={'text-xl font-semibold text-label-primary'}>{fmtAmount(claimable)}</span>
              {isOnCooldown && cooldownUntil && (
                <span className={'text-xs text-label-tertiary'}>
                  Next in {formatCooldown(cooldownUntil)}
                </span>
              )}
            </div>
            <button
              type={'button'}
              onClick={handleClaimClick}
              disabled={claimable <= 0}
              className={clsx(
                'shrink-0 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors',
                claimable > 0 && !isOnCooldown
                  ? 'bg-blue hover:bg-blue-dark'
                  : 'bg-[#4e4e4e] cursor-not-allowed disabled:opacity-60'
              )}
            >
              {isOnCooldown ? 'On cooldown' : 'Claim'}
            </button>
          </div>
        </div>

        {/* Referrals table */}
        <div className={'flex flex-col gap-4'}>
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          )}

          <div className={'flex flex-col w-full'}>
            {/* Header */}
            <div className={'border border-stroke-primary px-3 py-[19px] flex items-center bg-white overflow-hidden'}>
              <span className={'text-sm font-medium text-label-secondary flex-1'}>Referral</span>
              <span className={'text-sm font-medium text-label-secondary w-[140px] shrink-0 text-right'}>
                You earned
              </span>
              <span className={'text-sm font-medium text-label-secondary w-[130px] shrink-0 text-right hidden md:block'}>
                Joined
              </span>
            </div>

            {referralsLoading ? (
              Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
            ) : pageReferrals.length === 0 ? (
              <div className={'border border-stroke-primary border-t-0 px-3 py-10 text-center text-sm text-label-tertiary'}>
                No referrals yet. Share your link to start earning.
              </div>
            ) : (
              pageReferrals.map(referral => {
                const earned = earnedByWallet.get(referral.userWallet.toLowerCase()) ?? 0;
                return (
                  <div
                    key={referral.id}
                    className={'border border-stroke-primary border-t-0 h-[52px] px-3 flex items-center bg-white overflow-hidden'}
                  >
                    <span className={'text-sm text-label-primary flex-1 truncate'}>
                      {truncateWallet(referral.userWallet)}
                    </span>
                    <span className={'text-sm font-medium text-label-primary w-[140px] shrink-0 text-right'}>
                      {fmtAmount(earned)}
                    </span>
                    <span className={'text-sm text-label-tertiary w-[130px] shrink-0 text-right hidden md:block'}>
                      {formatDate(referral.createdAt)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Wrapper>

      <ClaimModal
        isOpen={claimOpen}
        amount={claimAmount}
        setAmount={setClaimAmount}
        tokenAddress={claimTokenAddress}
        onClose={() => setClaimOpen(false)}
        onConfirm={handleConfirmClaim}
        loading={claiming}
      />

      <CooldownModal
        isOpen={cooldownOpen}
        cooldownUntil={cooldownUntil}
        onClose={() => setCooldownOpen(false)}
      />
    </DashboardLayout>
  );
};

export default ReferralsPage;
