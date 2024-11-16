import { useQuery, useMutation, useQueryClient } from 'react-query'
import { createAuctionHistory } from '~/api/auctionHistoryApi'

export const useCreateAuctionHistory = () => {

  return useMutation(createAuctionHistory, {
    onSuccess: (data) => {
      console.log('Auction history created successfully:', data)
    },
    onError: (error) => {
      console.error('Error creating auction history:', error)
    }
  })
}