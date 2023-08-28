import React from 'react'
import { useState, useEffect } from 'react'
import { useGlobal } from '../utils/context'
import Owner from '../components/owner'
import Guardian from '../components/guardian'

const Home = () => {
  const { owner, id } = useGlobal()
  return owner ? <Owner id={id} /> : <Guardian id={id} />
}

export default Home

// TODO - Implement querying using supabase API, template in notes
// TODO - Implement rendering of the data from backend
// TODO - condition navbar rendering based on as_owner value (as_owner === owner)
