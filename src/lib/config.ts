export const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:443/gateway/graphql';

export const SSE_ENDPOINT = GRAPHQL_ENDPOINT + '/stream';

export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:443';
