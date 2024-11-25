import { CompatClient, Stomp } from '@stomp/stompjs';

let stompClient = null;

export const connect = (token, onConnectCallback) => {
  const socket = new WebSocket('ws://localhost:8080/rt-auction');
  stompClient = Stomp.over(socket);

  stompClient.connect(
    { Authorization: `Bearer ${token}` },
    () => {
      console.log('Connected to WebSocket');
      if (onConnectCallback) {
        onConnectCallback();
      }
    },
    (error) => {
      console.error('Error connecting to WebSocket:', error);
    }
  );

};

export const subscribe = (endpoint, callback) => {
  if (stompClient) {
    stompClient.subscribe(endpoint, (message) => {
      callback(JSON.parse(message.body));
    });
  }
};

export const send = (destination) => {
  if (stompClient) {
    stompClient.send(destination, {});
    console.log(`Sent message to ${destination}`);
  }
};

export const disconnect = () => {
  if (stompClient) {
    stompClient.disconnect(() => {
      console.log('Disconnected from WebSocket');
    });
  }
};
