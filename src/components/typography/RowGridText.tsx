import React from 'react'


type Props ={
    text : string ,
    small?: boolean
}

export  const RowGridText = ({text , small}: Props) => {
  return (
    <div className="col-span-6 lg:col-span-12 gap-6">
    <h1 className={`${small ? "text-md  text-start text-neutral-700 font-poppins" : "text-2xl  text-start text-gray-900 font-poppins"} dark:text-white`}> {text}</h1>
    </div>
  )
}

