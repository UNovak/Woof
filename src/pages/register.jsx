import React, { useState } from 'react'
import Address from '../components/address'
import Togle from '../components/togle'

const Register = () => {
  const email = 'example@example.com'
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')

  const handleAddressChange = newAddress => {
    setAddress(newAddress)
  }

  const handleSubmit = e => {
    e.preventDefault() // Prevent form submission and page refresh
    // TODO - implement updating the data using supabase API
  }

  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
      <div className='col-lg-4'>
        <form onSubmit={handleSubmit}>
          <div className='form-floating mb-2'>
            <input
              type='email'
              className='form-control'
              id='email'
              aria-describedby='emailHelp'
              placeholder={email}
              value={'email@email'}
              disabled
            />
            <label htmlFor='email'>email</label>
          </div>

          <div className='form-floating mb-2'>
            <input
              required
              type='text'
              className='form-control'
              id='name'
              placeholder='name'
              onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor='name'>name</label>
          </div>

          <div className='form-floating mb-2'>
            <input
              type='text'
              className='form-control'
              id='lastname'
              placeholder='surname'
              onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor='lastname'>surname</label>
          </div>

          <div className='form-floating mb-2'>
            <input
              required
              type='text'
              className='form-control'
              id='address'
              value={address}
              disabled
              placeholder='address'
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
            <button type='submit' className='btn btn btn-success w-25'>
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

// TODO - add fields to match the data stored in supabase
// TODO - add a toggle for as_owner
