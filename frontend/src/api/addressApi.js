import { GET, POST, PUT, DELETE } from './config/axiosMethods';
import handleApiError from './config/handldeApiError';

export const ADDRESS_PATH = '/address'

export const createAddress = async (payload) => {
  try {
    const response = await POST({
      url: ADDRESS_PATH,
      payload: payload,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAddressByUserId = async (userId) => {
    try {
      // Sử dụng `userId` thay vì `sessionId` trong URL
      const response = await GET({ url: `${ADDRESS_PATH}/user/${userId}` })
      return response.data.result
    } catch (error) {
      handleApiError(error)
    }
  }
