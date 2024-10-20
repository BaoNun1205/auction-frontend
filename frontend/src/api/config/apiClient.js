import axios from 'axios'
import { useAppStore } from '~/store/appStore'

const getToken = () => useAppStore.getState().token

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Hàm để thêm interceptor
const addAuthInterceptor = (client) => {
  client.interceptors.request.use((config) => {
    const token = getToken()
    if (token && !config.url.includes('/auth/token')) {
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