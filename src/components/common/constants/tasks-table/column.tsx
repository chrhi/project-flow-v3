import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "~/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { confirmDeleteStakeholder } from "~/store/app-reducer/confirm-actions"
import { getColor } from "~/utils/formate/getColor"
import { Badge } from "@tremor/react"
import { confirmDeleteTask } from "~/store/app-reducer/confirm-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TaskType = {
  id: string
  title: string
  description : string 
  priority : string,
  dueDate : string , 
  endsAt : string , 
  cost : string ,
  assignTo : string[],
  allocatedRessources : string[] 
}

export const columns: ColumnDef<TaskType>[] = [
 
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {

      return <Badge color={getColor({text : row.original.priority})} className="rounded-lg ">{row.original.cost}</Badge>
    }
  },
  {
    accessorKey: "dueDate",
    header: "DueDate",
  },
  {
    accessorKey: "endsAt",
    header: "EndsAt",
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
  {
    accessorKey : "assignTo",
    header: "Assign To",
    cell: ({ row }) => {

    //do api call to fetch all the stake holders assigned job
     
           return <Badge color="purple" className="rounded-lg ">working on it</Badge>
    }
  },
  {
    accessorKey : "allocatedRessources",
    header: "Allocated Ressources ",
    cell: ({ row }) => {

    //do api call to fetch all the resources
 
       return <Badge color="purple" className="rounded-lg ">working on it</Badge>
     }
  },
  
//   {
//     accessorKey: "dueDate",
//     header: "Type",
//     cell: ({ row }) => {

//        // Convert to lowercase
//      const lowercaseString = row.original.type.toLowerCase();

//      // Split by underscores
//      const splitString = lowercaseString.split('_');

//      // Join by spaces
//      const formattedString = splitString.join(' ');

//       return <Badge color="purple" className="rounded-lg ">{formattedString}</Badge>
//     }
//   },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
     
      const setIsShowing = confirmDeleteTask(state => state.setShowModel)
      const setStakeHolderId = confirmDeleteTask(state => state.setId)

       //update
      // const setIsShowingPopUpShowCase = confirmDeleteTask(state => state.setShowModel)
      // const setShowCaseId = confirmDeleteTask(state => state.setId)

      const handleDelete = () => {
        setStakeHolderId(row.original.id)
        setIsShowing(true)

      }

      // const handleShowCase = () => {
      //   setShowCaseId(row.original.id)
      //   setIsShowingPopUpShowCase(true)
      // }
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.title)}
            >
              Copy Task name 
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("not yet")}>View details</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
