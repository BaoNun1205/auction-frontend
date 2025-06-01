import { POST } from './config/axiosMethods'
import handleApiError from './config/handldeApiError'

export const DEPOSIT_PATH = '/deposit'

// export const createDeposit = async (payload) => {
//   try {
//     const response = await POST({
//       url: DEPOSIT_PATH,
//       payload: payload
//     })
//     // return response.data
//     return response
//   } catch (error) {
//     handleApiError(error)
//   }
// }

export const createDeposit = async (payload) => {
  try {
    const response = await POST({
      url: DEPOSIT_PATH,
      payload: payload
    })
    // Kiểm tra mã phản hồi từ API
    if (response.data.code === 1043) {
      const error = new Error(response.data.message)
      error.response = response // Gắn response để truy cập trong onError
      throw error
    }
    return response.data // Trả về dữ liệu nếu thành công
  } catch (error) {
    handleApiError(error)
    throw error // Ném lại lỗi để useMutation xử lý
  }
}