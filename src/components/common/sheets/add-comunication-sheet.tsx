import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { AbdullahButton , buttonVariants } from '~/components/used/AbdullahButton'
import { Input } from '~/components/used/Input'
import  toast  from 'react-hot-toast';
import Select from 'react-select';
import { TextField } from '~/components/used/TextField';
import {METHODS} from '~/types/static/STATICDATA'
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
 
export function CreateComunicationEvent({refetch} : Props) {


    const closeButton = useRef<HTMLButtonElement>(null)

    const [inputs , setInput ] = useState({
        sender : "",
        stakeholders : [""],
        description : "", 
       
        method : ""
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
  
    const comunicationMutation = api.comunicationsRouter.comunicationAdd.useMutation({
      onSuccess: async (data) => {
        toast.success("un nouvelle événement a été créé")
        await refetch()
        closeButton.current?.click()
      
      }, 
      onError : () => {
        closeButton.current?.click()
        toast.error("Échec de la création d'une nouvelle tâche Vérifiez votre connexion Internet")
       
      }
    })
  
     const handleSubmit = () => {
     
        if(!inputs.stakeholders ){
          toast.error("task title is required")
          return
        }
      
        comunicationMutation.mutate({
          Sender : inputs.sender , 
          description : inputs.description,
          method : inputs.method , 
          time : value?.to || new Date() , 
          project_id : getProjectMetaData(),
          stakeholder : inputs.stakeholders

        })
    
  
      }
   
  


  return (
    <Sheet >

      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
         Create new comunication event
        </Button>
      </SheetTrigger>
     
      <SheetContent position="right" size="lg" className="overflow-y-auto">
    
        <SheetHeader>
          <SheetTitle>Add new event  to the list</SheetTitle>
        </SheetHeader>
      
        <div className="w-[90%] mr-[10%] my-6 gap-y-4  min-h-full grid grid-cols-1 px-2 ">
         
                         
                            <div  className='lg:col-span-12'>
                                <Label>Stakeholders</Label>
                                  
                                  <Select
                                      
                                           onChange={(e) => setInput({...inputs , stakeholders : e.map(item => item.value) })}  
                                           name="stakholders"
                                           options={FechedStakeHolders}
                                           className="basic-multi-select"
                                           classNamePrefix="select"
                                           isMulti
                                   />
                            </div>
                          
                            <div className='lg:col-span-12'>
                            <DatePickerWithRange label="sélectionner  la date"  date={value} setDate={setValue} />
                              </div>
                          
                              <div  className='lg:col-span-12'>
                                <Label>sender</Label>
                                  
                                  <Select
                                      
                                           onChange={(e) => setInput({...inputs , sender : e?.value || "" })}  
                                           name="stakholders"
                                           options={FechedStakeHolders}
                                           className="basic-multi-select"
                                           classNamePrefix="select"
                                         
                                   />
                            </div>
                            <div  className='lg:col-span-12'>
                                   
                                   <Label> Method</Label>
                                   <Select
                                           onChange={(e) => setInput({...inputs , method : e?.value  || ""})}  
                                           
                                            name="color"
                                            options={METHODS}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                    />
                             </div>
                             <TextField
                               className='lg:col-span-12'
                               lable='Description'
                               value={inputs.description}
                               onChange={(e) => setInput({...inputs , description : e?.target.value  || ""})}  
                             />
                             
           </div>
           <div className='w-fill grid-col-12  h-[50px] my-4 mt-8 flex justify-end items-center gap-x-8'>
                            <SheetClose ref={closeButton} className={` ${buttonVariants({ variant:"secondary"})} bg-gray-300 text-gray-900`} >Annuler</SheetClose>
                            <AbdullahButton isLoading  = {comunicationMutation.isLoading} onClick={handleSubmit} className={buttonVariants({ variant:"primary"})}>Créer  tâche</AbdullahButton>
                        </div>
      
      </SheetContent>
    
    </Sheet>
  )
}