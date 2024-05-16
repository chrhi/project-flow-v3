import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import Skeleton from 'react-loading-skeleton';
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Label } from "./label"

interface Props  extends React.HTMLAttributes<HTMLDivElement> {
    date :  DateRange | undefined , 
    setDate :  React.Dispatch<React.SetStateAction<DateRange | undefined>>,
    label : string,
    isLoading? : boolean
}
 
export function DatePickerWithRange({
  className,
  date , 
  setDate,
  label,
  isLoading
}: Props) {
    
 
  return (
    <div className={cn("grid gap-2 w-full", className)}>
      {isLoading ? <Skeleton style={{width : "50%"}} /> : <Label> {label}</Label> }
        
        {
          isLoading ? <Skeleton style={{width : "100%"}} /> : 
        
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              " w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto z-[990] p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      }
    </div>
  )
}