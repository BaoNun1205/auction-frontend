import { GET } from './config/axiosMethods'

export const PAYMENT_PATH = '/payment'

export const getVNPayPayment = async (payload) => {
  try {
    const response = await GET({
      url: `${PAYMENT_PATH}/vn-pay?amount=${payload.amount}&bankCode=${payload.bankCode}&userId=${payload.userId}`
    })
    return response.data
  } catch (error) {
    return error.response
  }
}
