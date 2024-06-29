import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import './App.css'

import Home from './components/Home/Home';
import Login from './components/login/Login';
import Setuser from './components/menu/Setuser';
import Menus from './components/menu/Menus';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/setuser' element={<Setuser />} />
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Login/>} />
          <Route path='/menu' element={<Menus />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
