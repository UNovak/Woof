import React, { createContext, useContext, useEffect, useState } from 'react'

export const Context = createContext()

export const useGlobal = () => {
  return useContext(Context)
}

export const ContextProvider = ({ children }) => {
  const [owner, setOwner] = useState(true)
  const [type, setType] = useState('')

  const handleOwner = () => {
    setOwner(!owner)
  }

  useEffect(() => {
    console.log('owner: ' + owner)
  }, [owner])

  const value = {
    owner,
    handleOwner,
    type,
    setType,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
