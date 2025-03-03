import { GET, POST } from './config/axiosMethods';
import handleApiError from './config/handldeApiError';

export const CHAT_PATH = '/conversations';

export const getConversations = async (userId) => {
  try {
    const response = await GET({ url: `${CHAT_PATH}?userId=${userId}` });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};

export const getMessages = async (conversationId) => {
  try {
    const response = await GET({ url: `${CHAT_PATH}/messages/${conversationId}` });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};

export const sendMessage = async ({ conversationId, messageData }) => {
  try {
    const response = await POST({
      url: `${CHAT_PATH}/messages/${conversationId}`,
      payload: messageData
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
