import React, { useState } from 'react'
import Address from '../components/address'

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
    console.log('submitted')
    console.log(address)
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-lg-4'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email' className='form-control-sm'>
              email address
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              aria-describedby='emailHelp'
              value={email}
              disabled
            />
          </div>

          <div className='form-group'>
            <label htmlFor='name' className='form-control-sm'>
              first name
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              placeholder='first name'
              onChange={e => setFirstName(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='surname' className='form-control-sm'>
              last name
            </label>
            <input
              type='text'
              className='form-control'
              id='lastname'
              placeholder='last name'
              onChange={e => setLastName(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='name' className='form-control-sm'>
              address
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              value={address}
              disabled
              onChange={e => setAddress(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='addressFill' className='form-control-sm'>
              you can change the address here
            </label>
            <Address onSelect={handleAddressChange}/>
          </div>

          <button type='submit' className='btn btn-primary mt-3'>
            SAVE
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
