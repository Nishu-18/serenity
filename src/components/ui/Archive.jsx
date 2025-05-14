import React from 'react'

function Archive() {

    const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className='h-screen w-full flex items-center justify-center text-xl font-baloo'>
        You donot have any booking history yet
    </div>
  )
}

export default Archive