import './App.css'
import { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Private from './utils/private'
import { supabase } from './supabase'
import { ContextProvider } from './utils/context'

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
  const [id, setID] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setID(id)
  }, [id])

  useEffect(() => {
    const storedSession = sessionStorage.getItem('session')
    const storedID = sessionStorage.getItem('id')

    if (storedSession) {
      setSession(JSON.parse(storedSession))
      setID(JSON.parse(storedID))
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    const getID = async () => {
      let { data: profiles, error } = await supabase
        .from('profiles')
        .select('id')

      if (error) {
        console.log(error)
      } else {
        setID(profiles)
        sessionStorage.setItem('id', JSON.stringify(profiles))
      }
    }

    if (session === null) {
      sessionStorage.clear()
    } else {
      getID()
      sessionStorage.setItem('id', JSON.stringify(id))
      sessionStorage.setItem('session', JSON.stringify(session))
    }
  }, [session])

  const handleAuthentication = value => {
    setSession(value)
  }

  return (
    <ContextProvider>
      <Routes>
        <Route element={<Private session={session} status={loading} />}>
          <Route element={<Home id={id} />} path='/' />
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

// TODO - store login info in session data
// TODO - useContext for session/logged_in?
