import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotificationsByReceiverId } from '~/api/notification';

export const useGetNotificationsByReceiverId = (receiverId) => {
  return useQuery({
    queryKey: ['notifications', receiverId],
    queryFn: () => getNotificationsByReceiverId(receiverId)
  });
};