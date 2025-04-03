// import { Client } from '@stomp/stompjs'

// let stompClient = null

// export const connectWebSocket = (authToken, destination, onMessage) => {
//   console.log('Connecting with token:', authToken);
//   stompClient = new Client({
//     brokerURL: 'ws://localhost:8080/rt-auction',
//     connectHeaders: {
//       Authorization: `Bearer ${authToken}`
//     },
//     onConnect: () => {
//       console.log('Connected to WebSocket');
//       stompClient.subscribe(destination, onMessage);
//       console.log('Subscribed to:', destination);
//     },
//     onStompError: (frame) => {
//       console.error('Broker reported error: ' + frame.headers['message']);
//       console.error('Additional details: ' + frame.body);
//     }
//   });
//   stompClient.activate();
// };

// export const disconnectWebSocket = () => {
//   if (stompClient) {
//     stompClient.deactivate()
//   }
// }

// export const sendMessage = (destination, body) => {
//   if (stompClient) {
//     stompClient.publish({
//       destination,
//       body: JSON.stringify(body)
//     })
//   } else {
//     console.error('STOMP client is not connected')
//   }
// }

import { Client } from '@stomp/stompjs'

let stompClient = null
let subscriptions = [] // Lưu trữ các subscription để quản lý

export const connectWebSocket = (authToken, destinations, onMessage) => {
  if (stompClient && stompClient.connected) {
    // Nếu đã kết nối, chỉ thêm subscriptions mới
    if (Array.isArray(destinations)) {
      destinations.forEach((destination) => {
        if (!subscriptions.some(sub => sub.destination === destination)) {
          const subscription = stompClient.subscribe(destination, onMessage)
          subscriptions.push({ destination, subscription })
          console.log('Subscribed to:', destination)
        }
      })
    } else {
      if (!subscriptions.some(sub => sub.destination === destinations)) {
        const subscription = stompClient.subscribe(destinations, onMessage)
        subscriptions.push({ destination: destinations, subscription })
        console.log('Subscribed to:', destinations)
      }
    }
    return () => {} // Trả về hàm cleanup rỗng nếu đã kết nối
  }

  // Nếu chưa kết nối, tạo kết nối mới
  console.log('Connecting with token:', authToken)
  stompClient = new Client({
    brokerURL: 'ws://localhost:8080/rt-auction',
    connectHeaders: {
      Authorization: `Bearer ${authToken}`
    },
    onConnect: () => {
      console.log('Connected to WebSocket')
      const dests = Array.isArray(destinations) ? destinations : [destinations]
      dests.forEach((destination) => {
        const subscription = stompClient.subscribe(destination, onMessage)
        subscriptions.push({ destination, subscription })
        console.log('Subscribed to:', destination)
      })
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message'])
      console.error('Additional details: ' + frame.body)
    },
    onDisconnect: () => {
      console.log('Disconnected from WebSocket')
      subscriptions = []
    }
  })

  stompClient.activate()

  // Trả về hàm cleanup
  return () => {
    if (stompClient && stompClient.connected) {
      subscriptions.forEach(({ subscription }) => subscription.unsubscribe())
      subscriptions = []
      stompClient.deactivate()
      stompClient = null
    }
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