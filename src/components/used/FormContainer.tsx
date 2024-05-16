import React, { Dispatch, ReactNode, SetStateAction } from 'react'

type Props = {
    children : ReactNode ,
    className? : string , 
    isOpen? : boolean ,
    setIsOpen?: Dispatch<SetStateAction<boolean>> 
  
}

export const FormContainer = ({children , className , isOpen , setIsOpen }:Props) => {
  return (
    <div className={` scrollbar-hide  custopn-page-height mt-[1.1rem]  ${isOpen ? "custom-new-width" : "w-full "}  flex flex-col items-center  overflow-y-auto pt-4 ${className? className : ""}`}  >
        {children}
    </div>
  )
}
