import { POST, GET } from './config/axiosMethods';
import handleApiError from './config/handldeApiError';
import { useAppStore } from '~/store/appStore';
import { jwtDecode } from 'jwt-decode';

export const REQUIREMENT_PATH = '/requirement';

export const createRequirement = async (formData) => {
  const token = useAppStore.getState().token;
  const { sub: vendorId } = jwtDecode(token);

  try {
    // Gắn vendorId vào formData
    formData.append('vendorId', vendorId);

    console.log('formData', formData);

    const response = await POST({
      url: REQUIREMENT_PATH,
      payload: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getRequirement = async () => {
  try {
    const response = await GET({ url: REQUIREMENT_PATH });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};

export const filteredRequirements = async (payload) => {
  try {
    const response = await GET({ url: `${REQUIREMENT_PATH}/filter`, payload });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};
