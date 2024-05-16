import {  Circle,  Hammer } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

import { AbdullahButton , buttonVariants } from "~/components/used/AbdullahButton" 
import { getProjectMetaData } from "~/lib/MetaData"
import { api } from "~/utils/api"
import { openNewTap } from "~/utils/pdf/openNewTap"

type Props ={
  title : string , 
  description : string , 
  phase : string , 
  color : string 
}

export function ProjectCharterBuilder({title , description , phase , color}:Props) {

    const [isBuilded , setIsBuiled] = useState<boolean>(false)

    const [publicUrl , setPublicUrl ] = useState<string>("")
    
    const mutation = api.integrationsRouter.ProjectCharter.useMutation({
        onSuccess(data){
          toast.success("we have the project charter")
          setIsBuiled(true)
          setPublicUrl(data.url || "")
        },
        onError(){
          toast.error("there is an error")
        }
      })

  return (
    <Card className="lg:max-w-md max-h-64">
      <CardHeader className="grid grid-cols-[1fr_110px]  items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle> {title}</CardTitle>
          <CardDescription>
          {description}.
          </CardDescription>
        </div>
        <div className="flex items-end  w-fit rounded-md bg-white text-secondary-foreground">
            {
             isBuilded ? 
                   <AbdullahButton
                   onClick={() => openNewTap(publicUrl)}
                   className={`${buttonVariants({variant : "primary", size:"sm"})} bg-green-500`} >
                         afficher le document
                  </AbdullahButton> 
                : 
                <AbdullahButton
                onClick={() => mutation.mutate({
                    projectId : getProjectMetaData()
                  })}
                  isLoading={mutation.isLoading}
                className={buttonVariants({variant : "primary", size:"sm"})} >
                    <Hammer className="mr-1 h-3 w-3 font-bold" />   Construire
                </AbdullahButton> 

            }
     
          
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