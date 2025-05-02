import { GET, POST, PUT } from './config/axiosMethods'
import handleApiError from './config/handldeApiError'

export const FOLLOW_PATH = '/follow'

// Follow người dùng
export const followUser = async (payload) => {
  try {
    const response = await POST({
      url: FOLLOW_PATH,
      payload
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

// Unfollow người dùng
export const unfollowUser = async (payload) => {
  try {
    const response = await PUT({
      url: `${FOLLOW_PATH}/unfollow`,
      payload
    })
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

// Kiểm tra có đang follow không
export const isFollowing = async (followerId, followeeId) => {
  try {
    const response = await GET({
      url: `${FOLLOW_PATH}/check`,
      payload: { followerId, followeeId }
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

// Lấy danh sách đang follow (followee) của người dùng
export const getFollowing = async (followerId) => {
  try {
    const response = await GET({
      url: `${FOLLOW_PATH}/following/${followerId}`
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

// Lấy danh sách follower
export const getFollowers = async (followeeId) => {
  try {
    const response = await GET({
      url: `${FOLLOW_PATH}/followers/${followeeId}`
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

// Đếm số lượng follower
export const countFollowers = async (followeeId) => {
  try {
    const response = await GET({
      url: `${FOLLOW_PATH}/followers/count/${followeeId}`
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}
