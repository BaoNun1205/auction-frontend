import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserById, getRegisteredSession } from '~/api/user'

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  });
}

export const useGetRegisteredSession = (id) => {
  return useQuery({
    queryKey: ['auctionSessions', id],
    queryFn: () => getRegisteredSession(id),
  });
}