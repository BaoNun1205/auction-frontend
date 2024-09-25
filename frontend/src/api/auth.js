import axios from 'axios'

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
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found in localStorage')
    }

    const response = (await apiClient.post('auth/logout', { token })).data
    if (response.code === 1000) {
      localStorage.removeItem('token')
      console.log('Logged out successfully')
    } else {
      throw new Error('Failed to log out')
    }
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