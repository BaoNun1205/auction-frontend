import { useQuery } from '@tanstack/react-query'
import { getBillsByUserId, getBillById, getBillBySessionId } from '~/api/billApi'

// Lấy danh sách hóa đơn theo userId
export const useBillsByUserId = (userId) => {
  return useQuery({
    queryKey: ['bills', userId],
    queryFn: () => getBillsByUserId(userId),
    enabled: !!userId,
    onError: (error) => {
      console.error('Error fetching bills by userId:', error)
    }
  })
}

// Lấy chi tiết hóa đơn theo billId
export const useBillById = (billId) => {
  return useQuery({
    queryKey: ['bill', billId],
    queryFn: () => getBillById(billId),
    enabled: !!billId,
    onError: (error) => {
      console.error('Error fetching bill by id:', error)
    }
  })
}

// Lấy chi tiết hóa đơn theo sessionId
export const useBillBySessionId = (sessionId) => {
  return useQuery({
    queryKey: ['bill-by-session', sessionId],
    queryFn: () => getBillBySessionId(sessionId),
    enabled: !!sessionId,
    onError: (error) => {
      console.error('Error fetching bill by sessionId:', error)
    }
  })
}
