import React, { useState, useContext } from 'react'
import './togle.css'
import { useGlobal } from '../utils/context'

const Togle = () => {
  const { owner, handleOwner } = useGlobal()

  return (
    <div className='container-sm d-flex align-items-center justify-content-center'>
      <span className='togle-text'>Guardian</span>
      <input
        checked={owner}
        onChange={handleOwner}
        className='togle-checkbox'
        id={`togle-new`}
        type='checkbox'
      />
      <label
        style={{ background: owner && '#06D6A0' }}
        className='togle-label'
        htmlFor={`togle-new`}>
        <span className={`togle-button`} />
      </label>
      <span className='togle-text'>Owner</span>
    </div>
  )
}

export default Togle
