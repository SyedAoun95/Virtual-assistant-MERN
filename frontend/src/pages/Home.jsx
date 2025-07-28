import React, { useContext, useRef, useState, useEffect } from 'react';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ai from '../assets/ai.gif';
import userr from '../assets/user.gif';
import mic from '../assets/mic.gif'

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;
  const voicesRef = useRef([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [listening, setListening] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [speakingState, setSpeakingState] = useState("idle"); 

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = synth.getVoices();
      if (!selectedVoice && voicesRef.current.length > 0) {
        const defaultVoice = voicesRef.current.find(voice =>
          voice.name.toLowerCase().includes("female") ||
          voice.name.toLowerCase().includes("google us english") ||
          voice.name.toLowerCase().includes("samantha")
        ) || voicesRef.current[0];

        setSelectedVoice(defaultVoice);
      }
    };

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const speak = (text) => {
    if (!text || typeof text !== 'string') return;
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setSpeakingState("ai");
    utterance.onend = () => setSpeakingState("idle");

    synth.speak(utterance);
  };

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  // Animate response word by word
  const typeResponse = (text) => {
    if (!text || typeof text !== "string") return;
    const words = text.trim().split(/\s+/);
    setResponseText("");
    let index = 0;

    const interval = setInterval(() => {
      setResponseText(prev => prev + (index === 0 ? words[index] : " " + words[index]));
      index++;
      if (index >= words.length) {
        clearInterval(interval);
      }
    }, 150);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    if (typeof response === "string" && response.trim() !== "") {
      speak(response);
      typeResponse(response);
    } else {
      setResponseText("Sorry, I didn't get that.");
    }

    // Handle special actions
    const query = encodeURIComponent(userInput);
    if (type === 'google_search') window.open(`https://www.google.com/search?q=${query}`, '_blank');
    if (type === 'calculator_open') window.open('https://www.google.com/search?q=calculator', '_blank');
    if (type === 'instagram_open') window.open('https://www.instagram.com/', '_blank');
    if (type === 'facebook_open') window.open('https://www.facebook.com/', '_blank');
    if (type === 'github_open') window.open('https://github.com/', '_blank');
    if (type === "weather_show") window.open('https://www.google.com/search?q=weather', '_blank');
    if (type === 'youtube_search' || type === 'youtube_play') window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in your browser.");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.lang = 'en-US';

      recognition.onresult = async (e) => {
        const transcript = e.results[e.results.length - 1][0].transcript.trim();
        console.log("heard: " + transcript);
        setSpeakingState("user");

        if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
          const data = await getGeminiResponse(transcript);
          console.log(data);
          handleCommand(data);
          setSpeakingState("idle");
        }
      };

      recognition.onend = () => {
        setListening(false);
        setSpeakingState("idle");
      };
    }

    if (!listening) {
      setResponseText("");
      recognitionRef.current.start();
      setListening(true);
      setSpeakingState("user");
    } else {
      recognitionRef.current.stop();
      setListening(false);
      setSpeakingState("idle");
    }
  };

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#050546] flex justify-center items-center flex-col gap-[15px] relative'>
    
      <button
        className='min-w-[120px] absolute top-[20px] right-[20px] h-[45px] text-[16px] bg-white text-black font-semibold rounded-full cursor-pointer'
        onClick={handleLogOut}
      >
        Logout
      </button>

      <button
        className='min-w-[180px] absolute top-[75px] right-[20px] h-[45px] text-[16px] bg-white text-black font-semibold rounded-full px-[16px] py-[8px] cursor-pointer'
        onClick={() => navigate("/customize")}
      >
        Customize your Assistant
      </button>

   
      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
        <img src={userData?.assistantImage} alt="Assistant" className='h-full object-cover rounded-4xl' />
      </div>

     
      <h1 className='text-white text-[18px] font-semibold text-center px-4 min-h-[48px]'>
        {responseText || `I'm ${userData?.assistantName}`}
      </h1>


      <div
  className='cursor-pointer mt-2'
  onClick={toggleListening}
  title={listening ? "Click to stop listening" : "Click to start listening"}
>
  {speakingState === 'user' && (
    <img src={userr} alt="User Speaking" className='w-[150px] h-[150px]' />
  )}
  {speakingState === 'ai' && (
    <img src={ai} alt="AI Speaking" className='w-[150px] h-[150px]' />
  )}
  {speakingState === 'idle' && (
    <img src={ai} alt="Idle" className='w-[150px] h-[150px] opacity-50' />
  )}
</div>



      <div className="flex gap-2 absolute top-[190px] right-[20px]">
        <select
          className="h-[45px] w-[150px] text-[14px] rounded-full bg-white text-black font-semibold px-2 cursor-pointer shadow-md"
          onChange={(e) => {
            const voice = voicesRef.current.find(v => v.name === e.target.value);
            setSelectedVoice(voice);
          }}
          value={selectedVoice?.name || ''}
        >
          <option value="" disabled hidden>
            Choose your voice
          </option>
          {voicesRef.current.map((voice, idx) => (
            <option key={idx} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => speak("Han sangi")}
          className="bg-white text-black font-semibold rounded-full px-4 h-[45px] min-w-[180px] text-[16px] hover:shadow-md cursor-pointer"
        >
          Preview Voice
        </button>
      </div>
    </div>
  );
}

export default Home;
