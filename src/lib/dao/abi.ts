export const GOVERNANCE_ABI = [
  {
    name: 'propose',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'target', type: 'address' },
      { name: 'data', type: 'bytes' },
      { name: 'description', type: 'string' },
    ],
    outputs: [{ name: 'proposalId', type: 'uint256' }],
  },
  {
    name: 'vote',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'support', type: 'bool' },
      { name: 'reason', type: 'string' },
    ],
    outputs: [],
  },
  {
    name: 'getReceipt',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'voter', type: 'address' },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'hasVoted', type: 'bool' },
          { name: 'support', type: 'bool' },
          { name: 'votes', type: 'uint256' },
        ],
      },
    ],
  },
  {
    name: 'cancel',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'proposalId', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'proposalCount',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
] as const;

export const CONFIG_ABI = [
  // Read
  { name: 'proposalThreshold', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'votingPeriod', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'votingDelay', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'quorumPercentage', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  // Setters used for encodeFunctionData in CreateProposalForm
  { name: 'updateVotingPeriod', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newVotingPeriod', type: 'uint256' }], outputs: [] },
  { name: 'updateVotingDelay', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newVotingDelay', type: 'uint256' }], outputs: [] },
  { name: 'updateQuorumPercentage', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newQuorumPercentage', type: 'uint256' }], outputs: [] },
  { name: 'updateProposalThreshold', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newProposalThreshold', type: 'uint256' }], outputs: [] },
  { name: 'updateTimelockDelay', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newTimelockDelay', type: 'uint256' }], outputs: [] },
  { name: 'updateDaoStakingAnnualRewardRate', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newRewardRate', type: 'uint256' }], outputs: [] },
  { name: 'updateCreateRWAFeeRange', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newMin', type: 'uint256' }, { name: 'newMax', type: 'uint256' }], outputs: [] },
  { name: 'updateCreatePoolFeeRatioRange', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newMin', type: 'uint256' }, { name: 'newMax', type: 'uint256' }], outputs: [] },
  { name: 'updateEntryFeePercentRange', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newMin', type: 'uint256' }, { name: 'newMax', type: 'uint256' }], outputs: [] },
  { name: 'updateExitFeePercentRange', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newMin', type: 'uint256' }, { name: 'newMax', type: 'uint256' }], outputs: [] },
  { name: 'updateRewardPercentRange', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newMin', type: 'uint256' }, { name: 'newMax', type: 'uint256' }], outputs: [] },
  { name: 'updateExpectedHoldAmountRange', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newMin', type: 'uint256' }, { name: 'newMax', type: 'uint256' }], outputs: [] },
  { name: 'updateExpectedRwaAmountRange', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newMin', type: 'uint256' }, { name: 'newMax', type: 'uint256' }], outputs: [] },
  { name: 'updateEntryPeriodDurationRange', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newMin', type: 'uint256' }, { name: 'newMax', type: 'uint256' }], outputs: [] },
  { name: 'updateCompletionPeriodDurationRange', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newMin', type: 'uint256' }, { name: 'newMax', type: 'uint256' }], outputs: [] },
  { name: 'updateEntryPeriodConfig', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newMaxPastOffset', type: 'uint256' }, { name: 'newMaxFutureOffset', type: 'uint256' }], outputs: [] },
  {
    name: 'updateOutgoingTranchesConfig', type: 'function', stateMutability: 'nonpayable',
    inputs: [
      { name: 'newMinCount', type: 'uint256' }, { name: 'newMaxCount', type: 'uint256' },
      { name: 'newMinPercent', type: 'uint256' }, { name: 'newMaxPercent', type: 'uint256' },
      { name: 'newMinInterval', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    name: 'updateIncomingTranchesConfig', type: 'function', stateMutability: 'nonpayable',
    inputs: [
      { name: 'newMinCount', type: 'uint256' }, { name: 'newMaxCount', type: 'uint256' },
      { name: 'newMinPercent', type: 'uint256' }, { name: 'newMaxPercent', type: 'uint256' },
      { name: 'newMinInterval', type: 'uint256' },
    ],
    outputs: [],
  },
  { name: 'updateMinSignersRequired', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newMinSignersRequired', type: 'uint256' }], outputs: [] },
  { name: 'updateHoldToken', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newHoldToken', type: 'address' }], outputs: [] },
  { name: 'updateBaseMetadataUri', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newBaseMetadataUri', type: 'string' }], outputs: [] },
] as const;

export const DAO_STAKING_ABI = [
  { name: 'stake', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'amount', type: 'uint256' }], outputs: [] },
  { name: 'unstake', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'amount', type: 'uint256' }], outputs: [] },
  { name: 'getVotingPower', type: 'function', stateMutability: 'view', inputs: [{ name: 'user', type: 'address' }], outputs: [{ type: 'uint256' }] },
  { name: 'stakedAmount', type: 'function', stateMutability: 'view', inputs: [{ name: '', type: 'address' }], outputs: [{ type: 'uint256' }] },
  {
    name: 'lock', type: 'function', stateMutability: 'nonpayable',
    inputs: [{ name: 'user', type: 'address' }, { name: 'unlockTimestamp', type: 'uint256' }],
    outputs: [],
  },
] as const;

export const POOL_PAUSE_ABI = [
  { name: 'enablePause', type: 'function', stateMutability: 'nonpayable', inputs: [], outputs: [] },
  { name: 'disablePause', type: 'function', stateMutability: 'nonpayable', inputs: [], outputs: [] },
] as const;

export const TREASURY_ABI = [
  {
    name: 'withdrawERC20', type: 'function', stateMutability: 'nonpayable',
    inputs: [{ name: 'token', type: 'address' }, { name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'withdrawETH', type: 'function', stateMutability: 'nonpayable',
    inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [],
  },
] as const;
