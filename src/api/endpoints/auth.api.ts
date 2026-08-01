import { apiClient } from '../client';
import type {
  AuthResponse,
  LoginPayload,
  RefreshTokenPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
  VerifyResetCodePayload,
} from '../../types/auth.types';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/Auth/login', payload);
  return data;
}

export async function register(payload: RegisterPayload): Promise<void> {
  const formData = new FormData();
  formData.append('FirstName', payload.firstName);
  formData.append('LastName', payload.lastName);
  formData.append('Email', payload.email);
  formData.append('PhoneNumber', payload.phoneNumber);
  formData.append('Password', payload.password);
  formData.append('ConfirmPassword', payload.confirmPassword);
  formData.append('Role', String(payload.role));

  await apiClient.post('/Auth/Register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export async function forgotPassword(email: string): Promise<void> {
  await apiClient.post('/Auth/forgot-password', { email });
}

export async function verifyEmail(email: string, code: string): Promise<void> {
  const payload: VerifyEmailPayload = { email, code };
  await apiClient.post('/Auth/verify-email', payload);
}

export async function verifyResetCode(payload: VerifyResetCodePayload): Promise<void> {
  await apiClient.post('/Auth/verify-reset-code', payload);
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<void> {
  await apiClient.post('/Auth/reset-password', payload);
}

export async function revokeToken(payload: RefreshTokenPayload): Promise<void> {
  await apiClient.post('/Auth/revoke-token', payload);
}
