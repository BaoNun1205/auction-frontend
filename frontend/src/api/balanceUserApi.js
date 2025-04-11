import { GET } from './config/axiosMethods'

export const BALANCE_USER_PATH = '/balance-user'

export const getBalanceUser = async (id) => {
  try {
    const response = await GET({
      url: `${BALANCE_USER_PATH}/${id}`
    })
    return response.data.result
  } catch (error) {
    return error.response
  }
}