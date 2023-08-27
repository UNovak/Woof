import React, { Fragment } from 'react'

const Loading = () => {
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

export default Loading
