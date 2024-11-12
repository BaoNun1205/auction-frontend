import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppStore } from '~/store/appStore'
import { jwtDecode } from 'jwt-decode'
import { useIntrospect } from '~/hooks/authHook'

const RequireAuth = () => {
  const token = useAppStore.getState().token

  // Cho phép truy cập vào /register mà không cần xác thực
  if (location.pathname === '/register') {
    return <Outlet />
  }

  if (token) {
    try {
      const decodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000
      if (decodedToken.exp < currentTime) {
        // Token đã hết hạn
        return <Navigate to="/login" />
      }

      // Token còn hợp lệ
      return <Outlet />
    } catch (error) {
      console.error('Invalid token:', error)
      return <Navigate to="/login" />
    }
  }

  // Không có token
  return <Navigate to="/login" />
}

export default RequireAuth

// import React, { useEffect } from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAppStore } from '~/store/appStore';
// import { useIntrospect } from '~/hooks/authHook';

// const RequireAuth = () => {
//   const token = useAppStore.getState().token;
//   const location = useLocation();
//   const { mutate: introspectToken, data: introspectData, isLoading, isError } = useIntrospect();

//   useEffect(() => {
//     if (token) {
//       introspectToken();
//     }
//   }, [token, introspectToken]);

//   // Allow access to /register without authentication
//   if (location.pathname === '/register') {
//     return <Outlet />;
//   }

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError || !introspectData?.result?.valid) {
//     return <Navigate to="/login" />;
//   }

//   // Token is valid
//   return <Outlet />;
// };

// export default RequireAuth;