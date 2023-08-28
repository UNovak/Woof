import React from 'react'
import { useState, useEffect } from 'react'
import { useGlobal } from '../utils/context'
import Owner from '../components/owner'
import Guardian from '../components/guardian'

const Home = () => {
  const { owner } = useGlobal()

  const storedData = JSON.parse(sessionStorage.getItem('id'))
  const id = storedData ? storedData[0]?.id : null

  return owner ? <Owner /> : <Guardian />
}

export default Home

// TODO - Implement querying using supabase API, template in notes
// TODO - Implement rendering of the data from backend
// TODO - condition navbar rendering based on as_owner value (as_owner === owner)
