import { useMutation, useQuery } from '@tanstack/react-query'
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