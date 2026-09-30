import { AuthTokens } from '@/gql/graphql';
import { GRAPHQL_ENDPOINT } from '../config';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_ID_KEY = 'userId';
const WALLET_KEY = 'wallet';

// Refresh the access token when it expires within this window (same ±60s window
// the backend uses for the login timestamp check)
const SKEW_SEC = 60;

export const AUTH_SESSION_EXPIRED_EVENT = 'auth:session-expired';

let inflight: Promise<boolean> | null = null;
let sessionExpiredNotified = false;

const decodeExp = (jwt: string): number => {
  try {
    const payload = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload)).exp ?? 0;
  } catch {
    return 0;
  }
};

const isFresh = (jwt: string): boolean => decodeExp(jwt) - Date.now() / 1000 > SKEW_SEC;

export function saveTokens(tokens: AuthTokens): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  localStorage.setItem(USER_ID_KEY, tokens.userId);
  localStorage.setItem(WALLET_KEY, tokens.wallet);
  sessionExpiredNotified = false;
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(WALLET_KEY);
}

export function clearSession(): void {
  clearTokens();
  if (sessionExpiredNotified) return;
  sessionExpiredNotified = true;
  window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED_EVENT));
}

export function currentUser(): { userId: string; wallet: string } | null {
  const userId = localStorage.getItem(USER_ID_KEY);
  const wallet = localStorage.getItem(WALLET_KEY);
  return userId && wallet ? { userId, wallet } : null;
}

async function performRefresh(): Promise<boolean> {
  // Another tab may have refreshed while this one was waiting for the lock
  const current = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (current && isFresh(current)) return true;

  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken || decodeExp(refreshToken) < Date.now() / 1000) return false;

  let tokens: AuthTokens | undefined;
  try {
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
    tokens = json?.data?.refreshToken;
  } catch {
    return false; // network error — keep the session and retry on the next request
  }

  if (!tokens?.accessToken) {
    // Refresh token was rejected for good — drop it so we don't retry on every request
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    return false;
  }

  saveTokens(tokens);
  return true;
}

function refresh(): Promise<boolean> {
  if (!inflight) {
    // LockManager typings (TS 5.9) do not model async callbacks: unwrap the promise we return
    inflight = navigator.locks
      .request('auth-refresh', () => performRefresh())
      .then((result) => result)
      .finally(() => {
        inflight = null;
      });
  }

  return inflight;
}

// The single entry point for all authenticated requests
export async function getAccessToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return null;
  if (isFresh(token)) return token;

  await refresh();
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}
