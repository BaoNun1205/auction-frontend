import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getConversations, getMessages, sendMessage, updateUnread } from '~/api/chatApi';

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

export const useUpdateUnread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, unreadCount }) => updateUnread(conversationId, unreadCount),
    onSuccess: (data, variables) => {
      // Cập nhật lại danh sách conversations sau khi cập nhật unread
      queryClient.invalidateQueries(['conversations']);
      console.log(`Successfully updated unread count for conversation ${variables.conversationId}`);
    },
    onError: (error) => {
      console.error('Error updating unread count:', error);
    },
  });
};
