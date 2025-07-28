import React, { useContext, useRef, useState } from 'react'; 
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from 'react';

function Home() {
  const {userData,serverUrl,setUserData, getGeminiResponse } = useContext(userDataContext); 
const navigate=useNavigate()
 const [listening,setListening]=useState(false)
 const isSpeakingRef=useRef(false)
 const recognitionRef=useRef(null )
 const synth= window.speechSynthesis
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
const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
   synth.speak(utterance)
}
const handleCommand = (data) => {
  const { type, userInput, response } = data;
  speak(response);

  if (type === 'google_search') {
    const query = encodeURIComponent(userInput);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  }
  if (type === 'calculator_open') {
  window.open('https://www.google.com/search?q=calculator', '_blank');
}

if (type === 'instagram_open') {
  window.open('https://www.instagram.com/', '_blank');
}

if (type === 'facebook_open') {
  window.open('https://www.facebook.com/', '_blank');
}
if (type === 'github_open') {
  window.open('https://github.com/', '_blank');
}
if (type === "weather_show") {
  window.open('https://www.google.com/search?q=weather', '_blank');
}

if (type === 'youtube_search' || type === 'youtube_play') {
  const query = encodeURIComponent(userInput);
  window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
}
}
useEffect(() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';
//  recognitionRef.current=recognition
//  const isRecoginizingRef={current:false}

//  const safeRecogination=()=>{
//   if(!isSpeakingRef && !isRecoginizingRef){
// try {
//   recognition.start();
//   console.log("Recogination requested to start")
// } catch (err) {
//   if(err.name !=="InvalidStateError"){
//     console.log("start error",err);
//   }
// }
//   }
//  }



  recognition.onresult =async (e) => {
    const transcript = e.results[e.results.length - 1][0].transcript.trim();
    console.log("heard: " + transcript)
    if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
      const data=await getGeminiResponse(transcript)
   console.log(data)
     handleCommand(data)

    }
  };

  recognition.start()

  
   
}, []);



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
