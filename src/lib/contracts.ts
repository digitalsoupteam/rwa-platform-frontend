// BSC Testnet contract addresses
export const FACTORY_ADDRESS = '0xF46A71cac8B1A8F734559Cc4367CD1546A1A29bF' as const;
export const HOLD_TOKEN_ADDRESS = '0x1c0e214bB702572E5582085d6E25c39A2B13510d' as const;

// BSC Testnet DAO contract addresses
export const GOVERNANCE_ADDRESS  = '0x75CC95365B588D511A43776715c29c2fB8873e8c' as const;
export const CONFIG_ADDRESS      = '0xd1161a9EAaFF8009511fC17ED0fC2fA2deA839c8' as const;
export const DAO_STAKING_ADDRESS = '0xAE7BdBAdF539123028De5b421D320DDD2B60d73F' as const;
export const TREASURY_ADDRESS    = '0x92d89379C79FD3Ad6127D841C8a36a98db4e05f0' as const;
export const PLT_TOKEN_ADDRESS        = '0xb85c84e68Ed64eE497D6d8AD98811Da20a9C02ab' as const;
export const REFERRAL_TREASURY_ADDRESS = '0xcf56E77069cC2aBfA6c1Df9bfD4155F782697B9D' as const;
export const TIMELOCK_ADDRESS         = '0xEE4B4338E22c542967334E4C0098fc42869f4750' as const;
export const ADDRESS_BOOK_ADDRESS     = '0xBEDa607213b40f9934cc505ae1F66401f5C1803C' as const;

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