/* eslint-disable @typescript-eslint/ban-ts-comment */
import  { useState, useEffect } from "react";
import { DragDropContext, type DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import {type  TaskType } from "./Task";
import { api } from "~/utils/api";
import { getProjectMetaData } from "~/lib/MetaData";
import { toast } from "react-hot-toast";
import { openTasksDonePanle } from '~/store/open-models'
import { TaskPopUpShowCase } from "../popup/task-pop-up";
import LoadingComponents from "../common/loading-components";
import { OrderArrayTodo, handleDeleteOrder, updateToDoOrderArray } from "~/lib/hooks/use-order-array";


type Props = {
  tasks : TaskType[],

}



function BoardContainer({tasks} : Props ) {

  const [todo , setTodo ] = useState<TaskType[]>([])
  const [Doing , setDoing ] = useState<TaskType[]>([])
  const [Done , setDone ] = useState<TaskType[]>([])
  const [Canceled , setCanceled ] = useState<TaskType[]>([])

   const task_mutation = api.tasksRouter.updateTaskStatus.useMutation({
    onSuccess : async (data) => {
   
      toast.success("Mis à jour avec succés")
      await refetch()
    },
    onError: () => {
      toast.error("quelque chose s'est mal passé")
    }
   })

   const handleUpdate = (idTask : string , value : string) => {
   
    task_mutation.mutate({
      id : idTask , 
      Status : value
    })

   }

  const openModel = openTasksDonePanle(state => state.setEveryThing)
 const {isLoading , refetch} = api.tasksRouter.getTasks.useQuery({projectId : getProjectMetaData()},{
    onSuccess : (data) => {
      const prepare = data.map((item ) : TaskType => {
        return {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          AssignedTo : item?.AssignedTo ,
          id : item.id , 
          status : item.Status || "" , 
          title : item.title || "", 
          discription : item.description || "" , 
          imgUrl : item.imgUrl || "",
          priority : item.Priority || "",
          endsAt : item.EndsAt || new Date()
        }
      })
      
      setTodo( prepare.filter(item => item.status === "TODO"))
      setDoing(prepare.filter(item => item.status === "DOING"))
      setDone(prepare.filter(item => item.status === "DONE"))
      setCanceled(prepare.filter(item => item.status === "CANCELED"))
    },
    onError : () => {
      setTodo(tasks)
      toast.error("something went wrong may be your internet connection ?")
    },
   
  })





  const handleDragEnd = (result : DropResult) => {
    const { destination, source, draggableId } = result;

    
    const task = findItemById(draggableId, [...todo, ...Doing , ...Done , ...Canceled]);
    if(!task) return 


    if (source.droppableId == destination?.droppableId) return;
   // REMOVE FROM SOURCE ARRAY
    if (source.droppableId === "todo") {
      setTodo(removeItemById(draggableId, todo))
    
    }

    if (source.droppableId === "doing") {
      setDoing(removeItemById(draggableId, Doing));
    }

    if (source.droppableId === "done") {
      setDone(removeItemById(draggableId, Done));
    }
    if (source.droppableId == "Canceled") {
      setCanceled(removeItemById(draggableId, Canceled));
    }
    // GET ITEM


    if (destination?.droppableId === "todo") {
      handleUpdate(task.id ,"TODO" )
      setTodo([{ ...task, status: "TODO" }, ...todo]);

      return
    
  
    }

    if (destination?.droppableId === "doing") {
      handleUpdate(task.id ,"DOING" )
      setDoing([{ ...task, status: "DOING" }, ...Doing]);
      return
    }

    if (destination?.droppableId === "done") {
      handleUpdate(task.id ,"DONE" )
      setDone([{ ...task, status: "DONE" }, ...Done]);
      // openModel({id : task.id ,endedAt : new Date() , startAt : new Date() })
      return
    }
    if (destination?.droppableId== "Canceled") {
      handleUpdate(task.id ,"CANCELED" )
      setCanceled([{ ...task, status: "CANCELED" }, ...Canceled]);
      return
    }
    return

  
  };

  function findItemById(id : string, array : TaskType[]) {
    return array?.find((item) => item?.id == id);
  }

  function removeItemById(id : string, array : TaskType[]) {
    return array?.filter((item) => item?.id != id);
  }

  return (
    <DragDropContext 
    
    onDragEnd = {(result) => handleDragEnd(result)}>
      <TaskPopUpShowCase  refetch ={refetch} />
      {
        isLoading ? <LoadingComponents  className="bg-gray-50" /> :

  
    <div className="w-[95%] ml-[5%]   overflow-x-hidden   h-fit min-h-[500px] flex justify-between ">
      <Column 
       title="A faire"
       tasks={todo} 
       id="todo"
       />
        <Column 
      title="En cours"
       tasks={Doing} 
       id="doing"
       />
        <Column 
      title="Terminer"
       tasks={Done} 
       id="done"
       />
        <Column 
      title="Annuler"
       tasks={Canceled} 
       id="Canceled"
       />
    </div>
        }
    </DragDropContext>
  )
}

export default BoardContainer