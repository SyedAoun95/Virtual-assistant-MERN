import React, { useContext, useState } from 'react';
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import UseContext, { userDataContext } from '../context/userContext';
import axios from "axios";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl,userData ,setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const[loading,setLoading]=useState(false)
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(false)
    console.log("Sending signup request to:", `${serverUrl}/api/auth/signup`);
    console.log("Payload:", { name, email, password });

    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, {
        name,
        email,
        password
      }, { withCredentials: true });

    setUserData(result.data)
      setLoading(false)

      setTimeout(() => navigate("/signin"), 2000);
      navigate("/customize")
    } catch (error) {
      console.error(" Signup error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Signup failed");
      setUserData(null)
        setLoading(false)
      setSuccessMessage("");
    }
  };

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{ backgroundImage: `url(${bg})` }}>
      <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000035] backdrop-blur shadow-lg shadow-black-950 flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleSignUp}>
        <h1 className='text-white text-[30px] font-semibold mb-[10px]'>Register to <span className='text-blue-400'>Virtual Assistant</span></h1>

        {successMessage && <p className='text-green-400 text-[16px]'>{successMessage}</p>}
        {errorMessage && <p className='text-red-400 text-[16px]'>{errorMessage}</p>}

        <input type="text" placeholder='Enter your name' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setName(e.target.value)} value={name} />

        <input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setEmail(e.target.value)} value={email} />

        <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
          <input type={showPassword ? "text" : "password"} placeholder='Password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]' required onChange={(e) => setPassword(e.target.value)} value={password} />
          {!showPassword && <IoEye className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer' onClick={() => setShowPassword(true)} />}
          {showPassword && <IoEyeOff className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer' onClick={() => setShowPassword(false)} />}
        </div>

        <button type="submit" className='min-w-[150px] mt-[30px] h-[60px] text-[18px] bg-white text-black font-semibold rounded-full' disabled={loading}>{loading?"Loading...":"sign in"}</button>

        <p className='text-white cursor-pointer text-[18px]' onClick={() => navigate("/signin")}>
          Already have an account? <span className='text-blue-400'>SignIn</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
