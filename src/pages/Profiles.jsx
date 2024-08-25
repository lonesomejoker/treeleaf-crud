import React from 'react'
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

const Profiles = () => {
  const navigate=useNavigate();
  
  const handleBack=()=>{
    navigate("/")
  }
  
  return (
    <div>
      <button onClick={handleBack} className=' bg-emerald-400 p-3 rounded-lg mb-5'>Back to Home</button>
      {/* <button onClick={()=>dispatch(clearList())} className=' bg-orange-400 p-3 rounded-lg'>Clear List</button> */}
      <Pagination/>
      
    </div>
  )
}

export default Profiles
