import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppStore } from '~/store/appStore';
import { introspect } from '~/api/authApi';

const RequireAuth = () => {
  const token = useAppStore.getState().token;
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const data = await introspect(token);
          setIsValid(data?.result?.valid);
        } catch (error) {
          console.error('Error introspecting token:', error);
          setIsValid(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (!isValid) {
  //   return <Navigate to="/login" />;
  // }

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