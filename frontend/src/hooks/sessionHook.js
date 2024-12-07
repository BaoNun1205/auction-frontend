import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createSesion, getSessionById, filterSessions, getRelatedSessions, updateSesion, registerSesion, getRegistedSession, checkRegisted, getUsersRegisted, getWinSessionsByUserId, getSessionByAssetId } from '~/api/sessionApi'

export const useCreateSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSesion,
    onSuccess: (data) => {
      console.log('Session created successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['filteredSessions'])
    },
    onError: (error) => {
      console.error('Error creating session:', error)
    }
  })
}

export const useRegisterSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerSesion,
    onSuccess: (data) => {
      console.log('Session registered successfully:', data);
      queryClient.invalidateQueries(['filteredSessions']);
    },
    onError: (error) => {
      console.error('Error registering session:', error);
    },
  });
};

export const useCheckRegisted = (payload) => {
  return useQuery({
    queryKey: ['checkRegisted', payload],
    queryFn: () => checkRegisted(payload),
    onError: (error) => {
      console.error('Error checking registration status:', error);
    },
  });
};

export const useGetUsersRegisted = (id) => {
  return useQuery({
    queryKey: ['getUsersRegisted', id],
    queryFn: () => getUsersRegisted(id),
    onError: (error) => {
      console.error('Error fetching registered users:', error);
    },
  });
};

export const useUpdateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateSesion(id, payload),
    onSuccess: (data) => {
      console.log('Session updated successfully:', data);
      queryClient.invalidateQueries(['filteredSessions'])
    },
    onError: (error) => {
      console.error('Error updating session:', error);
    },
  });
};

export const useFilterSessions = (payload) => {
  return useQuery({
    queryKey: ['filteredSessions', payload],
    queryFn: () => filterSessions(payload),
    onError: (error) => {
      console.error('Error fetching filtered sessions:', error)
    }
  })
}

export const useGetRegistedSessionByUserId = (userId) => {
  return useQuery({
    queryKey: ['registeredSessionByUserId', userId],
    queryFn: () => getRegistedSession(userId)
  })
}

export const useGetSessionById = (sessionId) => {
  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => getSessionById(sessionId)
  })
}

export const useGetSessionByAssetId = (assetId) => {
  return useQuery({
    queryKey: ['sessionByAssetId', assetId],
    queryFn: () => getSessionByAssetId(assetId),
    onError: (error) => {
      console.error('Error fetching session by asset ID:', error);
    },
  });
};

export const useGetRelatedSessions = (id) => {
  return useQuery({
    queryKey: ['relatedSessions', id],
    queryFn: () => getRelatedSessions(id),
    onError: (error) => {
      console.error('Error fetching related sessions:', error);
    },
  });
};

export const useGetWinSessionsByUserId = (id) => {
  return useQuery({
    queryKey: ['getWinSessionsByUserId', id],
    queryFn: () => getWinSessionsByUserId(id),
    onError: (error) => {
      console.error('Error fetching winning sessions:', error);
    },
  });
};