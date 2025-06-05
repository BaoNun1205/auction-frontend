import axios from 'axios';
import { useAppStore } from '~/store/appStore';

const apiClient = axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: 'https://auctionsession-e9b7beg0gvf2dhax.southeastasia-01.azurewebsites.net/auth/token',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Danh sách các endpoint công khai
const PUBLIC_ENDPOINTS = [
  { url: '/users', method: 'post' },
  { url: '/auth/token', method: 'post' },
  { url: '/auth/introspect', method: 'post' },
  { url: '/auth/logout', method: 'post' },
  { url: '/auth/refresh', method: 'post' },
  { url: '/verification/account-registration', method: 'post' },
  { url: '/confirm-account', method: 'post' },
];

// Hàm kiểm tra xem request có nằm trong public endpoints hay không
const isPublicEndpoint = (url, method) => {
  if (!url || !method) return false;

  // Normalize url để so sánh (có thể có query string)
  const normalizedUrl = url.split('?')[0].toLowerCase();
  const normalizedMethod = method.toLowerCase();

  return PUBLIC_ENDPOINTS.some(
    (endpoint) =>
      normalizedUrl.endsWith(endpoint.url.toLowerCase()) &&
      normalizedMethod === endpoint.method.toLowerCase()
  );
};

// Thêm interceptor để gắn token nếu không phải endpoint công khai
const addAuthInterceptor = (client) => {
  client.interceptors.request.use(
    (config) => {
      const token = useAppStore.getState().auth.token;
      console.log('Token:', token);

      if (token && !isPublicEndpoint(config.url, config.method)) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};

addAuthInterceptor(apiClient);

export default apiClient;
