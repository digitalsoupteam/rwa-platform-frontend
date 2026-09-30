interface PoolCollectedFields {
  realHoldReserve?: string | null;
  expectedHoldAmount?: string | null;
  isTargetReached?: boolean | null;
}

// Once the target is reached the contract moves expectedHoldAmount out of
// realHoldReserve into outgoingTranchesBalance, so realHoldReserve no longer
// reflects what was collected — the pool is fully funded at that point.
export function getCollectedHold(pool: PoolCollectedFields | null | undefined): string {
  if (!pool) return '0';
  if (pool.isTargetReached) return pool.expectedHoldAmount || '0';
  return pool.realHoldReserve || '0';
}
