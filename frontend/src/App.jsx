import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Requirement from './pages/Requirement'
import Session from './pages/Session'
import Authentication from './pages/authentication'
import User from './pages/User'
import ConfirmAccount from './pages/authentication/comfirm'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/requirement" exact element={<Requirement />} />
        <Route path="/product" element={<Product />} />
        <Route path="/session" element={<Session />} />
        <Route path='/authentication' element={<Authentication />} />
        <Route path="/users" element={<User />} />
        <Route path="/confirm-account" element={<ConfirmAccount />} />
      </Routes>
    </Router>
  )

}

export default App
