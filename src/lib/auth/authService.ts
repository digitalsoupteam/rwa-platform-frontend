import { apolloClient } from '../apollo/client';
import { AUTHENTICATE, REFRESH_TOKEN, REVOKE_TOKENS } from './operations';
import {
  AuthenticateInput,
  AuthenticateMutation,
  AuthTokens,
  RefreshTokenMutation,
  RevokeTokensInput,
  RevokeTokensMutation,
} from '@/gql/graphql';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_ID_KEY = 'userId';
const WALLET_KEY = 'wallet';

interface EIP712TypedData {
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

export const authService = {
  createTypedData(wallet: string): EIP712TypedData {
    const timestamp = Math.floor(Date.now() / 1000);

    return {
      types: {
        Message: [
          { name: 'wallet', type: 'address' },
          { name: 'timestamp', type: 'uint256' },
          { name: 'message', type: 'string' },
        ],
      },
      primaryType: 'Message',
      domain: {
        name: 'RWA Platform',
        version: '1',
      },
      message: {
        wallet,
        timestamp,
        message:
          'Welcome to RWA Platform!\n\nWe prioritize the security of your assets and personal data. To ensure secure access to your account, we kindly request you to verify ownership of your wallet by signing this message.',
      },
    };
  },

  async authenticate(input: AuthenticateInput): Promise<AuthTokens> {
    const { data, error } = await apolloClient.mutate<AuthenticateMutation>({
      mutation: AUTHENTICATE,
      variables: { input },
    });

    if (error) throw new Error(`Authentication error: ${error.message}`);

    if (!data?.authenticate) {
      throw new Error('Authentication failed: no tokens returned');
    }

    const tokens: AuthTokens = data.authenticate;
    this.saveTokens(tokens);
    return tokens;
  },

  async refreshTokens(): Promise<AuthTokens | null> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) return null;

    const { data, error } = await apolloClient.mutate<RefreshTokenMutation>({
      mutation: REFRESH_TOKEN,
      variables: { refreshToken },
    });

    if (error) {
      this.clearTokens();
      throw new Error(`Token refresh error: ${error.message}`);
    }

    if (!data?.refreshToken) throw new Error('Refresh failed: no tokens returned');

    const tokens = data?.refreshToken;
    this.saveTokens(tokens);
    return tokens;
  },

  async revokeTokens(tokenHashes: RevokeTokensInput): Promise<number> {
    const { data, error } = await apolloClient.mutate<RevokeTokensMutation>({
      mutation: REVOKE_TOKENS,
      variables: { tokenHashes },
    });

    if (error) throw new Error(`Token revocation error: ${error.message}`);
    if (!data?.revokeTokens) throw new Error('Token revocation failed');

    return data?.revokeTokens?.revokedCount || 0;
  },

  logout(): void {
    this.clearTokens();
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getWallet(): string | null {
    return localStorage.getItem(WALLET_KEY);
  },

  getUserId(): string | null {
    return localStorage.getItem(USER_ID_KEY);
  },

  saveTokens(tokens: AuthTokens): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    localStorage.setItem(USER_ID_KEY, tokens.userId);
    localStorage.setItem(WALLET_KEY, tokens.wallet);
  },

  clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(WALLET_KEY);
  },
};
