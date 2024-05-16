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
import { OpenStakeHolderOpoUpShowCase } from "~/store/open-models"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Stakholder = {
  id: string
  name: string
  email: string
  impact : string 
  type : string
}

export const columns: ColumnDef<Stakholder>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "impact",
    header: "Impact",
    cell: ({ row }) => {

      // Convert to lowercase
    const lowercaseString = row.original.impact.toLowerCase();

    // Split by underscores
    const splitString = lowercaseString.split('_');

    // Join by spaces
    const formattedString = splitString.join(' ');

     return <Badge color={getColor({text : row.original.impact})} className="rounded-lg ">{formattedString}</Badge>
   }
   
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {

       // Convert to lowercase
     const lowercaseString = row.original.type.toLowerCase();

     // Split by underscores
     const splitString = lowercaseString.split('_');

     // Join by spaces
     const formattedString = splitString.join(' ');

      return <Badge color="purple" className="rounded-lg ">{formattedString}</Badge>
    }
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
     
      const setIsShowing = confirmDeleteStakeholder(state => state.setShowModel)
      const setStakeHolderId = confirmDeleteStakeholder(state => state.setId)

       
      const setIsShowingPopUpShowCase = OpenStakeHolderOpoUpShowCase(state => state.setShowModel)
      const setShowCaseId = OpenStakeHolderOpoUpShowCase(state => state.setId)

      const handleDelete = () => {
        setStakeHolderId(row.original.id)
        setIsShowing(true)

      }

      const handleShowCase = () => {
        setShowCaseId(row.original.id)
        setIsShowingPopUpShowCase(true)
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.email)}
            >
              Copy Email 
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleShowCase}>View details</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
