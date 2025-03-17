import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getConversations, getMessages, sendMessage } from '~/api/chatApi';

export const useGetConversations = (userId) => {
  return useQuery({
    queryKey: ['conversations', userId],
    queryFn: () => getConversations(userId),
  });
};

export const useGetMessages = (conversationId) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => getMessages(conversationId),
    enabled: !!conversationId,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (data, variables) => {
      // Cập nhật lại danh sách tin nhắn sau khi gửi
      queryClient.invalidateQueries(['messages', variables.conversationId]);
    },
    onError: (error) => {
      console.error('Error sending message:', error);
    },
  });
};
