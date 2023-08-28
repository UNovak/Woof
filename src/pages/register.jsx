import React, { useState, useEffect } from 'react'

// component imports
import Address from '../components/address'
import Togle from '../components/togle'
import Loading from '../components/loading'

// util imports
import { useGlobal } from '../utils/context'
import { supabase } from '../utils/supabase'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const { owner, setType } = useGlobal()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [render, setRender] = useState(false)

  const handleAddressChange = newAddress => {
    setAddress(newAddress)
  }

  useEffect(() => {
    setType('register')
    const storedData = JSON.parse(sessionStorage.getItem('id'))
    const fetchedId = storedData ? storedData[0]?.id : null

    if (fetchedId !== null) {
      setId(fetchedId)
      getData() // Fetch data when id is available
    } else {
      console.log('Fetching id failed')
      fetchData() // Retry fetching when id is not available
    }
  }, [])

  let retryInterval

  const fetchData = () => {
    const maxRetries = 5 // Maximum number of retries
    let retries = 0

    retryInterval = setInterval(() => {
      const storedData = JSON.parse(sessionStorage.getItem('id'))
      const fetchedId = storedData ? storedData[0]?.id : null

      if (fetchedId !== null) {
        clearInterval(retryInterval) // Clear the retry interval
        setId(fetchedId)
        getData()
        setRender(true)
        return // Fetch data when id is available
      } else {
        retries++
        if (retries >= maxRetries) {
          console.log('Timed out! Unable to fetch id.')
          clearInterval(retryInterval)
        }
      }
    }, 1000) // Retry every 1 second
  }

  const getData = async () => {
    let { data: profiles, error } = await supabase
      .from('profiles')
      .select('id,email,name,surname,address,as_owner')

    if (error) {
      console.log(error)
    } else {
      const profile = profiles[0]
      setEmail(profile.email)
      setFirstName(profile.name)
      setLastName(profile.surname)
      setAddress(profile.address)
      console.log(profile)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault() // Prevent form submission and page refresh
    setLoading(true) // while submitting disable button

    if (!email || !firstName || !lastName || !address) {
      setError('All fields are required')
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({
        name: firstName,
        surname: lastName,
        address: address,
        as_owner: owner,
      })
      .eq('id', id)
      .select()

    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
      navigate('/')
    }
    setLoading(false) // enable button after submitted
  }

  const renderButton = () => {
    return loading ? (
      <button className='btn btn-outline-success  btn-sm w-25 m-1' disabled>
        <div
          className='spinner-border spinner-border-sm text-success'
          role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </button>
    ) : (
      <button className='btn btn-outline-success btn-sm w-25 m-1' type='submit'>
        Login
      </button>
    )
  }

  return !render ? (
    <Loading />
  ) : (
    <div className='justify-content-center align-items-center d-flex'>
      <div className='card mt-5 p-3 w-75' style={{ maxWidth: '400px' }}>
        <form onSubmit={handleSubmit}>
          <div className='form-floating mb-2'>
            <input
              type='email'
              className='form-control'
              id='email'
              aria-describedby='emailHelp'
              value={email}
              readOnly={true}
            />
            <label htmlFor='email'>email</label>
          </div>

          <div className='form-floating mb-2'>
            <input
              required
              type='text'
              className='form-control'
              id='name'
              placeholder={'first name'}
              value={firstName || ''}
              onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor='name'>name</label>
          </div>

          <div className='form-floating mb-2'>
            <input
              type='text'
              className='form-control'
              id='lastname'
              placeholder='last name'
              value={lastName || ''}
              onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor='lastname'>last name</label>
          </div>

          <div className='form-floating mb-2'>
            <input
              required
              type='text'
              className='form-control'
              id='address'
              value={address}
              disabled
              onChange={e => setAddress(e.target.value)}
            />
            <label htmlFor='address'>address</label>
          </div>

          <div className='form-group mb-3'>
            <label className='form-control-sm'>
              you can change the address using the field below
            </label>
            <Address onSelect={handleAddressChange} name='addressFill' />
          </div>
          <div className='form-group text-center'>
            <label htmlFor='addressFill' className='form-control-sm mb-2'>
              What will be your primary use case?
            </label>
            <div className='mb-3'>
              <Togle />
            </div>
          </div>

          <div className='d-flex justify-content-center align-items-center'>
            {renderButton()}
          </div>
        </form>
        {
          <p className='d-flex justify-content-center align-items-center mt-3 text-danger'>
            {error}
          </p>
        }
      </div>
    </div>
  )
}

export default Register
