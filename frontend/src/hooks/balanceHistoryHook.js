import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cancelPaymentSession, getBalanceHistoryByUserId, paymentSession } from '~/api/balanceHistoryApi'

export const UseGetBalanceHistory = (id) => {
  return useQuery({
    queryKey: ['balanceHistory', id],
    queryFn: () => getBalanceHistoryByUserId(id),
  });
};

export const usePaymentSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ buyerId, sellerId, sessionId }) =>
      paymentSession({ buyerId, sellerId, sessionId }),
    onSuccess: () => {
      console.log('Payment session processed successfully')
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