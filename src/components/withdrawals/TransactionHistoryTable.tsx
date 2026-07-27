'use client';

import React, { FC } from 'react';
import { toast } from '@/components/ui';

export type TxStatus = 'pending' | 'completed';

export interface WithdrawalTx {
  id: string;
  poolName: string;
  date: number; // unix seconds
  // The indexed Transaction record only stores the raw ERC1155 transfer
  // amount (RWA token count), not the USDT the burn actually paid out at
  // that moment — so this is labeled by what the data really is.
  amountRwa: number;
  status: TxStatus;
  txHash: string;
}

const STATUS_LABELS: Record<TxStatus, string> = {
  pending: 'Pending',
  completed: 'Completed',
};

const STATUS_DOT_COLOR: Record<TxStatus, string> = {
  pending: 'bg-[#F5A623]',
  completed: 'bg-[#1ABF97]',
};

const STATUS_TEXT_COLOR: Record<TxStatus, string> = {
  pending: 'text-[#F5A623]',
  completed: 'text-[#1ABF97]',
};

function formatDate(ts: number): string {
  const d = new Date(ts * 1000);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = String(d.getFullYear()).slice(2);
  return `${dd}.${mm}.${yyyy}`;
}

function truncateHash(hash: string): string {
  if (hash.length <= 12) return hash;
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

const CopyIcon: FC = () => (
  <svg width={'14'} height={'14'} viewBox={'0 0 14 14'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
    <rect x={'4.5'} y={'4.5'} width={'8'} height={'8'} rx={'1'} stroke={'#959EB5'} />
    <path d={'M1.5 9.5V2a1 1 0 0 1 1-1h7.5'} stroke={'#959EB5'} strokeLinecap={'round'} />
  </svg>
);

const SkeletonRow: FC = () => <div className={'bg-bg-primary border border-stroke-primary h-[52px] animate-pulse bg-bg-tertiary/40'} />;

interface TransactionHistoryTableProps {
  txs: WithdrawalTx[];
  isLoading: boolean;
}

const TransactionHistoryTable: FC<TransactionHistoryTableProps> = ({ txs, isLoading }) => {
  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast('TXID copied to clipboard');
  };

  return (
    <>
      {/* Desktop table */}
      <div className={'max-lg:hidden overflow-hidden rounded-b-lg'}>
        <div className={'bg-bg-primary border-x border-b border-stroke-primary h-[52px] flex items-center px-3 gap-2'}>
          <span className={'text-sm font-medium text-grey-dark flex-1'}>Pool</span>
          <span className={'text-sm font-medium text-grey-dark w-[120px] shrink-0'}>Transaction date</span>
          <span className={'text-sm font-medium text-grey-dark w-[140px] shrink-0 text-right'}>Amount (RWA)</span>
          <span className={'text-sm font-medium text-grey-dark w-[110px] shrink-0'}>Status</span>
          <span className={'text-sm font-medium text-grey-dark w-[140px] shrink-0 text-right'}>TXID</span>
        </div>

        <div className={'flex flex-col'}>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={'-mt-px'}>
                <SkeletonRow />
              </div>
            ))
          ) : txs.length === 0 ? (
            <div className={'py-12 text-center text-sm text-label-tertiary border-x border-b border-stroke-primary'}>
              No withdrawal transactions yet.
            </div>
          ) : (
            txs.map(tx => (
              <div key={tx.id} className={'-mt-px bg-bg-primary border border-stroke-primary h-[52px] flex items-center px-3 gap-2'}>
                <span className={'text-sm text-black flex-1 truncate'}>{tx.poolName}</span>
                <span className={'text-sm text-blue w-[120px] shrink-0'}>{formatDate(tx.date)}</span>
                <span className={'text-sm text-black w-[140px] shrink-0 text-right'}>{tx.amountRwa.toLocaleString()}</span>
                <span className={'w-[110px] shrink-0 flex items-center gap-1.5 text-sm text-black'}>
                  <span className={`size-1.5 rounded-full ${STATUS_DOT_COLOR[tx.status]}`} />
                  {STATUS_LABELS[tx.status]}
                </span>
                <button
                  type={'button'}
                  onClick={() => handleCopy(tx.txHash)}
                  className={'w-[140px] shrink-0 flex items-center justify-end gap-1.5 text-sm text-black cursor-pointer'}
                >
                  {truncateHash(tx.txHash)}
                  <CopyIcon />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mobile cards */}
      <div className={'lg:hidden flex flex-col gap-3'}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
        ) : txs.length === 0 ? (
          <div className={'py-12 text-center text-sm text-label-tertiary'}>No withdrawal transactions yet.</div>
        ) : (
          txs.map(tx => (
            <div key={tx.id} className={'bg-bg-tertiary rounded-2xl p-4 flex flex-col gap-3'}>
              <span
                className={
                  'w-fit flex items-center gap-1.5 bg-bg-primary border border-stroke-primary rounded-full px-3 py-1.5 text-xs font-medium ' +
                  STATUS_TEXT_COLOR[tx.status]
                }
              >
                <span className={`size-1.5 rounded-full ${STATUS_DOT_COLOR[tx.status]}`} />
                {STATUS_LABELS[tx.status]}
              </span>

              <div>
                <p className={'text-lg font-bold text-black'}>{tx.amountRwa.toLocaleString()} RWA</p>
                <p className={'text-sm text-grey-dark'}>{tx.poolName}</p>
              </div>

              <div className={'border border-stroke-primary rounded-lg px-3 py-2.5'}>
                <p className={'text-xs text-grey-dark mb-0.5'}>Transaction date</p>
                <p className={'text-sm font-semibold text-black'}>{formatDate(tx.date)}</p>
              </div>

              <button
                type={'button'}
                onClick={() => handleCopy(tx.txHash)}
                className={'border border-stroke-primary rounded-lg px-3 py-2.5 text-left cursor-pointer'}
              >
                <p className={'text-xs text-grey-dark mb-0.5'}>TXID</p>
                <span className={'flex items-center gap-1.5 text-sm font-semibold text-black'}>
                  <CopyIcon />
                  {truncateHash(tx.txHash)}
                </span>
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TransactionHistoryTable;
