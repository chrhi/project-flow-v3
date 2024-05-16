/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-key */
import { Dialog, Transition } from '@headlessui/react'
import React, { useState } from 'react'
import {  Fragment  } from 'react'
import { AbdullahButton , buttonVariants } from '../used/AbdullahButton'

export  function SreachBar () {
    const [open , setOpen] = useState<boolean>(false)

  return (
      <>
        <button
         onClick={() => setOpen(true)}
         className='h-[60px] w-[50px] flex justify-center items-center'
         >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
         className="w-[1.4rem]  text-gray-600 hover:bg-gray-100 rounded-full font-semibold h-[1.4rem]">
             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>

       </button>

    <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment} 
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0  bg-sky-100 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0  overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[600px] h-[350px] flex flex-col items-center p-8 gap-8  z-[100]  transform overflow-hidden  bg-white  text-left align-middle shadow-xl transition-all">
                <h1 className='text-2xl  font-bold text-gray-900 text-center '>Locked Out: Understanding and Overcoming Action Access Restrictions</h1>
                   <p className='text-lg leading-8  text-center text-gray-700'>
                   Proper communication with project authorities is key to resolving access issues, enabling one to contribute to the project's success by following the correct protocols.
                   </p>
                   <AbdullahButton
                    onClick={() => setOpen(true)}
                      className={`${buttonVariants({size:"lg", variant:'primary'})} font-bold`}
                    >
                       accept and close 
                  </AbdullahButton>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      </>
  )
}
