import { Navigate, Route, Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import { Fragment } from 'react'

import React from 'react'

const Private = ({ session, status }) => {
  if (status) {
    return (
      <Fragment>
        <div className='d-flex justify-content-center'>
          <div className='spinner-grow text-success m-2' role='status' />
          <div className='spinner-grow text-success m-2' role='status' />
          <div className='spinner-grow text-success m-2' role='status' />
          <div className='spinner-grow text-success m-2' role='status' />
          <div className='spinner-grow text-success m-2' role='status' />
          <div className='spinner-grow text-success m-2' role='status' />
        </div>
      </Fragment>
    )
  }

  return session !== null ? (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  ) : (
    <Navigate to='/login' />
  )
}

export default Private
