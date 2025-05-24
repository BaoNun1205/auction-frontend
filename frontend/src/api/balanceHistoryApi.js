import { GET, POST } from './config/axiosMethods'
import handleApiError from './config/handldeApiError'

export const BALANCE_HISTORY_PATH = '/balance-history'

export const getBalanceHistoryByUserId = async (id) => {
  try {
    const response = await GET({
      url: `${BALANCE_HISTORY_PATH}/user/${id}`
    })
    return response.data.result
  } catch (error) {
    return error.response
  }
}

export const paymentSession = async ({ buyerId, sellerId, sessionId }) => {
  try {
    const response = await POST({
      url: `${BALANCE_HISTORY_PATH}/payment-session`,
      payload: { buyerId, sellerId, sessionId },
    });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};

export const cancelPaymentSession = async ({ sellerId, sessionId }) => {
  try {
    const response = await POST({
      url: `${BALANCE_HISTORY_PATH}/cancel-payment-session`,
      payload: { sellerId, sessionId },
    });
    return response.data.result;
  } catch (error) {
    handleApiError(error);
  }
};
