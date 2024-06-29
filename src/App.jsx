import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import './App.css'

import Home from './components/Home/Home';
import Login from './components/login/Login';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
