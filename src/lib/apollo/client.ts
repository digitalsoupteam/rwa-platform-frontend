import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, CombinedGraphQLErrors } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { Observable } from 'rxjs';

declare module '@apollo/client' {
  namespace ApolloClient {
    namespace DeclareDefaultOptions {
      interface WatchQuery {
        errorPolicy?: 'all';
        fetchPolicy?: 'network-only';
      }
      interface Query {
        errorPolicy?: 'all';
        fetchPolicy?: 'network-only';
      }
      interface Mutate {
        errorPolicy?: 'all';
      }
    }
  }
}

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:443/gateway/graphql';

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });

const authLink = new SetContextLink((prevContext) => {
  let accessToken: string | null = null;
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken');
  }
  return {
    headers: {
      ...prevContext['headers'],
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

const resolvePendingRequests = () => {
  pendingRequests.forEach((cb) => cb());
  pendingRequests = [];
};

export async function refreshAccessToken(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return false;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation RefreshToken($input: RefreshTokenInput!) {
        refreshToken(input: $input) {
          accessToken refreshToken userId wallet
        }
      }`,
      variables: { input: { refreshToken } },
    }),
  });

  const json = await response.json();
  const tokens = json?.data?.refreshToken;
  if (!tokens?.accessToken) return false;

  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
  localStorage.setItem('userId', tokens.userId);
  localStorage.setItem('wallet', tokens.wallet);
  return true;
}

export const AUTH_SESSION_EXPIRED_EVENT = 'auth:session-expired';

function clearTokensAndRedirect() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('wallet');
  window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED_EVENT));
}

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (!CombinedGraphQLErrors.is(error)) return;

  const isUnauthenticated = error.errors.some(
    (e) =>
      e.extensions?.['code'] === 'UNAUTHENTICATED' ||
      e.message?.toLowerCase().includes('unauthenticated') ||
      e.message?.toLowerCase().includes('unauthorized') ||
      e.message?.toLowerCase().includes('authentication required')
  );

  if (!isUnauthenticated) return;
  if (operation.operationName === 'RefreshToken') return;

  return new Observable((observer) => {
    if (isRefreshing) {
      pendingRequests.push(() => {
        forward(operation).subscribe(observer);
      });
      return;
    }

    isRefreshing = true;

    refreshAccessToken()
      .then((success) => {
        if (success) {
          resolvePendingRequests();
          forward(operation).subscribe(observer);
        } else {
          pendingRequests = [];
          clearTokensAndRedirect();
          observer.complete();
        }
      })
      .catch(() => {
        pendingRequests = [];
        clearTokensAndRedirect();
        observer.complete();
      })
      .finally(() => {
        isRefreshing = false;
      });
  });
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
