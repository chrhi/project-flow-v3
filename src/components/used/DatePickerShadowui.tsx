import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
 
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Label } from "../ui/label"

interface Props  extends React.HTMLAttributes<HTMLDivElement> {
  date :  Date | undefined , 
  setDate :  React.Dispatch<React.SetStateAction<Date | undefined>>,
  label : string
}

export function DatePickerShadowui({
  className,
  date , 
  setDate,
  label
}: Props) {


  return (
    <div className={cn(" w-full z-[999] flex flex-col items-start", className)}>
      <Label> {label}</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto z-[999] p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  </div>
  )
}
