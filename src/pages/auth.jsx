import { useState } from 'react'
import { supabase } from '../supabase'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Auth = ({ onAuthentication }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [login_loading, setLogin_loading] = useState(false)
  const [signUp_loading, setSignUp_loading] = useState(false)

  const handleLogin = async e => {
    e.preventDefault()
    setLogin_loading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    console.log(supabase.auth.getSession())

    if (error) {
      console.log('Faild to login with error: ' + error)
    } else {
      // console.log('logged in')
      // console.log('user:', data.user)
      // console.log('session:', data.session)
      onAuthentication(data.session)
      navigate('/')
    }
    setLogin_loading(false)
  }

  const handleSignUp = async e => {
    e.preventDefault()
    setSignUp_loading(true)

    // eslint-disable-next-line no-unused-vars
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      console.log('unable to signUp', email, password)
      console.log('with error:' + error)
    } else {
      // console.log('signed up')
      // console.log('user:', data.user)
      // console.log('session:', data.session)
      onAuthentication(data.session)
      navigate('/register')
    }
    setSignUp_loading(false)
  }

  const renderLoading = () => {
    return login_loading ? (
      <button
        className='btn btn-outline-success btn-sm w-50 m-1'
        onClick={e => handleLogin(e)}
        disabled>
        <div
          className='spinner-border spinner-border-sm text-success'
          role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </button>
    ) : (
      <button
        className='btn btn-outline-success btn-sm w-50 m-1'
        onClick={e => handleLogin(e)}
        disabled={signUp_loading}>
        Login
      </button>
    )
  }

  const renderSignUp = () => {
    return signUp_loading ? (
      <button
        className='btn btn-outline-success btn-sm w-50 m-1'
        onClick={e => handleLogin(e)}
        disabled>
        <div
          className='spinner-border spinner-border-sm text-success'
          role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </button>
    ) : (
      <button
        className='btn btn-outline-success btn-sm m-1 w-50'
        onClick={e => handleSignUp(e)}
        disabled={login_loading}>
        Sign Up
      </button>
    )
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
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group-sm'>
              <input
                className='mb-2'
                type='password'
                id='password'
                name='password'
                placeholder='*********'
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              {renderLoading()}
              {renderSignUp()}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth
