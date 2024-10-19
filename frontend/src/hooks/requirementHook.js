import { useQuery, useMutation, useQueryClient } from 'react-query'

import { createRequirement } from '~/api/requirementApi'

// Hook để tạo danh mục mới
export const useCreateRequirement = () => {
  const queryClient = useQueryClient()

  return useMutation(createRequirement, {
    onSuccess: (data) => {
      console.log('Requirement created successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries('Requirement')
    },
    onError: (error) => {
      console.error('Error creating Requirement:', error)
    }
  })
}