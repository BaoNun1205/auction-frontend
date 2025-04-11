import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { countUnreadNotifications, getNotificationsByReceiverId, markNotificationAsRead } from '~/api/notification';

export const useGetNotificationsByReceiverId = (receiverId) => {
  return useQuery({
    queryKey: ['notifications', receiverId],
    queryFn: () => getNotificationsByReceiverId(receiverId)
  });
};

export const useCountUnreadNotifications = (receiverId) => {
  return useQuery({
    queryKey: ['notifications-unread-count', receiverId],
    queryFn: () => countUnreadNotifications(receiverId),
    enabled: !!receiverId
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: (_, notificationId) => {
      // Invalidate specific notification or list, tùy cách bạn lưu cache
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    }
  });
};

