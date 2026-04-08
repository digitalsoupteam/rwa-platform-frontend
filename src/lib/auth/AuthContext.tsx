'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useAccount, useDisconnect, useConnections, useWalletClient } from 'wagmi';
import { signTypedData } from 'viem/actions';
import { authService } from './authService';
import { refreshAccessToken } from '../apollo/client';
import { AuthTokens, User } from '@/gql/graphql';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/Toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
  refreshTokens: () => Promise<AuthTokens | null>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {},
  logout: () => {},
  refreshTokens: async () => null,
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
      router.push('/dashboard/');
    } catch (error) {
      toast('Sign in failed. Please try again.', 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, walletClient, chainId, isConnected, connections]);

  useEffect(() => {
    const checkAuth = async () => {
      if (!address) return;

      const isAuth = authService.isAuthenticated();

      if (isAuth) {
        setIsAuthenticated(true);
        const userId = authService.getUserId();
        const wallet = authService.getWallet();
        if (userId && wallet) {
          setUser({ userId, wallet, createdAt: 0, updatedAt: 0 });
        }
        setIsLoading(false);
        return;
      }

      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (storedRefreshToken) {
        try {
          const success = await refreshAccessToken();
          if (success) {
            setIsAuthenticated(true);
            setUser({
              userId: localStorage.getItem('userId') ?? '',
              wallet: localStorage.getItem('wallet') ?? '',
              createdAt: 0,
              updatedAt: 0,
            });
            setIsLoading(false);
            return;
          }
        } catch {
          // refresh failed, fall through to login
        }
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

  const logout = () => {
    authService.logout();
    disconnect();
    setIsAuthenticated(false);
    setUser(null);
    toast('Signed out successfully.');
    router.push('/');
  };

  const refreshTokens = async () => {
    try {
      if (!address) return null;

      setIsLoading(true);
      const tokens = await authService.refreshTokens();

      if (tokens) {
        setIsAuthenticated(true);
        setUser({
          userId: tokens.userId,
          wallet: tokens.wallet,
          createdAt: 0,
          updatedAt: 0,
        });
        return tokens;
      } else {
        setIsAuthenticated(false);
        setUser(null);
        return null;
      }
    } catch (error) {
      toast('Session expired. Please sign in again.', 'error');
      setIsAuthenticated(false);
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    refreshTokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
