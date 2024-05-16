/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-key */
import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import {  Fragment  } from 'react'
import { AbdullahButton , buttonVariants } from '../used/AbdullahButton'
import { BlockedPopUp as ABDULLAH } from '~/store/app-reducer/errorReducer'
import { RemoveProjectManager, removeAll } from '~/lib/MetaData'
import Cookies from 'js-cookie'


export  function BlockedPopUp () {

    const isOpen = ABDULLAH(state => state.isOpen)

   

    const handleLogout = () => {
      Cookies.remove("abdullah-access-token")
      RemoveProjectManager()
      removeAll()
      window.location.reload()
    }

  return (
       
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={ handleLogout }>
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
                <Dialog.Panel className="w-[600px] h-[380px] flex flex-col items-center p-8 gap-8  z-[100]  transform overflow-hidden  bg-white  text-left align-middle shadow-xl transition-all">
                <h1 className='text-2xl  font-bold text-gray-900 text-center '>VAccès bloqué pour vous.</h1>
                   <p className='text-lg leading-8  text-center text-gray-700'>
                Nous sommes au regret de vous informer que l'administrateur vous a bloqué en raison d'une violation de nos conditions d'utilisation. Veuillez contacter notre équipe de support pour toute question ou réexamen de votre cas.
                   </p>
                   <AbdullahButton
                    onClick={handleLogout}
                      className={`${buttonVariants({size:"lg", variant:'primary'})} font-bold`}
                    >
                     Déconnexion effectuée
                  </AbdullahButton>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
