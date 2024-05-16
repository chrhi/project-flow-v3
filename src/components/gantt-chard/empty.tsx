import React from 'react'
import Image from 'next/image'
import empty from "~/assets/empty.png"

function   EmptyGanttChard() {
  return (
    <div className='w-full bg-white flex justify-center items-center h-[300px]'>
        <Image src={empty} width={200} alt='empty' />
    </div>
  )
}

export default EmptyGanttChard