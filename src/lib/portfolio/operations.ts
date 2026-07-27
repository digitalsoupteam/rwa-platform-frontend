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
      rwaAddress
      businessId
      tags
      riskScore
      rewardPercent
      fixedSell
      expectedHoldAmount
      expectedRwaAmount
      awaitingRwaAmount
      realHoldReserve
      virtualHoldReserve
      virtualRwaReserve
      exitFeePercent
      isTargetReached
      isFullyReturned
      entryPeriodExpired
      completionPeriodExpired
      incomingTranches {
        amount
        expiredAt
        returnedAmount
      }
      lastCompletedIncomingTranche
      image
    }
  }
`;

export const GET_BUSINESSES_FOR_PORTFOLIO = gql`
  query GetBusinessesForPortfolio($input: FilterInput!) {
    getBusinesses(input: $input) {
      id
      name
      ownerId
      ownerType
      tags
      businessType
      country
      description
    }
  }
`;

export const GET_COMPANIES_FOR_PORTFOLIO = gql`
  query GetCompaniesForPortfolio($input: GetCompaniesInput) {
    getCompanies(input: $input) {
      id
      name
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
