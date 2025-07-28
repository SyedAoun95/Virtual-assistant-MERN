import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const userDataContext = createContext();

const UserProvider = ({ children }) => {
  const serverUrl = 'https://virtual-assistant-mern.onrender.com';

  const [userData, setUserData] = useState(null);
  const [frontendImage, setfrontendimage] = useState(null);
  const [backendImage, setbackendimage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ add loading state

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
      setUserData(null); // ✅ ensure null is set on failure
    } finally {
      setLoading(false); // ✅ finish loading
    }
  };
  const getGeminiResponse=async (command)=>{
    try {
      const  result= await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
      return result.data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setfrontendimage,
    backendImage,
    setbackendimage,
    selectedImage,
    setSelectedImage,
    loading,
    getGeminiResponse // ✅ pass loading state
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserProvider;
