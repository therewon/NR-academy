import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { login as loginRequest, revokeToken } from '../api/endpoints/auth.api';
import {
  AUTH_STATE_CHANGED_EVENT,
  clearAuthTokens,
  getRefreshToken,
  hasStoredSession,
  setAuthTokens,
} from '../api/authTokens';
import type { LoginPayload } from '../types/auth.types';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(hasStoredSession);

  useEffect(() => {
    const syncAuthState = () => setIsAuthenticated(hasStoredSession());
    window.addEventListener('storage', syncAuthState);
    window.addEventListener(AUTH_STATE_CHANGED_EVENT, syncAuthState);
    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener(AUTH_STATE_CHANGED_EVENT, syncAuthState);
    };
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const tokens = await loginRequest(payload);
    setAuthTokens(tokens);
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken();
    try {
      if (refreshToken) await revokeToken({ refreshToken });
    } finally {
      clearAuthTokens();
    }
  }, []);

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
