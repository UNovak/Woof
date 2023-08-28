import React, { useEffect, useState } from 'react'
import { useGlobal } from '../utils/context'
import { supabase } from '../utils/supabase'

const Owner = () => {
  const { setType, id } = useGlobal()

  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setType('owner')
    const getAnimals = async () => {
      let { data: animals, error } = await supabase.from('animals').select('*')
      if (error) {
        console.error(error)
      } else {
        setAnimals(animals)
        setLoading(false)
      }
    }
    getAnimals()
  }, [id])

  const insertAnimal = async () => {
    const { data, error } = await supabase.from('animals').insert([
      {
        title: 'grey',
        description: 'some random text',
        owner: id,
      },
    ])

    if (error) {
      console.log(error)
    } else {
      console.log(data)
      setAnimals([...animals, data]) // append new animal to list
    }
  }

  const renderAnimals = () => {
    return animals.map((animal, index) => {
      return <div key={index}>{JSON.stringify(animal)}</div>
    })
  }

  return (
    <>
      <div>Owner</div>
      <button onClick={() => insertAnimal()}>Add</button>
      {animals.map((animal, index) => {
        return <div key={index}>{JSON.stringify(animal)}</div>
      })}
    </>
  )
}

export default Owner
