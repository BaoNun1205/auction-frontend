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
