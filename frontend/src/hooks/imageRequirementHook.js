import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createImageRequirement } from '~/api/imageRequirementApi'

export const useCreateImageRequirement = () => {
  const queryClient = useQueryClient()

  return useMutation(createImageRequirement, {
    onSuccess: (data) => {
      console.log('Image Requirement created successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries('requirement')
    },
    onError: (error) => {
      console.error('Error creating requirement:', error)
    }
  })
}