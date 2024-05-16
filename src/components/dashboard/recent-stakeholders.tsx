import { StakeHolder } from "@prisma/client"
import { useState } from "react"
import toast from "react-hot-toast"
import LoadingComponents from "../common/loading-components";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { useRouter } from "next/router";
import { ScrollArea } from "../ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

import { getProjectMetaData } from "~/lib/MetaData"
import { api } from "~/utils/api"
import { AbdullahButton , buttonVariants } from "../used/AbdullahButton";

export function RecentStakeholdersNew() {

  const router = useRouter()

  const [stakeHolders , setStakeHolders] = useState<StakeHolder[]>([] as StakeHolder[])
  const [status , setStatus ] = useState("LOADING")

  const {isLoading} = api.StakeHolderRouter.get_stakeholders.useQuery({projectId : getProjectMetaData()}, {
    onSuccess(data){
      if(data.length === 0) {
        setStatus("EMPTY")
        return
      }
      setStakeHolders(data)
      setStatus("END")
    },
    onError : () => {
      toast.error("Quelque chose s'est mal passé.")
  }, 
  })

  
  return (
    <>
    {
         
         status === "LOADING" ? 
         <LoadingComponents className="max-w-[350px]"/>
         : status === "EMPTY" ? 
         <Card className="max-w-[350px]">
            <CardHeader>
                 <CardTitle>Il n'y a aucun intervenant à afficher.</CardTitle>
                 <CardDescription>
                      Veuillez accéder à la section des parties prenantes et ajouter les intervenants impliqués dans le projet
                 </CardDescription>
            </CardHeader>
            <CardContent className=" w-full h-[300px] flex justify-center items-start pt-20">
            <AbdullahButton
            onClick={() => router.push("/app/startup/stakeholders")}
            className={`${buttonVariants({variant : "primary"})}`}>
                   Ajouter un nouvel intervenant.
            </AbdullahButton>
            </CardContent>
             
          </Card>
         :
         <Card className="max-w-[350px]">
         <CardHeader>
           <CardTitle className="!leading-10">parties prenantes impliquées</CardTitle>
         
           <CardDescription>
             ici, vous pouvez voir les parties prenantes 
           </CardDescription>
         </CardHeader>
         <ScrollArea>
         <CardContent className="flex flex-col justify-start items-start  h-[300px] ">
           {
             stakeHolders.map(item => (
                   <div className="flex items-center justify-between space-x-4">
                       <div className="flex items-center space-x-4">
                          <Avatar>
                          <AvatarImage src="https://github.com/shadcn/ui/blob/main/apps/www/public/avatars/02.png?raw=true" />
                          <AvatarFallback>OM</AvatarFallback>
                          </Avatar>
                          <div>
                           <p className="text-sm font-medium leading-none">{item.name}</p>
                           <p className="text-sm text-muted-foreground">{item.contact}</p>
                          </div>
                       </div>
                   </div>
             ))
           }
         
          
         </CardContent>

         </ScrollArea>
        
       </Card>
}
    </>
    
  )
}