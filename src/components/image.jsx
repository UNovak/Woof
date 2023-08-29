// File: Image.js
import React from 'react'
import animal from '../assets/empty-animal.png'
import avatar from '../assets/empty-avatar.png'

const Image = ({ src, type }) => {
  const defaultImage = type === 'avatar' ? avatar : animal
  const actualSrc = src || defaultImage

  const commonProps = {
    className: `${type}-image`,
    src: actualSrc,
    alt: `${type} image`,
  }

  return (
    <div className={`${type}-image-wrapper`}>
      <img {...commonProps} />
      {(type === 'avatar' || type === 'animal') && (
        <div className='btn btn-primary btn-sm'>+</div>
      )}
    </div>
  )
}

export default Image

//TODO - Default image for service
