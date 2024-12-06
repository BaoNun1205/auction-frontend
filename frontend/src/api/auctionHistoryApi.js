import { GET, POST } from './config/axiosMethods'
import handleApiError from './config/handldeApiError'

export const AUCTION_HISTORY_PATH = '/auction-history'

export const createAuctionHistory = async (payload) => {
  try {
    const response = await POST({
      url: AUCTION_HISTORY_PATH,
      payload: payload
    })
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getAuctionHistoriesByAuctionSessionId = async (id) => {
  try {
    const response = await GET({
      url: `${AUCTION_HISTORY_PATH}/${id}`,
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

export const checkDeposit = async (payload) => {
  try {
    const response = await GET({
      url: `${AUCTION_HISTORY_PATH}/check-deposit`,
      payload: payload
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}
