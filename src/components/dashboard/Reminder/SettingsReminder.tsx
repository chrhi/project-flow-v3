/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-key */
import { Dialog, Transition } from '@headlessui/react'
import React, { useState } from 'react'
import {  Fragment  } from 'react'
import { AbdullahButton , buttonVariants } from '~/components/used/AbdullahButton'
import { Input } from '~/components/used/Input'



export  function SettingsReminder () {

    const [open , setOpen] = useState<boolean>(false)

  return (
      <>
        <button
         onClick={() => setOpen(true)}
         className='h-[60px] w-[50px] flex justify-center items-center'
         >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[1.4rem]  text-gray-700 hover:bg-gray-100 rounded-full font-bold h-[1.4rem]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
</svg>


       </button>

       <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={() => setOpen(true)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
               
              >
                <Dialog.Panel className="  w-[500px] h-fit  transform overflow-hidden  bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div" className=" w-[95%] mx-auto h-[50px]   flex justify-between items-center border-b " >
                       <div><p className='text-lg text-gray-900 '>Defined your quotes</p></div>  
                   <div>
                        <button onClick={() => setOpen(false)} className='!text-xl !font-semibold !text-slate-900   '>
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                             </svg>
                        </button>   
                   </div> 
                  </Dialog.Title>
                 
           <div className="bg-white p-4  w-full  ">
            <div className="grid grid-cols-6 gap-6">
            <Input
              lable='quate number one'
              value={""}
              onChange={(e) => console.log(e)}
            />
             <Input
              lable='quate number two'
              value={""}
              onChange={(e) => console.log(e)}
            />
             <Input
              lable='quate number four'
              value={""}
              onChange={(e) => console.log(e)}
            />
             <div className="bg-white py-3 col-span-6 text-right ">
            <AbdullahButton
          
            className={buttonVariants({size:'sm'})}
            >
              submit
            </AbdullahButton>
              </div>
          </div>
          </div>
         
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </>
  )
}
