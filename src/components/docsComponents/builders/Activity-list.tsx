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



export function ActivityListBuilder() {

    const [isBuilded , setIsBuiled] = useState<boolean>(false)

    const [publicUrl , setPublicUrl ] = useState<string>("")
    
    const mutation = api.integrationsRouter.Activity_list_create.useMutation({
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
          <CardTitle> 📙 Liste d'activitéss</CardTitle>
          <CardDescription>
          La liste des activités dans PMBOK est un document complet qui décrit toutes les activités individuelles requises pour mener à bien un projet.
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
            <Circle className={`mr-1 h-3 w-3 fill-yellow-400 text-yellow-400`} />
          planning
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