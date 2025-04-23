import { POST } from './config/axiosMethods';
import handleApiError from './config/handldeApiError';

export const chatWithToolCall = async (messages) => {
  try {
    const response = await POST({
      url: '/test-tool-call',
      payload: messages,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};