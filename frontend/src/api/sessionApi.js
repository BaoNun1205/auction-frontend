import { GET, POST, PUT } from './config/axiosMethods'
import handleApiError from './config/handldeApiError'

export const SESSION_PATH = '/session'

export const createSesion = async (payload) => {
  try {
    const response = await POST({
      url: SESSION_PATH,
      payload: payload
    })
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export const registerSesion = async (payload) => {
  try {
    const response = await POST({
      url: `${SESSION_PATH}/register`,
      payload: payload
    })
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export const checkRegisted = async (payload) => {
  try {
    const response = await GET({
      url: `${SESSION_PATH}/check-register`,
      payload
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

export const getUsersRegisted = async (id) => {
  try {
    const response = await GET({
      url: `${SESSION_PATH}/user-registered/${id}`,
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

export const updateSesion = async (id, payload) => {
  try {
    const response = await PUT({
      url: `${SESSION_PATH}/${id}`,
      payload: payload
    })
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getSessionById = async (sessionId) => {
  try {
    const response = await GET({ url: `${SESSION_PATH}/${sessionId}` })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

export const filterSessions = async (payload) => {
  try {
    const response = await GET({ url: `${SESSION_PATH}`, payload })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

export const getRegistedSession = async (userId) => {
  try {
    const response = await GET({ url: `${SESSION_PATH}/registered/${userId}`})
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

export const getRelatedSessions = async (id) => {
  try {
    const response = await GET({ url: `${SESSION_PATH}/related/${id}` })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

export const getWinSessionsByUserId = async (id) => {
  try {
    const response = await GET({ url: `${SESSION_PATH}/win-sessions/${id}` })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}
