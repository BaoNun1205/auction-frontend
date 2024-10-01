import axios from 'axios'
import { useAppStore } from '~/store/appStore'

const getToken = () => useAppStore.getState().token

const apiClient = axios.create({
  baseURL: '/api/category',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor để thêm token vào header của mỗi yêu cầu
apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export const getCategory = async () => {
  try {
    const response = (await apiClient.get()).data
    return response.result
  } catch (error) {
    if (error.response) {
      console.error('API Error Response:', error.response.data)
      return error.response.data
    } else {
      console.error('Error:', error)
      throw error
    }
  }
}

export const filterCategories = async (payload) => {
  try {
    const response = (await apiClient.post('/filter', payload)).data
    return response.result
  } catch (error) {
    if (error.response) {
      console.error('API Error Response:', error.response.data)
      return error.response.data
    } else {
      console.error('Error:', error)
      throw error
    }
  }
}

export const createCategory = async (payload) => {
  try {
    const response = (await apiClient.post('', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })).data
    return response
  } catch (error) {
    if (error.response) {
      console.error('API Error Response:', error.response.data)
      return error.response.data
    } else {
      console.error('Error:', error)
      throw error
    }
  }
}

export const deleteCategory = async (categoryId) => {
  try {
    const response = (await apiClient.delete(`/${categoryId}`)).data
    return response
  } catch (error) {
    if (error.response) {
      console.error('API Error Response:', error.response.data)
      return error.response.data
    } else {
      console.error('Error:', error)
      throw error
    }
  }
}

export const restoreCategory = async (categoryId) => {
  try {
    const response = (await apiClient.put(`/restore/${categoryId}`)).data
    return response
  } catch (error) {
    if (error.response) {
      console.error('API Error Response:', error.response.data)
      return error.response.data
    } else {
      console.error('Error:', error)
      throw error
    }
  }
}