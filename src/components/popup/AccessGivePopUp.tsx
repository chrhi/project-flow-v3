import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { AbdullahButton , buttonVariants } from '../used/AbdullahButton'
import Switch from "react-switch";







export  function AccessGivePopUp () {
  const [isOpen, setIsOpen] = useState(false)

  const [checked, setChecked] = useState(false);

  const [checked2, setChecked2] = useState(false);
 
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
     
     <AbdullahButton 
     onClick={openModal}
     className={buttonVariants({variant : "ghost"})} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
     </AbdullahButton> 

      <Transition appear show={isOpen} as={Fragment}>
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
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[400px] min-h-[100px] h-fit  flex flex-wrap gap-8  z-[100]  transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* this is the header */}
                <div className='w-full h-[20px] flex items-center  justify-end '>
                     <svg
                        onClick={closeModal}
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                </div>
                <div className='w-full flex flex-col gap-y-4 items-center'>
                        <div className='w-full h-[40px] flex justify-between items-center'>
                            <p className='text-md font-semibold '>Can update the data</p>
                            <Switch
                             checked={checked} 
                             onChange={() => setChecked(!checked)}
                             onColor="#86d3ff"
                             onHandleColor="#2693e6"
                             handleDiameter={30}
                             uncheckedIcon={false}
                             checkedIcon={false}
                             boxShadow="0px 1px 2px rgba(0, 0, 0, 0.6)"
                             activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                             height={15}
                             width={48}
                             className="react-switch"
                             id="material-switch"
                             />
                        </div>
                        <div className='w-full h-[40px] flex justify-between items-center'>
                            <p className='text-md font-semibold  '>Can end the phase</p>
                            <Switch
                             checked={checked2} 
                             onChange={() => setChecked2(!checked2)}
                             onColor="#86d3ff"
                             onHandleColor="#2693e6"
                             handleDiameter={30}
                             uncheckedIcon={false}
                             checkedIcon={false}
                             boxShadow="0px 1px 2px rgba(0, 0, 0, 0.6)"
                             activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                             height={15}
                             width={48}
                             className="react-switch"
                             id="material-switch"
                             />
                        </div>
                        <div className='w-full h-[40px] flex justify-between items-center'>
                            <p className='text-md font-semibold  '>Remove this person</p>
                               <AbdullahButton 
                                   onClick={openModal}
                                   className={`${buttonVariants({variant : "secondary"})} bg-red-500 text-white`} >
                                   remove
                                </AbdullahButton> 
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
