import { useMutation, useQuery } from '@tanstack/react-query';
import {
  chatWithToolCall,
  createConversation,
  getConversations,
  getMessagesByConversationId
} from '~/api/chatBotApi'

// Gọi chatbot bằng tool call (POST)
export const useChatWithToolCall = () => {
  return useMutation({
    mutationFn: ({ conversationId, content }) =>
      chatWithToolCall({ conversationId, content }),

    onSuccess: (data) => {
      console.log('Chatbot response:', data);
    },

    onError: (error) => {
      console.error('Error calling chatbot:', error);
    },
  });
};

// Tạo mới conversation (POST)
export const useCreateConversation = () => {
  return useMutation({
    mutationFn: createConversation,
    onSuccess: (data) => {
      console.log('Created conversation:', data);
    },
    onError: (error) => {
      console.error('Error creating conversation:', error);
    },
  });
};

// Lấy danh sách conversation theo userId (GET)
export const useGetConversations = (userId) => {
  return useQuery({
    queryKey: ['get-conversations', userId],
    queryFn: () => getConversations(userId),
    enabled: !!userId, // chỉ gọi khi có userId
    onError: (error) => {
      console.error('Error fetching conversations:', error);
    },
  });
};

// Lấy danh sách message theo conversationId (GET)
export const useGetMessagesByConversationId = (conversationId) => {
  return useQuery({
    queryKey: ['get-messages', conversationId],
    queryFn: () => getMessagesByConversationId(conversationId),
    enabled: !!conversationId, // chỉ gọi khi có conversationId
    onError: (error) => {
      console.error('Error fetching messages:', error);
    },
  });
};
