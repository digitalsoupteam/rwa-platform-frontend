import { apolloClient } from '../apollo/client';
import { AUTHENTICATE, REFRESH_TOKEN, REVOKE_TOKENS } from './operations';
import { AuthenticateInput, AuthTokens, EIP712TypedData, RefreshTokenInput, RevokeTokensInput } from './types';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_ID_KEY = 'userId';
const WALLET_KEY = 'wallet';

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
    try {
      const { data, error } = await apolloClient.mutate({
        mutation: AUTHENTICATE,
        variables: { input },
      });
      console.log(data, error);

      const tokens = data.authenticate;
      this.saveTokens(tokens);
      return tokens;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  },

  async refreshTokens(): Promise<AuthTokens | null> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      return null;
    }

    try {
      const input: RefreshTokenInput = { refreshToken };
      const { data } = await apolloClient.mutate({
        mutation: REFRESH_TOKEN,
        variables: { input },
      });

      const tokens = data.refreshToken;
      this.saveTokens(tokens);
      return tokens;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearTokens();
      return null;
    }
  },

  async revokeTokens(tokenHashes: string[]): Promise<number> {
    try {
      const input: RevokeTokensInput = { tokenHashes };
      const { data } = await apolloClient.mutate({
        mutation: REVOKE_TOKENS,
        variables: { input },
      });

      return data.revokeTokens.revokedCount;
    } catch (error) {
      console.error('Token revocation error:', error);
      throw error;
    }
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
