import React, { useEffect, useState } from 'react'
import { useGlobal } from '../utils/context'

const Owner = () => {
  const { setType } = useGlobal()

  useEffect(() => {
    setType('owner')
  }, [])

  return <div>Owner</div>
}

export default Owner
