import { GET, POST, PUT, DELETE } from './config/axiosMethods';
import handleApiError from './config/handldeApiError';

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