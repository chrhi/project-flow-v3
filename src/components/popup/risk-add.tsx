import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import {  Fragment, useState } from 'react'
import { api } from '~/utils/api'
import { TextField } from '../used/TextField'
import { AbdullahButton, buttonVariants} from '../used/AbdullahButton'
import { Input } from '../used/Input'
import Select from 'react-select';
import {  OPTIONS} from '~/types/static/STATICDATA'
import { Button } from '../ui/button'
import { toast } from 'react-hot-toast'
import { getProjectMetaData } from '~/lib/MetaData'
import { InputNumber } from '../used/NumberInput'

type Props = {
  refetch : () => Promise<void>
}



export  function RiskAdd ({refetch} : Props ) {

  const [data , setData ] = useState({
    soulotions : "",
    name : "" , 
    description : "",
    LevelOfDanger : "",
    cost : 0,
    imageUrl : ""

  })

 const  mutation =   api.riskRouter.riskAdd.useMutation({
    onError : () => {
      toast.error("there is an error")
    },
    onSuccess : async () => {
      toast.success("risk create  sussefully")
      await refetch()
    }
  })

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  
  function closeModal() {
    setIsOpen(false);
  }
  
 
  
  const handleSubmit = () => {
    mutation.mutate({
      project_id : getProjectMetaData(),
      description : data.description , 
      levelOfDanger : data.LevelOfDanger , 
      name : data.name , 
      solutions : data.soulotions,
      cost : Number(data.cost)
    })
  };

  return (
    <>
   <div className='w-full  h-10 flex justify-between px-4 items-center'>
   <Button
          variant="outline"
          size="sm"
          onClick={openModal}
    
        >
         Add new Risk
        </Button>
   
  
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
                <Dialog.Panel className="  w-[750px] h-[430px]  transform overflow-hidden  bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className=" w-[100%] mx-auto  h-[50px] flex justify-between items-center px-4 border-b "
                  >
               <div><p className='text-md text-gray-700   ml-1'>Ajouter un nouvel Risk au tableau</p></div>  
               <div>
                    <button
                          onClick={closeModal}
                          className='!text-xl !font-semibold !text-slate-900 !p-0  '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </button>
                </div> 
                  </Dialog.Title>
                 
           <div className="bg-white p-4  w-full  ">
            <div className="grid grid-cols-12  gap-6">
            <div className='col-span-6 '>
                  <label  className="block text-sm font-medium leading-6 text-gray-900">
                  Level of danger
                  </label>
                  <Select
                        onChange={(e) => setData({...data , LevelOfDanger : e?.value || ""})}
                        name="stakholders_types"
                        options={OPTIONS}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
            </div> 
            <Input
              lable='Nom'
              value={data.name}
              onChange={(e) => setData({...data , name : e.target.value})}
            />
              <Input
              lable='Image Url'
              value={data.imageUrl}
              onChange={(e) => setData({...data , imageUrl : e.target.value})}
            />
              <InputNumber
              lable='Cost'
              value={data.cost}
              onChange={(e) => setData({...data , cost : Number(e.target.value)})}
            />
            
            
             <TextField
             className='col-span-12'
              lable='description'
              value={data.description}
              onChange={(e) => setData({...data , description : e.target.value})}
            />
            
            <TextField
              className='col-span-12'
              lable='soulotions'
              value={data.soulotions}
              onChange={(e) => setData({...data , soulotions : e.target.value})}
            />

          

            
                
             <div className="bg-white flex justify-end items-end  col-span-12  text-right ">
            <AbdullahButton
            onClick={handleSubmit}
            isLoading={mutation.isLoading}
            className={`${buttonVariants({size:'sm'  , variant:"primary"})}  `}
            >
           sauvegarder
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