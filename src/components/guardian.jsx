import React, { useEffect, useState } from 'react'
import { useGlobal } from '../utils/context'

const Guardian = () => {
  const { setType } = useGlobal()

  useEffect(() => {
    setType('guardian')
  }, [])

  return <div>Guardian</div>
}

export default Guardian
