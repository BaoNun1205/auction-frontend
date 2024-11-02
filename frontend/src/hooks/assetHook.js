import { useQuery, useMutation, useQueryClient } from 'react-query'
import { createAsset, filterAssets } from '~/api/asset'

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

export const useFilterAssets = (vendorId, assetName, minPrice, maxPrice, inspectorId, typeId, status, page, size) => {
  return useQuery(
    ['filterAssets', { vendorId, assetName, minPrice, maxPrice, inspectorId, typeId, status, page, size }],
    () => filterAssets({ vendorId, assetName, minPrice, maxPrice, inspectorId, typeId, status, page, size }),
    {
      onError: (error) => {
        console.error('Error fetching filtered assets:', error)
      }
    }
  )
}