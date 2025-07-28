import React, { useContext, useState } from 'react';
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import UseContext, { userDataContext } from '../context/UserContext';
import axios from "axios";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl  , userData ,setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const[loading,setLoading]=useState(false)
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`, {
        email,
        password
      }, { withCredentials: true });
setUserData(result.data)
      setLoading(false)
      setSuccessMessage("Login successful! Redirecting...");
      setErrorMessage("");
  navigate("/")
      setTimeout(() => navigate("/"), 2000); // redirect to homepage
    } catch (error) {
      console.error("❌ Signin error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Signin failed");
      setUserData(null)
        setLoading(false)
      setSuccessMessage("");
    }
  };

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{ backgroundImage: `url(${bg})` }}>
      <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000035] backdrop-blur shadow-lg shadow-black-950 flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleSignIn}>
        <h1 className='text-white text-[30px] font-semibold mb-[10px]'>Login to <span className='text-blue-400'>Virtual Assistant</span></h1>

        {successMessage && <p className='text-green-400 text-[16px]'>{successMessage}</p>}
        {errorMessage && <p className='text-red-400 text-[16px]'>{errorMessage}</p>}

        <input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setEmail(e.target.value)} value={email} />

        <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
          <input type={showPassword ? "text" : "password"} placeholder='Password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]' required onChange={(e) => setPassword(e.target.value)} value={password} />
          {!showPassword && <IoEye className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer' onClick={() => setShowPassword(true)} />}
          {showPassword && <IoEyeOff className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer' onClick={() => setShowPassword(false)} />}
        </div>

        <button type="submit" className='min-w-[150px] mt-[10px] h-[60px] text-[18px] bg-white text-black font-semibold rounded-full' disabled={loading}> {loading?"Loading...":"sign in"}</button>

        <p className='text-white cursor-pointer text-[18px]' onClick={() => navigate("/signup")}>
          Don’t have an account? <span className='text-blue-400'>Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
