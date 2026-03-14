import { gql } from '@apollo/client';

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