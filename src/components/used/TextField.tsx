import React from 'react'
import Skeleton from 'react-loading-skeleton';



type PropsType = {
    lable : string ,
    value : string | number | readonly string[] | undefined ,
    onChange : React.ChangeEventHandler<HTMLTextAreaElement> | undefined,
    isLoading? : boolean, 
    className? : string
}

export  const TextField = ({lable , value , onChange , isLoading , className}:PropsType) => {
  return (
  <>
  {
    isLoading ? 
    <div className="col-span-6 ">
       <Skeleton style={{width : "50%"}} />
       <Skeleton style={{width : "70%"}}  />
        <Skeleton count={2}  />
    </div>
    : 
    <div className={`col-span-6 ${className ? className : ""} `}>
    <label htmlFor={lable} className="block text-sm font-medium leading-6 !font-poppins text-gray-700 dark:text-white">
        {lable}
     </label>
     <textarea 
         onChange={onChange}
          
         name={lable}
         id={lable + "id"}
         value={value}
         className="mt-1 block  transition  ease-in-out  w-full dark:bg-stone-900 dark:text-white !font-poppins  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-stone-600 dark:border-stone-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:py-1.5 sm:text-sm sm:leading-6"
         placeholder={lable}
         rows={3}
         />
 </div>
  }
  </>
  )
}