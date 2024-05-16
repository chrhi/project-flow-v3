import React from 'react'
import Skeleton from 'react-loading-skeleton';

interface PropsType  extends React.HtmlHTMLAttributes<HTMLInputElement>  {
    lable : string ,
    value : string | number | readonly string[] | undefined ,
    onChange : React.ChangeEventHandler<HTMLInputElement> | undefined,
    lableClassName? : string ,
    isLoading? : boolean,
    inputClassName? : string ,
    className? : string,
    type? : string ,
}



export  const InputNumber = ({lable , value , onChange , type  , lableClassName , isLoading, inputClassName ,className  , ...PropsType}:PropsType) => {
  return (
   <>
      {
        isLoading ?  
       <div className="col-span-6 ">
          <Skeleton style={{width : "50%"}} />
          <Skeleton  />
       </div> 
          : 
        <div  className={`col-span-6  ${className ? className : ""}`}>
           <label htmlFor={lable} className={`block text-sm font-medium leading-6 text-gray-900 dark:text-white ${lableClassName ? lableClassName : ""}`}>
             {lable}
           </label>
           <input {...PropsType} onChange={onChange} type='number'  name={lable} id={lable + "id"} value={value}
             className={`px-4 py-1.5 rounded-lg outline-none dark:text-white dark:bg-stone-900 dark:ring-stone-600 dark:border-stone-600 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition ease-in !border-gray-200   w-full ${inputClassName ? inputClassName : ""}`}
           />
        </div>
      }
   </>
  )
}
