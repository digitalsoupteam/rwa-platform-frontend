import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, CombinedGraphQLErrors } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { GRAPHQL_ENDPOINT } from '../config';
import { clearSession, getAccessToken } from '../auth/tokenManager';

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

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });

const authLink = new SetContextLink(async (prevContext) => {
  const accessToken = await getAccessToken();
  return {
    headers: {
      ...prevContext['headers'],
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const errorLink = new ErrorLink(({ error }) => {
  if (
    CombinedGraphQLErrors.is(error) &&
    error.errors.some((e) => e.message === 'Authentication required')
  ) {
    clearSession();
  }
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
