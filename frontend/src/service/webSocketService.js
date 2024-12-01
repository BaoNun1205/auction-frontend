import { Client } from '@stomp/stompjs'

let stompClient = null

export const connectWebSocket = (authToken, destination, onMessage) => {
  stompClient = new Client({
    brokerURL: 'ws://localhost:8080/rt-auction',
    connectHeaders: {
      Authorization: `Bearer ${authToken}`
    },
    onConnect: () => {
      console.log('Connected to WebSocket')
      stompClient.subscribe(destination, onMessage)
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message'])
      console.error('Additional details: ' + frame.body)
    }
  })

  stompClient.activate()
}

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate()
  }
}

export const sendMessage = (destination, body) => {
  if (stompClient) {
    stompClient.publish({
      destination,
      body: JSON.stringify(body)
    })
  } else {
    console.error('STOMP client is not connected')
  }
}