import { gql } from '@apollo/client';

export const GET_REFERRALS = gql`
  query GetReferrals($input: GetReferralsFilterInput) {
    getReferrals(input: $input) {
      id
      userId
      userWallet
      referrerId
      createdAt
    }
  }
`;

// history per referral wallet — aggregate client-side for "total claimed" column
export const GET_REFERRER_CLAIM_HISTORY = gql`
  query GetReferrerClaimHistory($input: GetReferrerClaimHistoryFilterInput) {
    getReferrerClaimHistory(input: $input) {
      id
      amount
      referralWallet
      tokenAddress
      transactionHash
      createdAt
    }
  }
`;

// taskCooldown is a Unix timestamp — if > now, the user is still on cooldown
export const GET_REFERRER_WITHDRAWS = gql`
  query GetReferrerWithdraws($input: GetReferrerWithdrawsFilterInput) {
    getReferrerWithdraws(input: $input) {
      id
      chainId
      tokenAddress
      totalWithdrawnAmount
      taskCooldown
      taskExpiredAt
      taskId
    }
  }
`;

// referralRewardAmount = total earned by referrer across all referrals
// use it together with totalWithdrawnAmount to compute claimable balance
export const GET_FEES = gql`
  query GetFees($input: GetFeesFilterInput) {
    getFees(input: $input) {
      id
      userId
      userWallet
      tokenAddress
      chainId
      referralRewardAmount
      referralRewardCount
    }
  }
`;

export const CREATE_REFERRER_WITHDRAW_TASK = gql`
  mutation CreateReferrerWithdrawTask($input: CreateReferrerWithdrawTaskInput!) {
    createReferrerWithdrawTask(input: $input) {
      id
      taskId
      taskCooldown
      taskExpiredAt
    }
  }
`;

// called when a new user lands with ?ref=<userId> in the URL
// gateway resolves referrerWallet automatically from referrerId via auth service
export const REGISTER_REFERRAL = gql`
  mutation RegisterReferral($input: RegisterReferralInput!) {
    registerReferral(input: $input) {
      id
      userId
      userWallet
      referrerId
      referrerWallet
    }
  }
`;
