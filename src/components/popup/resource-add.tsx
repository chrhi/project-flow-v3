import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import {  Fragment, useState } from 'react'
import { api } from '~/utils/api'
import { TextField } from '../used/TextField'
import { AbdullahButton, buttonVariants} from '../used/AbdullahButton'
import { Input } from '../used/Input'
import Select from 'react-select';
import { STAKHOLDER_TYPES , OPTIONS, RESOURCE_QUALITY} from '~/types/static/STATICDATA'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import { getProjectMetaData } from '~/lib/MetaData'
import { InputNumber } from '../used/NumberInput'

type Props = {
  refetch : () => Promise<void>
}

export  function ResourceAdd ({refetch} : Props ) {
  const [isOpen, setIsOpen] = useState(false);
  const [data , setData ] = useState({
    name : "" ,
    description: "",
    cost : 0,
    quality : "",
    amount : 1,
    imgUrl : ""

  })

  function openModal() {
    setIsOpen(true);
  }
  
  function closeModal() {
    setIsOpen(false);
  }
  
 const mutation = api.resourcesRouter.add_resource.useMutation({
  onSuccess : async () => {
    closeModal()
    toast.success("un nouvel outil est ajouté")
    await refetch()
  },
  onError (){
    toast.error("n'a pas réussi à créer une partie prenante")
  }
 })
  
  const handleSubmit = () => {
    if(!data.name || !data.description || !data.cost || !data.quality ){
      toast.error("tous les champs sont obligatoires")
      return 
    }
    mutation.mutate({
      project_id : getProjectMetaData(),
      name : data.name ,
      cost : data.cost , 
      description : data.description ,
      quality : data.quality ,
      imageUrl : data.imgUrl
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
         Add new Resource
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
                <Dialog.Panel className="  w-[800px] h-[550px]  transform overflow-hidden  bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className=" w-[100%] mx-auto  h-[50px] flex justify-between items-center px-4  "
                  >
               <div><p className='text-lg  text-gray-700   ml-1'>Ajouter un nouvel outil au tableau</p></div>  
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
            <div className="grid grid-cols-6 lg:grid-cols-12 gap-6">
            <div className='col-span-6  '>
                  <label  className="block text-sm font-medium leading-6 text-gray-900">
                  quality
                  </label>
                  <Select
                        onChange={(e) => setData({...data , quality : e?.value || ""})}
                        name="stakholders_types"
                        options={RESOURCE_QUALITY}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
            </div> 
            <Input
              className="col-span-6  "
              lable='Nom'
              value={data.name}
              onChange={(e) => setData({...data , name : e.target.value})}
            />
            
            
            
             <InputNumber
              className="col-span-6  "
              lable='cost'
              value={data.cost}

              onChange={(e) => setData({...data , cost : Number(e.target.value)})}
            />

           <Input
              className="col-span-6  "
              lable='image url'
              value={data.imgUrl}
              onChange={(e) => setData({...data , imgUrl : e.target.value})}
            />

            
           <Input
              className="col-span-6 "
              lable='amount'
              value={data.amount}
              onChange={(e) => setData({...data , amount : Number(e.target.value)})}
            />

            <TextField
              className="col-span-6 lg:col-span-12"
              lable='description'
              value={data.description}
              onChange={(e) => setData({...data , description : e.target.value})}
            />
           
                
             <div className="bg-white flex justify-end items-end pt-4 col-span-6  lg:col-span-12 text-right ">
            <AbdullahButton
            onClick={handleSubmit}
            isLoading={mutation.isLoading}
            className={`${buttonVariants({size:'sm'  , variant:"primary"})}  `}
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