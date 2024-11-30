import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getUserById } from '~/api/user'

export const useGetUserById = (id) => {
  return useQuery(['user', id], () => getUserById(id))
}
