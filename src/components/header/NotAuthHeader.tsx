import Image from "next/image"
import logo from "~/assets/logo.png"
import { NotAuth } from "./NotAuth"
import React from "react"




export const NotAuthHeader = () => {

  return (
    <div className = {`w-full !z-[50] h-14 sticky top-0 flex justify-start px-4  items-center bg-white  `}>
         <div className="w-[5%] h-full flex justify-start items-center">
                 <Image alt="logo" src={logo} width={35} height={35}  />
         </div>
      
   </div>
  
 
  )
}
