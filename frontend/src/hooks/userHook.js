import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { countActiveUsers, getUserById, getUserByUsername, updateAvatar, updateUnreadNotificationCount, updateUser } from '~/api/user'

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  });
}

export const useGetUserByUsername = (username) => {
  return useQuery({
    queryKey: ['userByUsername', username],
    queryFn: () => getUserByUsername(username),
  });
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }) => updateUser(userId, payload), // Update the user with userId and payload
    onSuccess: (data) => {
      console.log('User updated successfully:', data);
      // Invalidate queries to refetch the updated user data or relevant data
      // queryClient.invalidateQueries(['user', userId]); // Ensure you're invalidating the correct query
    },
    onError: (error) => {
      console.error('Error updating user:', error);
    }
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }) => updateAvatar(userId, payload), // Update the avatar with userId and avatarFile
    onSuccess: (data) => {
      console.log('Avatar updated successfully:', data);
      // Invalidate queries to refetch the updated user data or relevant data
      queryClient.invalidateQueries(['user', data.id]); // Ensure you're invalidating the correct query
    },
    onError: (error) => {
      console.error('Error updating avatar:', error);
    }
  });
};

export const useUpdateUnreadNotificationCount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, count }) => updateUnreadNotificationCount(userId, count),
    onSuccess: (data, variables) => {
      console.log('Unread notification count updated successfully:', data);
      queryClient.invalidateQueries(['user', variables.userId]); // Xóa cache user để refetch lại
    },
    onError: (error) => {
      console.error('Error updating unread notification count:', error);
    }
  });
};

export const useCountActiveUsers = () => {
  return useQuery({
    queryKey: ['activeUserCount'],
    queryFn: countActiveUsers,
  });
};
