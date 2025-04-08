import { GET, POST, PUT, DELETE } from './config/axiosMethods';
import handleApiError from './config/handldeApiError';

export const NOTIFICATION_PATH = '/notification';

export const getNotificationsByReceiverId = async (receiverId) => {
  try {
    const response = await GET({ url: `${NOTIFICATION_PATH}/user/${receiverId}` });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};