import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getTypes, filterTypes, createType, deleteType, restoreType } from '~/api/typeApi'

export const useGetTypes = () => {
  return useQuery('types', getTypes)
}

export const useFilterTypes = (payload) => {
  return useQuery(
    ['filteredTypes', payload],
    () => filterTypes(payload),
    {
      onError: (error) => {
        console.error('Error fetching filtered types:', error)
      }
    }
  )
}

export const useCreateType = () => {
  const queryClient = useQueryClient()

  return useMutation((name) => createType(name), {
    onSuccess: (data) => {
      console.log('Type created successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries('type')
    },
    onError: (error) => {
      console.error('Error creating type:', error)
    }
  })
}

export const useDeleteType = () => {
  const queryClient = useQueryClient()

  return useMutation((typeId) => deleteType(typeId), {
    onSuccess: (data) => {
      console.log('Type deleted successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries('type')
    },
    onError: (error) => {
      console.error('Error deleting type:', error)
    }
  })
}

export const useRestoreType = () => {
  const queryClient = useQueryClient()

  return useMutation((typeId) => restoreType(typeId), {
    onSuccess: (data) => {
      console.log('Type deleted successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries('type')
    },
    onError: (error) => {
      console.error('Error deleting type:', error)
    }
  })
}