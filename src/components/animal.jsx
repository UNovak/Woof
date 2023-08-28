/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

const Animal = ({ data, onDelete, onSave, onEdit, view }) => {
  const { id, title, description } = data

  const [formTitle, setFormTitle] = useState(title || 'title')
  const [formDescription, setFormDescription] = useState(
    description || 'description'
  )

  const buildCard = () => {
    if (view === 'look')
      return (
        <div className='card bg-light mb-2 mt-2 animal-card'>
          <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <div className='card-body'></div>
            <p className='card-text'>{description}</p>
          </div>

          <div className='card-body'>
            <button className='btn btn-primary mt-3' onClick={() => onEdit()}>
              Edit
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
              <textarea
                className='form-control'
                id='description'
                onChange={e => setFormDescription(e.target.value)}
              />
              <button
                type='button'
                className='btn btn-danger m-1'
                onClick={e => {
                  e.preventDefault()
                  onDelete()
                }}>
                Delete
              </button>
              <button
                type='buttonn'
                className='btn btn-success m-1'
                onClick={e => {
                  e.preventDefault()
                  onSave(id, formTitle, formDescription)
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

export default Animal
