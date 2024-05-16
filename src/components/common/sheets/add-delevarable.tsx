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
import { v4 as uuidv4 } from 'uuid';
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
import { WBS_NODES } from "~/types/static/STATICDATA";



interface Props {
    onAdd : ({ title, id, description, cost, level }: {
      title: string;
      description: string;
      cost: number;
      level: number;
      id : string
  }) => void,
}
 
export function CreateDelevarble({onAdd} : Props) {


    const closeButton = useRef<HTMLButtonElement>(null)

    const [inputs , setInput ] = useState({
        title : "" ,
        level : 1,
        cost : 0,
        type : "",
        description : "",
     

      })
  
      
      const handleSubmit = () => {
        onAdd({
          cost : inputs.cost , 
          description : inputs.description , 
          level : inputs.level , 
          title : inputs.title , 
          id :  uuidv4()
        })
        closeButton.current?.click()
      }
      
     
  
  


  return (
    <Sheet >

      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
        Add  Deliverable
        </Button>
      </SheetTrigger>
     
      <SheetContent position="right" size="lg" className="overflow-y-auto">
    
        <SheetHeader>
          <SheetTitle>Create new Delevarable</SheetTitle>
        </SheetHeader>
      
        <div className="w-[90%] mr-[10%] my-6 gap-y-4  min-h-full grid grid-cols-1 px-2 ">

                <div className='col-span-12 '>
                        <label  className="block text-sm font-medium leading-6 text-gray-900">
                        Deliverable type 
                        </label>
                        <Select
                               onChange={(e) => setInput({...inputs , type : e?.value || ""})}
                               name="stakholders_types"
                               options={WBS_NODES}
                               className="basic-multi-select"
                               classNamePrefix="select"
                          />
                 </div> 
                 
                <div className='col-span-12 '>
                        <label  className="block text-sm font-medium leading-6 text-gray-900">
                        Milestone dependency 
                        </label>
                        <Select
                               onChange={(e) => setInput({...inputs , type : e?.value || ""})}
                               name="stakholders_types"
                               options={WBS_NODES}
                               className="basic-multi-select"
                               classNamePrefix="select"
                          />
                 </div> 
                 <div className='col-span-12 '>
                        <label  className="block text-sm font-medium leading-6 text-gray-900">
                        Risk dependency 
                        </label>
                        <Select
                               onChange={(e) => setInput({...inputs , type : e?.value || ""})}
                               name="stakholders_types"
                               options={WBS_NODES}
                               className="basic-multi-select"
                               classNamePrefix="select"
                          />
                 </div> 
                 <div className='col-span-12 '>
                        <label  className="block text-sm font-medium leading-6 text-gray-900">
                        Objectives dependency 
                        </label>
                        <Select
                               onChange={(e) => setInput({...inputs , type : e?.value || ""})}
                               name="stakholders_types"
                               options={WBS_NODES}
                               className="basic-multi-select"
                               classNamePrefix="select"
                          />
                 </div> 
                 <div className='col-span-12 '>
                        <label  className="block text-sm font-medium leading-6 text-gray-900">
                        meets dependency 
                        </label>
                        <Select
                               onChange={(e) => setInput({...inputs , type : e?.value || ""})}
                               name="stakholders_types"
                               options={WBS_NODES}
                               className="basic-multi-select"
                               classNamePrefix="select"
                          />
                 </div> 
                
                          <Input
                               className='lg:col-span-12'
                               lable='Titre'
                               value={inputs.title}
                               onChange={(e) => setInput({...inputs , title : e.target.value})}
                           />
                            <InputNumber
                               className='lg:col-span-12'
                               type ="number"
                               onChange={(e) => setInput({...inputs , cost : Number(e?.target.value ) || 0})}  
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
           <div className='w-fill grid-col-12  h-[50px] my-4 mt-8 flex justify-end items-center gap-x-8'>
                            <SheetClose ref={closeButton} className={` ${buttonVariants({ variant:"secondary"})} bg-gray-300 text-gray-900`} >Annuler</SheetClose>
                            <AbdullahButton  onClick={handleSubmit} className={buttonVariants({ variant:"primary"})}>Créer  tâche</AbdullahButton>
                        </div>
      
      </SheetContent>
    
    </Sheet>
  )
}