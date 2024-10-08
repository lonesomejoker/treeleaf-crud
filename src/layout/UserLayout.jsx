import React, { createContext } from 'react'
import { Outlet } from 'react-router-dom'

export const AppContext = createContext(); //context API

const UserLayout = () => {
  function Th({ children }) {
    return (
      <th className="px-1.5 lg:px-3 py-2 text-left font-medium ">{children}</th>
    );
  }
  
  function Td({ children }) {
    return <td className="px-1.5 lg:px-3 py-2 ">{children}</td>;
  }
  
  return (
    <AppContext.Provider value={{Th,Td,}}>
    <div className=' py-5 font-poppins container lg:px-[3.6rem] px-7 mx-auto'>
    <h1 className=' text-[2rem] font-[600] text-center'>Simple C.R.U.D Operations </h1>
      <Outlet/>
    </div>
    </AppContext.Provider>
  )
}

export default UserLayout
