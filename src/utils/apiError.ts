import axios from 'axios';

interface ApiErrorBody {
  message?: string;
  title?: string;
  errors?: Record<string, string[]>;
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError<ApiErrorBody | string>(error)) {
    return error instanceof Error && error.message ? error.message : fallback;
  }

  const data = error.response?.data;
  if (typeof data === 'string' && data.trim()) return data;
  const errorBody = typeof data === 'object' && data !== null ? data : undefined;
  if (errorBody?.message) return errorBody.message;

  const firstValidationMessage = errorBody?.errors
    ? Object.values(errorBody.errors).flat().find(Boolean)
    : undefined;

  return firstValidationMessage || errorBody?.title || (error.code === 'ERR_NETWORK' ? 'Backend ilə əlaqə qurmaq mümkün olmadı.' : fallback);
}
