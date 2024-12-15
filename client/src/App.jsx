import { useState } from 'react'
import './App.css'
import Profile from './components/profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Header from './components/header';

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/index'  element={<Profile />} />
        <Route path='/register'  element={<Register />} />

      </Routes>
    
    </Router>
  )
}

export default App
