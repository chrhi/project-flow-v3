import {  Fragment } from 'react'
import { api } from '~/utils/api'
import { TextField } from '~/components/used/TextField' 
import { AbdullahButton , buttonVariants } from '~/components/used/AbdullahButton'
import { Input } from '~/components/used/Input'
import Select from 'react-select';
import { STAKHOLDER_TYPES , OPTIONS} from '~/types/static/STATICDATA'
import { Button } from '~/components/ui/button'
import { ScrollArea } from '~/components/ui/scroll-area'
import { toast } from 'react-hot-toast'
import { getProjectMetaData } from '~/lib/MetaData'
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
import { InputNumber } from '~/components/used/NumberInput'




interface Props {
  
 
 
    refetch : () => Promise<any>,

}
 
export function CreateStakeHolder({refetch}:Props) {


    const closeButton = useRef<HTMLButtonElement>(null)

    const [isOpen, setIsOpen] = useState(false);
    const [data  , setData ] = useState({
      name : "",
      position : "",
      contact : "",
      impact : "" ,
      role : "" , 
      investemtAmount : "", 
      expectation : "",
      requirements : "",
      type : ""
    })
    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    
   const mutation = api.StakeHolderRouter.add_stakeholder.useMutation({
    onSuccess : async () => {
      closeModal()
      toast.success("une nouvelle partie prenante a été créée")
      await refetch()
      closeButton.current?.click()
    },
    onError (){
      toast.error("n'a pas réussi à créer une partie prenante")
    }
   })
    
    const handleSubmit = () => {
      if(!data.name || !data.contact || !data.expectation  || !data.position || !data.requirements || !data.role || !data.type){
        toast.error("tous les champs sont obligatoires")
        return 
      }
      mutation.mutate({
        project_id : getProjectMetaData() ,
        contact : data.contact ,
        Expectations : data.expectation,
        impact : data.impact ,
        InvestmentAmount : data.investemtAmount ,
        name : data.name ,
        position : data.position , 
        Requirements : data.requirements , 
        role : data.role , 
        type : data.type
      })
    };
  
  


  return (
    <Sheet >

      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
        Create stakeholder
        </Button>
      </SheetTrigger>
     
      <SheetContent position="right" size="lg" className="overflow-y-auto">
    
        <SheetHeader>
          <SheetTitle>Enrichir l'écosystème des parties prenantes</SheetTitle>
        </SheetHeader>
      
        <div className="w-[90%] mr-[10%] my-6 gap-y-4  min-h-full grid grid-cols-1 px-2 ">
        <div className='col-span-6 '>
                  <label  className="block text-sm font-medium leading-6 text-gray-900">
                  type de partie prenante
                  </label>
                  <Select
                        onChange={(e) => setData({...data , type : e?.value || ""})}
                        name="stakholders_types"
                        options={STAKHOLDER_TYPES}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
            </div> 
            <Input
              lable='Nom'
              value={data.name}
              onChange={(e) => setData({...data , name : e.target.value})}
            />
             <Input
              lable='position'
              value={data.position}
              onChange={(e) => setData({...data , position : e.target.value})}
            />
             <Input
              lable='coordonnées'
              value={data.contact}
              onChange={(e) => setData({...data , contact : e.target.value})}
            />

            <div className='col-span-6 '>
                <label  className="block text-sm font-medium leading-6 text-gray-900">
                l'impact de cette partie prenante
                </label>
                <Select
                       onChange={(e) => setData({...data , impact : e?.value || ""})}
                     name="stakholders"
                     options={OPTIONS}
                     className="basic-multi-select"
                    classNamePrefix="select"
                   />
            </div>
            {
                data.type === "PROJECT_SPONSOR" ? 
                <InputNumber
                lable='Investment amount'
                value={data.investemtAmount}
                onChange={(e) => setData({...data , investemtAmount : e.target.value})}
              />
              : null
            }
          
              <TextField
              lable='ROLE / RESPONSABILITY'
              value={data.role}
              onChange={(e) => setData({...data , role : e.target.value})}
            />
             <TextField
              lable='Attentes'
              value={data.expectation}
              onChange={(e) => setData({...data , expectation : e.target.value})}
            />
            <TextField
              lable='EXIGENCES'
              value={data.requirements}
              onChange={(e) => setData({...data , requirements : e.target.value})}
            />
                
            
         

    </div>
    <div className='w-full grid-col-12  h-[50px] my-4 mt-8 flex justify-end items-center gap-x-8'>
                            <SheetClose ref={closeButton} className={` ${buttonVariants({ variant:"secondary"})} bg-gray-300 text-gray-900`} >Annuler</SheetClose>
                            <AbdullahButton    onClick={handleSubmit}   isLoading={mutation.isLoading} className={`${buttonVariants({size:'sm'  , variant:"primary"})}  `}>
                                   sauvegarder
                           </AbdullahButton>
            </div>
      </SheetContent>
    
    </Sheet>
  )
}