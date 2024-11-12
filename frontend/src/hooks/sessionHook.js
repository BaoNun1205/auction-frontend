import { useQuery, useMutation, useQueryClient } from 'react-query'
import { createSesion, getSessionById, filteredSessions } from '~/api/sessionApi'

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

export const useFilterSessions = (status, fromDate, toDate, keyword, page, size) => {
  return useQuery(
    ['filteredRequirements', { status, fromDate, toDate, keyword, page, size }],
    () => filteredSessions({ status, fromDate, toDate, keyword, page, size }),
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