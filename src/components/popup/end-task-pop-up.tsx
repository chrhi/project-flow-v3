/* eslint-disable react/jsx-key */
import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import { Fragment,  useState } from 'react'
import { api } from '~/utils/api'
import { AbdullahButton, buttonVariants } from '../used/AbdullahButton'
import { toast } from 'react-toastify'
import { openTasksDonePanle } from '~/store/open-models'
import { Input } from '../used/Input'
import { getProjectMetaData } from '~/lib/MetaData'
import { TimePicker } from '../used/TimePicker'
import { TextField } from '../used/TextField'
import type { DateRangePickerValue } from '@tremor/react'
import NewTimePicker from '../used/NewTimePicker'
import { RowGridText } from '../typography/RowGridText'
type Props = {
  
  // refetch : () => Promise<any>
}





export  function TaskEndDone ({ } : Props) {


    const isOpen = openTasksDonePanle(state => state.showModel)
    const setIsOpen = openTasksDonePanle(state => state.setShowModel)
    
    const [value , setValue] = useState<DateRangePickerValue>({
      from: new Date(2023, 1, 1),
      to: new Date(),
    })
  
    const [formData , setFormData] = useState({
      name : "" ,
      description : "",
      type : ""
    })
     
    function openModal() {
      setIsOpen(true)
    }
    function closeModal(){
      setIsOpen(false)
    }
    
  

    const handleSubmit = () => {
     //todo
    }
   

  return (
    <>
 
  
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
                  <Dialog.Title
                    as="div"
                    className=" w-full h-[40px] px-4 flex justify-between items-center  "
                  >
               <div><p className='text-sm text-gray-500'>Tracking task tine and cost</p></div>  
               <div>
                
                    <button
                    onClick={closeModal}
                   className='!text-xl !font-semibold !text-slate-900 !p-0  '
                   >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                    </button>
                   
                </div> 
                  </Dialog.Title>
                 
           <div className="bg-white p-4  w-full  ">
            <div className="grid grid-cols-6 gap-6">
          
            <RowGridText text='Planed time and cost to do this task' />
              <div className="  col-span-6 lg:col-span-12 ">
                 <NewTimePicker value={value} setValue={setValue} text="Planed time "/>
             </div>
             <Input
             className='col-span-6 lg:col-span-12'
              lable='Planed cost'
              value={formData.name}
              onChange={(e) => setFormData({...formData , name : e.target.value})}
            />

           <RowGridText text='Real time and cost to end this task' />

           <div   className='col-span-6 lg:col-span-12'>
                 <NewTimePicker value={value} setValue={setValue} text="Ended at "/>
             </div>
             <Input
               className='col-span-6 lg:col-span-12'
              lable='Real  cost'
              value={formData.name}
              onChange={(e) => setFormData({...formData , name : e.target.value})}
            />
           
             <div className="bg-white py-3 col-span-6 flex items-center justify-end gap-x-4 lg:col-span-12 text-right ">
             <AbdullahButton
            onClick={handleSubmit}
            isLoading={false}
            className={buttonVariants({size:'sm' , variant : "secondary"})}
            >
              skip
            </AbdullahButton>

            <AbdullahButton
            onClick={handleSubmit}
            isLoading={false}
            className={buttonVariants({size:'sm' , variant : "primary"})}
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