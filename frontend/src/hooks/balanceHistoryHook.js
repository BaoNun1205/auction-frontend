import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cancelPaymentSession, completedPaymentSession, getBalanceHistoryByUserId, paymentSession } from '~/api/balanceHistoryApi'

export const UseGetBalanceHistory = (id) => {
  return useQuery({
    queryKey: ['balanceHistory', id],
    queryFn: () => getBalanceHistoryByUserId(id),
  });
};

export const usePaymentSession = (options = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ buyerId, sellerId, sessionId, addressId }) =>
      paymentSession({ buyerId, sellerId, sessionId, addressId }),
    onSuccess: (data) => {
      console.log('Payment session processed successfully')
      queryClient.invalidateQueries({ queryKey: ['balanceHistory'] })
      options.onSuccess?.(data)
    },
    onError: (error) => {
      console.error('Error processing payment session:', error)
      options.onError?.(error)
    },
    ...options
  })
}

export const useCompletedPaymentSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ buyerId, sellerId, sessionId }) =>
      completedPaymentSession({ buyerId, sellerId, sessionId }),
    onSuccess: () => {
      console.log('Completed payment session processed successfully')
      queryClient.invalidateQueries({ queryKey: ['balanceHistory'] })
    },
    onError: (error) => {
      console.error('Error processing payment session:', error)
    }
  })
}

export const useCancelPaymentSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ sellerId, sessionId }) =>
      cancelPaymentSession({ sellerId, sessionId }),
    onSuccess: () => {
      console.log('Cancel payment session processed successfully')
      queryClient.invalidateQueries({ queryKey: ['balanceHistory'] })
    },
    onError: (error) => {
      console.error('Error canceling payment session:', error)
    }
  })
}