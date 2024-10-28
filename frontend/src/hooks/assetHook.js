import { useQuery, useMutation, useQueryClient } from 'react-query'
import { createAsset } from '~/api/asset'

export const useCreateAsset = () => {
    const queryClient = useQueryClient()
  
    return useMutation(createAsset, {
      onSuccess: (data) => {
        console.log('Asset created successfully:', data)
        // Invalidate queries or perform other actions
        queryClient.invalidateQueries('asset')
      },
      onError: (error) => {
        console.error('Error creating asset:', error)
      }
    })
  }