/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type NextPage } from "next";
import { HeaderAdmin } from "~/components/header/admin-header/HeaderAdmin";
import {  LineChart } from "@tremor/react";
import MaxWidthWrapper from "~/components/layout/MaxWidthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/utils/api";
import { useState } from "react";
import { Tasks } from "@prisma/client";
import { toast } from "react-hot-toast";
import LoadingComponents from "~/components/common/loading-components";
import EmptyGanttChard from "~/components/gantt-chard/empty";


function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: '2-digit'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

const Page: NextPage = () => {

  const [status , setStatus ] = useState("LOADING")

  const [users , setUsers ] = useState<any[]>([] as any[])

  api.userRouter.getAllUser.useQuery(undefined,{
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
     const prepare = sortedData.map((item , index) => {
      return {
           date:formatDate(item.createdAt || new Date()),
           "Nombre d'utilisateurs": index,
      }

     })
    
     setUsers(prepare)
     setStatus("PLAYING")
    }, 
  })

   

  return (
    <>
    <HeaderAdmin />
      <main className=" w-full custom-hieght-navbar bg-stone-50  flex justify-start items-center  ">
        <MaxWidthWrapper>
        <div className="w-full flex flex-wrap gap-8 ">

        <Card  >
      <CardHeader>
        <CardTitle>Taux de croissance des utilisateurs</CardTitle>
        <CardDescription>
        La croissance des utilisateurs est cruciale pour évaluer le succès d'une entreprise et prendre des décisions stratégiques en matière de développement et de marketing.
        </CardDescription>
      </CardHeader>
      {
         
         status === "LOADING" ? 
         <LoadingComponents />
         : status === "EMPTY" ? 
        <EmptyGanttChard />
         :
         <CardContent >
        
        <LineChart
                   className="mt-6"
                   data={users}
                   index="date"
                   categories={["Nombre d'utilisateurs"]}
                   colors={["blue"]}
                   yAxisWidth={40}
             />
         </CardContent>
     }
         
     
    </Card>
      
        </div>
        </MaxWidthWrapper>
      </main>
    </>
  );
};

export default Page;
