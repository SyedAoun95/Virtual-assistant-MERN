import React, { useContext } from 'react'; 
import { userDataContext } from "../context/userContext";

function Home() {
  const { userData } = useContext(userDataContext); 

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#050546] flex justify-center items-center flex-col'>
      
    </div>
  );
}

export default Home;
