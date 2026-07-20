import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const isMockMode = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('nr_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API error]', error?.response?.status, error?.config?.url);
    return Promise.reject(error);
  }
);
