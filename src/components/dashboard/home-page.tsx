import BedgetStatus from "./BedgetStatus";
import { getProjectCurrentPhaseAbdullah, getProjectMetaData } from "~/lib/MetaData";
import { RecentStakeholdersNew } from "./recent-stakeholders";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Activity, CreditCard, DollarSign, Euro, Users } from "lucide-react";
import { api } from "~/utils/api";  
import { useState } from "react";
import type { StakeHolder , Tasks , Risk } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";
import { STAKHOLDER_TYPES } from '~/types/static/STATICDATA'
import { toast } from "react-hot-toast";


  export default function HomePage() {

    const [stakeHolders , setStakeHolders] = useState<StakeHolder[]>([] as StakeHolder[])
    const [tasks , setTasks] = useState<Tasks[]>([] as Tasks[])
    const [Risks , setRisks] = useState<Risk[]>([] as Risk[])


    const {isLoading} = api.StakeHolderRouter.get_stakeholders.useQuery({projectId : getProjectMetaData()}, {
      onSuccess(data){
        setStakeHolders(data)
      }
    })

    const { isLoading : isTasksLoading} = api.tasksRouter.getTasks.useQuery({projectId :  getProjectMetaData()} , {
      onError : () => {
        toast.error("something went wrong")
      }, 
      onSuccess(data) {
        setTasks(data)
      }
    })

    const {isLoading : isRiskLoading } = api.riskRouter.getRisks.useQuery({projectId : getProjectMetaData()},{
      onError : () => {
        toast.error("something went wrong")
      }, 
      onSuccess(data) {
        setRisks(data)
      }
    })

   
  
    return (
  
      <div className="w-full max-w-7xl min-h-[600px] mt-[50px] h-fit lg:px-8 my-8 gap-y-4  flex flex-col  items-center">
       
       <div className="w-full h-[50px] flex items-center justify-start ">
          <p className=" text-xl md:text-2xl font-semibold ">Bonjour 👋 voici le tableau de bord et votre espace personnel </p>
       </div>

       <div className="w-full hidden lg:flex  gap-x-6  mb-4 items-center  justify-start">
        
            <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Budget total
                    </CardTitle>
                    <Euro   className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {
                      isLoading ? <Skeleton  /> : <div className="text-2xl font-bold">€
                      {
                       stakeHolders.reduce((total , item ) => {
                        if(item.type === STAKHOLDER_TYPES[0]?.value) {
                         return total + Number(item.InvestmentAmount)
                        }
                        return total
                       } , 0)
                      }
                      
                      </div>
                    }
                      <p className="text-xs text-muted-foreground">
                      depuis la dernière heure.
                    </p>
                    
                  </CardContent>
            </Card>
            <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Parties prenantes
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {
                      isLoading ? <Skeleton  /> : <div className="text-2xl font-bold">
                      {
                       stakeHolders.reduce((total  ) => total + 1, 0)
                      }
                      </div>
                     }
                    <p className="text-xs text-muted-foreground">
                    depuis la dernière heure.
                    </p>
                    
                  </CardContent>
            </Card>
            <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Documents générés</CardTitle>
                 
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">
                    depuis la dernière heure.
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-[200px]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Nombre de tâche
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                    {
                      isLoading ? <Skeleton  /> : <div className="text-2xl font-bold">
                      {
                       tasks.reduce((total  ) => total + 1, 0)
                      }
                      </div>
                     }
                    </div>
                    <p className="text-xs text-muted-foreground">
                    depuis la dernière heure.
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-[300px]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Nombre de risques
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                    {
                      isLoading ? <Skeleton  /> : <div className="text-2xl font-bold">
                      {
                       Risks.reduce((total  ) => total + 1, 0)
                      }
                      </div>
                     }
                    </div>
                    <p className="text-xs text-muted-foreground">
                   depuis la dernière heure.
                    </p>
                  </CardContent>
                </Card>
                
           
    </div>

    <div className="w-full h-[50px] flex items-center justify-start ">
          <p className=" text-xl md:text-2xl font-semibold ">statistiques 📈 de base de la situation actuelle du projet</p>
       </div>

       <div className="w-full h-[600px]  gap-x-4 justify-start mb-10  flex flex-col lg:flex-row">
                <div className="w-full lg:w-[65%] h-[80%] ">
                        <BedgetStatus />
                </div>
               <RecentStakeholdersNew />
       </div>
     
     
      </div>
    )
  }
  