import { gql } from '@apollo/client';

export const GET_UNLOCK_TIME = gql`
  query GetUnlockTime {
    getUnlockTime {
      gasUnlockTime
      holdUnlockTime
      platformUnlockTime
    }
  }
`;

export const REQUEST_GAS = gql`
  mutation RequestGas($input: RequestTokenInput!) {
    requestGas(input: $input) {
      id
      tokenType
      amount
      transactionHash
    }
  }
`;

export const REQUEST_HOLD = gql`
  mutation RequestHold($input: RequestTokenInput!) {
    requestHold(input: $input) {
      id
      tokenType
      amount
      transactionHash
    }
  }
`;

export const REQUEST_PLATFORM = gql`
  mutation RequestPlatform($input: RequestTokenInput!) {
    requestPlatform(input: $input) {
      id
      tokenType
      amount
      transactionHash
    }
  }
`;