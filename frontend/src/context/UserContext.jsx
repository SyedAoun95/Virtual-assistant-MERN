import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const userDataContext = createContext();

const UserProvider = ({ children }) => {
  const serverUrl = 'http://localhost:8000';

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
    loading // ✅ pass loading state
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserProvider;
