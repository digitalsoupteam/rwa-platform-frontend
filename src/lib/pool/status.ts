interface PoolStatusFields {
  poolAddress?: string | null;
  paused?: boolean | null;
  fixedSell?: boolean | null;
  allowEntryBurn?: boolean | null;
  isTargetReached?: boolean | null;
  isFullyReturned?: boolean | null;
  entryPeriodStart?: number | null;
  entryPeriodExpired?: number | null;
  completionPeriodExpired?: number | null;
  expectedRwaAmount?: string | null;
  awaitingRwaAmount?: string | null;
}

export function getPoolStatus(pool: PoolStatusFields, now: number = Date.now() / 1000): string {
  if (pool.paused) return 'Paused';
  if (!pool.poolAddress) return 'Pending';
  if (pool.isFullyReturned) return 'Completed';
  if (pool.isTargetReached) return 'Funded';
  if (pool.entryPeriodStart && now < pool.entryPeriodStart) return 'Upcoming';
  if (pool.entryPeriodExpired && now >= pool.entryPeriodExpired) return 'Failed';
  return 'Collecting';
}

function isFixedPoolSoldOut(pool: PoolStatusFields): boolean {
  if (!pool.fixedSell) return false;
  try {
    const expected = BigInt(pool.expectedRwaAmount || '0');
    return expected > BigInt(0) && BigInt(pool.awaitingRwaAmount || '0') >= expected;
  } catch {
    return false;
  }
}

// Mirrors the require() checks of Pool.mint / Pool.burn so the UI never offers
// a trade the contract would revert. A null reason means the trade is allowed.
export function getPoolTradeState(
  pool: PoolStatusFields,
  now: number = Date.now() / 1000
): { buyDisabledReason: string | null; sellDisabledReason: string | null } {
  if (pool.paused) {
    return { buyDisabledReason: 'The pool is paused', sellDisabledReason: 'The pool is paused' };
  }

  const entryExpired = !!pool.entryPeriodExpired && now >= pool.entryPeriodExpired;

  let buyDisabledReason: string | null = null;
  if (pool.isFullyReturned) {
    buyDisabledReason = 'The pool is completed — buying is closed';
  } else if (pool.entryPeriodStart && now < pool.entryPeriodStart) {
    buyDisabledReason = 'Collecting has not started yet';
  } else if (pool.completionPeriodExpired && now >= pool.completionPeriodExpired) {
    buyDisabledReason = 'The pool period has ended — buying is closed';
  } else if (!pool.isTargetReached && entryExpired) {
    buyDisabledReason = 'Collecting closed — the entry period has ended';
  } else if (isFixedPoolSoldOut(pool)) {
    buyDisabledReason = 'Sold out — the fundraising goal has been reached';
  }

  const sellDisabledReason =
    !pool.allowEntryBurn && !pool.isTargetReached && !entryExpired
      ? 'Selling opens once the goal is reached or the entry period ends'
      : null;

  return { buyDisabledReason, sellDisabledReason };
}
