import { GET, POST } from './config/axiosMethods'
import handleApiError from './config/handldeApiError'

export const REVIEW_PATH = '/review'

// Tạo hoặc cập nhật đánh giá
export const createOrUpdateReview = async (payload) => {
  try {
    const response = await POST({
      url: REVIEW_PATH,
      payload
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

// Kiểm tra đã đánh giá hay chưa
export const hasUserReviewed = async (reviewerId, revieweeId) => {
  try {
    const response = await GET({
      url: `${REVIEW_PATH}/check`,
      payload: { reviewerId, revieweeId }
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

// Lấy danh sách đánh giá của người được đánh giá (reviewee)
export const getReviewsOfUser = async (revieweeId) => {
  try {
    const response = await GET({
      url: `${REVIEW_PATH}/reviewee/${revieweeId}`
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

// Lấy danh sách đánh giá mà người dùng đã tạo (reviewer)
export const getReviewsByUser = async (reviewerId) => {
  try {
    const response = await GET({
      url: `${REVIEW_PATH}/reviewer/${reviewerId}`
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

// Lấy đánh giá giữa reviewer và reviewee
export const getReviewBetweenUsers = async (reviewerId, revieweeId) => {
  try {
    const response = await GET({
      url: `${REVIEW_PATH}`,
      payload: { reviewerId, revieweeId }
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

// Lấy số lượng đánh giá của một người dùng (reviewee)
export const countReviewsByUser = async (revieweeId) => {
  try {
    const response = await GET({
      url: `${REVIEW_PATH}/count/${revieweeId}`
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}


