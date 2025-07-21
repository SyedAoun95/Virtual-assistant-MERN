import React, { useRef, useState } from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { RiImageAddLine } from "react-icons/ri";
function Customize() {
    const[frontendImage,setfrontendimage]=useState(null)
     const[backendImage,setbackendimage]=useState(null)
     const inputImage =useRef()
  return (
    <div  className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col'>
     <h1 className='text-white text-[30px] text-center p-[20px] mb-[30px]'>Select your <span className='text-blue-300'>Assistant image</span></h1>
   <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
    <Card image={image1}/>
    <Card image={image2}/>
    <Card image={image3}/>
    <Card image={image4}/>
    <Card image={image5}/>
    <Card image={image6}/>
    <Card image={image7}/>
     <div className=' w-[70px] h-[160px] lg:w-[140px] lg:h-[250px] border-2 border-[#0000ff5f] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-700 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center' onClick={()=>{
        inputImage.current.click()
     }}>
     <RiImageAddLine className='text-white w-[25px] h-[25px]' />

    </div>
    {/* gets the selected image and sets it to the state and thn we have added the usestate for images and a useref */}
   <input type="file" accept='image/*' ref={inputImage} hidden/>  /
    </div>
        <button className='min-w-[150px] mt-[30px] h-[60px] text-[18px] bg-white text-black font-semibold rounded-full'>Next</button>
    </div>
  )
}

export default Customize
