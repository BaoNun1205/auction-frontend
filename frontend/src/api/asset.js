import { GET, POST, PUT, DELETE } from './config/axiosMethods';
import handleApiError from './config/handldeApiError';

export const ASSET_PATH = '/asset'

export const createAsset = async (payload) => {
  try {
    const response = await POST({
      url: ASSET_PATH,
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