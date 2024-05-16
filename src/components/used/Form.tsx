import React,  {type  ReactNode } from 'react'

type FromPropsType ={
    children : ReactNode ,
    // onSubmit? : React.FormEventHandler<HTMLFormElement> | undefined
    className? : string ,
}



export const Form = ({children , className }:FromPropsType) => {
  return (
    <div className={`bg-white mb-8 w-[95%] shadow-lg    ${className ? className : ""} `} >
    <div className="overflow-hidden shadow rounded-lg ">
      
         {children}
       
    </div>
    </div>  
  )
}

