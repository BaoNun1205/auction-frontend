import { POST } from './config/axiosMethods'
import handleApiError from './config/handldeApiError'

export const PRODUCT_FILTER_PATH = '/product-filter'

export const classifyProduct = async (productData) => {
  try {
    const response = await POST({
      url: `${PRODUCT_FILTER_PATH}/classify`,
      payload: productData
    })
    return response.data
  } catch (error) {
    handleApiError(error)
    return null
  }
}
