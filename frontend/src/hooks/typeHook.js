import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getType, filterTypes, createType, deleteType, restoreType } from '~/api/typeApi'

// Hook để lấy danh mục
export const useGetCategory = () => {
  return useQuery('type', getType)
}

// Hook để lọc danh mục
export const useFilterTypes = (status, keyword) => {
  return useQuery(
    ['filteredTypes', { status, keyword }],
    () => filterTypes({ status, keyword }),
    {
      onError: (error) => {
        console.error('Error fetching filtered types:', error)
      }
    }
  )
}

// Hook để tạo danh mục mới
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