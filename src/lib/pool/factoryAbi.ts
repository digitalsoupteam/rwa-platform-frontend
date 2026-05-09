export const FACTORY_ADDRESS = '0xD1b0e186A2B0d602f27cE2e046Fa95BBe9FE6d84' as const;
export const HOLD_TOKEN_ADDRESS = '0x66670d16331dc923Ff095f5B0A658F01e6794216' as const;

export const ERC20_APPROVE_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const ERC1155_BALANCE_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const POOL_ABI = [
  {
    inputs: [],
    name: 'tokenId',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'rwaAmount', type: 'uint256' },
      { internalType: 'bool', name: 'allowPartial', type: 'bool' },
    ],
    name: 'estimateMint',
    outputs: [
      { internalType: 'uint256', name: 'holdAmountWithFee', type: 'uint256' },
      { internalType: 'uint256', name: 'fee', type: 'uint256' },
      { internalType: 'uint256', name: 'actualRwaAmount', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'rwaAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'maxHoldAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'validUntil', type: 'uint256' },
      { internalType: 'bool', name: 'allowPartial', type: 'bool' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'rwaAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'minHoldAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'minBonusAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'validUntil', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const FACTORY_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'createRWAFee', type: 'uint256' },
      { internalType: 'string', name: 'entityId', type: 'string' },
      { internalType: 'string', name: 'entityOwnerId', type: 'string' },
      { internalType: 'string', name: 'entityOwnerType', type: 'string' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address[]', name: 'signers', type: 'address[]' },
      { internalType: 'bytes[]', name: 'signatures', type: 'bytes[]' },
      { internalType: 'uint256', name: 'expired', type: 'uint256' },
    ],
    name: 'deployRWA',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'createPoolFeeRatio', type: 'uint256' },
      { internalType: 'string', name: 'entityId', type: 'string' },
      { internalType: 'contract RWA', name: 'rwa', type: 'address' },
      { internalType: 'uint256', name: 'expectedHoldAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'expectedRwaAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'priceImpactPercent', type: 'uint256' },
      { internalType: 'uint256', name: 'rewardPercent', type: 'uint256' },
      { internalType: 'uint256', name: 'entryPeriodStart', type: 'uint256' },
      { internalType: 'uint256', name: 'entryPeriodExpired', type: 'uint256' },
      { internalType: 'uint256', name: 'completionPeriodExpired', type: 'uint256' },
      { internalType: 'uint256', name: 'entryFeePercent', type: 'uint256' },
      { internalType: 'uint256', name: 'exitFeePercent', type: 'uint256' },
      { internalType: 'bool', name: 'fixedSell', type: 'bool' },
      { internalType: 'bool', name: 'allowEntryBurn', type: 'bool' },
      { internalType: 'bool', name: 'awaitCompletionExpired', type: 'bool' },
      { internalType: 'bool', name: 'floatingOutTranchesTimestamps', type: 'bool' },
      { internalType: 'uint256[]', name: 'outgoingTranches', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'outgoingTranchTimestamps', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'incomingTranches', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'incomingTrancheExpired', type: 'uint256[]' },
      { internalType: 'address[]', name: 'signers', type: 'address[]' },
      { internalType: 'bytes[]', name: 'signatures', type: 'bytes[]' },
      { internalType: 'uint256', name: 'expired', type: 'uint256' },
    ],
    name: 'deployPool',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;