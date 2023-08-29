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

  const getAnimals = async () => {
    let { data: animals, error } = await supabase
      .from('animals')
      .select('*')
      .eq('owner', id)
    if (error) {
      console.error(error)
    } else {
      setAnimals(animals)
    }
  }

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
        setAnimals([...animals, data])
      }
      getAnimals()
      setLoading(false)
    }
  }

  const handleDelete = async key => {
    const { error } = await supabase.from('animals').delete().eq('id', key)

    if (error) {
      console.log(error)
    }

    // remove deleted items from local storage
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
      getAnimals() // rerender the cards
      setAnimalViews({ ...animalViews, [key]: 'look' }) // change view value back to 'look'
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
