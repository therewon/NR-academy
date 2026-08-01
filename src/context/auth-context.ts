import { createContext } from 'react';
import type { LoginPayload } from '../types/auth.types';

export interface AuthContextValue {
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
