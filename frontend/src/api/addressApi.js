import { GET, POST, PUT, DELETE } from './config/axiosMethods'
import handleApiError from './config/handldeApiError'

export const ADDRESS_PATH = '/address'

export const createAddress = async (payload) => {
  try {
    const response = await POST({
      url: ADDRESS_PATH,
      payload: payload
    })
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getAddressByUserId = async (userId) => {
  try {
    const response = await GET({ url: `${ADDRESS_PATH}/user/${userId}` })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

export const getAddressDefaultByUserId = async (userId) => {
  try {
    const response = await GET({ url: `${ADDRESS_PATH}/default/user/${userId}` })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

export const updateAddress = async (addressId, payload) => {
  try {
    const response = await PUT({
      url: `${ADDRESS_PATH}/${addressId}`,
      payload: payload
    })
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

