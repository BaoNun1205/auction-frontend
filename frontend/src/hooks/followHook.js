import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  followUser,
  unfollowUser,
  isFollowing,
  getFollowing,
  getFollowers,
  countFollowers
} from '~/api/followApi'

// Follow người dùng
export const useFollowUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: followUser,
    onSuccess: (data) => {
      console.log('Followed successfully:', data)
      queryClient.invalidateQueries({ queryKey: ['following'] })
      queryClient.invalidateQueries({ queryKey: ['followers'] })
    },
    onError: (error) => {
      console.error('Error following user:', error)
    }
  })
}

// Unfollow người dùng
export const useUnfollowUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      console.log('Unfollowed successfully')
      queryClient.invalidateQueries({ queryKey: ['following'] })
      queryClient.invalidateQueries({ queryKey: ['followers'] })
    },
    onError: (error) => {
      console.error('Error unfollowing user:', error)
    }
  })
}

// Kiểm tra có đang follow không
export const useIsFollowing = (followerId, followeeId) => {
  return useQuery({
    queryKey: ['isFollowing', followerId, followeeId],
    queryFn: () => isFollowing(followerId, followeeId),
    enabled: !!followerId && !!followeeId, // chỉ gọi khi cả hai đều có giá trị
    onError: (error) => {
      console.error('Error checking following status:', error)
    }
  })
}

// Lấy danh sách đang follow (followee)
export const useGetFollowing = (followerId) => {
  return useQuery({
    queryKey: ['following', followerId],
    queryFn: () => getFollowing(followerId),
    enabled: !!followerId,
    onError: (error) => {
      console.error('Error fetching following list:', error)
    }
  })
}

// Lấy danh sách follower
export const useGetFollowers = (followeeId) => {
  return useQuery({
    queryKey: ['followers', followeeId],
    queryFn: () => getFollowers(followeeId),
    enabled: !!followeeId,
    onError: (error) => {
      console.error('Error fetching followers list:', error)
    }
  })
}

// Đếm số lượng follower
export const useCountFollowers = (followeeId) => {
  return useQuery({
    queryKey: ['followersCount', followeeId],
    queryFn: () => countFollowers(followeeId),
    enabled: !!followeeId,
    onError: (error) => {
      console.error('Error counting followers:', error)
    }
  })
}
