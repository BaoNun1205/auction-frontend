import axios from 'axios';
import { useAppStore } from '~/store/appStore';

const getToken = () => useAppStore.getState().token;

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Hàm để thêm interceptor
const addAuthInterceptor = (client) => {
  client.interceptors.request.use(
    (config) => {
      const token = getToken();
      // Kiểm tra nếu URL không phải là /auth/token thì thêm token vào header
      if (token && !config.url.includes('/auth/token')) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = getToken();
        if (token) {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            try {
              const newToken = await refreshToken();
              useAppStore.getState().setToken(newToken);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return client(originalRequest);
            } catch (refreshError) {
              return Promise.reject(refreshError);
            }
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

// Thêm interceptor vào apiClient
addAuthInterceptor(apiClient);

export default apiClient;