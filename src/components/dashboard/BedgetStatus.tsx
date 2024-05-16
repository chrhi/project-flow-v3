/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import {
  AreaChart,
} from "@tremor/react";
import { InformationCircleIcon } from "@heroicons/react/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { api } from "~/utils/api";
import { getProjectMetaData } from "~/lib/MetaData";
import { Tasks } from "@prisma/client";
import { toast } from "react-hot-toast";
import LoadingComponents from "../common/loading-components";
import EmptyGanttChard from '../gantt-chard/empty';

function sortDates(dates: Date[]): Date[] {
  const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
  return sortedDates;
}

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: '2-digit'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

const dataFormatter = (number: number): string => {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(number).split(",")[0]  || "";
};


function BedgetStatus() {

  const [status , setStatus ] = useState("LOADING")

  const [tasks , setTasks ] = useState<any[]>([] as any[])

   api.tasksRouter.getTasks.useQuery({projectId : getProjectMetaData()},{
    onError : () => {
        toast.error("Quelque chose s'est mal passé.")
    }, 
    onSuccess : (data) =>  {
      if(!data || data.length === 0 ){
        setStatus("EMPTY")
        return
      }
      //@ts-ignore
      const sortedData =  data.sort((a, b) => a?.EndsAt?.getTime() - b?.EndsAt?.getTime());
     const prepare = sortedData.map(item => {
      return {
           date:formatDate(item.EndsAt || new Date()),
           "Coût prévu pour une tâche": item.cost,
           "Le coût réel de la tâche": item.RealCost,

      }

     })
    
     setTasks(prepare)
     setStatus("PLAYING")
    }, 
  })
   
    
  return (

      <Card >
      <CardHeader>
        <CardTitle>Comment nous dépensons le budget pendant le projet</CardTitle>
        <CardDescription>
        Le budget est généré à partir des sponsors du projet.
        </CardDescription>
      </CardHeader>
      {
         
          status === "LOADING" ? 
          <LoadingComponents />
          : status === "EMPTY" ? 
         <EmptyGanttChard />
          :
          <CardContent >
          <AreaChart
          allowDecimals
          className="h-72 w-full mt-4  "
          data={tasks || []}
          index="date"
          categories={["Coût prévu pour une tâche", "Le coût réel de la tâche"]}
          colors={["yellow", "orange"]}
          valueFormatter={dataFormatter}
        />
          </CardContent>
      }
     
    </Card>
   
  )
}

export default BedgetStatus