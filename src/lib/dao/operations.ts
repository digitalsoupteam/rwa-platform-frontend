import { gql } from '@apollo/client';

export const GET_PROPOSALS = gql`
  query GetProposals($input: GetProposalsFilterInput) {
    getProposals(input: $input) {
      id
      proposalId
      proposer
      target
      data
      description
      startTime
      endTime
      state
      chainId
      createdAt
    }
  }
`;

export const GET_VOTES = gql`
  query GetVotes($input: GetVotesFilterInput) {
    getVotes(input: $input) {
      id
      proposalId
      voterWallet
      support
      weight
      reason
    }
  }
`;

export const GET_STAKING = gql`
  query GetStaking($input: GetStakingFilterInput) {
    getStaking(input: $input) {
      id
      staker
      amount
      lastStakeTimestamp
    }
  }
`;
