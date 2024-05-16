/* eslint-disable react/jsx-key */
import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import { Fragment,  useState } from 'react'
import { api } from '~/utils/api'
import { AbdullahButton , buttonVariants } from '~/components/used/AbdullahButton' 
import { toast } from 'react-toastify'
import { TextField } from '~/components/used/TextField'
import { getProjectMetaData } from '~/lib/MetaData'




type Props = {
  
  refetch : () => Promise<any>
}





export  function ProjectLifeSCYcleAdd ({refetch } : Props) {


    const mutation = api.ProjecrLifeCycleRouter.dataAdd.useMutation({
      onSuccess :async  () => {
        toast.success("added ")
          await refetch()
          closeModal()
      },
      onError : () => {
        toast.error("failed to add new project goal")
      }
    })
    const [isOpen, setIsOpen] = useState(false)
   
  
    const [formData , setFormData] = useState({
        Phase : "" ,
        KeyDeliverables : "",
       
    })
     
    function openModal() {
      setIsOpen(true)
    }
    function closeModal(){
      setIsOpen(false)
    }
    
 

    const handleSubmit = () => {
      mutation.mutate({
        projectId : getProjectMetaData() , 
        Phase : formData.Phase , 
        KeyDeliverables : formData.KeyDeliverables , 
      })
    }
   

  return (
    <>
   <div className='w-full h-6 flex justify-between px-4 items-center'>
    <p>  Add Phase and its Key Deliverables</p>
 
 
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
               <div><p className='text-sm text-gray-500'>Créer une nouvelle entrée</p></div>  
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
               
           
            <TextField
              lable='phase'
              value={formData.Phase}
              onChange={(e) => setFormData({...formData , Phase : e.target.value})}
            />

            
            <TextField
                    lable='Key Deliverables'
                    value={formData.KeyDeliverables}
                    onChange={(e) => setFormData({...formData , KeyDeliverables : e.target.value})}
            />
           
             
            
        
             <div className="bg-white py-3 col-span-6  flex items-end justify-end p-4text-right ">
            <AbdullahButton
            onClick={handleSubmit}
            isLoading={mutation.isLoading}
            className={buttonVariants({size:'sm' , variant : "primary"})}
            >
             Soumettre
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