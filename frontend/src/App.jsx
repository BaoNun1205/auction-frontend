import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes, adminRoutes, privateRoutes } from './routes/routes'
import RequireAuth from './routes/RequireAuth'
import Login from './pages/Authentication/LoginPage'
import { useAppStore } from './store/appStore'
import { introspect } from './api/authApi'
import { useRefreshToken } from './hooks/authHook'

function App() {
  const [routes, setRoutes] = useState([...privateRoutes, ...publicRoutes]);
  const { auth } = useAppStore();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { mutate: refreshToken } = useRefreshToken();

  useEffect(() => {
    const validateToken = async () => {
      if (auth.token) {
        try {
          const data = await introspect(auth.token);
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

    if (auth.token) {
      validateToken();
    } else {
      setIsLoading(false);
    }
  }, [auth.token]);

  useEffect(() => {
    if (!isLoading && !isValid && auth.token) {
      setIsRefreshing(true);
      refreshToken({
        onSuccess: () => {
          setIsRefreshing(false);
          window.location.reload();
        },
        onError: () => {
          setIsRefreshing(false);
        },
      });
    }
  }, [isLoading, isValid, refreshToken, auth.token]);

  useEffect(() => {
    if (auth.role === 'ROLE_ADMIN') {
      setRoutes(adminRoutes);
    } else if (auth.role === 'ROLE_USER') {
      setRoutes([...privateRoutes, ...publicRoutes]);
    } else {
      setRoutes([...privateRoutes, ...publicRoutes]);
    }
  }, [auth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth isValid={isValid} />}>
          {routes.map((route) => {
            const Page = route.page
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Page />}
              />
            )
          })}
        </Route>
      </Routes>
    </Router>
  )

}

export default App
