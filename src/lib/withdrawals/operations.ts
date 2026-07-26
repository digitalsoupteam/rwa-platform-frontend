import { gql } from '@apollo/client';

export const GET_BALANCES_FOR_WITHDRAWALS = gql`
  query GetBalancesForWithdrawals($input: GetBalancesInput!) {
    getBalances(input: $input) {
      id
      owner
      poolAddress
      tokenAddress
      tokenId
      chainId
      balance
    }
  }
`;

export const GET_POOLS_FOR_WITHDRAWALS = gql`
  query GetPoolsForWithdrawals($input: FilterInput!) {
    getPools(input: $input) {
      id
      name
      poolAddress
      rwaAddress
      businessId
      entryFeePercent
      exitFeePercent
      expectedHoldAmount
      expectedRwaAmount
      awaitingRwaAmount
      realHoldReserve
      virtualHoldReserve
      virtualRwaReserve
      isTargetReached
      isFullyReturned
      entryPeriodExpired
      completionPeriodExpired
    }
  }
`;

export const GET_BUSINESSES_FOR_WITHDRAWALS = gql`
  query GetBusinessesForWithdrawals($input: FilterInput!) {
    getBusinesses(input: $input) {
      id
      name
      ownerId
      ownerType
    }
  }
`;

export const GET_COMPANIES_FOR_WITHDRAWALS = gql`
  query GetCompaniesForWithdrawals($input: GetCompaniesInput) {
    getCompanies(input: $input) {
      id
      name
    }
  }
`;

// "Transaction history" on this page only ever shows the user's own
// withdrawals — getPoolTransactions has a transactionType but no on-chain
// hash, while getTransactions has the real hash (usable as TXID) but no
// type, so filtering by `from: wallet` is what isolates outgoing/burn
// transfers here.
export const GET_WITHDRAWAL_TRANSACTIONS = gql`
  query GetWithdrawalTransactions($input: GetTransactionsInput!) {
    getTransactions(input: $input) {
      id
      from
      to
      poolAddress
      transactionHash
      amount
      createdAt
    }
  }
`;
