import { GET, POST, PUT, DELETE } from './config/axiosMethods'
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

export const getSessionById = async (sessionId) => {
  try {
    const response = await GET({ url: `${SESSION_PATH}/${sessionId}` })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

export const filteredSessions = async (payload) => {
  try {
    const response = await GET({ url: `${SESSION_PATH}`, payload })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}