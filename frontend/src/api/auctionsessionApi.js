import { GET, POST, PUT, DELETE, PATCH } from './config/axiosMethods';
import handleApiError from './config/handldeApiError';  // Đảm bảo tên file đúng

const AUCTION_SESSION_PATH = '/auction-session';
const HEADERS = { 'Content-Type': 'application/json' };

export const getAuctionSession = async (page = 1) => {
  try {
    console.log('Starting PATCH request to /auction-session');
    const response = await PATCH({
      url: `${AUCTION_SESSION_PATH}?page=${page}`,
      headers: HEADERS,
      payload: { status: "0" }
    });
    console.log('Response received:', response);

    if (response.data && response.data.result) {
      return {
        items: response.data.result,
        totalPages: response.data.totalPages, // API cần trả về totalPages
      };
    } else {
      console.error('Invalid response format:', response);
      return {
        items: [],
        totalPages: 0,
      };
    }
  } catch (error) {
    console.error('Error occurred:', error);
    handleApiError(error);
    return {
      items: [],
      totalPages: 0,
    };
  }
};

export const getAuctionedSession = async (page = 1) => {
  try {
    console.log('Starting PATCH request to /auction-session');
    const response = await PATCH({
      url: `${AUCTION_SESSION_PATH}?page=${page}`,
      headers: HEADERS,
      payload: { status: "2" }
    });
    console.log('Response received:', response);

    if (response.data && response.data.result) {
      return {
        items: response.data.result,
        totalPages: response.data.totalPages, // API cần trả về totalPages
      };
    } else {
      console.error('Invalid response format:', response);
      return {
        items: [],
        totalPages: 0,
      };
    }
  } catch (error) {
    console.error('Error occurred:', error);
    handleApiError(error);
    return {
      items: [],
      totalPages: 0,
    };
  }
};
