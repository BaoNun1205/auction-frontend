import { useMutation, useQuery } from '@tanstack/react-query'
import { createAuctionHistory, getAuctionHistoriesByAuctionSessionId } from '~/api/auctionHistoryApi'

export const useCreateAuctionHistory = () => {
  return useMutation({
    mutationFn: createAuctionHistory,
    onSuccess: (data) => {
      console.log('Auction history created successfully:', data)
    },
    onError: (error) => {
      console.error('Error creating auction history:', error)
    }
  })
}

export const useGetAuctionHistoriesByAuctionSessionId = (id) => {
  return useQuery({
    queryKey: ['getAuctionHistoriesByAuctionSessionId', id],
    queryFn: () => getAuctionHistoriesByAuctionSessionId(id),
    onError: (error) => {
      console.error('Error fetching auction histories:', error)
    }
  })
}