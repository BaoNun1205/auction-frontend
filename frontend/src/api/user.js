import apiClient from './config/apiClient'

export const getUsers = async () => {
  try {
    const response = (await apiClient.get('/users'))
    return response.data
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

export const getUser = async (username) => {
  try {
    const response = (await apiClient.get(`/users/${username}`))
    return response.data
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