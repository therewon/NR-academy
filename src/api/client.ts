import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { clearAuthTokens, getAccessToken, getRefreshToken, setAuthTokens } from './authTokens';
import type { AuthResponse } from '../types/auth.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5287/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const isMockMode = import.meta.env.VITE_USE_MOCK_DATA === 'true';

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshRequest: Promise<AuthResponse> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const refreshToken = getRefreshToken();
    const isAuthRequest = originalRequest?.url?.includes('/Auth/') ?? false;

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry || !refreshToken || isAuthRequest) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshRequest ??= axios
        .post<AuthResponse>(`${API_BASE_URL}/Auth/refresh-token`, { refreshToken })
        .then(({ data }) => {
          setAuthTokens(data);
          return data;
        })
        .finally(() => {
          refreshRequest = null;
        });

      const tokens = await refreshRequest;
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      clearAuthTokens();
      return Promise.reject(refreshError);
    }
  }
);
