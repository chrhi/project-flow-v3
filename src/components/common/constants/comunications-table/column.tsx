/* eslint-disable react-hooks/rules-of-hooks */
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
import { getProjectMetaData } from "~/lib/MetaData"
import { useState } from "react"
import toast from "react-hot-toast"
import { AlgeriaformatDate } from "~/utils/formate/AlgeriaFormate"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ComunicationType = {
  id: string
  stakeholders: string[]
  description: string
  time : Date 
  method : string,
  sender : string
}

export const columns: ColumnDef<ComunicationType>[] = [
  {
    accessorKey: "stakeholders",
    header: "Stakeholder",
    cell : ({row}) => {

      const [stakeHolders , setStakeHolders] = useState<any[]>([])

      api.StakeHolderRouter.get_stakeholders.useQuery({projectId : getProjectMetaData()},{
        onSuccess:(data) => {
          const stakeholders = row.original.stakeholders.map(item => {
            const stakeholder = data.find(stakeholder => stakeholder.id === item)
            return stakeholder?.name
          })
          setStakeHolders(stakeholders)
        }, 
        onError : () => {
          toast.error("failed to fetch stakeholders")
        }
      })

      return (
        <div>
          {
            stakeHolders.map(item => <Badge color="blue"  className="rounded-lg  mx-1 "> {item}</Badge> )
          }
        </div>
      )
    }
  },
  {
    accessorKey: "description",
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
    accessorKey: "time",
    header: "Timing",
    cell: ({row}) => {
      return (
        AlgeriaformatDate(row.original.time)
      )
    },
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "sender",
    header: "Sender",
    cell : ({row}) => {

      const [stakeHolder , setStakeHolder] = useState("")

      api.StakeHolderRouter.get_stakeholders.useQuery({projectId : getProjectMetaData()},{
        onSuccess:(data) => {
        
            const stakeholder = data.find(stakeholder => stakeholder.id === row.original.sender)
          
            setStakeHolder(stakeholder?.name || "")
        }, 
        onError : () => {
          toast.error("failed to fetch stakeholders")
        }
      })

      return (
      
          
           <Badge color="red"  className="rounded-lg "> {stakeHolder}</Badge> 
          
       
      )
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
