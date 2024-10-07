import { apiClient } from './apiClient'

export const TYPE_PATH = '/type'

export const getType = async () => {
  try {
    const response = (await apiClient.get(TYPE_PATH)).data
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

export const filterTypes = async (payload) => {
  try {
    const params = new URLSearchParams(payload).toString()
    const response = (await apiClient.get(`${TYPE_PATH}/filter?${params}`)).data
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

export const createType = async (payload) => {
  try {
    const response = (await apiClient.post('/type', payload, {
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

export const deleteType = async (typeId) => {
  try {
    const response = (await apiClient.delete(`/type/${typeId}`)).data
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

export const restoreType = async (typeId) => {
  try {
    const response = (await apiClient.put(`/type/restore/${typeId}`)).data
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