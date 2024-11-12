import { GET, POST, PUT, DELETE } from './config/axiosMethods';
import handleApiError from './config/handldeApiError';

export const SESSION_PATH = '/session';
export const AUCTION_SESSION_PATH = '/auction-session';
export const HEADERS = { /* your headers here */ };

export const createSesion = async (payload) => {
  try {
    const response = await POST({
      url: SESSION_PATH,
      payload: payload,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getSessionById = async (sessionId) => {
  try {
    const response = await GET({ url: `${SESSION_PATH}/${sessionId}` });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};

export const filterSessions = async (payload) => {
  try {
    const response = await GET({ url: `${SESSION_PATH}`, payload });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
}

export const getAuctionSession = async (page = 1) => {
  try {
    console.log('Starting POST request to /auction-session');
    const response = await POST({
      url: `${AUCTION_SESSION_PATH}?page=${page}`,
      headers: HEADERS,
      payload: { status: "0" }
    });
    console.log('Response received:', response);

    if (response.data && response.data.result) {
      return {
        items: response.data.result,
        totalPages: response.data.totalPages,
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
    console.log('Starting POST request to /auction-session');
    const response = await POST({
      url: `${AUCTION_SESSION_PATH}?page=${page}`,
      headers: HEADERS,
      payload: { status: "2" }
    });
    console.log('Response received:', response);

    if (response.data && response.data.result) {
      return {
        items: response.data.result,
        totalPages: response.data.totalPages,
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
