import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAddress, getAddressByUserId, updateAddress } from '~/api/addressApi'

// Hook tạo địa chỉ
export const useCreateAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAddress,
    onSuccess: (data) => {
      console.log('Address created successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['address']) // Invalidates the 'address' query to refetch the data
    },
    onError: (error) => {
      console.error('Error creating address:', error)
    }
  })
}

// Hook lấy danh sách địa chỉ của người dùng
export const useGetAddressByUserId = (userId) => {
  return useQuery({
    queryKey: ['address', userId],
    queryFn: () => getAddressByUserId(userId),
  })
}

// Hook cập nhật địa chỉ (bao gồm cả việc thiết lập địa chỉ mặc định)
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ addressId, payload }) => updateAddress(addressId, payload), // Call the API with addressId and payload
    onSuccess: (data) => {
      console.log('Address updated successfully:', data);
      // Invalidate queries to refetch the updated data
      queryClient.invalidateQueries(['address']);
    },
    onError: (error) => {
      console.error('Error updating address:', error);
    }
  });
};
