import Image from "next/image"
import logo from "~/assets/logo.png"
import React from "react"
import { DropDownAdmin } from "./DropDownAdmin"
import AdminNavTabs from "./admin-header-nav"


const Items = [
    {name : "Tableau de bord" , path : "/admin"},
    {name : "Utilisateurs" , path : "/"},
    
]

export const HeaderAdmin = () => {

  return (
    <div className = {`w-full !z-[50] h-28 sticky top-0 flex  flex-col justify-end px-4  items-start bg-white shadow-sm border-b border-gray-300 `}>
       
        <div className="w-full h-[50px] flex justify-between px-8 items-center">
           <div className="w-[20%] h-full flex justify-start gap-x-4 items-center">
           <DropDownAdmin />
           </div>
           
            <Image alt="logo" src={logo} width={35} height={35}  />
        </div>
       <div className="w-full  h-[50px]  gap-x-4 md:gap-x-1 px-8 flex justify-start items-center mr-2   ">     
            <AdminNavTabs />     
       </div>
      
       {/* <MobilSideBar /> */}
   </div>
  
 
  )
}
