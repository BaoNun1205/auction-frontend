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

export const getRegisteredSession = async (id) => {
  try {
    const response = await GET({ url: `${USER_PATH}/registered_sessions/${id}` });
    return response.result;
  } catch (error) {
    handleApiError(error);
  }
}