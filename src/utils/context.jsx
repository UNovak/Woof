import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'

export const Context = createContext()

export const useGlobal = () => {
  return useContext(Context)
}

export const ContextProvider = ({ children }) => {
  const [owner, setOwner] = useState(true)
  const [type, setType] = useState('')
  const [id, setId] = useState(null)

  const handleOwner = () => {
    setOwner(!owner)
  }

  useEffect(() => {
    fetchId()
  }, [])

  useEffect(() => {
    if (id === null) {
      fetchId()
    }
  }, [owner, id])

  const fetchId = async () => {
    let { data: profiles, error } = await supabase.from('profiles').select('id')
    if (error) console.log(error)
    else {
      setId(profiles[0].id)
    }
  }

  const value = {
    owner,
    handleOwner,
    type,
    setType,
    id,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
