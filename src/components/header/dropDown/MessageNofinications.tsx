/* eslint-disable @typescript-eslint/no-floating-promises */
import { Menu, Transition } from '@headlessui/react'
import { MailOpen, MessagesSquare } from 'lucide-react'
import { Fragment } from 'react'
import { AbdullahButton , buttonVariants } from '~/components/used/AbdullahButton'



export default function MessageNofinications() {
  //initializes hooks
 


  return (
    <div className=" text-right z-[100]">
    <Menu as="div" className="relative z-[100]  inline-block text-left">
      <div className='h-[60px] w-[20px] flex justify-center items-center'>
      <Menu.Button className={`${buttonVariants({variant : "ghost" , size : "sm"})}`}>
         <MessagesSquare  className='w-5 h-5 text-neutral-800' />
      </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-[100]  right-0 top-12  w-[280px] origin-top-right divide-y divide-gray-100  bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 min-h-[300px] flex justify-center items-center z-[100] ">
          <h1 className='text-xl font-bold text-center'>Empty section</h1>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    </div>
  )
                }