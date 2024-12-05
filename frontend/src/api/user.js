import { GET, POST, PUT, DELETE } from './config/axiosMethods';
import handleApiError from './config/handldeApiError';

export const USER_PATH = '/users';

export const getUserById = async (id) => {
  try {
    const response = await GET({ url: `${USER_PATH}/${id}` });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUser = async (userId, payload) => {
  try {
    const response = await PUT({
      url: `${USER_PATH}/${userId}`,
      payload: payload,
      headers: { 
        'Content-Type': 'multipart/form-data' 
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};