import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import { Fragment } from 'react'
import Loading from '../components/loading'

import React from 'react'

const Private = ({ session, status }) => {
  if (status) {
    return <Loading />
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
