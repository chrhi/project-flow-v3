import { Dialog, Transition } from '@headlessui/react'
import { type Dispatch, Fragment, type SetStateAction, useState } from 'react'
import { AbdullahButton , buttonVariants } from '~/components/used/AbdullahButton' 
import {   confirmDelevarebleTask as confirmDeleteTask } from '~/store/app-reducer/confirm-actions'
import { api } from '~/utils/api'
import  toast  from 'react-hot-toast'


type Props = {
    onDelete: ({ id }: {
        id: string;
    }) => void
}

export  function ConfirmDeleteDelevarble ({onDelete} : Props) {

  const isShowing = confirmDeleteTask(state => state.showModel)

  const setIsShowing = confirmDeleteTask(state => state.setShowModel)

  const ID = confirmDeleteTask(state => state.id)

 

  function closeModal() {
    setIsShowing(false)
  }

  function handleSubmit (){
    onDelete({id : ID})
    closeModal()
  }

  return (
    <>
     
   

      <Transition appear show={isShowing} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
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
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[400px] min-h-[100px] h-fit  flex flex-wrap gap-8  z-[100]  transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                <h2 className='text-center text-lg font-semibold '> This action cannot be undone. Deleting the task will remove all associated data and progress. Please ensure that this is the intended action. </h2>
              
                <div className='w-full h-[50px] flex items-center justify-center gap-x-8 '>
                <AbdullahButton 
                   onClick={handleSubmit}
                
                   className={buttonVariants({variant : "primary" , size : "sm"})} >
                          confirme
               </AbdullahButton> 
               <AbdullahButton 
                     onClick={closeModal}
                     className={buttonVariants({variant : "secondary" , size : "sm"})} >
                      cancel
               </AbdullahButton> 
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
