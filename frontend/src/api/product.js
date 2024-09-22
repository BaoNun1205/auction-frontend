import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('token')
}

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
})

export const getProducts = async () => {
  try {
    const response = (await apiClient.get('/asset'))
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