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
import { confirmObjectiveDelete } from "~/store/app-reducer/confirm-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Objectives = {
  id: string
  THE_PROJECTS_OBJECTIVES: string
  SUCCESS_CRITERIA: string
  APPROVAL : string 
  type : string
}

export const columns: ColumnDef<Objectives>[] = [
  {
    accessorKey: "THE_PROJECTS_OBJECTIVES",
    header: "THE PROJECTS OBJECTIVES",
  },
  {
    accessorKey: "SUCCESS_CRITERIA",
    header: "SUCCESS CRITERIA"
  },
  {
    accessorKey: "APPROVAL",
    header: "APPROVAL",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
 
  {
    id: "actions",
    cell: ({row}) => {
      
      const setDeleteModelOpen = confirmObjectiveDelete(state => state.setShowModel)
      const setId = confirmObjectiveDelete(state => state.setId)

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
            <DropdownMenuItem onClick={handleDelete}>Delete </DropdownMenuItem>
         
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
