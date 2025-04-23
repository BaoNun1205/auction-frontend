import { useMutation } from '@tanstack/react-query';
import { chatWithToolCall } from '~/api/chatbotService';

export const useChatWithToolCall = () => {
  return useMutation({
    mutationFn: chatWithToolCall,
    onSuccess: (data) => {
      console.log('Chatbot response:', data);
    },
    onError: (error) => {
      console.error('Error calling chatbot:', error);
    },
  });
};
