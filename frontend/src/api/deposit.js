import { GET, POST } from './config/axiosMethods'
import handleApiError from './config/handldeApiError'

export const DEPOSIT_PATH = '/deposit'

export const createDeposit = async (payload) => {
  try {
    const response = await POST({
      url: DEPOSIT_PATH,
      payload: payload
    })
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}


export const checkDeposit = async (payload) => {
  try {
    const response = await GET({
      url: `${DEPOSIT_PATH}/check-deposit`,
      payload: payload
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}