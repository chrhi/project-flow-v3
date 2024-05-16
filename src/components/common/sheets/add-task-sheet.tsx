import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { AbdullahButton , buttonVariants } from '~/components/used/AbdullahButton'
import { Input } from '~/components/used/Input'
import  toast  from 'react-hot-toast';
import Select from 'react-select';
import { TextField } from '~/components/used/TextField';
import { OPTIONS , COLORS} from '~/types/static/STATICDATA'
import { api } from '~/utils/api'
import { getProjectMetaData } from '~/lib/MetaData'
import { DatePickerWithRange } from "~/components/ui/date-range-picker";
import { addDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"
import { useState , useRef } from "react";
import { InputNumber } from "~/components/used/NumberInput";




interface Props {
    refetch : () => Promise<any>,
}
 
export function CreateTaskButton({refetch} : Props) {


    const closeButton = useRef<HTMLButtonElement>(null)

    const [inputs , setInput ] = useState({
        title : "" ,
        Priority : "",
        cost : "",
        description : "",
        Color : "",
        AssignTo : [] as any[],
        AlocatedRessources : [] as any[],
        imageUrl : ""
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
      onSuccess: async (data) => {
        toast.success("new task added ")
        await refetch()
        closeButton.current?.click()
      
      }, 
      onError : () => {
        closeButton.current?.click()
        toast.error("failed to create new task check your internet connection")
       
      }
    })
  
     const handleSubmit = () => {
     
        if(!inputs.title ){
          toast.error("task title is required")
          return
        }
      
        taskMutation.mutate({
          title : inputs.title ,
          description : inputs.description,
          AlocatedRessources : inputs.AlocatedRessources , 
          AssignTo : inputs.AssignTo , 
          cost : Number(inputs.cost) , 
          endsAt : value?.to as Date , 
          startAt : value?.from as Date  ,
          projectId : getProjectMetaData(),
          Color : inputs.Color,
          priority : inputs.Priority,
          imgUrl : inputs.imageUrl
          
        })
    
  
      }
   
  


  return (
    <Sheet >

      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          create task
        </Button>
      </SheetTrigger>
     
      <SheetContent position="right" size="lg" className="overflow-y-auto">
    
        <SheetHeader>
          <SheetTitle>Add new task to the list</SheetTitle>
        </SheetHeader>
      
        <div className="w-[90%] mr-[10%] my-6 gap-y-4  min-h-full grid grid-cols-1 px-2 ">
         
                           <Input
                                className='lg:col-span-12'
                               lable='Titre'
                               value={inputs.title}
                               onChange={(e) => setInput({...inputs , title : e.target.value})}
                           />
                            <div  className='lg:col-span-12'>
                                <Label>Affecter à</Label>
                                  
                                  <Select
                                      
                                           onChange={(e) => setInput({...inputs , AssignTo : e.map(item => item.value) })}  
                                           name="stakholders"
                                           options={FechedStakeHolders}
                                           className="basic-multi-select"
                                           classNamePrefix="select"
                                           isMulti
                                   />
                            </div>
                            <div  className='lg:col-span-12'>
                                   
                                  <Label> choisir une couleur</Label>
                                  <Select
                                          onChange={(e) => setInput({...inputs , Color : e?.value  || ""})}  
                                          
                                           name="color"
                                           options={COLORS}
                                           className="basic-multi-select"
                                           classNamePrefix="select"
                                   />
                            </div>
                            <div className='lg:col-span-12'>
                            <DatePickerWithRange label="sélectionner la plage de la date"  date={value} setDate={setValue} />
                              </div>
                          
                            <div  className='lg:col-span-12'>
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
                            <div  className='lg:col-span-12'>
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
                         
                            <InputNumber
                                 className='lg:col-span-12'
                               type ="number"
                               onChange={(e) => setInput({...inputs , cost : e?.target.value  || ""})}  
                               lable='Coût'
                               value={inputs.cost}
                              
                             />
                               <Input
                                 className='lg:col-span-12'
                               onChange={(e) => setInput({...inputs , imageUrl : e?.target.value  || ""})}  
                               lable='Image url'
                               value={inputs.imageUrl}
                              
                             />
                              <Input
                                 className='lg:col-span-12'
                               
                               onChange={(e) => console.log(e)}  
                               lable='Attachmets'
                               type="input"
                               value={""}
                              
                             />
                             
                             <TextField
                               className='lg:col-span-12'
                               lable='Description'
                               value={inputs.description}
                               onChange={(e) => setInput({...inputs , description : e?.target.value  || ""})}  
                             />
                             
           </div>
           <div className='w-fill grid-col-12  h-[50px] my-4 mt-8 flex justify-end items-center gap-x-8'>
                            <SheetClose ref={closeButton} className={` ${buttonVariants({ variant:"secondary"})} bg-gray-300 text-gray-900`} >Annuler</SheetClose>
                            <AbdullahButton isLoading  = {taskMutation.isLoading} onClick={handleSubmit} className={buttonVariants({ variant:"primary"})}>Créer  tâche</AbdullahButton>
                        </div>
      
      </SheetContent>
    
    </Sheet>
  )
}