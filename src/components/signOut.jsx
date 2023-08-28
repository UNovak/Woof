import React from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'

const SignOut = () => {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
    } else {
      sessionStorage.clear()
      console.log('signedOut')
      navigate('/login')
    }
  }

  return (
    <div
      className='btn btn-danger btn-sm p-2 m-2'
      onClick={() => handleSignOut()}>
      Sign Out
    </div>
  )
}

export default SignOut
