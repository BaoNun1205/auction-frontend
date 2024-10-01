import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppStore } from '~/store/appStore'
import { jwtDecode } from 'jwt-decode'

const RequireAuth = () => {
  const token = useAppStore.getState().token

  if (token) {
    try {
      const decodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000 // Thời gian hiện tại tính bằng giây

      if (decodedToken.exp < currentTime) {
        // Token đã hết hạn
        return <Navigate to="/authentication" />
      }

      // Token còn hợp lệ
      return <Outlet />
    } catch (error) {
      console.error('Invalid token:', error)
      return <Navigate to="/authentication" />
    }
  }

  // Không có token
  return <Navigate to="/authentication" />
}

export default RequireAuth