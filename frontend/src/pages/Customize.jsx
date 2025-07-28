import React, { useContext, useRef, useState } from 'react';
import Card from '../components/Card';
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { RiImageAddLine } from "react-icons/ri";
import { IoArrowBackSharp } from "react-icons/io5";
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Customize() {
  const {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setfrontendimage,
    backendImage,
    setbackendimage,
    selectedImage,
    setSelectedImage
  } = useContext(userDataContext);

  const inputImage = useRef();
  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setbackendimage(file);
    setfrontendimage(URL.createObjectURL(file));
    setSelectedImage("input");
  };

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col'>
      <h1 className='text-white text-[30px] text-center p-[20px] mb-[30px]'>
         <IoArrowBackSharp  className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>navigate("/")}/>
        Select your <span className='text-blue-300'>Assistant image</span>
      </h1>

      <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* Upload Image Box */}
        <div
          className={`w-[70px] h-[160px] lg:w-[140px] lg:h-[250px] border-2 border-[#0000ff5f] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-700 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center relative ${
            selectedImage === "input" ? "border-4 border-white shadow-2xl shadow-blue-700" : ""
          }`}
          onClick={() => inputImage.current.click()}
        >
          {!frontendImage && (
            <RiImageAddLine className='text-white text-[30px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
          )}
          {frontendImage && <img src={frontendImage} className='w-full h-full object-cover' />}
        </div>

        {/* Hidden Input for Image Upload */}
        <input
          type="file"
          accept='image/*'
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>

      {/* Next Button */}
      {selectedImage && (
        <button
          className='min-w-[150px] mt-[30px] h-[60px] text-[18px] bg-white text-black font-semibold rounded-full cursor-pointer'
          onClick={() => navigate("/customize2")}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Customize;
