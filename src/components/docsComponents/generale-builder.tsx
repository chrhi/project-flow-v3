import {  Circle,  Hammer } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

import { AbdullahButton, buttonVariants } from "../used/AbdullahButton"

type Props ={
  title : string , 
  description : string , 
  phase : string , 
  color : string 
}

export function GeneraleBuilder({title , description , phase , color}:Props) {
  return (
    <Card className="lg:max-w-md max-h-64">
      <CardHeader className="grid grid-cols-[1fr_110px]  items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>📙 {title}</CardTitle>
          <CardDescription>
          {description}.
          </CardDescription>
        </div>
        <div className="flex items-end  w-fit rounded-md bg-white text-secondary-foreground">
        <AbdullahButton
           className={buttonVariants({variant : "primary", size:"sm"})} >
               <Hammer className="mr-1 h-3 w-3 font-bold" />   Construire
        </AbdullahButton> 
          
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Circle className={`mr-1 h-3 w-3 fill-sky-400 text-sky-400 ${color}`} />
           {phase}
          </div>
          <div className="flex items-center">
            <Hammer className="mr-1 h-3 w-3" />
            0
          </div>
          {/* <div>Updated April 2023</div> */}
        </div>
      </CardContent>
    </Card>
  )
}