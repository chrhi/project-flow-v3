import { Dialog, Transition } from '@headlessui/react'
import { type Dispatch, Fragment, type SetStateAction, useState } from 'react'
import { AbdullahButton , buttonVariants } from '~/components/used/AbdullahButton'
import { Input } from '~/components/used/Input'
import  toast  from 'react-hot-toast';
import { v4 as uuidV4 } from 'uuid';

interface Props {
  
 
    isOpen : boolean ,
    setIsOpen : Dispatch<SetStateAction<boolean>>,
    refetch : () => Promise<any>,
    onAdd?: ({title , id  } : {title: string , id : string }) => void
}


export  function AddMagicNode ({isOpen , setIsOpen , refetch  , onAdd} : Props) {
  
    const [inputs , setInput ] = useState({
      title : "" ,
    })
   
   const handleSubmit = () => {

        const id = uuidV4()

      if(!inputs.title ){
        toast.error("task title is required")
        return
      }
    
      if(onAdd === undefined || !id) return
      onAdd({title : inputs.title ,id :  id })
      setIsOpen(false)

    }
 
  return (
    <>
     
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0  bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-[730px] h-[325px]   z-[100]  transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                    as="div"
                    className=" w-[100%] mx-auto bg-gradient-to-br from-pink-500 to-purple-800 h-[50px] flex justify-between items-center px-4 border-b "
                  >
               <div><p className='text-md text-white font-semibold  ml-4'>Créer une nouvelle tâche</p></div>  
               <div>
                    <button
                          onClick={() => setIsOpen(false)}
                          className='!text-xl !font-semibold !text-white !p-0  '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </button>
                </div> 
                  </Dialog.Title>
                <div className="bg-white p-4  w-full  ">
                      <div className="grid grid-cols-6 mt-12  gap-6">

                          <Input
                              
                               lable='Titre'
                               value={inputs.title}
                               onChange={(e) => setInput({...inputs , title : e.target.value})}
                           /> 
                           
                       </div>
                       <div className='w-fill grid-col-12  h-[50px] my-4 flex justify-end items-center gap-x-8'>
                            <AbdullahButton className={` ${buttonVariants({ variant:"secondary"})} bg-gray-300 text-gray-900`} onClick={() => setIsOpen(false)}>Annuler</AbdullahButton>
                            <AbdullahButton  onClick={handleSubmit} className={`${buttonVariants({ variant:"primary"})} bg-gradient-to-br from-pink-500 to-purple-500`}>create magic node</AbdullahButton>
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
