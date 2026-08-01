export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: number;
}

export interface VerifyEmailPayload {
  email: string;
  code: string;
}

export type VerifyResetCodePayload = VerifyEmailPayload;

export interface ResetPasswordPayload extends VerifyEmailPayload {
  newPassword: string;
}
