import { gql } from '@apollo/client';

// Authentication mutation
export const AUTHENTICATE = gql`
  mutation Authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      userId
      wallet
      accessToken
      refreshToken
    }
  }
`;

// Refresh token mutation
export const REFRESH_TOKEN = gql`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      userId
      wallet
      accessToken
      refreshToken
    }
  }
`;

// Revoke tokens mutation
export const REVOKE_TOKENS = gql`
  mutation RevokeTokens($input: RevokeTokensInput!) {
    revokeTokens(input: $input) {
      revokedCount
    }
  }
`;

// Get user tokens query
export const GET_USER_TOKENS = gql`
  query GetUserTokens {
    getUserTokens {
      tokenId
      userId
      tokenHash
      expiresAt
      createdAt
      updatedAt
    }
  }
`;
