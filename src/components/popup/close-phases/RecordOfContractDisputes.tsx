/* eslint-disable react/jsx-key */
import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import { Fragment,  useState } from 'react'
import { api } from '~/utils/api'
import { AbdullahButton , buttonVariants } from '~/components/used/AbdullahButton' 
import { toast } from 'react-toastify'
import { TextField } from '~/components/used/TextField'




type Props = {
  
  refetch? : () => Promise<any>
}





export  function RecordOfContractDisputes ({refetch } : Props) {


 
    const [isOpen, setIsOpen] = useState(false)
   
  
    const [formData , setFormData] = useState({
        DESCRIPTION : "" ,
        RESOLUTION : "",
        DATE_RESOLVED : "",
    })
     
    function openModal() {
      setIsOpen(true)
    }
    function closeModal(){
      setIsOpen(false)
    }
    
    const mutation = api.ProjectObjectivesRouter.objectiveAdd.useMutation({
      onSuccess :  () => {
        // await refetch()
        closeModal()
      },
      onError : () => {
        toast.error("failed to add new project goal")
      }

    })

    const handleSubmit = () => {
    //   mutation.mutate({
    //     APPROVAL : formData.APPROVAL , 
    //     project_id : getProjectMetaData() , 
    //     SUCCESS_CRITERIA : formData.SUCCESS_CRITERIA , 
    //     THE_PROJECTS_OBJECTIVES : formData.THE_PROJECTS_OBJECTIVES , 
    //     type : formData.Type
    //   })
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
               <div><p className='text-sm text-gray-500'>Create New Record</p></div>  
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
              lable='DESCRIPTION'
              value={formData.DESCRIPTION}
              onChange={(e) => setFormData({...formData , DESCRIPTION : e.target.value})}
            />

            <TextField
              lable='RESOLUTION'
              value={formData.RESOLUTION}
              onChange={(e) => setFormData({...formData , RESOLUTION : e.target.value})}
            />

            
            <TextField
                    lable='DATE RESOLVED'
                    value={formData.DATE_RESOLVED}
                    onChange={(e) => setFormData({...formData , DATE_RESOLVED : e.target.value})}
            />
           
             
            
        
             <div className="bg-white py-3 col-span-6  flex items-end justify-end p-4text-right ">
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