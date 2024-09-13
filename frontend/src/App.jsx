import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Requirement from './pages/Requirement'
import Session from './pages/Session'
import Authentication from './pages/authentication'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/requirement" exact element={<Requirement />} />
        <Route path="/product" element={<Product />} />
        <Route path="/session" element={<Session />} />
        <Route path='/authentication' element={<Authentication />} />
      </Routes>
    </Router>
  )

}

export default App
