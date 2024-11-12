import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAuctionSession, getAuctionedSession } from '~/api/auctionsessionApi';

// Hook để lấy phiên đấu giá với phân trang
export const useGetAuctionSession = (page) => {
  return useQuery(['auctionSessions', page], () => getAuctionSession(page));
};

export const useGetAuctionedSession = (page) => {
  return useQuery(['auctionedSessions', page], () => getAuctionedSession(page));
};
