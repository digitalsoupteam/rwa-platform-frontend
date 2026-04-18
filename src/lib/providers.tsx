'use client';

import { ReactNode } from 'react';
import { ApolloProvider } from './apollo/ApolloProvider';
import { AuthProvider } from './auth/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { bscTestnet } from 'wagmi/chains';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: ReactNode;
}

export const wagmiConfig = getDefaultConfig({
  appName: 'RWA Platform',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  ssr: true,
  chains: [bscTestnet],
});

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <ApolloProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <AuthProvider>{children}</AuthProvider>
            <Toaster position='top-right' visibleToasts={5} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ApolloProvider>
  );
}
