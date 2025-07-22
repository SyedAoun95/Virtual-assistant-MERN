import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/userContext'

function Customize2() {
  const {userData,backendImage,selectedImage}=useContext(userDataContext)
  const[AssistantName,setAssistantName]=useState(userData?.AssistantName || "")
 
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col'>
       <h1 className='text-white text-[30px] text-center p-[20px] mb-[10px]'>Select your <span className='text-blue-300'>Assistant name</span></h1>
        <input type="text" placeholder='eg . Roberto' className='w-[350px] h-[50px] lg:w-[700px] lg:h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px] ' required onChange={(e)=>setAssistantName(e.target.value)} value={AssistantName} />
        {AssistantName && <button className='min-w-[300px] mt-[30px] h-[60px] text-[18px] bg-white text-black font-semibold rounded-full cursor-pointer'>Finally Create your Assistant</button> }
        
    </div>
    
  )
}

export default Customize2
