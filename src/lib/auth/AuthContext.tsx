'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useAccount, useDisconnect, useConnections, useWalletClient } from 'wagmi';
import { signTypedData } from 'viem/actions';
import { authService } from './authService';
import { AUTH_SESSION_EXPIRED_EVENT, clearTokens, currentUser, getAccessToken } from './tokenManager';
import { User } from '@/gql/graphql';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/Toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: walletClient } = useWalletClient();
  const connections = useConnections();
  const router = useRouter();

  const login = useCallback(async () => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    if (!walletClient) {
      throw new Error('Wallet client not available');
    }

    try {
      setIsLoading(true);

      const typedData = authService.createTypedData(address);
      const signature = await signTypedData(walletClient, {
        domain: typedData.domain as any,
        types: typedData.types as any,
        primaryType: typedData.primaryType,
        message: typedData.message,
      });

      const tokens = await authService.authenticate({
        wallet: address,
        signature,
        timestamp: typedData.message.timestamp,
      });

      setIsAuthenticated(true);
      setUser({
        userId: tokens.userId,
        wallet: tokens.wallet,
        createdAt: 0, // We don't have this info from the tokens
        updatedAt: 0, // We don't have this info from the tokens
      });

      toast('Signed in successfully!');
      router.push('/portfolio/');
    } catch (error) {
      toast('Sign in failed. Please try again.', 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, walletClient, chainId, isConnected, connections]);

  useEffect(() => {
    const checkAuth = async () => {
      if (!address) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Returns a valid access token, refreshing it beforehand if it is expiring
      const token = await getAccessToken();

      if (token) {
        setIsAuthenticated(true);
        const identity = currentUser();
        setUser(
          identity
            ? { userId: identity.userId, wallet: identity.wallet, createdAt: 0, updatedAt: 0 }
            : null
        );
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);

      if (walletClient) {
        login();
      }
    };

    checkAuth();
  }, [address, walletClient, login]);

  useEffect(() => {
    const handleSessionExpired = () => {
      setIsAuthenticated(false);
      setUser(null);
      toast('Session expired. Please sign in again.', 'error');
      router.push('/');
    };

    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
  }, [router]);

  const logout = () => {
    clearTokens();
    disconnect();
    setIsAuthenticated(false);
    setUser(null);
    toast('Signed out successfully.');
    router.push('/');
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
