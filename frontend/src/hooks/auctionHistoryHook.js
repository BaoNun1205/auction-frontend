import { useMutation, useQuery } from '@tanstack/react-query';
import { checkDeposit, createAuctionHistory, getAuctionHistoriesByAuctionSessionId } from '~/api/auctionHistoryApi';

export const useCreateAuctionHistory = () => {
  return useMutation({
    mutationFn: createAuctionHistory,
    onSuccess: (data) => {
      console.log('Auction history created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating auction history:', error);
    },
  });
};

export const useGetAuctionHistoriesByAuctionSessionId = (id) => {
  return useQuery({
    queryKey: ['getAuctionHistoriesByAuctionSessionId', id],
    queryFn: () => getAuctionHistoriesByAuctionSessionId(id),
    onError: (error) => {
      console.error('Error fetching auction histories:', error);
    },
  });
};

export const useCheckDeposit = (payload) => {
  return useQuery({
    queryKey: ['checkDeposit', payload],
    queryFn: () => checkDeposit(payload),
    enabled: !!payload,
    onSuccess: (data) => {
      console.log('Deposit check result:', data);
    },
    onError: (error) => {
      console.error('Error checking deposit:', error);
    },
  });
};