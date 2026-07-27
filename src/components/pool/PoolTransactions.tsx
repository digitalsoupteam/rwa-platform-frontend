'use client';

import React, { FC, useEffect, useState, useRef } from 'react';
import { createClient } from 'graphql-sse';

// ── GraphQL ──────────────────────────────────────────────────────────────────

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:443/gateway/graphql';
const SSE_ENDPOINT = GRAPHQL_ENDPOINT + '/stream';

const GET_POOL_TRANSACTIONS = `
  query GetPoolTransactions($input: GetPoolTransactionsInput!) {
    getPoolTransactions(input: $input) {
      id
      poolAddress
      transactionType
      userAddress
      timestamp
      rwaAmount
      holdAmount
      bonusAmount
      holdFee
      bonusFee
      createdAt
      updatedAt
    }
  }
`;

const TRANSACTION_UPDATES_SUBSCRIPTION = `
  subscription TransactionUpdates($poolAddress: String!) {
    transactionUpdates(poolAddress: $poolAddress) {
      poolAddress
      timestamp
      transactionType
      userAddress
      rwaAmount
      holdAmount
      bonusAmount
      holdFee
      bonusFee
    }
  }
`;

async function gqlFetch(query: string, variables: Record<string, unknown>) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const r = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await r.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

interface PoolTransaction {
  id: string;
  poolAddress: string;
  transactionType: string;
  userAddress: string;
  timestamp: number;
  rwaAmount: string;
  holdAmount: string;
  bonusAmount: string;
  holdFee: string;
  bonusFee: string;
}

function formatTime(ts: number): string {
  const d = new Date(ts * 1000);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${dd}.${mm}.${yyyy} ${hh}:${mi}`;
}

function shortAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr;
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

function formatHoldAmount(raw: string): string {
  if (!raw) return '0';
  try {
    const val = Math.round(Number(BigInt(raw) / BigInt(10) ** BigInt(15)) / 1000);
    return val.toLocaleString('en-US').replace(/,/g, ' ');
  } catch {
    return '0';
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

interface PoolTransactionsProps {
  poolAddress: string;
}

const PoolTransactions: FC<PoolTransactionsProps> = ({ poolAddress }) => {
  const [transactions, setTransactions] = useState<PoolTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const txIdsRef = useRef<Set<string>>(new Set());

  // ── Fetch initial transactions ──────────────────────────────────────────────
  useEffect(() => {
    if (!poolAddress) return;

    let cancelled = false;
    setLoading(true);

    gqlFetch(GET_POOL_TRANSACTIONS, {
      input: {
        filter: { poolAddress },
        sort: { timestamp: 'desc' },
        limit: 50,
      },
    })
      .then(data => {
        if (cancelled) return;
        const txs = (data.getPoolTransactions ?? []) as PoolTransaction[];
        txs.forEach(t => txIdsRef.current.add(t.id));
        setTransactions(txs);
        setLoading(false);
      })
      .catch(err => {
        console.error('Transactions fetch error:', err);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [poolAddress]);

  // ── SSE live updates ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!poolAddress) return;

    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    const sseClient = createClient({
      url: SSE_ENDPOINT,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const dispose = sseClient.subscribe(
      {
        query: TRANSACTION_UPDATES_SUBSCRIPTION,
        variables: { poolAddress },
      },
      {
        next: result => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const update = (result as any)?.data?.transactionUpdates;
          if (!update) return;

          const newTx: PoolTransaction = {
            id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            poolAddress: update.poolAddress,
            transactionType: update.transactionType,
            userAddress: update.userAddress,
            timestamp: update.timestamp,
            rwaAmount: update.rwaAmount,
            holdAmount: update.holdAmount,
            bonusAmount: update.bonusAmount ?? '0',
            holdFee: update.holdFee ?? '0',
            bonusFee: update.bonusFee ?? '0',
          };

          setTransactions(prev => [newTx, ...prev].slice(0, 50));
        },
        error: err => console.error('Transactions SSE error:', err),
        complete: () => {},
      },
    );

    return () => dispose();
  }, [poolAddress]);

  if (loading) {
    return (
      <div className='flex items-center justify-center py-8 text-sm text-label-tertiary'>
        Loading…
      </div>
    );
  }

  return (
    <div className='border border-stroke-primary bg-bg-tertiary rounded-2xl overflow-hidden'>
      {/* Header */}
      <div className='flex items-center justify-between px-5 py-4 bg-white border-b border-stroke-primary'>
        <span className='text-base font-semibold'>Transactions</span>
        <span className='text-sm text-grey-dark'>{transactions.length} records</span>
      </div>

      {transactions.length === 0 ? (
        <div className='px-5 py-8 text-center text-sm text-label-tertiary'>
          No transactions yet
        </div>
      ) : (
        <div className='max-h-80 overflow-y-auto'>
          {/* Table header */}
          <div
            className='grid px-5 py-3 text-xs text-grey-dark border-b border-stroke-primary bg-bg-tertiary sticky top-0'
            style={{ gridTemplateColumns: '110px 70px 120px 1fr 1fr 1fr' }}
          >
            <span>Time</span>
            <span>Type</span>
            <span>User</span>
            <span>RWA Amount</span>
            <span>HOLD Amount</span>
            <span>Bonus</span>
          </div>

          {/* Rows */}
          <div className='divide-y divide-stroke-primary'>
            {transactions.map(tx => {
              const isMint = tx.transactionType === 'MINT';
              return (
                <div
                  key={tx.id}
                  className='grid px-5 py-3 text-sm items-center hover:bg-grey-light/40 tr-d-all'
                  style={{ gridTemplateColumns: '110px 70px 120px 1fr 1fr 1fr' }}
                >
                  <span className='text-grey-dark text-xs'>{formatTime(tx.timestamp)}</span>
                  <span>
                    <span
                      className={clsxTxType(isMint)}
                    >
                      {tx.transactionType}
                    </span>
                  </span>
                  <span className='text-grey-dark text-xs'>{shortAddress(tx.userAddress)}</span>
                  <span>{tx.rwaAmount}</span>
                  <span className='text-grey-dark'>{formatHoldAmount(tx.holdAmount)}</span>
                  <span className='text-grey-dark'>{tx.bonusAmount || '0'}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

function clsxTxType(isMint: boolean): string {
  return isMint
    ? 'inline-block px-2 py-0.5 rounded text-xs font-semibold uppercase bg-green/10 text-green'
    : 'inline-block px-2 py-0.5 rounded text-xs font-semibold uppercase bg-red/10 text-red';
}

export default PoolTransactions;