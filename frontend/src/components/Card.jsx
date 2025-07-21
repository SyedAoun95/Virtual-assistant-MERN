import React, { useContext } from 'react'
import { userDataContext } from '../context/userContext'

function Card({image}) {
     const { serverUrl, userData ,setUserData ,frontendImage,setfrontendimage ,backendImage,setbackendimage,selectedImage,setSelectedImage}=useContext(userDataContext)
  return (
    // in that the selected image is selected like they have a white border whatever the image you select
    <div className={` w-[70px] h-[160px] lg:w-[140px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff5f] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-700 cursor-pointer hover:border-4 hover:border-white ${selectedImage==image?"border-4 border-white shadow-2xl shadow-blue-700":null}`} onClick={()=>setSelectedImage(image)}>
      <img src={image} className='h-full object-cover'/>
    </div>
  )
}

export default Card
