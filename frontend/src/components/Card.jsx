import React from 'react'

function Card({image}) {
  return (
    <div className='w-[170px] h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl overflow-hidden'>
      <img src={image} className='h-full object-cover'/>
    </div>
  )
}

export default Card
