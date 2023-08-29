import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// util imports
import Private from './utils/private'
import { supabase } from './utils/supabase'
import { ContextProvider } from './utils/context'

// page imports
import Auth from './pages/auth'
import Home from './pages/home'
import Settings from './pages/settings'
import Search from './pages/search'
import Register from './pages/register'

const App = () => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedSession = sessionStorage.getItem('session')
    const storedId = sessionStorage.getItem('id')

    if (storedSession && storedId) {
      setSession(JSON.parse(storedSession))
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    if (session === null) {
      sessionStorage.clear()
    } else {
      sessionStorage.setItem('session', JSON.stringify(session))
    }
    setLoading(false)
  }, [session])

  const handleAuthentication = value => {
    setSession(value)
  }

  return (
      <ContextProvider>
        <Routes>
          <Route element={<Private session={session} status={loading} />}>
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
      </ContextProvider>
  )
}

export default App

//BUG: State managment
// you need to refresh the page often or see no results?
// possible error in component
