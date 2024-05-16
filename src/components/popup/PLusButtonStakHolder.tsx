import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import {  Fragment, useState } from 'react'
import { api } from '~/utils/api'
import { TextField } from '../used/TextField'
import { AbdullahButton, buttonVariants} from '../used/AbdullahButton'
import { Input } from '../used/Input'
import Select from 'react-select';
import { STAKHOLDER_TYPES , OPTIONS} from '~/types/static/STATICDATA'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { toast } from 'react-hot-toast'
import { getProjectMetaData } from '~/lib/MetaData'
type Props = {
  refetch : () => Promise<void>
}

export  function PLusButtonStakHolder ({refetch} : Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [data  , setData ] = useState({
    name : "",
    position : "",
    contact : "",
    impact : "" ,
    role : "" , 
    investemtAmount : "", 
    expectation : "",
    requirements : "",
    type : ""
  })
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  
 const mutation = api.StakeHolderRouter.add_stakeholder.useMutation({
  onSuccess : async () => {
    closeModal()
    toast.success("une nouvelle partie prenante a été créée")
    await refetch()
  },
  onError (){
    toast.error("n'a pas réussi à créer une partie prenante")
  }
 })
  
  const handleSubmit = () => {
    if(!data.name || !data.contact || !data.expectation  || !data.position || !data.requirements || !data.role || !data.type){
      toast.error("tous les champs sont obligatoires")
      return 
    }
    mutation.mutate({
      project_id : getProjectMetaData() ,
      contact : data.contact ,
      Expectations : data.expectation,
      impact : data.impact ,
      InvestmentAmount : data.investemtAmount ,
      name : data.name ,
      position : data.position , 
      Requirements : data.requirements , 
      role : data.role , 
      type : data.type
    })
  };

  return (
    <>
   <div className='w-full  h-10 flex justify-between px-4 items-center'>
   <Button  variant="outline"  size="sm" onClick={openModal} >
         Create stakeholder
    </Button>
   </div>
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300"  enterFrom="opacity-0"  enterTo="opacity-100"  leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0" >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300"  enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"  leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="  w-[700px] h-[500px]  transform overflow-hidden  bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div"    className=" w-[100%] mx-auto  h-[50px] flex justify-between items-center px-4 border-b ">
               <div><p className='text-md text-gray-700   ml-1'>Enrichir l'écosystème des parties prenantes</p></div>  
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
                 
           <ScrollArea  className="bg-white p-4  h-[450px] w-full  ">
            <div className="grid grid-cols-6 lg:grid-cols-6 gap-6">
            <div className='col-span-6 '>
                  <label  className="block text-sm font-medium leading-6 text-gray-900">
                  type de partie prenante
                  </label>
                  <Select
                        onChange={(e) => setData({...data , type : e?.value || ""})}
                        name="stakholders_types"
                        options={STAKHOLDER_TYPES}
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
              lable='position'
              value={data.position}
              onChange={(e) => setData({...data , position : e.target.value})}
            />
             <Input
              lable='coordonnées'
              value={data.contact}
              onChange={(e) => setData({...data , contact : e.target.value})}
            />

            <div className='col-span-6 '>
                <label  className="block text-sm font-medium leading-6 text-gray-900">
                l'impact de cette partie prenante
                </label>
                <Select
                       onChange={(e) => setData({...data , impact : e?.value || ""})}
                     name="stakholders"
                     options={OPTIONS}
                     className="basic-multi-select"
                    classNamePrefix="select"
                   />
            </div>
            <Input
              lable='Investment amount'
              value={data.investemtAmount}
              onChange={(e) => setData({...data , investemtAmount : e.target.value})}
            />
              <TextField
              lable='ROLE / RESPONSABILITY'
              value={data.role}
              onChange={(e) => setData({...data , role : e.target.value})}
            />
             <TextField
              lable='Attentes'
              value={data.expectation}
              onChange={(e) => setData({...data , expectation : e.target.value})}
            />
            <TextField
              lable='EXIGENCES'
              value={data.requirements}
              onChange={(e) => setData({...data , requirements : e.target.value})}
            />
                
             <div className="bg-white flex justify-end items-end p-4 col-span-6 text-right ">
            <AbdullahButton
            onClick={handleSubmit}
            isLoading={mutation.isLoading}
            className={`${buttonVariants({size:'sm'  , variant:"primary"})}  `}
            >
           sauvegarder
            </AbdullahButton>
              </div>
          </div>
          </ScrollArea>
         
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      </>
  )
}