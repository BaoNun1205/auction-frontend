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

export const getUsers = async () => {
  try {
    const response = (await apiClient.get('/users')).data
    return response.result
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const getUser = async (username) => {
  try {
    const response = (await apiClient.get(`/users/${username}`)).data
    return response
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}