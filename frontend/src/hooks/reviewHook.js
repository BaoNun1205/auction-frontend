import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createOrUpdateReview,
  hasUserReviewed,
  getReviewsOfUser,
  getReviewsByUser,
  getReviewBetweenUsers,
  countReviewsByUser
} from '~/api/reviewApi'

// Tạo hoặc cập nhật đánh giá
export const useCreateOrUpdateReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOrUpdateReview,
    onSuccess: (data) => {
      console.log('Review created/updated successfully:', data)
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
    onError: (error) => {
      console.error('Error creating/updating review:', error)
    }
  })
}

// Kiểm tra đã đánh giá hay chưa
export const useHasUserReviewed = (reviewerId, revieweeId) => {
  return useQuery({
    queryKey: ['hasUserReviewed', reviewerId, revieweeId],
    queryFn: () => hasUserReviewed(reviewerId, revieweeId),
    enabled: !!reviewerId && !!revieweeId,
    onError: (error) => {
      console.error('Error checking review status:', error)
    }
  })
}

// Lấy danh sách đánh giá của người được đánh giá
export const useGetReviewsOfUser = (revieweeId) => {
  return useQuery({
    queryKey: ['reviewsOfUser', revieweeId],
    queryFn: () => getReviewsOfUser(revieweeId),
    enabled: !!revieweeId,
    onError: (error) => {
      console.error('Error fetching reviews of user:', error)
    }
  })
}

// Lấy danh sách đánh giá do người dùng tạo
export const useGetReviewsByUser = (reviewerId) => {
  return useQuery({
    queryKey: ['reviewsByUser', reviewerId],
    queryFn: () => getReviewsByUser(reviewerId),
    enabled: !!reviewerId,
    onError: (error) => {
      console.error('Error fetching reviews by user:', error)
    }
  })
}

export const useGetReviewBetweenUsers = (reviewerId, revieweeId) => {
  return useQuery({
    queryKey: ['reviewBetweenUsers', reviewerId, revieweeId],
    queryFn: () => getReviewBetweenUsers(reviewerId, revieweeId),
    enabled: !!reviewerId && !!revieweeId,
    onError: (error) => {
      console.error('Error fetching review between users:', error)
    }
  })
}

export const useCountReviewsByUser = (revieweeId) => {
  return useQuery({
    queryKey: ['countReviewsByUser', revieweeId],
    queryFn: () => countReviewsByUser(revieweeId),
    enabled: !!revieweeId,
    onError: (error) => {
      console.error('Error counting reviews by user:', error)
    }
  })
}