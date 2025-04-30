import { POST, GET } from './config/axiosMethods'
import handleApiError from './config/handldeApiError'

export const CHAT_BOT_PATH = '/api/chat'

export const chatWithToolCall = async (payload) => {
  try {
    const response = await POST({
      url: `${CHAT_BOT_PATH}/test-tool-call`,
      payload
    })
    return response || null
  } catch (error) {
    handleApiError(error)
    return null
  }
}

export const createConversation = async (conversationData) => {
  try {
    const response = await POST({
      url: `${CHAT_BOT_PATH}/conversations`,
      payload: conversationData
    })
    return response.data.result
  } catch (error) {
    handleApiError(error)
  }
}

export const getConversations = async (userId) => {
  try {
    const response = await GET({
      url: `${CHAT_BOT_PATH}/conversations`,
      payload: { userId }
    })
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getMessagesByConversationId = async (conversationId) => {
  try {
    const response = await GET({
      url: `${CHAT_BOT_PATH}/messages/${conversationId}`
    })
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
