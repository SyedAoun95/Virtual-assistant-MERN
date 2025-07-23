import React, { useContext, useState } from 'react';
import { userDataContext } from '../context/userContext';
import axios from 'axios';
import { IoArrowBackSharp } from "react-icons/io5";
import { Navigate, useNavigate } from 'react-router-dom';
function Customize2() {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } = useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()

  const handleUpdateAssistant = async () => {
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage) {
        formData.append("AssistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      const result = await axios.post(`${serverUrl}/api/user/update`, formData, {
        withCredentials: true
      });

      console.log(result.data);
      setUserData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col relative'>
     <IoArrowBackSharp  className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>navigate("/customize")}/>

      <h1 className='text-white text-[30px] text-center p-[20px] mb-[10px]'>
        Select your <span className='text-blue-300'>Assistant name</span>
      </h1>

      <input
        type="text"
        placeholder='eg . Roberto'
        className='w-[350px] h-[50px] lg:w-[700px] lg:h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />

      {assistantName && (
   <button
  className='min-w-[300px] mt-[30px] h-[60px] text-[18px] bg-white text-black font-semibold rounded-full cursor-pointer'
  disabled={loading}
  onClick={async () => {
    await handleUpdateAssistant();
    navigate("/");
  }}
>
  {loading ? "Loading..." : "Finally Create your Assistant"}
</button>

      )}
    </div>
  );
}

export default Customize2;
