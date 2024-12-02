import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTypes, filterTypes, createType, deleteType, restoreType } from '~/api/typeApi'

export const useGetTypes = () => {
  return useQuery({
    queryKey: ['types'],
    queryFn: getTypes,
  });
}

export const useFilterTypes = (payload) => {
  return useQuery({
    queryKey: ['filteredTypes', payload],
    queryFn: () => filterTypes(payload),
    onError: (error) => {
      console.error('Error fetching filtered types:', error)
    }
  });
}

export const useCreateType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (name) => createType(name),
    onSuccess: (data) => {
      console.log('Type created successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['types'])
    },
    onError: (error) => {
      console.error('Error creating type:', error)
    }
  });
}

export const useDeleteType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (typeId) => deleteType(typeId),
    onSuccess: (data) => {
      console.log('Type deleted successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['types'])
    },
    onError: (error) => {
      console.error('Error deleting type:', error)
    }
  });
}

export const useRestoreType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (typeId) => restoreType(typeId),
    onSuccess: (data) => {
      console.log('Type restored successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['types'])
    },
    onError: (error) => {
      console.error('Error restoring type:', error)
    }
  });
}