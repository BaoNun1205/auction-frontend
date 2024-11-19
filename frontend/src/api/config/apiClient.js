import axios from 'axios'
import { useAppStore } from '~/store/appStore'

const auth = useAppStore.getState().auth

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

const PUBLIC_ENDPOINTS = [
  '/users', 
  '/auth/token', 
  '/auth/introspect', 
  '/auth/logout', 
  '/auth/refresh', 
  '/verification/account-registration',
  '/confirm-account'
];

// Hàm để kiểm tra xem URL có phải là public endpoint hay không
const isPublicEndpoint = (url) => {
  return PUBLIC_ENDPOINTS.some(endpoint => url.includes(endpoint));
};

// Hàm để thêm interceptor
const addAuthInterceptor = (client) => {
  client.interceptors.request.use((config) => {
    const token = auth.token
    
    if (token && !isPublicEndpoint(config.url)) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })
}

// Thêm interceptor vào apiClient
addAuthInterceptor(apiClient)

export default apiClient