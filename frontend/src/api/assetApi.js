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

export const getAssetById = async (assetId) => {
  try {
    const response = await GET({ url: `${ASSET_PATH}/${assetId}` });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
}

export const filterAssets = async (payload) => {
  try {
    const response = await GET({ url: `${ASSET_PATH}`, payload });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
}

export const updateAssetStatus = async (assetId, status) => {
  try {
    const response = await PUT({
      url: `${ASSET_PATH}/status/${assetId}`,
      params: { status }
    });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
}