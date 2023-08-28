import React, { useEffect, useState } from 'react'
import { useGlobal } from '../utils/context'
import { supabase } from '../utils/supabase'
import Loading from './loading'
import Animal from './animal'

const Owner = () => {
  const { setType, id } = useGlobal()

  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [animalViews, setAnimalViews] = useState({})
  const [newData, setNewData] = useState({})

  const getAnimals = async () => {
    let { data: animals, error } = await supabase
      .from('animals')
      .select('*')
      .eq('owner', id)
    if (error) {
      console.error(error)
    } else {
      console.log(animals)
      setAnimals(animals)
    }
  }

  useEffect(() => {
    console.log('newData changed:', newData)
  }, [newData])

  useEffect(() => {
    if (id === null) {
      setLoading(true)
    }

    setType('owner') // Navbar type

    if (id !== null) {
      getAnimals() // if id get all animals
      setLoading(false)
    }
  }, [id])

  const insertAnimal = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('animals').insert([
      {
        title: 'animal name',
        description: 'description',
        owner: id,
      },
    ])

    if (error) {
      console.log(error)
    } else {
      if (data) {
        setAnimals([...animals, data]) // Only add non-null data
      }
      getAnimals()
      setLoading(false)
    }
  }

  const handleDelete = async key => {
    const { error } = await supabase.from('animals').delete().eq('id', key)

    if (error) {
      console.log(error)
    } else {
      console.log('deleted: ' + key)
    }

    const newAnimals = animals.filter(animal => animal.id !== key)
    setAnimals(newAnimals)
  }

  const handleSave = async (key, newTitle, newDescription) => {
    const { data, error } = await supabase
      .from('animals')
      .update({
        title: newTitle,
        description: newDescription,
      })
      .eq('id', key)
      .select()

    if (error) {
      console.log(error)
    } else {
      getAnimals()
      setAnimalViews({ ...animalViews, [key]: 'look' })
    }
  }

  const handleEdit = key => {
    setAnimalViews({ ...animalViews, [key]: 'edit' })
  }

  const renderAnimals = () => {
    return animals.map(animal => {
      const view = animalViews[animal.id] || 'look' // Get the view for this animal
      return animal ? (
        <Animal
          handleData={setNewData}
          data={animal}
          onDelete={() => handleDelete(animal.id)}
          onSave={(id, newTitle, newDescription) =>
            handleSave(id, newTitle, newDescription)
          }
          onEdit={() => handleEdit(animal.id)}
          key={animal.id}
          view={view}
        />
      ) : null
    })
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <button onClick={() => insertAnimal()}>Add</button>
      {renderAnimals()}
    </>
  )
}

export default Owner
