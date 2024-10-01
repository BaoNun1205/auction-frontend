// hooks/useAuth.js
import { useMutation, useQueryClient } from 'react-query'
import { getToken, logout, register, confirmAccount } from '~/api/authApi'
import { useAppStore } from '~/store/appStore'

// Hook để lấy token
export const useGetToken = () => {
  const setToken = useAppStore((state) => state.setToken)

  return useMutation(({ username, password }) => getToken(username, password), {
    onSuccess: (data) => {
      // Lưu token vào zustand store
      setToken(data.token)
      console.log('Token retrieved successfully:', data)
    },
    onError: (error) => {
      console.error('Error retrieving token:', error)
    }
  })
}

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
  return useMutation(({ username, password, email }) => register(username, password, email), {
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