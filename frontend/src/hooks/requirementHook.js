import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getRequirement, createRequirement, filteredRequirements } from '~/api/requirementApi'

// Hook để lấy danh sách yêu cầu
export const useGetRequirement = () => {
  return useQuery('Requirement', getRequirement)
}

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

export const useFilterRequirements = (status, keyword) => {
  return useQuery(
    ['filteredRequirements', { status, keyword }],
    () => filteredRequirements({ status, keyword }),
    {
      onError: (error) => {
        console.error('Error fetching filtered categories:', error)
      }
    }
  )
}