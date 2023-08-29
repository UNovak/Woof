/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const Service = ({ data, onDelete, onSave, onEdit, onRadio, view }) => {
  const { id, title, description, rate, hourly } = data

  const [formTitle, setFormTitle] = useState(title || 'title')
  const [formRate, setFormRate] = useState(rate || 0)
  const [formHourly, setFormHourly] = useState(hourly || true)
  const [formDescription, setFormDescription] = useState(
    description || 'description'
  )

  const handleRadioChange = e => {
    const value = e.target.value

    // Convert the value to a boolean
    setFormHourly(value === 'true')
  }

  const buildCard = () => {
    if (view === 'look')
      return (
        <div className='card bg-light mb-2 mt-2 animal-card'>
          <div className='card-body'>
            <div className='card-title'>{rate}</div>
            <h5 className='card-title'>{title}</h5>
            <div className='card-body'></div>
            <p className='card-text'>{description}</p>
          </div>

          <div className='card-body'>
            <button className='btn btn-primary mt-3' onClick={() => onEdit()}>
              Edit
            </button>
            <button
              type='button'
              className='btn btn-danger m-1'
              onClick={e => {
                e.preventDefault()
                onDelete()
              }}>
              Delete
            </button>
          </div>
        </div>
      )
    // returned when edit button is clicked

    if (view === 'edit') {
      return (
        <div className='card bg-light m-2 animal-card'>
          <div className='card-body'>
            <form className='m-2'>
              <input
                id='name'
                type='text'
                className='form-control-xl m-2'
                onChange={e => setFormTitle(e.target.value)}
              />
              <input
                id='rate'
                type='number'
                className='form-control-sm m-2'
                onChange={e => setFormRate(e.target.value)}
              />
              <textarea
                className='form-control'
                id='description'
                onChange={e => setFormDescription(e.target.value)}
              />
              <div className='form-check'>
                <div
                  onClick={() => setFormHourly(!formHourly)}
                  className='btn-group'
                  role='charge type'
                  aria-label='charge type'>
                  <button
                    type='button'
                    className={`btn ${
                      formHourly ? 'btn-primary' : 'btn-secondary'
                    }`}>
                    Hourly
                  </button>
                  <button
                    type='button'
                    className={`btn ${
                      !formHourly ? 'btn-primary' : 'btn-secondary'
                    }`}>
                    Daily
                  </button>
                </div>
              </div>
              <button
                type='button'
                className='btn btn-success m-1'
                onClick={e => {
                  e.preventDefault()
                  onSave(id, formTitle, formDescription, formRate, formHourly)
                }}>
                Save
              </button>
            </form>
          </div>
        </div>
      )
    }
  }
  return <div>{buildCard()}</div>
}

export default Service
