import './App.css'
import { useState, useEffect } from 'react'

// pages imports
import Auth from './pages/Auth'

const App = () => {
  const [session, setSession] = useState(null)
  const [logged_in, setLoggedIn] = useState(false)

  useEffect(() => {
    if (session === null) {
      setLoggedIn(false)
      console.log(`is login status: ${logged_in}`)
    } else {
      setLoggedIn(true)
      console.log(`is logged in: ${logged_in}`)
    }
  }, [session, logged_in])

  const handleAuthentication = (value) => {
    setSession(value)
  }

  return <Auth onAuthentication={ handleAuthentication } />
}

export default App
