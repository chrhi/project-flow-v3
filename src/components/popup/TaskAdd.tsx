import { Dialog, Transition } from '@headlessui/react'
import { type Dispatch, Fragment, type SetStateAction, useState } from 'react'
import { AbdullahButton , buttonVariants } from '~/components/used/AbdullahButton'
import { Input } from '~/components/used/Input'
import  toast  from 'react-hot-toast';
import Select from 'react-select';
import { TextField } from '~/components/used/TextField';
import { OPTIONS , COLORS} from '~/types/static/STATICDATA'
import { api } from '~/utils/api'
import { getProjectMetaData } from '~/lib/MetaData'
import { DatePickerWithRange } from '../ui/date-range-picker';
import { addDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

interface Props {
  
 
    refetch : () => Promise<any>,
   
}


export  function TaskAdd ({ refetch  } : Props) {
  
    const [inputs , setInput ] = useState({
      title : "" ,
      Priority : "",
      cost : "",
      description : "",
      Color : "",
      AssignTo : [] as any[],
      AlocatedRessources : [] as any[]
    })
    const [isOpen, setIsOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [value, setValue] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 20),
    })
    const [FechedStakeHolders, setFechedStakeHolders] = useState<{label: string  , value : string}[]>([]);
    const [FechedResources, setFechedResources] = useState<{label: string  , value : string}[]>([]);

  api.StakeHolderRouter.get_stakeholders.useQuery({projectId : getProjectMetaData()},{
    onSuccess:(data) => {
      const prepare = data.map(item => {
        return {
          label : item.name || "", 
          value : item.id || ""
        }
      })
      setFechedStakeHolders(prepare)
    }, 
    onError : () => {
      toast.error("failed to fetch stakeholders")
    }
  })
 api.resourcesRouter.getResources.useQuery({projectId : getProjectMetaData()},{
    onSuccess:(data) => {
      const prepare = data.map(item => {
        return {
          label : item.name || "", 
          value : item.id || ""
        }
      })
      setFechedResources(prepare)
    }, 
    onError : () => {
      toast.error("failed to fetch stakeholders")
    }
  })

  const taskMutation = api.tasksRouter.createTask.useMutation({
    onSuccess: async (data) => {
      toast.success("new task added ")
        await refetch()
     
    
    }, 
    onError : () => {
      toast.error("failed to create new task check your internet connection")
    }
  })

   const handleSubmit = () => {

      if(!inputs.title ){
        toast.error("task title is required")
        return
      }
    
      taskMutation.mutate({
        priority : inputs.Priority ,
        title : inputs.title ,
        description : inputs.description,
        AlocatedRessources : inputs.AlocatedRessources , 
        AssignTo : inputs.AssignTo , 
        cost : Number(inputs.cost) , 
        endsAt : value?.to as Date , 
        startAt : value?.from as Date  ,
        projectId : getProjectMetaData(),
        Color : inputs.Color
      })
  

    }
    function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }
 

   

  return (
    <>
    <div className='w-full  h-10 flex justify-between px-4 items-center'>
   <Button  variant="outline"  size="sm" onClick={openModal} >
         Add new Task
    </Button>
   </div>
     
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
                <ScrollArea className="w-[1100px] h-[645px]   z-[100]  transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                    as="div"
                    className=" w-[100%] mx-auto  h-[50px] flex justify-between items-center px-4 border-b "
                  >
               <div><p className='text-md text-gray-900 font-semibold  '>Créer une nouvelle tâche</p></div>  
               <div>
                    <button
                          onClick={() => setIsOpen(false)}
                          className='!text-xl !font-semibold !text-slate-900 !p-0  '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </button>
                </div> 
                  </Dialog.Title>
                <ScrollArea className="bg-white p-4  w-full  ">
                   
                     <div className="grid grid-cols-6 lg:grid-cols-12 gap-6">

               <Input
                   lable='Titre'
                   value={inputs.title}
                   onChange={(e) => setInput({...inputs , title : e.target.value})}
                />
               <div className='col-span-6 '>
               <label  className="block text-sm font-medium leading-6 text-gray-900">
                  Affecter à
                </label>
                <Select
            
                    onChange={(e) => setInput({...inputs , AssignTo : e.map(item => item.value) })}  
                    name="stakholders"
                    options={FechedStakeHolders}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    isMulti
                 />
               </div>
               <div className='col-span-12 '>
               <label  className="block text-sm font-medium leading-6 text-gray-900">
                     choisir une couleur
                </label>
              <Select
                     onChange={(e) => setInput({...inputs , Color : e?.value  || ""})}  
                
                     name="color"
                     options={COLORS}
                     className="basic-multi-select"
                     classNamePrefix="select"
                />
             </div>
            <div className="col-span-6">
                     <DatePickerWithRange label="sélectionner la plage de la date"  date={value} setDate={setValue} />
            </div>

            <div className='col-span-6 '>
                 <label  className="block text-sm font-medium leading-6 text-gray-900">
                     Ressources allouées
                 </label>
             <Select
                 isMulti 
                 onChange={(e) => setInput({...inputs , AlocatedRessources : e.map(item => item.value) })}  
                 name="Ressources"
                 options={FechedResources}
                 className="basic-multi-select"
                 classNamePrefix="select"
              />
             </div>
             <div className='col-span-6 '>
               <label  className="block text-sm font-medium leading-6 text-gray-900">
                 Priorité
               </label>
                <Select
                     onChange={(e) => setInput({...inputs , Priority : e?.value  || ""})}  
                
                      name="Priority"
                      options={OPTIONS}
                      className="basic-multi-select"
                      classNamePrefix="select"
                        />
                 </div>

                 <Input
                   type ="number"
                   onChange={(e) => setInput({...inputs , cost : e?.target.value  || ""})}  
                   lable='Coût'
                   value={inputs.cost}
    
                  />
   
                 <TextField
                       className='lg:col-span-12'
                       lable='Description'
                       value={inputs.description}
                       onChange={(e) => setInput({...inputs , description : e?.target.value  || ""})}  
                      />
                     
                        </div>
                         <div className='w-fill grid-col-12  h-[50px] my-4 flex justify-end items-center gap-x-8'>
                               <AbdullahButton className={` ${buttonVariants({ variant:"secondary"})} bg-gray-300 text-gray-900`} onClick={() => setIsOpen(false)}>Annuler</AbdullahButton>
                               <AbdullahButton isLoading  = {taskMutation.isLoading} onClick={handleSubmit} className={buttonVariants({ variant:"primary"})}>Créer  tâche</AbdullahButton>
                         </div>
                     
                 </ScrollArea> 
                </ScrollArea>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
