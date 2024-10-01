import axios from 'axios'
import { useAppStore } from '~/store/appStore'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getToken = async (username, password) => {
  try {
    const response = (await apiClient.post('/auth/token', { username, password })).data
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

export const logout = async () => {
  try {
    const token = useAppStore.getState().token
    if (!token) {
      throw new Error('No token found in store')
    }

    const response = (await apiClient.post('/auth/logout', { token })).data
    if (response.code === 1000) {
      useAppStore.getState().setToken('')
      console.log('Logged out successfully')
    } else {
      throw new Error('Failed to log out')
    }
    return response
  } catch (error) {
    console.error('Error logging out:', error.response ? error.response.data : error.message)
    throw error
  }
}

export const register = async (username, password, email) => {
  try {
    const response = (await apiClient.post('/users', { username, password, email })).data
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

export const confirmAccount = async (token) => {
  try {
    const response = (await apiClient.post('/verification/account-registration', { token })).data
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