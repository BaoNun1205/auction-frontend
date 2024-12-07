import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAddress, getAddressByUserId, getAddressDefaultByUserId, updateAddress } from '~/api/addressApi'

export const useCreateAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAddress,
    onSuccess: (data) => {
      console.log('Address created successfully:', data)
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
  })
}

export const useGetAddressDefaultByUserId = (userId) => {
  return useQuery({
    queryKey: ['defaultAddress', userId],
    queryFn: () => getAddressDefaultByUserId(userId),
    onError: (error) => {
      console.error('Error fetching default address:', error);
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ addressId, payload }) => updateAddress(addressId, payload),
    onSuccess: (data) => {
      console.log('Address updated successfully:', data);
      queryClient.invalidateQueries(['address']);
    },
    onError: (error) => {
      console.error('Error updating address:', error);
    }
  });
};
