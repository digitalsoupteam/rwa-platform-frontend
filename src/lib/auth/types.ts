// Authentication types based on the documentation

// User type
export interface User {
  userId: string;
  wallet: string;
  createdAt: number;
  updatedAt: number;
}

// Auth tokens type
export interface AuthTokens {
  userId: string;
  wallet: string;
  accessToken: string;
  refreshToken: string;
}

// Refresh token type
export interface RefreshToken {
  tokenId: string;
  userId: string;
  tokenHash: string;
  expiresAt: number;
  createdAt: number;
  updatedAt: number;
}

// Authentication input type
export interface AuthenticateInput {
  wallet: string;
  signature: string;
  timestamp: number;
}

// Refresh token input type
export interface RefreshTokenInput {
  refreshToken: string;
}

// Revoke tokens input type
export interface RevokeTokensInput {
  tokenHashes: string[];
}

// Revoke tokens result type
export interface RevokeTokensResult {
  revokedCount: number;
}

// EIP-712 typed data for authentication
export interface EIP712TypedData {
  types: {
    Message: Array<{ name: string; type: string }>;
  };
  primaryType: string;
  domain: {
    name: string;
    version: string;
  };
  message: {
    wallet: string;
    timestamp: number;
    message: string;
  };
}
