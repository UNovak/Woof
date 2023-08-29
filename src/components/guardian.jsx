import React, { useEffect, useState } from 'react'
import { useGlobal } from '../utils/context'
import { supabase } from '../utils/supabase'
import Loading from './loading'
import Service from './service'

const Guardian = () => {
  const { setType, id, owner, setOwner } = useGlobal()

  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [servicesViews, setServicesViews] = useState({})

  const getServices = async () => {
    let { data: services, error } = await supabase
      .from('services')
      .select('*')
      .eq('guardian', id)
    if (error) {
      console.error(error)
    } else {
      setServices(services)
    }
  }

  useEffect(() => {
    if (id === null) {
      setLoading(true)
    }

    if (id !== null) {
      setType('guardian') // set Navbar style
      getServices() // if id get services
      setLoading(false) // stop loading animation to render page
    }
  }, [id, owner]) // listen to id/owner change

  const insertService = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('services').insert([
      {
        title: 'service title',
        description: 'description',
        guardian: id,
        rate: 70,
        hourly: true,
      },
    ])

    if (error) {
      console.log(error)
    } else {
      if (data) {
        setServices([...services, data])
      }
      getServices()
      setLoading(false)
    }
  }

  const handleDelete = async key => {
    const { error } = await supabase.from('services').delete().eq('id', key)

    if (error) {
      console.log(error)
    }

    // remove deleted items from local storage
    const newServices = services.filter(service => service.id !== key)
    setServices(newServices)
  }

  const handleSave = async (
    key,
    newTitle,
    newDescription,
    newRate,
    newHourly
  ) => {
    console.log(newHourly)
    const { data, error } = await supabase
      .from('services')
      .update({
        title: newTitle,
        description: newDescription,
        rate: newRate,
        hourly: newHourly,
      })
      .eq('id', key)
      .select()

    if (error) {
      console.log(error)
    } else {
      getServices() // rerender the cards
      setServicesViews({ ...servicesViews, [key]: 'look' }) // change view value back to 'look'
    }
  }

  const handleEdit = key => {
    setServicesViews({ ...servicesViews, [key]: 'edit' }) // Changed from setServices to setServicesViews
  }

  const renderServices = () => {
    return services.map(service => {
      const view = servicesViews[service.id] || 'look' // Get the view for this animal
      return service ? (
        <Service
          data={service}
          onDelete={() => handleDelete(service.id)}
          onSave={(id, newTitle, newDescription, newRate, newHourly) =>
            handleSave(id, newTitle, newDescription, newRate, newHourly)
          }
          onEdit={() => handleEdit(service.id)}
          key={service.id}
          view={view}
        />
      ) : null
    })
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <button onClick={() => insertService()}>Add</button>
      {renderServices()}
    </>
  )
}

export default Guardian

// BUG: - owner state gets lost when page refreshes and defaults to true
