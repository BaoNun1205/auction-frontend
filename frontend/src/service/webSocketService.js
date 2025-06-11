import { Client } from '@stomp/stompjs'

let stompClient = null
let subscriptions = [] // Lưu trữ các subscription để quản lý

export const connectWebSocket = (authToken, destinations, onMessage) => {
  return new Promise((resolve, reject) => {
    const dests = Array.isArray(destinations) ? destinations : [destinations]

    if (stompClient && stompClient.connected) {
      dests.forEach((destination) => {
        if (!subscriptions.some((sub) => sub.destination === destination)) {
          const subscription = stompClient.subscribe(destination, onMessage)
          subscriptions.push({ destination, subscription })
          console.log('Subscribed to:', destination)
        }
      })

      // Trả về cleanup sau khi đã subscribe
      return resolve(() => {
        dests.forEach((destination) => {
          const index = subscriptions.findIndex((sub) => sub.destination === destination)
          if (index !== -1) {
            subscriptions[index].subscription.unsubscribe()
            subscriptions.splice(index, 1)
            console.log('Unsubscribed from:', destination)
          }
        })
      })
    }

    // Nếu chưa kết nối
    stompClient = new Client({
      brokerURL: 'wss://onlineauctionweb-fud5a8hnd4cbckgf.southeastasia-01.azurewebsites.net/rt-auction',
      // brokerURL: 'wss://auctionsession-e9b7beg0gvf2dhax.southeastasia-01.azurewebsites.net/rt-auction',
      // brokerURL: 'ws://localhost:8080/rt-auction',
      connectHeaders: {
        Authorization: `Bearer ${authToken}`
      },
      onConnect: () => {
        dests.forEach((destination) => {
          const subscription = stompClient.subscribe(destination, onMessage)
          subscriptions.push({ destination, subscription })
          console.log('Subscribed to:', destination)
        })

        // Trả về hàm cleanup sau khi đã connect
        resolve(() => {
          dests.forEach((destination) => {
            const index = subscriptions.findIndex((sub) => sub.destination === destination)
            if (index !== -1) {
              subscriptions[index].subscription.unsubscribe()
              subscriptions.splice(index, 1)
              console.log('Unsubscribed from:', destination)
            }
          })
        })
      },
      onStompError: (frame) => {
        console.error('Broker error:', frame.headers['message'])
        console.error(frame.body)
        reject(frame)
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error:', error)
        reject(error)
      },
      onDisconnect: () => {
        subscriptions = []
        console.log('WebSocket disconnected')
      }
    })

    stompClient.activate()
  })
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