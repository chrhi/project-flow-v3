/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useRouter } from 'next/router'
import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'
import { header_page_Reducer ,type  PAGES } from '~/store/app-reducer/headerReducer'
import { ErrorNoteReducer } from '~/store/app-reducer/errorReducer'


type chainType = {
    path: string , 
    name :string ,
  
    image : string | StaticImageData,
    available?: boolean,
    PAGE : PAGES
  
}
export const Chain = ({path , name  ,available, image , PAGE } : chainType) => {
  const router = useRouter()

  const [isHover , setIsHover] = useState<boolean>(false)
  const set_current_page = header_page_Reducer(state => state.set_current_page)

  const set_access_error = ErrorNoteReducer(state => state.setIsOpen)

  const handleClick = () => {

    if(!available){
      set_access_error({payload : true})
      return
    }
    set_current_page({payload : PAGE})
    router.push(path)
  }

  return (
    
    <div key={path + name}
     onMouseEnter={() => setIsHover(true)} 
     onMouseLeave={() => setIsHover(false)}
     onClick={handleClick}
     className={` relative shadow border-1 transition bg-white duration-500 transform hover:-translate-y-1 hover:shadow-2xl  flex cursor-pointer rounded-2xl justify-center w-48 flex-col p-2   h-56 items-center`}
     >
      <div className={`${available ? "hidden" : "absolute"} inset-0 rounded-2xl flex justify-center items-center bg-white `}>
      <svg
       xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
         strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
</svg>

      </div>
      <div className='w-[80%]   rounded-lg'>
        <Image alt={name} src={image}  />
      </div>

    
        <h3 className={` text-lf  text-gray-900 mt-4 font-bold  `}>{name}</h3>
    </div>
   
  )
}
