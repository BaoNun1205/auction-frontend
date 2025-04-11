import { useQuery } from '@tanstack/react-query'
import { getBalanceHistoryByUserId } from '~/api/balanceHistoryApi'

export const UseGetBalanceHistory = (id) => {
  return useQuery({
    queryKey: ['balanceHistory', id],
    queryFn: () => getBalanceHistoryByUserId(id),
  });
};