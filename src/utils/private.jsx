import { Navigate, Route, Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import { Fragment } from 'react'

import React from 'react'

const Private = ({ status }) => {
  return status ? (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  ) : (
    <Navigate to='/login' />
  )
}

export default Private
