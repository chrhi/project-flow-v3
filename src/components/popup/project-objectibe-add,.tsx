/* eslint-disable react/jsx-key */
import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import { Fragment,  useState } from 'react'
import { api } from '~/utils/api'
import { AbdullahButton, buttonVariants } from '../used/AbdullahButton'
import { toast } from 'react-toastify'
import {v4 as uuidV4} from "uuid"
import { Input } from '../used/Input'
import { getProjectMetaData } from '~/lib/MetaData'
import { TimePicker } from '../used/TimePicker'
import { TextField } from '../used/TextField'
import type { DateRangePickerValue } from '@tremor/react'
import NewTimePicker from '../used/NewTimePicker'
import Select from 'react-select'
import { OJECTIVES_TYPES } from '~/types/static/STATICDATA'


type Props = {
  
  refetch : () => Promise<any>
}





export  function ObjectiveAdd ({refetch } : Props) {


 
    const [isOpen, setIsOpen] = useState(false)
    const [value , setValue] = useState<DateRangePickerValue>({
      from: new Date(2023, 1, 1),
      to: new Date(),
    })
  
    const [formData , setFormData] = useState({
      SUCCESS_CRITERIA : "" ,
      THE_PROJECTS_OBJECTIVES : "",
      Type : "",
      APPROVAL : ""
    })
     
    function openModal() {
      setIsOpen(true)
    }
    function closeModal(){
      setIsOpen(false)
    }
    
    const mutation = api.ProjectObjectivesRouter.objectiveAdd.useMutation({
      onSuccess : async () => {
        await refetch()
        closeModal()
      },
      onError : () => {
        toast.error("failed to add new project goal")
      }

    })

    const handleSubmit = () => {
      mutation.mutate({
        APPROVAL : formData.APPROVAL , 
        project_id : getProjectMetaData() , 
        SUCCESS_CRITERIA : formData.SUCCESS_CRITERIA , 
        THE_PROJECTS_OBJECTIVES : formData.THE_PROJECTS_OBJECTIVES , 
        type : formData.Type
      })
    }
   

  return (
    <>
   <div className='w-full h-6 flex justify-between px-4 items-center'>
    <p>  Add new Milestones to the table</p>
 
 
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
                    className=" w-full h-[50px] px-4 flex justify-between items-center border-b "
                  >
               <div><p className='text-sm text-gray-500'>Add  New project objective</p></div>  
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
                <div className='col-span-6 '>
                                   <label  className="block text-sm font-medium leading-6 text-gray-900">
                                       Type
                                  </label>
                                  <Select
                                          
                                          onChange={(e) => setFormData({...formData , Type : e?.value  || ""})}  
                                           name="Type"
                                           options={OJECTIVES_TYPES}
                                           className="basic-multi-select"
                                           classNamePrefix="select"
                                   />
               </div>
           
            <TextField
              lable='THE PROJECTS OBJECTIVES'
              value={formData.THE_PROJECTS_OBJECTIVES}
              onChange={(e) => setFormData({...formData , THE_PROJECTS_OBJECTIVES : e.target.value})}
            />

            
            <TextField
                    lable='SUCCESS CRITERIA'
                    value={formData.SUCCESS_CRITERIA}
                    onChange={(e) => setFormData({...formData , SUCCESS_CRITERIA : e.target.value})}
            />
           
             
            <TextField
                    lable='APPROVAL'
                    value={formData.APPROVAL}
                    onChange={(e) => setFormData({...formData , APPROVAL : e.target.value})}
            />

        
             <div className="bg-white py-3 col-span-6 text-right ">
            <AbdullahButton
            onClick={handleSubmit}
            isLoading={mutation.isLoading}
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