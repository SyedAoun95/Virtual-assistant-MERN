import React from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
function Customize() {
  return (
    <div  className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353]'>
    <Card image={image1}/>
    </div>
  )
}

export default Customize
