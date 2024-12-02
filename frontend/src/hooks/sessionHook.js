import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createSesion, getSessionById, filterSessions } from '~/api/sessionApi'

export const useCreateSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSesion,
    onSuccess: (data) => {
      console.log('Session created successfully:', data)
      // Invalidate queries or perform other actions
      // queryClient.invalidateQueries(['session'])
    },
    onError: (error) => {
      console.error('Error creating session:', error)
    }
  })
}

export const useFilterSessions = (payload) => {
  return useQuery({
    queryKey: ['filteredSessions', payload],
    queryFn: () => filterSessions(payload),
    onError: (error) => {
      console.error('Error fetching filtered sessions:', error)
    }
  })
}

export const useGetSessionById = (sessionId) => {
  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => getSessionById(sessionId)
  })
}