import { useState } from 'react'
import { supabase } from '../supabase'
import logo from '../assets/logo.png'

const Auth = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handleEmail = newEmail => {
    setEmail(newEmail)
  }

  const handlePassword = newPassword => {
    setPassword(newPassword)
  }

  const handleLogin = e => {
    e.preventDefault()
    console.log('login', email, password)
  }

  const handleSignUp = async e => {
    e.preventDefault()
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      console.log('unable to signUp', email, password)
    } else {
      console.log('signed up')
    }
  }

  return (
    <div className='container-md d-flex justify-content-center'>
      <div className='card text-center p-4 mt-5'>
        <div className='logo-container'>
          <img src={logo} alt='logo' className='logo align-top' />
          <h4 className='card-title pt-3'>Woof Watchers</h4>
        </div>
        <div className='card-body'>
          <form className='p-1' method='POST'>
            <div className='form-group-sm'>
              <input
                className='mb-2'
                type='text'
                id='email'
                name='email'
                placeholder='example@email.com'
                onChange={e => handleEmail(e.target.value)}
              />
            </div>
            <div className='form-group-sm'>
              <input
                className='mb-2'
                type='password'
                id='password'
                name='password'
                placeholder='*********'
                onChange={e => handlePassword(e.target.value)}
              />
            </div>
            <div>
              <button
                className='btn btn-outline-success btn-sm w-50 m-1'
                onClick={e => handleLogin(e)}>
                Login
              </button>
              <button
                className='btn btn-outline-success btn-sm m-1 w-50'
                onClick={e => handleSignUp(e)}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth
