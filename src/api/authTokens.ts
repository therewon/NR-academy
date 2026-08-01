import type { AuthResponse } from '../types/auth.types';

const ACCESS_TOKEN_KEY = 'nr_token';
const REFRESH_TOKEN_KEY = 'nr_refresh';

export const AUTH_STATE_CHANGED_EVENT = 'nr-auth-state-changed';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setAuthTokens(tokens: AuthResponse) {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  window.dispatchEvent(new Event(AUTH_STATE_CHANGED_EVENT));
}

export function clearAuthTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_STATE_CHANGED_EVENT));
}

export function hasStoredSession() {
  return Boolean(getAccessToken() || getRefreshToken());
}
