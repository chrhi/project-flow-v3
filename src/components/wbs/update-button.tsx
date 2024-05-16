/* eslint-disable react/jsx-key */
import { Dialog, Transition } from '@headlessui/react'
import  {useEffect} from 'react'
import { Fragment,  useState } from 'react'
import { api } from '~/utils/api'
import { AbdullahButton, buttonVariants } from '../used/AbdullahButton'

import { Input } from '../used/Input'

import { TextField } from '../used/TextField'

import { InputNumber } from '../used/NumberInput'
import { X } from 'lucide-react'
import { OpenDelevaribleUpdateModel } from '~/store/open-models'

type Props = {
  
    onUpdate: ({ id, cost, description, title }: {
        id: string;
        cost: number;
        title: string;
        description: string;
    }) => void
}





export  function DelevarableUpdate ({ onUpdate} : Props) {


 
  

    const isShowing = OpenDelevaribleUpdateModel(state => state.showModel)

    const setIsShowing = OpenDelevaribleUpdateModel(state => state.setShowModel)

    const {title , cost , description , id} = OpenDelevaribleUpdateModel()
  
  
    const [formData , setFormData] = useState({
      title : title ||  "" ,
      description : description || "",
      cost :cost ||  0, 
    })

    useEffect(() => {
        setFormData({
            title : title ||  "" ,
            description : description || "",
            cost :cost ||  0,
        })
    } , [title , description , cost ])
     
    function openModal() {

      setIsShowing(true)
    }
    function closeModal(){
    
      setIsShowing(false)
    }
    
    

    const handleSubmit = () => {
        onUpdate({
            cost : formData.cost , 
            description : formData.description , 
            title : formData.title , 
            id 
        })
        closeModal()
    }
   

  return (
  
  
    <Transition appear show={isShowing} as={Fragment}>
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
                    className=" w-full h-[50px] px-4 flex justify-between items-center  "
                  >
               <div className='w-[85%]'><p className='text-sm text-gray-500 truncate '>{formData.title || "Update informations "} </p></div>  
               <div className='w-[10%] ml-[5%] flex justify-end items-center'>
                
                    <button
                    onClick={closeModal}
                   className='!text-xl !font-semibold !text-slate-900 !p-0  '
                   >
                   <X className='w-4 h-4 '/>
                    </button>
                   
                </div> 
                  </Dialog.Title>
                 
           <div className="bg-white p-4  w-full  ">
            <div className="grid grid-cols-6 gap-6">
            
            <Input
               className='col-span-6'
              lable='Title'
              value={formData.title}
              onChange={(e) => setFormData({...formData , title : e.target.value})}
            />

           <InputNumber
               className='col-span-6'
              lable='cost'
              value={formData.title}
              onChange={(e) => setFormData({...formData , cost : Number(e.target.value)})}
            />

            
            <TextField
              className='col-span-6'
              lable=' Description'
              value={formData.description}
              onChange={(e) => setFormData({...formData , description : e.target.value})}
            />
        
             <div className="bg-white py-3 col-span-6 text-right ">
            <AbdullahButton
            onClick={handleSubmit}
           
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

    
  )
}