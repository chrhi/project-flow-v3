import type  { ColumnDef } from "@tanstack/react-table"
import { Button } from "~/components/ui/button"
import {  MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { AlgeriaformatDate } from "~/utils/formate/AlgeriaFormate"
import { api } from "~/utils/api"
import { toast } from "react-hot-toast"
import { confirmMilestoneDelete } from "~/store/app-reducer/confirm-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MileStone = {
  id: string
  mileStone: string
  date: Date
  description : string 

}

export const columns: ColumnDef<MileStone>[] = [
  {
    accessorKey: "mileStone",
    header: "MileStone",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({row}) => {
      return (
        AlgeriaformatDate(row.original.date)
      )
    },

  },
  {
    accessorKey: "description",
    header: "description",
  },
 
 
  {
    id: "actions",
    cell: ({row}) => {

     const mutation =  api.mileStoneRouter.milestoneDelete.useMutation({
        onSuccess : () => {
          toast.success("raho tfasa doka")
        },
        onError : () => {
          toast.success("there is an erro")
        }
      })
      const setDeleteModelOpen = confirmMilestoneDelete(state => state.setShowModel)
      const setId = confirmMilestoneDelete(state => state.setId)

      const handleDelete = () => {
        setId(row.original.id)
        setDeleteModelOpen(true)
      }

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
           
            <DropdownMenuSeparator />
            <DropdownMenuItem
         
            onClick={handleDelete}
            >supprimer </DropdownMenuItem>
         
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
