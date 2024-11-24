import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

export const connect = (onConnectCallback) => {
  const socket = new SockJS('/rt-auction');  // Sử dụng URL proxy đã cấu hình trong Vite
  stompClient = Stomp.over(socket);
  stompClient.connect({}, () => {
    console.log('Connected to WebSocket');
    if (onConnectCallback) {
      onConnectCallback();
    }
  });
};

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect(() => {
      console.log('Disconnected from WebSocket');
    });
  }
};

export const subscribe = (endpoint, callback) => {
  if (stompClient) {
    stompClient.subscribe(endpoint, (message) => {
      callback(JSON.parse(message.body));
    });
  }
};

export const send = (destination, message) => {
  if (stompClient !== null) {
    stompClient.send(destination, {}, JSON.stringify(message));
    console.log(`Sent message to ${destination}:`, message);
  } else {
    console.error('Stomp client is not connected.');
  }
}
