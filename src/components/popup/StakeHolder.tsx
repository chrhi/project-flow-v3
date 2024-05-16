import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { AbdullahButton, buttonVariants } from '../used/AbdullahButton'
import Image from "next/image"
import logo from "~/assets/logo.png"
import { ScrollArea } from '../ui/scroll-area'
import { Input } from '../used/Input'
import { TextField } from '../used/TextField'
import { OpenStakeHolderOpoUpShowCase } from '~/store/open-models'
import { api } from '~/utils/api'
import { toast } from 'react-hot-toast'
import { cn } from '~/lib/utils'
import { InputNumber } from '../used/NumberInput'


const formateType = (text : string) => {
   // Convert to lowercase
   const lowercaseString = text.toLowerCase();

   // Split by underscores
   const splitString = lowercaseString.split('_');

   // Join by spaces
   const formattedString = splitString.join(' ');

   return formattedString
}


type Props = {
  refetch : () => Promise<any>,

}
export  function StakeHolder ({refetch} :Props ) {

  const isShowing = OpenStakeHolderOpoUpShowCase(state => state.showModel)
 
  const setIsShowing = OpenStakeHolderOpoUpShowCase(state => state.setShowModel)

  const id = OpenStakeHolderOpoUpShowCase(state => state.id)

  const [ourData , setOurData] = useState({
    id : "",
    name : "" , 
    email : "" , 
    type : "" , 
    position : "" , 
    impact : "",
    Requiremnts : "",
    Expectations : "",
    Role : "",
    invest : "",
  })

  const {isLoading} = api.StakeHolderRouter.get_one_stakeholder.useQuery({id} , {
    onError : () => {
      toast.error("il y a une erreur lors de l'obtention de la partie prenante")
    },
    onSuccess(data) {
      setOurData({
        id : data?.id || "",
        name : data?.name || "", 
        email : data?.contact || "", 
        type : data?.type || "", 
        position : data?.position || "",  
        impact : data?.impact || "", 
        Requiremnts : data?.Requirements || "", 
        Expectations : data?.Expectations || "",
        Role : data?.role || "",
        invest : data?.InvestmentAmount || "0"
      })
    },
  })

  const mutation = api.StakeHolderRouter.update_stakeholder.useMutation({
    onError : () => {
      toast.error("il y a une erreur lors de l'obtention de la partie prenante")
    },
    onSuccess : async (data) =>  {
      setOurData({
        id : data?.id || "",
        name : data?.name || "", 
        email : data?.contact || "", 
        type : data?.type || "", 
        position : data?.position || "",  
        impact : data?.impact || "", 
        Requiremnts : data?.Requirements || "", 
        Expectations : data?.Expectations || "",
        Role : data?.role || "",
        invest : data?.InvestmentAmount || "0"
      })
      await refetch()
      setIsShowing(false)
    },
  })

  const handleUpdate = () => {
    mutation.mutate({
      id : ourData.id , 
      contact : ourData.email , 
      Expectations : ourData.Expectations , 
      impact : ourData.impact , 
      name : ourData.name , 
      position : ourData.position , 
      Requirements : ourData.Requiremnts , 
      role : ourData.Role , 
      type : ourData.type , 
      InvestmentAmount : ourData.invest
    })
  }
  

  function closeModal() {
    setIsShowing(false)
  }


  return (
    <>
     
      
     

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
                <Dialog.Panel className="w-full h-screen   z-[100]  transform overflow-x-hidden overflow-y-auto   bg-white p-6 text-left align-middle shadow-xl transition-all">
                 <div className='container h-[50px] mx-auto flex justify-between items-center'>
                    <div className="w-[3%] h-full flex justify-start items-center">
                     <Image alt="logo" src={logo} width={35} height={35}  />
                    </div>
                
               
                    <button
                         onClick={closeModal}
                         className='!text-xl !font-semibold !text-slate-900 !p-0  '
                     >
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                    </button>
                </div>
               
                  <ScrollArea className='px-8 py-4 mx-auto   h-fit min-h-full  grid grid-cols-1 w-[70%]   '>
                  <Input 
                        isLoading={isLoading}
                        lable="name "
                        value= {ourData.name}
                        onChange={(e) => setOurData({...ourData , name : e.target.value})}
                  />
                   <Input 
                        isLoading={isLoading}
                        lable="email "
                        value= {ourData.email}
                        onChange={(e) => setOurData({...ourData , email : e.target.value})}
                  />
                  <InputNumber
                     isLoading={isLoading}
                     lable="Investissement "
                     value= {Number(ourData.invest)}
                     onChange={(e) => setOurData({...ourData , invest : e.target.value})}
                  />
                     <Input 
                        isLoading={isLoading}
                       lable="type "
                       value= {formateType(ourData.type )}
                       onChange={(e) => setOurData({...ourData , type : e.target.value})}
                  />
                    <Input 
                        isLoading={isLoading}
                       lable="Position "
                       value= {ourData.position}
                       onChange={(e) => setOurData({...ourData , position : e.target.value})}
                  />
                   <Input
                   
                        isLoading={isLoading}
                       lable="Impact "
                       value= { formateType(ourData.impact)}
                       onChange={(e) => setOurData({...ourData , impact : e.target.value})}
                  />
                  <TextField
                         isLoading={isLoading}
                        lable="Requiremnts "
                        value= {ourData.Requiremnts}
                        onChange={(e) => setOurData({...ourData , Requiremnts : e.target.value})}
                  />
                  <TextField
                         isLoading={isLoading}
                        lable="Expectations "
                        value= {ourData.Expectations}
                        onChange={(e) => setOurData({...ourData , Expectations : e.target.value})}
                  />
                    <TextField
                         isLoading={isLoading}
                        lable="ROLE / RESPONSABILITY "
                        value= {ourData.Role}
                        onChange={(e) => setOurData({...ourData , Role : e.target.value})}
                  />
                  <div className='col-span-12  flex w-full h-[70px] items-center justify-center'>
                      <AbdullahButton
                      isLoading={mutation.isLoading}
                      onClick={handleUpdate}
                      className={cn(buttonVariants({variant : "primary"}) , "w-full")}>
                      Mettre à jour la partie prenante
                      </AbdullahButton>
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
