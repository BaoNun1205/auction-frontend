// hooks/useWebSocket.js
import { useEffect } from 'react';
import { connectWebSocket } from '~/service/webSocketService';
import { useAppStore } from '~/store/appStore';

const useWebSocket = (token, userId, isValid, isLoading) => {
  const addOrUpdateNotification = useAppStore((state) => state.addOrUpdateNotification);

  useEffect(() => {
    // const token = useAppStore((state) => state.auth.token)
    // const userId = useAppStore((state) => state.auth.user?.id)

    if (!token || !userId || !isValid || isLoading) return;

    console.log('[WebSocket Effect] Reconnect triggered');

    const handleNewNotification = (frame) => {
      try {
        const binaryBody = frame.binaryBody || frame._binaryBody;
        const jsonString = new TextDecoder().decode(binaryBody);
        const notification = JSON.parse(jsonString);

        console.log('New notification:', notification);
        addOrUpdateNotification(notification);
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    const destinations = [
      `/rt-notification/user/${userId}`,
      '/rt-notification/new-bid/session/c01757ff-ba4f-4beb-9852-ecad623a1767'
    ];

    const disconnect = connectWebSocket(token, destinations, handleNewNotification);

    return () => {
      console.log('Disconnecting WebSocket on unmount');
      disconnect();
    };
  }, [token, userId, isValid, isLoading, addOrUpdateNotification]);
};

export default useWebSocket;
