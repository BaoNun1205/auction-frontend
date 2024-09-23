import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/routes'

function App() {

  return (
    <Router>
      <Routes>
        {/* <Route path="/" exact element={<Home />} />
        <Route path="/product/list" element={<ProductList />} />
        <Route path='/authentication' element={<Authentication />} />
        <Route path="/users" element={<User />} />
        <Route path="/confirm-account" element={<ConfirmAccount />} /> */}
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
