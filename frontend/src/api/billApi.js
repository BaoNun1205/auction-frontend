import { GET } from './config/axiosMethods'
import handleApiError from './config/handldeApiError'

export const BILL_PATH = '/bill'

// Lấy danh sách hóa đơn theo userId
export const getBillsByUserId = async (userId) => {
  try {
    const response = await GET({
      url: `${BILL_PATH}/buyerId/${userId}`
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

// Lấy chi tiết hóa đơn theo id
export const getBillById = async (id) => {
  try {
    const response = await GET({
      url: `${BILL_PATH}/${id}`
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

export const getBillBySessionId = async (sessionId) => {
  try {
    const response = await GET({
      url: `${BILL_PATH}/session/${sessionId}`
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}
