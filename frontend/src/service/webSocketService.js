import { Client } from '@stomp/stompjs';

let client;

const connect = () => {
  client = new Client({
    brokerURL: 'ws://localhost:8080/rt-auction',
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
        callback(JSON.parse(message.body));
      });
    };
  }
};

export { connect, disconnect, subscribe };