import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { defaultRoutes, publicRoutes, adminRoutes, customerRoutes } from './routes/routes'
import RequireAuth from './routes/RequireAuth'
import Login from './pages/Authentication/Login'
import { useAppStore } from './store/appStore'

function App() {
  const [routes, setRoutes] = useState(defaultRoutes);
  const role = useAppStore((state) => state.role);
  console.log('role: ', role);

  useEffect(() => {
    if (role === 'ROLE_ADMIN') {
      setRoutes([...publicRoutes, ...adminRoutes]);
    } else if (role === 'ROLE_USER') {
      setRoutes(customerRoutes);
    } else {
      setRoutes(publicRoutes);
    }
  }, [role]);

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
