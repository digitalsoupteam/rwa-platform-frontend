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