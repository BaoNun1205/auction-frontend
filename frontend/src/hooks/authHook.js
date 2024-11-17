// hooks/useAuth.js
import { set } from 'date-fns'
import { useMutation, useQueryClient } from 'react-query'
import { Navigate, useNavigate } from 'react-router-dom'
import { getToken, logout, register, confirmAccount, refreshToken, introspect } from '~/api/authApi'
import { useAppStore } from '~/store/appStore'
import parseToken from '~/utils/parseToken'

// Hook để lấy token
export const useGetToken = () => {
  const { setAuth } = useAppStore()
  const navigate = useNavigate()

  return useMutation(getToken, {
    onSuccess: (data) => {
      const token = data.result.token;
      const decoded = parseToken(token);
      if (decoded && decoded.scope) {
        const auth = {
          token,
          role: decoded.scope,
          isAuth: true,
          user: {
            id: decoded.jti,
            username: decoded.sub,
          },
        };
        setAuth(auth);

        navigate('/');
      }
      n
    },
    onError: (error) => {
      console.error('Error retrieving token:', error)
    }
  }
  )
}

// Hook để refresh token
export const useRefreshToken = () => {
  const { auth, setAuth } = useAppStore();

  return useMutation(() => refreshToken(auth.token), {
    onSuccess: (data) => {
      if (data && data.result.token) {
        setAuth({ ...auth, token: data.result.token });
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
  const { auth, setAuth } = useAppStore();

  return useMutation(() => logout(auth.token), {
    onSuccess: (data) => {
      if (data.code === 1000) {
        setAuth({ token: '', role: '', isAuth: false, user: { id: '', username: '' } })
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
export const useIntrospect = () => {
  return useMutation(introspect, {
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error('Error introspecting token:', error);
    }
  });
}
