import React from 'react'
import PinNotes from '../components/PinNotes/PinNotes'

const PinedNote = () => {
  return (
    <>
    <div className='pl-[60px]'>
      <h1 className='text-2xl font-semibold text-gray-400'>All pin notes</h1>
      <PinNotes />
    </div>
  </>
  )
}

export default PinedNote