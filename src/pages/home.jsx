import React from 'react'
import { useState, useEffect } from 'react'

const Home = ({ id }) => {
  console.log(JSON.parse(sessionStorage.getItem('id')))
  console.log(JSON.parse(sessionStorage.getItem('session')))
  return (
    <div>
      <p>id: {JSON.stringify(JSON.parse(sessionStorage.getItem('id')))}</p>
      <p>
        session: {JSON.stringify(JSON.parse(sessionStorage.getItem('session')))}
      </p>
    </div>
  )
}

export default Home

// TODO - Implement querying using supabase API, template in notes
// TODO - Implement rendering of the data from backend
