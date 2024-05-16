import { Checkbox } from "~/components/ui/checkbox"
import { Dispatch, SetStateAction } from "react"

type Props = {
  lable? : string |  undefined ,
  value? : boolean |  undefined ,
  text? : string |  undefined ,
  setValue? : Dispatch<SetStateAction<boolean>>| undefined,
  onChange? : (value : boolean) => void,
  clasName? : string ,

}

export function CheckboxWithText({value , setValue , lable  , text , onChange , clasName}:Props) {

  


  return (
    <div className={`items-top col-span-6 flex space-x-2 ${clasName ? clasName : ""}`}>
      <Checkbox   onCheckedChange={() => {
         if(onChange !== undefined){
          onChange(value || false)
         }
       
       
       if(setValue !== undefined){
        setValue(!value)
       }
     
      }} id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
         {lable && lable}
        </label>
        <p className="text-sm text-muted-foreground">
          {text && text}
        </p>
      </div>
    </div>
  )
}

