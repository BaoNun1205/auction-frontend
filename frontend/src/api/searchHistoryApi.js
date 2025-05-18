import { GET, POST } from './config/axiosMethods'
import handleApiError from './config/handldeApiError'

export const SEARCH_HISTORY_PATH = '/search-history'

// Ghi nhận từ khóa tìm kiếm
export const recordSearch = async (userId, keyword) => {
  try {
    await POST({
      url: `${SEARCH_HISTORY_PATH}/record`,
      payload: { userId, keyword },
      isParams: true // đánh dấu đây là query param chứ không phải request body
    })
  } catch (error) {
    handleApiError(error)
  }
}

// Lấy danh sách từ khóa tìm kiếm nhiều nhất
export const getTopKeywords = async (userId) => {
  try {
    const response = await GET({
      url: `${SEARCH_HISTORY_PATH}/top`,
      payload: { userId }
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

// Lấy danh sách từ khóa tìm kiếm gần đây
export const getRecentKeywords = async (userId) => {
  try {
    const response = await GET({
      url: `${SEARCH_HISTORY_PATH}/recent`,
      payload: { userId }
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}
