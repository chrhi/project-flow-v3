/* eslint-disable  */
import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import {  Badge, BadgeDelta  } from "@tremor/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { openTasksShowUp } from '~/store/open-models';
import { Separator } from '../ui/separator';
import { api } from '~/utils/api';
import { getProjectMetaData } from '~/lib/MetaData';
import { toast } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';

type PropsType =  {
  index : number ,
  id : string,
  title : string , 
  discription? : string , 
  imgUrl? : string,
  priority?: string
  endsAt? : Date ,
  AssignedTo : string[],
}

 export type TaskType = {
  id : string ,
  title : string , 
  AssignedTo : string[],
  discription? : string , 
  imgUrl? : string,
  priority?: string,
  status : string,
  endsAt? : Date 
}




function remainingTime(date: Date): string {
  const currentDate = new Date();
  const timeLeft = date.getTime() - currentDate.getTime();

  if (timeLeft >= 30 * 24 * 60 * 60 * 1000) {
    const monthsLeft = Math.floor(timeLeft / (30 * 24 * 60 * 60 * 1000));
    return `${monthsLeft} mois restants`;
  } else if (timeLeft >= 24 * 60 * 60 * 1000) {
    const daysLeft = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
    return `${daysLeft} Jours restants`;
  } else {
    const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutesLeft = Math.floor((timeLeft / (60 * 1000)) % 60);
    return `${hoursLeft} heures et ${minutesLeft} minutes restant`;
  }
}

function Task({index , id , title , discription , imgUrl , endsAt , priority ,AssignedTo }  : PropsType) {

  const setIsOpen  = openTasksShowUp(state => state.setShowModel)
  const setId = openTasksShowUp(state => state.setId)

  // const [stakeHolders , setStakeHolders] = useState<any[]>([])

//  const {isFetching} =  api.StakeHolderRouter.get_stakeholders.useQuery({projectId : getProjectMetaData()},{
    
//     onSuccess:(data) => {
//       const stakeholders = AssignedTo.map(item => {
//         const stakeholder = data.find(stakeholder => stakeholder.id === item)
//         return stakeholder?.name
//       })
//       setStakeHolders(stakeholders)
      
//     }, 
//     onError : () => {
//       toast.error("failed to fetch stakeholders")
//     },
   
//   })

  return (
    <Draggable  draggableId={id} index={index}>
        {(provided , snapshot) => (
          
            <Card 
            onClick={() => {
              setId(id)
              setIsOpen(true)
            }}
            className={`w-[90%]   flex flex-col items-start gap-y-2   shadow-lg h-fit min-h-[50px] rounded-lg bg-white my-4 
             ${snapshot.isDragging ? "shadow-xl " : "" }`}
            {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            

             <CardHeader>
             
                 <CardTitle>{title}</CardTitle>
                 <CardDescription>
                       {discription}
                 </CardDescription>
               
             </CardHeader>
             <CardContent className='w-full'>
                 {/* <Separator orientation="horizontal" className='w-full ' /> */}
                 {imgUrl &&  <img alt="task image" src={imgUrl}  className='w-[99%] mx-auto'/>}
                 <div className='w-full min-h-[50px] flex justify-end  flex-wrap gap-x-1 pt-2 '>
                        
                   {    
                 AssignedTo?.map(item => <Badge color="yellow" size='xs' className="rounded-lg my-1  "> {item}</Badge> )
}     
                        <Badge color="pink" size='xs' className="rounded-lg h-4 my-1  "> {priority}</Badge>
                        <Badge color="blue" size='xs' className="rounded-lg h-4 my-1  "> {endsAt && remainingTime(endsAt)}</Badge>
                 </div>
                 <Separator orientation="horizontal" className='w-full bg-blue-500 h-1 ' />
                 </CardContent>   
            </Card>
        )}
     </Draggable>
  )
}

export default Task