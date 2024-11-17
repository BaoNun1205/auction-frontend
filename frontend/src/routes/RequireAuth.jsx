import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppStore } from '~/store/appStore';
import { introspect } from '~/api/authApi';
import { privateRoutes } from './routes';

const RequireAuth = ({ isValid }) => {

  const isPrivateRoute = privateRoutes.some(route => route.path === location.pathname);

  if (!isValid && isPrivateRoute) {
    return <Navigate to="/login" />;
  }

  // Token is valid
  return <Outlet />;
};

export default RequireAuth;

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
//       introspectToken(token);
//     }
//   }, [token, introspectToken]);

//   if (location.pathname === '/register' || location.pathname === '/confirm-account') {
//     return <Outlet />;
//   }

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError || introspectData?.result?.valid === false) {
//     return <Navigate to="/login" />;
//   }

//   // Token is valid
//   return <Outlet />;
// };

// export default RequireAuth;