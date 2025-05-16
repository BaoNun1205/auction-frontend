import { GET } from './config/axiosMethods'
import handleApiError from './config/handldeApiError'

export const RECOMMEND_PATH = '/recommend'

export const recommendByUser = async (userId, status) => {
  try {
    const response = await GET({
      url: `${RECOMMEND_PATH}/${userId}`,
      payload: { status }
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}


// Gợi ý phiên đấu giá dựa trên sessionId
export const recommendBySession = async (sessionId) => {
  try {
    const response = await GET({
      url: `${RECOMMEND_PATH}/session/${sessionId}`
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}
