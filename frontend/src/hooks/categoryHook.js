import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getCategory, filterCategories, createCategory, deleteCategory, restoreCategory } from '~/api/categoryApi';

// Hook để lấy danh mục
export const useGetCategory = () => {
  return useQuery('category', getCategory);
};

// Hook để lọc danh mục
export const useFilterCategories = (status, keyword) => {
  return useQuery(
    ['filteredCategories', { status, keyword }],
    () => filterCategories({ status, keyword }),
    {
      onError: (error) => {
        console.error('Error fetching filtered categories:', error)
      }
    }
  )
}

// Hook để tạo danh mục mới
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation((name) => createCategory(name), {
    onSuccess: (data) => {
      console.log('Category created successfully:', data);
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries('category');
    },
    onError: (error) => {
      console.error('Error creating category:', error);
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation((categoryId) => deleteCategory(categoryId), {
    onSuccess: (data) => {
      console.log('Category deleted successfully:', data);
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries('category');
    },
    onError: (error) => {
      console.error('Error deleting category:', error);
    }
  });
};

export const useRestoreCategory = () => {
  const queryClient = useQueryClient();

  return useMutation((categoryId) => restoreCategory(categoryId), {
    onSuccess: (data) => {
      console.log('Category deleted successfully:', data);
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries('category');
    },
    onError: (error) => {
      console.error('Error deleting category:', error);
    }
  });
};