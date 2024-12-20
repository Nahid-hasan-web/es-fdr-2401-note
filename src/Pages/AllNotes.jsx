import React from 'react'
import AddCarts from '../components/AddCarts/AddCarts'
import SingelNote from '../components/SingelNote/SingelNote'
import PinNotes from '../components/PinNotes/PinNotes'

const AllNotes = () => {
  return (
   <>
    <div className="p-5 w-full">

      <AddCarts/>

      {/* ===============all notes  */}
      <div  >
        <h2 className='text-xl font-semibold text-gray-400 mt-5'>Pin Notes</h2>
        <hr />
      </div>
      <PinNotes />
      {/* ===============all notes  */}
      <div  >
        <h2 className='text-xl font-semibold text-gray-400 mt-5'>All Notes</h2>
        <hr />
      </div>
        <SingelNote />

    </div>
   
   </>
  )
}

export default AllNotes