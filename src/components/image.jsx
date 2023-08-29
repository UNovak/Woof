import React from 'react'
import animal from '../assets/empty-animal.png'
import avatar from '../assets/empty-avatar.png'

const Image = ({ src, type }) => {
  // possible types avatar, animal, search
  // avatar : a round image that has a small plus icon on the bottom to allow for uploads
  // animal : a square image that also has a small icon to allow for uploads
  // search : a square image same as animal but no upload functionality

  // uploading function for avatar -> bucket = 'avatars'
  // upload function for animal -> bucket = 'animals'

  const generateImage = () => {
    if (src === null) {
      if (type === 'avatar') {
        return (
          <div className='avatar-image'>
            <img src={avatar} alt='avatar' />
            {/* icon */}
          </div>
        )
      }

      if (type === 'animal') {
        return (
          <div className='animal-image'>
            <img src={animal} alt='animal image' />
            {/* icon */}
          </div>
        )
      }

      if (type === 'search') {
        return (
          <div className='animal-image'>
            <img src={animal} alt='animal image' />
          </div>
        )
      }
    }

    if (src !== null) {
      if (type === 'avatar') {
        return (
          <div className='avatar-image'>
            <img src={src} alt='avatar' />
            {/* icon */}
          </div>
        )
      }

      if (type === 'animal') {
        return (
          <div className='animal-image'>
            <img src={src} alt='animal image' />
            {/* icon */}
          </div>
        )
      }

      if (type === 'search') {
        return (
          <div className='animal-image'>
            <img src={src} alt='animal image' />
          </div>
        )
      }
    }
  }

  return <>{generateImage()}</>
}

export default Image
