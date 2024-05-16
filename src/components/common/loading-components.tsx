import React from 'react'
import { Loader2 } from 'lucide-react';
 
type Props = {
  className? : string , 
}


function LoadingComponents({className} : Props) {
  return (
    <div className={`w-full bg-white h-full flex justify-center items-center min-h-[400px] ${className || ""}`}>
        <Loader2 className='mr-2 h-12 w-12 font-bold text-blue-500  animate-spin' />
    </div>
  )
}

export default LoadingComponents