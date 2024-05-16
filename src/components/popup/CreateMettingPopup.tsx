/* eslint-disable react/jsx-key */
import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import {  Fragment,  useState } from 'react'
import { api } from '~/utils/api'
import { TextField } from '~/components/used/TextField'
import { AbdullahButton, buttonVariants} from "~/components/used/AbdullahButton"
import { toast } from 'react-toastify'

import { Input } from '~/components/used/Input'
import { getProjectMetaData } from '~/lib/MetaData'
import { TimePicker } from '~/components/used/TimePicker'
import Select from 'react-select';
type Props = {
  
  refetch : () => Promise<any>
}

type inputs = {
stakholders : string[],
informations : string , 

method : string , 
sender : string 
}

type stekholder ={
  value : string ,
  label : string
}


export  function CreateMettingPopup ({ refetch} : Props) {


    const [stakHolders , setStakholders] = useState<stekholder[]>([] as stekholder[])
    const [isOpen, setIsOpen] = useState(false)
    const [start , setStart] = useState<Date>(new Date())
    const [end , setEnd] = useState<Date>(new Date())

    const [formData , setFormData] = useState<inputs>({
      stakholders : [] ,
      informations  : "" ,
      method :  "",
      sender : ""
    })
     
    function openModal() {
      setIsOpen(true)
    }
    function closeModal(){
      setIsOpen(false)
    }
    
  


  const handleSubmit = () => {
    //doto 
  }
     
  

  return (
    <>
   <div className='w-full h-6 flex justify-between px-4 items-center'>
    <p>ajouter un élément à ce tableau</p>
 
 
      <button
         onClick={openModal}
        className='!text-xl !font-semibold !text-slate-900 !p-0  '
         >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

       </button>
  
   </div>
  
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
                    className=" w-full h-[50px] flex justify-between items-center border-b "
                  >
               <div><p className='text-sm text-gray-500 ml-4'>Creating a new metting</p></div>  
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
            <div className='col-span-6'>
            <label  className="block text-sm font-medium leading-6 text-gray-900">
           select the stakholders involved
        </label>
            <Select
                onChange={(e) => setFormData({...formData, stakholders : e.map(item => item.value)})}
                isMulti
                name="stakholders"
                options={stakHolders}
                className="basic-multi-select"
                classNamePrefix="select"
            />
            </div>
              <TextField
              lable='some related informations'
              value={formData.informations}
              onChange={(e) => setFormData({...formData , informations : e.target.value})}
            />
              <Input
              lable='the method been used'
              value={formData.method}
              onChange={(e) => setFormData({...formData , method : e.target.value})}
            />
              <Input
              lable='this metting created by'
              value={formData.sender}
              onChange={(e) => setFormData({...formData , sender : e.target.value})}
            />
            <div className='col-span-6'>
              <TimePicker lable='select the best timing for this metting' endDate={end} setEndDate={setEnd} setStartDate={setStart} startDate={start} />
            </div>
             
             <div className="bg-white py-3 col-span-6 text-right ">
            <AbdullahButton
            onClick={handleSubmit}
            isLoading={false}
            className={buttonVariants({size:'sm' , variant:"primary"})}
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