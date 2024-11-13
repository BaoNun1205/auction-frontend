import { useQuery, useMutation, useQueryClient } from 'react-query'
import { createAsset, filterAssets, getAssetById } from '~/api/assetApi'

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

export const useGetAssetById = (assetId) => {
  return useQuery(['asset', assetId], () => getAssetById(assetId))
}

export const useFilterAssets = (payload) => {
  return useQuery(
    ['filterAssets', payload],
    () => filterAssets(payload),
    {
      onError: (error) => {
        console.error('Error fetching filtered assets:', error)
      }
    }
  )
}