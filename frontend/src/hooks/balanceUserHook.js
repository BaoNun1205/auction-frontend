import { useQuery } from '@tanstack/react-query'
import { getBalanceUser } from '~/api/balanceUserApi'


export const UseGetBalanceUser = (id) => {
  return useQuery({
    queryKey: ['balanceUser', id],
    queryFn: () => getBalanceUser(id)
  })
}