import { useQuery, useMutation, useQueryClient } from 'react-query'
import { createSesion, getSessionById, filterSessions } from '~/api/sessionApi'

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

export const useFilterSessions = (payload) => {
  return useQuery(
    ['filteredRequirements', payload],
    () => filterSessions(payload),
    {
      onError: (error) => {
        console.error('Error fetching filtered categories:', error)
      }
    }
  )
}

export const useGetSessionById = (sessionId) => {
  return useQuery(['session', sessionId], () => getSessionById(sessionId))
}