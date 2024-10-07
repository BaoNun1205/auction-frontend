import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/routes'
import RequireAuth from './routes/RequireAuth'
import Login from './pages/Authentication/Login'

function App() {

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
