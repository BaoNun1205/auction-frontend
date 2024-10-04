import { apiClient } from './apiClient'

export const CATEGORY_PATH = '/category'

export const getCategory = async () => {
  try {
    const response = (await apiClient.get(CATEGORY_PATH)).data
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
    const response = (await apiClient.post(`${CATEGORY_PATH}/filter`, payload)).data
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
    const response = (await apiClient.post(CATEGORY_PATH, payload, {
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
    const response = (await apiClient.delete(`${CATEGORY_PATH}/${categoryId}`)).data
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
    const response = (await apiClient.put(`${CATEGORY_PATH}/restore/${categoryId}`)).data
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