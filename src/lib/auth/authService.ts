import { apolloClient } from '../apollo/client';
import { AUTHENTICATE, REVOKE_TOKENS } from './operations';
import {
  AuthenticateInput,
  AuthenticateMutation,
  AuthTokens,
  RevokeTokensInput,
  RevokeTokensMutation,
} from '@/gql/graphql';
import { saveTokens } from './tokenManager';

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
    saveTokens(tokens);
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
};
