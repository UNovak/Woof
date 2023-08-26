import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <Link to='/' className='d-flex align-items-center'>
          <img src={logo} alt='logo' className='navbar-logo' />
          <span>Woof Watchers</span>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link to='settings'>Profile</Link>
            </li>
            <li className='nav-item'>
              <Link to='search'>Search</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

// TODO - Implement different rendering based on as_owner
// TODO - Add a toggle allowing the user to change as_owner
// TODO - Add a singOut button