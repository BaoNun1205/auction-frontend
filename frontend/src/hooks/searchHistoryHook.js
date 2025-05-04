import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  recordSearch,
  getTopKeywords,
  getRecentKeywords
} from '~/api/searchHistoryApi'

// Ghi nhận từ khóa tìm kiếm
export const useRecordSearch = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, keyword }) => recordSearch(userId, keyword),
    onSuccess: () => {
      console.log('Search keyword recorded successfully')
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] })
    },
    onError: (error) => {
      console.error('Error recording search keyword:', error)
    }
  })
}

// Lấy danh sách từ khóa tìm kiếm nhiều nhất
export const useTopKeywords = (userId) => {
  return useQuery({
    queryKey: ['topKeywords', userId],
    queryFn: () => getTopKeywords(userId),
    enabled: !!userId,
    onError: (error) => {
      console.error('Error fetching top search keywords:', error)
    }
  })
}

// Lấy danh sách từ khóa tìm kiếm gần đây
export const useRecentKeywords = (userId) => {
  return useQuery({
    queryKey: ['recentKeywords', userId],
    queryFn: () => getRecentKeywords(userId),
    enabled: !!userId,
    onError: (error) => {
      console.error('Error fetching recent search keywords:', error)
    }
  })
}
