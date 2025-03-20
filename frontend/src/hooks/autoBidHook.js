import { useMutation, useQuery } from '@tanstack/react-query'
import { createAutoBidAsync, checkAutoBid, getAutoBid, updateAutoBid } from '~/api/autoBidApi'

export const useCreateAutoBid = () => {
  return useMutation({
    mutationFn: createAutoBidAsync,
    onSuccess: (data) => {
      console.log('AutoBid created successfully:', data)
    },
    onError: (error) => {
      console.error('Error creating AutoBid:', error)
    }
  })
}

export const useCheckAutoBid = (payload) => {
  return useQuery({
    queryKey: ['checkAutoBid', payload],
    queryFn: () => checkAutoBid(payload),
    enabled: !!payload,
    onSuccess: (data) => {
      console.log('AutoBid check result:', data)
    },
    onError: (error) => {
      console.error('Error checking AutoBid:', error)
    }
  })
}

export const useGetAutoBid = (payload) => {
  return useQuery({
    queryKey: ['getAutoBid', payload],
    queryFn: () => getAutoBid(payload),
    enabled: !!payload,
    onSuccess: (data) => {
      console.log('AutoBid:', data)
    },
    onError: (error) => {
      console.error('Error getting AutoBid:', error)
    }
  })
}

export const useUpdateAutoBid = () => {
  return useMutation({
    mutationFn: ({ id, payload }) => updateAutoBid(id, payload),
    onSuccess: (data) => {
      console.log('AutoBid updated successfully:', data)
    },
    onError: (error) => {
      console.error('Error updating AutoBid:', error)
    }
  })
}