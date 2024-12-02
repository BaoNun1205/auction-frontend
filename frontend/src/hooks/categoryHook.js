import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCategories, filterCategories, createCategory, deleteCategory, restoreCategory } from '~/api/categoryApi'

// Hook để lấy danh mục
export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}

// Hook để lọc danh mục
export const useFilterCategories = (payload) => {
  return useQuery({
    queryKey: ['filteredCategories', payload],
    queryFn: () => filterCategories(payload),
    onError: (error) => {
      console.error('Error fetching filtered categories:', error)
    }
  });
}

// Hook để tạo danh mục mới
export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      console.log('Category created successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['categories'])
    },
    onError: (error) => {
      console.error('Error creating category:', error)
    }
  });
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (categoryId) => deleteCategory(categoryId),
    onSuccess: (data) => {
      console.log('Category deleted successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['categories'])
    },
    onError: (error) => {
      console.error('Error deleting category:', error)
    }
  });
}

export const useRestoreCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (categoryId) => restoreCategory(categoryId),
    onSuccess: (data) => {
      console.log('Category restored successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['categories'])
    },
    onError: (error) => {
      console.error('Error restoring category:', error)
    }
  });
}