import { useAppStore } from '~/store/appStore'
import { connectWebSocket } from './webSocketService'

export const setupWebSocket = ({ token, userId }) => {
  const addOrUpdateNotification = useAppStore.getState().addOrUpdateNotification

  if (!token || !userId) return () => {}

  const handleNewNotification = (frame) => {
    try {
      const binaryBody = frame.binaryBody || frame._binaryBody
      const jsonString = new TextDecoder().decode(binaryBody)
      const notification = JSON.parse(jsonString)
      console.log('New notification:', notification)
      addOrUpdateNotification(notification)
    } catch (err) {
      console.error('Error parsing WebSocket message:', err)
    }
  }

  const destinations = [
    `/rt-notification/user/${userId}`,
    '/rt-notification/new-bid/session/c01757ff-ba4f-4beb-9852-ecad623a1767'
  ]

  return connectWebSocket(token, destinations, handleNewNotification)
}
