import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearList } from '../app/slices/DetailSlice';
import { useNavigate } from 'react-router-dom';

const Profiles = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {list}=useSelector((state)=>state.listslice);
  console.log("list:",list);
  
  const handleBack=()=>{
    navigate("/")
  }
  

  return (
    <div>
      <button onClick={handleBack} className=' bg-emerald-400 p-3 rounded-lg'>Back to Home</button>
      <button onClick={()=>dispatch(clearList())} className=' bg-orange-400 p-3 rounded-lg'>Clear List</button>
    </div>
  )
}

export default Profiles
