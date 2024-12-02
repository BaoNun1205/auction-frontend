import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAddress, getAddressByUserId } from '~/api/addressApi'

export const useCreateAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAddress,
    onSuccess: (data) => {
      console.log('Address created successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['address'])
    },
    onError: (error) => {
      console.error('Error creating address:', error)
    }
  })
}

export const useGetAddressByUserId = (userId) => {
  return useQuery({
    queryKey: ['address', userId],
    queryFn: () => getAddressByUserId(userId),
  });
}