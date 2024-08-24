import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className=' py-5 font-poppins container lg:px-[6.3rem] px-7 mx-auto'>
    <h1 className=' text-[2rem] font-[600] text-center'>Simple C.R.U.D Operations </h1>
      <Outlet/>
    </div>
  )
}

export default UserLayout
