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
import { ScrollArea } from '../ui/scroll-area';
import { X } from 'lucide-react'



interface Props {
  
 
    isOpen : boolean ,
    setIsOpen : Dispatch<SetStateAction<boolean>>,
    refetch : () => Promise<any>,
    onAdd?: ({ id, description, title, cost, level }: {
      title: string;
      description: string;
      cost: number;
      level: number;
      id: string;
  }) => void
}


export  function Treepopup ({isOpen , setIsOpen , refetch  , onAdd} : Props) {
  
    const [inputs , setInput ] = useState({
      title : "" ,
      Priority : "",
      cost : "",
      description : "",
      Color : "",
      AssignTo : [] as any[],
      AlocatedRessources : [] as any[]
    })
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
    onSuccess:(data) => {
      toast.success("new task added ")
      if(onAdd === undefined || !data.id) return
      onAdd({title : inputs.title ,id :  data.id , cost : data.cost || 0 , description : data.description || "" , level : 4})
      setIsOpen(false)
    
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
                <ScrollArea className="w-[930px] h-[635px]   z-[100]  transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                    as="div"
                    className=" w-[100%] mx-auto  h-[50px] flex justify-between items-center px-4 "
                  >
               
               <div className='w-[85%]'><p className='text-sm text-gray-500 truncate '>Créer une nouvelle tâche </p></div>  
               <div className='w-[10%] ml-[5%] flex justify-end items-center'>
                
                    <button
                  onClick={() => setIsOpen(false)}
                   className='!text-xl !font-semibold !text-slate-900 !p-0  '
                   >
                   <X className='w-4 h-4 '/>
                    </button>
                   
                </div> 
                  </Dialog.Title>
                <div className="bg-white p-4  w-full  ">
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
                            <AbdullahButton className={` ${buttonVariants({ variant:"secondary" , size:"sm"})} bg-gray-300 text-gray-900`} onClick={() => setIsOpen(false)}>Annuler</AbdullahButton>
                            <AbdullahButton isLoading  = {taskMutation.isLoading} onClick={handleSubmit} className={buttonVariants({ variant:"primary" , size :"sm"})}>Créer  tâche</AbdullahButton>
                        </div>
                 </div> 
                </ScrollArea>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
