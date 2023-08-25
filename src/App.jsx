import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Private from './utils/private'

// component imports
import Navbar from './components/navbar'

// page imports
import Auth from './pages/Auth'
import Home from './pages/home'
import Settings from './pages/Settings'
import Search from './pages/search'
import Register from './pages/register'

const App = () => {
  const [session, setSession] = useState(null)
  const [logged_in, setLoggedIn] = useState(true)

  useEffect(() => {
    if (session === null) {
      setLoggedIn(false)
      console.log(`is login status: ${logged_in}`)
    } else {
      setLoggedIn(true)
      console.log(`is logged in: ${logged_in}`)
    }
  }, [session, logged_in])

  const handleAuthentication = value => {
    setSession(value)
  }

  return (
    <Routes>
      <Route element={<Private status={logged_in} />}>
        <Route element={<Home />} path='/' />
        <Route element={<Settings />} path='settings' />
        <Route element={<Search />} path='search' />
        <Route element={<Register />} path='register' />
      </Route>
      <Route
        element={<Auth onAuthentication={handleAuthentication} />}
        path='/login'
      />
    </Routes>
  )
}

export default App
