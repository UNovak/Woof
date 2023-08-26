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
    } else {
      setLoggedIn(true)
    }
    console.log(session)
  }, [session])

  const handleAuthentication = value => {
    setSession(value)
  }

  return (
    <Routes>
      <Route element={<Private session={session} />}>
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

// TODO - store login info in session data
// TODO - useContext for session/logged_in?
