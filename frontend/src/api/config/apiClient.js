import axios from 'axios';
import { useAppStore } from '~/store/appStore';

const auth = useAppStore.getState().auth;

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

const PUBLIC_ENDPOINTS = [
  { url: '/users', method: 'post' },
  { url: '/auth/token', method: 'post' },
  { url: '/auth/introspect', method: 'post' },
  { url: '/auth/logout', method: 'post' },
  { url: '/auth/refresh', method: 'post' },
  { url: '/verification/account-registration', method: 'post' },
  { url: '/confirm-account', method: 'post' },
];

// Hàm để kiểm tra xem URL và method có phải là public endpoint hay không
const isPublicEndpoint = (url, method) => {
  return PUBLIC_ENDPOINTS.some(
    (endpoint) => url.includes(endpoint.url) && endpoint.method === method.toLowerCase()
  );
};

// Hàm để thêm interceptor
const addAuthInterceptor = (client) => {
  client.interceptors.request.use(
    (config) => {
      const token = auth.token;

      if (token && !isPublicEndpoint(config.url, config.method)) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Thêm interceptor vào apiClient
addAuthInterceptor(apiClient);

export default apiClient;