import DropDowsMenu from "./dropDown/DropDownManu"
import Image from "next/image"
import logo from "~/assets/logo.png"
import React from "react"
import { PagesNav } from "./PagesNav" 
import { MobileSideBar } from "./mobile"
import Invitation from "./dropDown/Invitation"
import TaskNotifictions from "./dropDown/TaskNotifictions"
import SearchBar from "./dropDown/SearchBar"
import MessageNofinications from "./dropDown/MessageNofinications"







export const Header = () => {

  return (
    <div className = {`w-full !z-[50] h-14 sticky top-0 flex justify-between lg:justify-start px-4  items-center bg-white dark:bg-neutral-900 shadow-sm border-b border-gray-300 dark:border-stone-900 `}>
     
       <div className=" w-[30%] pt-2 lg:pt-0 lg:w-[5%] h-full   lg:flex justify-start items-center">
          <Image alt="logo" src={logo} width={35} height={35}  />
       </div>
       <PagesNav />
      
       <div className="w-[25%]  h-[60px]  md:gap-x-4  hidden md:flex justify-end items-center mr-2   ">     
           
                 <SearchBar  />
                 <MessageNofinications  />
                 <TaskNotifictions  />
                 <Invitation  />
                 <DropDowsMenu />
                
       </div>
       <MobileSideBar />
   </div>
  
 
  )
}
