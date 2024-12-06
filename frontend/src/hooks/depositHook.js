import { useMutation, useQuery } from '@tanstack/react-query'
import { checkDeposit } from '~/api/deposit'
import { createDeposit } from '~/api/depositApi'

export const useCreateDeposit = () => {
  return useMutation({
    mutationFn: createDeposit,
    onSuccess: (data) => {
      console.log('Deposit created successfully:', data)
    },
    onError: (error) => {
      console.error('Error creating deposit:', error)
    }
  })
}

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