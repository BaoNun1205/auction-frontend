import { GET } from './config/axiosMethods'

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