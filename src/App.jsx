import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// util imports
import Private from './utils/private'
import { supabase } from './utils/supabase'
import { ContextProvider } from './utils/context'

// page imports
import Auth from './pages/Auth'
import Home from './pages/home'
import Settings from './pages/Settings'
import Search from './pages/search'
import Register from './pages/register'

const App = () => {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedSession = sessionStorage.getItem('session')
    const storedId = sessionStorage.getItem('id')

    if (storedSession) {
      setSession(JSON.parse(storedSession))
      setId(JSON.parse(storedId))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    setLoading(true)
    const getID = async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id')

      if (error) {
        console.log('Error fetching profiles:', error)
        return
      } else {
        setId(profiles)
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
    setLoading(false)
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
