import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes, adminRoutes, privateRoutes } from './routes/routes'
import RequireAuth from './routes/RequireAuth'
import Login from './pages/Authentication/LoginPage'
import { useAppStore } from './store/appStore'
import { introspect } from './api/authApi'
import { useLogout, useRefreshToken } from './hooks/authHook'
import ChatButton from './features/Chat/ChatBot'
import { ToastProvider } from './utils/ToastContext'
import AppLoadingScreen from './components/AppLoadingScreen'
import NotFoundPage from './pages/Customer/NotFoundPage'

function App() {
  const [routes, setRoutes] = useState([...privateRoutes, ...publicRoutes])
  const [isValid, setIsValid] = useState(true) // Mặc định là true để không bị logout về /login ngay khi đăng nhập mới
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { mutate: refreshToken } = useRefreshToken()
  const { mutate: logoutFn } = useLogout()

  const getToken = () => useAppStore.getState().auth.token
  const getRole = () => useAppStore.getState().auth.role

  useEffect(() => {
    const validateToken = async () => {
      const token = getToken()
      if (token) {
        try {
          const data = await introspect(token)
          setIsValid(data?.result?.valid)
          console.log('Token introspection result:', data?.result?.valid)
        } catch (error) {
          console.error('Error introspecting token:', error)
          setIsValid(false)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    validateToken()
  }, [])

  useEffect(() => {
    if (!isLoading && isValid && getToken()) {
      setIsRefreshing(true)
      refreshToken({
        onSuccess: () => {
          setIsRefreshing(false)
        },
        onError: () => {
          setIsRefreshing(false)
          window.location.reload()
        }
      })
    } else if (!isValid && !isLoading) {
      logoutFn()
    };
  }, [isLoading, isValid, refreshToken])

  useEffect(() => {
    const role = getRole()
    if (role === 'ROLE_ADMIN') {
      setRoutes(adminRoutes)
    } else if (role === 'ROLE_USER') {
      setRoutes([...privateRoutes, ...publicRoutes])
    } else {
      setRoutes([...privateRoutes, ...publicRoutes])
    }
  }, [getRole()])

  if (isLoading) {
    return <AppLoadingScreen />
  }

  return (
    <ToastProvider>
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
          {/* Catch-all route for 404 - must be last */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ChatButton />
      </Router>
    </ToastProvider>
  )
}

export default App
