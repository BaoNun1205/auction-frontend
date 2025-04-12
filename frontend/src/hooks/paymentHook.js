import { useMutation } from '@tanstack/react-query'
import { getVNPayPayment } from '~/api/paymentApi'

const createVNPayPayment = ({ amount, bankCode, userId }) => {
  return getVNPayPayment({ amount, bankCode, userId })
}

export const useVNPayPayment = () => {
  return useMutation({
    mutationFn: createVNPayPayment
  })
}
