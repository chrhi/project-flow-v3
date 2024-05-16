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

import { OpenDeteRisksDeleteModel } from "~/store/open-models"

import { api } from "~/utils/api"
import { Badge } from "@tremor/react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RiskType = {
  id: string
  title: string
  discreption: string
  status : string 
  solution : string,
  cost : number
}

export const columns: ColumnDef<RiskType>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "discreption",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Discreption
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "solution",
    header: "solution",
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }) => {

     return <Badge color="yellow"  className="rounded-lg ">€ {row.original.cost}</Badge>
   }
   
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {

      const setRisksDelete = OpenDeteRisksDeleteModel(state => state.setId)

      const setIsShowing = OpenDeteRisksDeleteModel(state => state.setShowModel)

      const handleDelete = () => {
        setRisksDelete(row.original.id)
        setIsShowing(true)

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
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
