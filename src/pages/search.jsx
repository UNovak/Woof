import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { useGlobal } from '../utils/context'
import Loading from '../components/loading'

const Search = () => {
  const { id, owner, setType } = useGlobal()
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const getCards = async () => {
      if (id === null) {
        console.log("didn't get an id")
        setLoading(false)
        return // exit the function early if id is null
      }

      const { data: services, error } = await supabase
        .from('services')
        .select('*')
        .neq('guardian', id)

      if (error) {
        console.log(error)
        setLoading(false)
        return // exit the function if there's an error
      }

      setCards(services)
      console.log(services)
      setLoading(false)
    }

    getCards() // Call the function once per useEffect invocation
  }, [id])

  return loading ? (
    <Loading />
  ) : (
    <div className='row'>
      {cards.map((card, index) => (
        <div className='col-md-4' key={index}>
          <div className='card'>
            {/* <img src={card.image} alt="Service" className="card-img-top" /> */}
            <div className='card-body'>
              <h5 className='card-title'>{card.title}</h5>
              <p className='card-text'>
                {card.rateType === 'hour'
                  ? 'Per Hour: '
                  : 'One Time Payment of: '}
                ${card.rate}
              </p>
              <p className='card-text'>{card.description}</p>
              <button className='btn btn-primary'>Book</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Search
