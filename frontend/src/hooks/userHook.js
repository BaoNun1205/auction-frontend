import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getUserById, getRegisteredSession } from '~/api/user'

export const useGetUserById = (id) => {
  return useQuery(['user', id], () => getUserById(id))
}

export const useGetRegisteredSession = (id) => {
  return useQuery(['auctionSessions', id], () => getRegisteredSession(id))
}
