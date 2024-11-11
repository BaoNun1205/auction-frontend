import { useQuery, useMutation, useQueryClient } from 'react-query'
import { createSesion } from '~/api/session'

export const useCreateSession = () => {
  const queryClient = useQueryClient()

  return useMutation(createSesion, {
    onSuccess: (data) => {
      console.log('Session created successfully:', data)
      // Invalidate queries or perform other actions
    //   queryClient.invalidateQueries('session')
    },
    onError: (error) => {
      console.error('Error creating asset:', error)
    }
  })
}