import { useAppStore } from '~/store/appStore'
import handleApiError from './config/handldeApiError';
import { POST } from './config/axiosMethods';

export const AUTH_PATH = '/auth';

export const getToken = async (payload) => {
  console.log('Registering:', payload);
  try {
    const response = await POST({ url: `${AUTH_PATH}/token`, payload });
    if (response) {
      console.log('response', response);
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const refreshToken = async () => {
  try {
    const token = useAppStore.getState().token;

    if (!token) {
      throw new Error('No token found in store');
    }

    const response = await POST({ url: `${AUTH_PATH}/refresh`, payload: { token } });

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

    const response = await POST({ url: `${AUTH_PATH}/logout`, payload: { token } });

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