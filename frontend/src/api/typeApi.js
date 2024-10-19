import { GET, POST, PUT, DELETE } from './config/axiosMethods';
import handleApiError from './config/handldeApiError';

export const TYPE_PATH = '/type';

export const getType = async () => {
  try {
    const response = await GET({ url: TYPE_PATH });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};

export const filterTypes = async (payload) => {
  try {
    const response = await GET({ url: `${TYPE_PATH}/filter`, payload });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};

export const createType = async (payload) => {
  try {
    const response = await POST({
      url: TYPE_PATH,
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

export const deleteType = async (typeId) => {
  try {
    const response = await DELETE({ url: `${TYPE_PATH}/${typeId}` });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const restoreType = async (typeId) => {
  try {
    const response = await PUT({ url: `${TYPE_PATH}/restore/${typeId}` });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
