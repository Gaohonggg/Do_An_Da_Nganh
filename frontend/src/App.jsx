import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import LoginSignup from './pages/LoginSignup/LoginSignup'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'

const App = () => {

  return (
    <div className='app'>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element ={<LoginSignup/>}/>
        </Routes>
    </div>
  )
}

export default App
