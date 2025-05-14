import React from 'react'

function SearchMentor() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className='h-screen w-full flex items-center justify-center text-xl font-baloo'>
      We donot have any mentor yet
    </div>
  )
}

export default SearchMentor