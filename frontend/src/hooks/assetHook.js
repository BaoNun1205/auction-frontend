import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createAsset, filterAssets, getAssetById } from '~/api/assetApi';

export const useCreateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAsset,
    onSuccess: (data) => {
      console.log('Asset created successfully:', data);
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['asset']);
    },
    onError: (error) => {
      console.error('Error creating asset:', error);
    },
  });
};

export const useGetAssetById = (assetId) => {
  return useQuery({
    queryKey: ['asset', assetId],
    queryFn: () => getAssetById(assetId),
  });
};

export const useFilterAssets = (payload) => {
  return useQuery({
    queryKey: ['filterAssets', payload],
    queryFn: () => filterAssets(payload),
    onError: (error) => {
      console.error('Error fetching filtered assets:', error);
    },
  });
};