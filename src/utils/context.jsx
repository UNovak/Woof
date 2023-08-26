import React, { createContext, useContext, useState } from 'react'

export const Context = createContext()

export const useOwner = () => {
  return useContext(Context)
}

export const ContextProvider = ({ children }) => {
  const [owner, setOwner] = useState(false)

  const handleOwner = () => {
    setOwner(!owner)
    console.log('owner:', owner)
  }

  const value = {
    owner,
    handleOwner,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
