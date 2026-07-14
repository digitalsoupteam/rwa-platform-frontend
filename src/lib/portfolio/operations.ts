import { gql } from '@apollo/client';

export const GET_BALANCES = gql`
  query GetPortfolioBalances($input: GetBalancesInput!) {
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

export const GET_POOLS_FOR_PORTFOLIO = gql`
  query GetPoolsForPortfolio($input: FilterInput!) {
    getPools(input: $input) {
      id
      name
      poolAddress
      tags
      riskScore
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
      image
    }
  }
`;

export const GET_POOL_TRANSACTIONS_FOR_PORTFOLIO = gql`
  query GetPoolTransactionsForPortfolio($input: GetPoolTransactionsInput!) {
    getPoolTransactions(input: $input) {
      id
      userAddress
      poolAddress
      transactionType
      holdAmount
      rwaAmount
      bonusAmount
      createdAt
    }
  }
`;
