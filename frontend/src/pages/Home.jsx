import React, { useContext } from 'react'; 
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const {userData,serverUrl,setUserData } = useContext(userDataContext); 
const navigate=useNavigate()
const handleLogOut=async()=>{
  try {
    const result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
 setUserData(null)
    navigate("/signin")

  } catch (error) {
     setUserData(null)
    console.log(error)
  }
}

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#050546] flex justify-center items-center flex-col gap-[15px]'>
    <button  
  className='min-w-[120px] absolute top-[20px] right-[20px] h-[45px] text-[16px] bg-white text-black font-semibold rounded-full cursor-pointer'

onClick={handleLogOut}>
  Logout
</button>

<button  
  className='min-w-[120px] absolute top-[75px] right-[20px] h-[45px] text-[16px] bg-white text-black font-semibold rounded-full px-[16px] py-[8px] cursor-pointer'
onClick={()=>{
  navigate("/customize")
}}
>
  Customize your Assistant
</button>



      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
        <img src={userData?.assistantImage} alt="" className='h-full object-cover rounded-4xl' />
      </div>
      <h1 className='text-white text-[18px] font-semibold'>I'm {userData?.assistantName}</h1>
    </div>
  );
}

export default Home;
