import React, { createContext, useContext, useEffect, useState } from 'react'

export const Context = createContext()

export const useOwner = () => {
  return useContext(Context)
}

export const ContextProvider = ({ children }) => {
  const [owner, setOwner] = useState(true)

  const handleOwner = () => {
    setOwner(!owner)
  }

  useEffect(() => {
    console.log('owner: ' + owner)
  }, [owner])

  const value = {
    owner,
    handleOwner,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
