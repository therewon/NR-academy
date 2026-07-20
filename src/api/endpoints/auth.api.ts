import { apiClient } from '../client';
import type { AuthResponse, LoginPayload, RegisterPayload } from '../../types/auth.types';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/Auth/login', payload);
  return data;
}

export async function register(payload: RegisterPayload): Promise<void> {
  await apiClient.post('/Auth/Register', payload);
}

export async function forgotPassword(email: string): Promise<void> {
  await apiClient.post('/Auth/forgot-password', { email });
}

export async function verifyEmail(email: string, code: string): Promise<void> {
  await apiClient.post('/Auth/verify-email', { email, code });
}
