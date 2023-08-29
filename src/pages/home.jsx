import React from 'react'
import { useGlobal } from '../utils/context'
import Owner from '../components/owner'
import Guardian from '../components/guardian'

const Home = () => {
  const { owner, id } = useGlobal()
  return owner ? <Owner id={id} /> : <Guardian id={id} />
}

export default Home
