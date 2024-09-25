import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/routes'

function App() {

  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const Page = route.page
          return (
            <Route key={route} path={route.path} element={
              <Page />
            }/>
          )
        })}
      </Routes>
    </Router>
  )

}

export default App
