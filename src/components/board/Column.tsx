import React from "react";
import { StrictModeDroppable as Droppable } from "~/utils/FixBugs/StrictModeDroppable";
import Task, { type TaskType } from "./Task";
import { AbdullahButton  , buttonVariants} from "../used/AbdullahButton";
import { ScrollArea } from "../ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal  } from "lucide-react";

type PropsType ={
  title : string , 
  id : string , 
  tasks : TaskType[]
}

export default function Column({ title, tasks, id } : PropsType ) {
  return (
   <div className="w-[25%]  h-fit  overflow-x-hidden  ">
       {/* this is the column header */}
     <div className="w-full max-w-[300px]  flex justify-between px-4 items-center h-[35px]  my-2  ">
     <p className="text-md font-semibold  text-gray-900 ">   {title}({tasks.length})</p>
     <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
           
            <DropdownMenuSeparator />
            <DropdownMenuItem >fermer cette colonne</DropdownMenuItem>
            <DropdownMenuItem >changer le nom</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
    {/* this the draggable area */}
    <Droppable droppableId={id}>
    
        {(provided, snapshot) => (
            <ScrollArea className="h-full w-full">
          <div
          className="w-full h-fit min-h-[300px]  "
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((item, index) => (
              <Task priority={item?.priority} endsAt={item?.endsAt} key={item?.id} AssignedTo={item?.AssignedTo} index={index} title={item?.title} id={item?.id} discription={item?.discription} imgUrl={item?.imgUrl} />
            ))}
            {provided.placeholder}
          </div>
          </ScrollArea>
        )}

 
      </Droppable>
     
     
   </div>
     );
}