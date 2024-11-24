import { useEffect, useRef } from 'react';

const useWebSocket = (url, onMessage) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Mở kết nối WebSocket
    socketRef.current = new WebSocket(url);

    // Xử lý khi nhận được thông điệp
    socketRef.current.onmessage = (event) => {
      if (onMessage) {
        onMessage(event.data);
      }
    };

    // Đóng kết nối khi component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url, onMessage]);

  return socketRef;
};

export default useWebSocket;
