import { gql } from '@apollo/client';

export const GET_POOL_DETAIL = gql`
  query GetPoolDetail($input: FilterInput!) {
    getPools(input: $input) {
      id
      name
      businessId
      description
      poolAddress
      rwaAddress
      expectedHoldAmount
      expectedRwaAmount
      rewardPercent
      entryFeePercent
      exitFeePercent
      entryPeriodStart
      entryPeriodExpired
      completionPeriodExpired
      fixedSell
      paused
      tags
      image
      chainId
      createdAt
      realHoldReserve
      virtualHoldReserve
      virtualRwaReserve
      incomingTranches {
        amount
        expiredAt
        returnedAmount
      }
    }
  }
`;

export const GET_POOLS = gql`
  query GetPools($input: FilterInput!) {
    getPools(input: $input) {
      id
      name
      businessId
      description
      poolAddress
      expectedHoldAmount
      rewardPercent
      entryPeriodStart
      entryPeriodExpired
      completionPeriodExpired
      paused
      chainId
      createdAt
      image
    }
  }
`;

export const CREATE_POOL = gql`
  mutation CreatePool($input: CreatePoolInput!) {
    createPool(input: $input) {
      id
      rwaAddress
      chainId
      ownerId
      ownerType
      entryFeePercent
      exitFeePercent
      expectedHoldAmount
      expectedRwaAmount
      rewardPercent
      priceImpactPercent
      entryPeriodStart
      entryPeriodExpired
      completionPeriodExpired
      fixedSell
      allowEntryBurn
      awaitCompletionExpired
      floatingOutTranchesTimestamps
      outgoingTranches {
        amount
        timestamp
        executedAmount
      }
      incomingTranches {
        amount
        expiredAt
        returnedAmount
      }
    }
  }
`;

export const REQUEST_POOL_APPROVAL_SIGNATURES = gql`
  mutation RequestPoolApprovalSignatures($input: RequestPoolApprovalSignaturesInput!) {
    requestPoolApprovalSignatures(input: $input) {
      taskId
    }
  }
`;

export const GET_RAW_PRICE_DATA = gql`
  query GetRawPriceData($input: GetRawPriceDataInput!) {
    getRawPriceData(input: $input) {
      timestamp
      price
    }
  }
`;

export const EDIT_POOL = gql`
  mutation EditPool($input: EditPoolInput!) {
    editPool(input: $input) {
      id
      name
      description
      tags
      image
    }
  }
`;

export const GET_LATEST_PRICE = gql`
  query GetLatestPrice($input: GetRawPriceDataInput!) {
    getRawPriceData(input: $input) {
      price
    }
  }
`;

export const GET_OHLC_PRICE_DATA = gql`
  query GetOhlcPriceData($input: GetOhlcPriceDataInput!) {
    getOhlcPriceData(input: $input) {
      timestamp
      open
      high
      low
      close
    }
  }
`;

export const GET_SIGNATURE_TASK = gql`
  query GetSignatureTask($input: GetSignatureTaskInput!) {
    getSignatureTask(input: $input) {
      id
      completed
      expired
      signatures {
        signer
        signature
      }
    }
  }
`;