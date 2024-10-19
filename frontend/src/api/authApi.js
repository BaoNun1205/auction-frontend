import { useAppStore } from '~/store/appStore'
import handleApiError from './config/handldeApiError';
import { POST } from './config/axiosMethods';

export const getToken = async (payload) => {
  console.log('Registering:', payload);
  try {
    const response = await POST({ url: '/auth/token', payload });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const logout = async () => {
  try {
    const token = useAppStore.getState().token;
    if (!token) {
      throw new Error('No token found in store');
    }

    const response = await POST({ url: '/auth/logout', payload: { token } });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const register = async (payload) => {
  try {
    console.log('Registering:', payload);
    const response = await POST({ url: '/users', payload });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const confirmAccount = async (token) => {
  try {
    const response = await POST({ url: '/verification/account-registration', payload: { token } });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};