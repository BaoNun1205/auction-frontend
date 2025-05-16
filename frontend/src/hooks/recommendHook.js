import { useQuery } from '@tanstack/react-query'
import { recommendByUser, recommendBySession } from '~/api/recommendApi'

export const useRecommendByUser = (userId, status) => {
  return useQuery({
    queryKey: ['recommendByUser', userId, status],
    queryFn: () => recommendByUser(userId, status),
    enabled: !!userId && !!status,
    onError: (error) => {
      console.error('Error fetching recommendations by user:', error)
    }
  })
}

export const useRecommendBySession = (sessionId) => {
  return useQuery({
    queryKey: ['recommendBySession', sessionId],
    queryFn: () => recommendBySession(sessionId),
    enabled: !!sessionId,
    onError: (error) => {
      console.error('Error fetching recommendations by session:', error)
    }
  })
}
