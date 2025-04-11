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

export const countUnreadNotifications = async (receiverId) => {
  try {
    const response = await GET({
      url: `${NOTIFICATION_PATH}/unread/count/${receiverId}`,
    });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await PUT({
      url: `${NOTIFICATION_PATH}/read/${notificationId}`,
    });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};