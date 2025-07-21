import React from 'react'

function Card({image}) {
  return (
    <div className=' w-[70px] h-[160px] lg:w-[140px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff5f] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-700 cursor-pointer hover:border-4 hover:border-white'>
      <img src={image} className='h-full object-cover'/>
    </div>
  )
}

export default Card
