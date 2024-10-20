// hooks/useAuth.js
import { useMutation, useQueryClient } from 'react-query'
import { getToken, logout, register, confirmAccount, refreshToken, introspect } from '~/api/authApi'
import { useAppStore } from '~/store/appStore'

// Hook để lấy token
export const useGetToken = () => {
  const setToken = useAppStore((state) => state.setToken)

  return useMutation(getToken, {
    onSuccess: (data) => {
      setToken(data.result.token)

      console.log('Token retrieved successfully:', data)
    },
    onError: (error) => {
      console.error('Error retrieving token:', error)
    }
  }
  )
}

// Hook để refresh token
export const useRefreshToken = () => {
  const setToken = useAppStore((state) => state.setToken);

  return useMutation(refreshToken, {
    onSuccess: (data) => {
      if (data && data.token) {
        setToken(data.token);
        console.log('Token refreshed successfully:', data);
      } else {
        console.error('Invalid response structure:', data);
      }
    },
    onError: (error) => {
      console.error('Error refreshing token:', error);
    }
  });
};

// Hook để logout
export const useLogout = () => {
  const queryClient = useQueryClient()
  const setToken = useAppStore((state) => state.setToken)

  return useMutation(() => logout(), {
    onSuccess: (data) => {
      if (data.code === 1000) {
        setToken('')
        console.log('Logged out successfully')
        // Invalidate queries or perform other actions
        queryClient.invalidateQueries('user')
      }
    },
    onError: (error) => {
      console.error('Error logging out:', error)
    }
  })
}

// Hook để đăng ký
export const useRegister = () => {
  return useMutation(register, {
    onSuccess: (data) => {
      console.log('Registration successful:', data)
    },
    onError: (error) => {
      console.error('Error registering:', error)
    }
  })
}

// Hook để xác nhận tài khoản
export const useConfirmAccount = () => {
  return useMutation((token) => confirmAccount(token), {
    onSuccess: (data) => {
      console.log('Account confirmation successful:', data)
    },
    onError: (error) => {
      console.error('Error confirming account:', error)
    }
  })
}

// Hook để introspect token
// export const useIntrospect = () => {
//   const token = useAppStore.getState().token
//   return useMutation(introspect(token), {
//     onSuccess: (data) => {
//       if (data.valid === true) {
//         return token
//       } else {
        
//       }
//     },
//     onError: (error) => {
//       console.error('Error introspecting token:', error)
//     }
//   })
// }
