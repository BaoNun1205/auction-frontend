import { POST, GET, PUT } from './config/axiosMethods'

export const AUTOBID_PATH = '/auto-bid'


export const createAutoBidAsync = async (payload) => {
  try {
    const response = await POST({
      url: AUTOBID_PATH,
      payload: payload
    })
    return response
  } catch (error) {
    return error.response
  }
}

export const checkAutoBid = async (payload) => {
  try {
    const response = await GET({
      url: `${AUTOBID_PATH}/check-auto-bid`,
      payload: payload
    })
    return response.data.result
  } catch (error) {
    return error.response
  }
}

export const getAutoBid = async (payload) => {
  try {
    const response = await GET({
      url: AUTOBID_PATH,
      payload: payload
    })
    return response.data.result
  } catch (error) {
    return error.response
  }
}

export const updateAutoBid = async (id, payload) => {
  try {
    const response = await PUT({
      url: `${AUTOBID_PATH}/${id}`,
      payload: payload
    })
    return response
  } catch (error) {
    return error.response
  }
}