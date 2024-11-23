import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let client;

const connect = (token) => {
  const socket = new SockJS('http://localhost:8080/rt-auction');
  
  client = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  client.activate();
};

const disconnect = () => {
  if (client) {
    client.deactivate();
  }
};

const subscribe = (topic, callback) => {
  if (client) {
    client.onConnect = () => {
      client.subscribe(topic, (message) => {
        callback(topic, JSON.parse(message.body));
      });
    };
  }
};

export { connect, disconnect, subscribe };
