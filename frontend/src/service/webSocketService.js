import { Client } from '@stomp/stompjs'

let stompClient = null
let subscriptions = [] // Lưu trữ các subscription để quản lý

export const connectWebSocket = (authToken, destinations, onMessage) => {
  if (stompClient && stompClient.connected) {
    const dests = Array.isArray(destinations) ? destinations : [destinations]
    dests.forEach((destination) => {
      if (!subscriptions.some(sub => sub.destination === destination)) {
        const subscription = stompClient.subscribe(destination, onMessage)
        subscriptions.push({ destination, subscription })
        console.log('Subscribed to:', destination)
      }
    })

    // Trả về hàm cleanup chỉ hủy subscriptions liên quan
    return () => {
      dests.forEach((destination) => {
        const index = subscriptions.findIndex(sub => sub.destination === destination)
        if (index !== -1) {
          subscriptions[index].subscription.unsubscribe()
          subscriptions.splice(index, 1)
          console.log('Unsubscribed from:', destination)
        }
      })
    }
  }

  // Nếu chưa kết nối
  stompClient = new Client({
    brokerURL: 'ws://localhost:8080/rt-auction',
    connectHeaders: {
      Authorization: `Bearer ${authToken}`
    },
    onConnect: () => {
      const dests = Array.isArray(destinations) ? destinations : [destinations]
      dests.forEach((destination) => {
        const subscription = stompClient.subscribe(destination, onMessage)
        subscriptions.push({ destination, subscription })
        console.log('Subscribed to:', destination)
      })
    },
    onStompError: (frame) => {
      console.error('Broker error: ', frame.headers['message'])
      console.error(frame.body)
    },
    onDisconnect: () => {
      subscriptions = []
      console.log('WebSocket disconnected')
    }
  })

  stompClient.activate()

  // Trả về cleanup giống phần trên
  const dests = Array.isArray(destinations) ? destinations : [destinations]
  return () => {
    dests.forEach((destination) => {
      const index = subscriptions.findIndex(sub => sub.destination === destination)
      if (index !== -1) {
        subscriptions[index].subscription.unsubscribe()
        subscriptions.splice(index, 1)
        console.log('Unsubscribed from:', destination)
      }
    })
  }
}

export const disconnectWebSocket = () => {
  if (stompClient && stompClient.connected) {
    subscriptions.forEach(({ subscription }) => subscription.unsubscribe())
    subscriptions = []
    stompClient.deactivate()
    stompClient = null
    console.log('Disconnected from WebSocket')
  }
}

export const sendMessage = (destination, body) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination,
      body: JSON.stringify(body)
    })
  } else {
    console.error('STOMP client is not connected')
  }
}