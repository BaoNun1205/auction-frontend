import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

export const connect = () => {
  const socket = new SockJS('http://localhost:8080/rt-auction'); // URL này phải chính xác
  stompClient = Stomp.over(socket);
  stompClient.connect({}, () => {
    console.log('Connected to WebSocket');

  });
};

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
    console.log('Disconnected from WebSocket');
  }
};

export const subscribe = (endpoint, callback) => {
  if (stompClient) {
    stompClient.subscribe(endpoint, (message) => {
      callback(JSON.parse(message.body));
    });
  }
};
