import React, { ReactNode } from 'react'

type PaperType = {
    children : ReactNode
} 
 
export const Paper = ({children}:PaperType) => {
  return (
    <div className='w-full mx-auto h-full bg-white rounded-lg overflow-y-auto '>
        {children}
    </div>
  )
}
