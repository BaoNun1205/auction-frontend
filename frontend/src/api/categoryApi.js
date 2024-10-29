import { GET, POST, PUT, DELETE } from './config/axiosMethods';
import handleApiError from './config/handldeApiError';

export const CATEGORY_PATH = '/category'

export const getCategories = async () => {
  try {
    const response = await GET({ url: `${CATEGORY_PATH}/get-all` });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};

export const filterCategories = async (payload) => {
  try {
    const response = await GET({ url: `${CATEGORY_PATH}/filter`, payload });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};

export const createCategory = async (payload) => {
  try {
    const response = await POST({
      url: CATEGORY_PATH,
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

export const deleteCategory = async (categoryId) => {
  try {
    const response = await DELETE({ url: `${CATEGORY_PATH}/${categoryId}` });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const restoreCategory = async (categoryId) => {
  try {
    const response = await PUT({ url: `${CATEGORY_PATH}/restore/${categoryId}` });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
