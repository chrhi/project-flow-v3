import React, { ReactNode } from 'react'

type Props = {
    children : ReactNode ,
    className : string ,
}

export const Container = ({children , className}:Props) => {
  return (
    <div className={` ${className} custopn-page-height w-full  custom-scroll-bar `}  >
        {children}
    </div>
  )
}

