import { GET, POST, PUT, DELETE } from './config/axiosMethods';
import handleApiError from './config/handldeApiError';

export const SESSION_PATH = '/session'

export const createSesion = async (payload) => {
  try {
    const response = await POST({
      url: SESSION_PATH,
      payload: payload,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};