import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes, adminRoutes, customerRoutes } from './routes/routes'
import RequireAuth from './routes/RequireAuth'
import Login from './pages/Authentication/LoginPage'
import { useAppStore } from './store/appStore'

function App() {
  const [routes, setRoutes] = useState(publicRoutes);
  const { auth } = useAppStore();

  useEffect(() => {
    if (auth.role === 'ROLE_ADMIN') {
      setRoutes(adminRoutes);
    } else if (auth.role === 'ROLE_USER') {
      setRoutes([...customerRoutes, ...publicRoutes]);
    } else {
      setRoutes(publicRoutes);
    }
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
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
