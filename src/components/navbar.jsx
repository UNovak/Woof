import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useGlobal } from '../utils/context'
import Togle from './togle'
import SignOut from './signOut'

const Navbar = () => {
  const { type, owner } = useGlobal()

  useEffect(() => {
  }, [type, owner])

  const extra = () => {
    return (
      <>
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
      </>
    )
  }

  const buttons = () => {
    return (
      <>
        <li>
          <Togle />
        </li>
        <li>
          <SignOut />
        </li>
      </>
    )
  }

  const renderNavbar = () => {
    if (type === 'register')
      return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary'>
          <div className='container-fluid'>{extra()}</div>
        </nav>
      )

    if (owner)
      return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary'>
          <div className='container-fluid'>
            {extra()}
            <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link to='settings'>Profile</Link>
                </li>
                <li className='nav-item'>
                  <Link to='search'>Search</Link>
                </li>
                <li className='nav-item'>
                  <Link to='search'>History</Link>
                </li>
                <li className='nav-item'>
                  <Link to='search'>Messages</Link>
                </li>
                {buttons()}
              </ul>
            </div>
          </div>
        </nav>
      )

    return (
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          {extra()}
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link to='settings'>Profile</Link>
              </li>
              <li className='nav-item'>
                <Link to='search'>History</Link>
              </li>
              <li className='nav-item'>
                <Link to='search'>Messages</Link>
              </li>
              {buttons()}
            </ul>
          </div>
        </div>
      </nav>
    )
  }

  return <>{renderNavbar()}</>
}

export default Navbar

// TODO - implement loading and displaying none
