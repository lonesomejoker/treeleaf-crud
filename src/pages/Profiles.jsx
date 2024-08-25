import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { onChangeDataPerpage } from '../app/slices/PaginationSlice';

const Profiles = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  const handleBack=()=>{
    navigate("/")
  }
  
  return (
    <div>
      <button onClick={handleBack} className=' bg-emerald-400 p-3 rounded-lg mb-5'>Back to Home</button>
      {/* <button onClick={()=>dispatch(clearList())} className=' bg-orange-400 p-3 rounded-lg'>Clear List</button> */}
      <Pagination/>
      <select onChange={(event)=>dispatch(onChangeDataPerpage(event.target.value))} className='font-madimi mx-3 bg-gray-100 dark:bg-neutral-800 border-2 border-violet-500 rounded-lg p-2 text-[16px] dark:text-white'>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  )
}

export default Profiles
