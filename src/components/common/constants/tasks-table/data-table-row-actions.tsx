import type  { Row } from "@tanstack/react-table"
import { Copy, MoreHorizontal, Pen, Star, Tags, Trash } from "lucide-react"
import { openTasksShowUp } from "~/store/open-models"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu"

import { labels } from "./data/data"
import { taskSchema } from "./data/schema"
import { confirmDeleteTask } from "~/store/app-reducer/confirm-actions"

interface DataTableRowActionsProps<TData> {
  row:  Row<{
    title: string;
    status: string;
    id: string;
    priority: string;
    label: string;
}>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
//   const task = taskSchema.parse(row.original)
const setIsShowing = confirmDeleteTask(state => state.setShowModel)
const setStakeHolderId = confirmDeleteTask(state => state.setId)

const setIsOpen  = openTasksShowUp(state => state.setShowModel)
const setId = openTasksShowUp(state => state.setId)

 //update
// const setIsShowingPopUpShowCase = confirmDeleteTask(state => state.setShowModel)
// const setShowCaseId = confirmDeleteTask(state => state.setId)

const handleDelete = () => {
  setStakeHolderId(row.original.id)
  setIsShowing(true)

}

const handleShowCase = () => {
  setId(row.original.id)
  setIsOpen(true)
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
              onClick={() => navigator.clipboard.writeText(row.original.title)}
            >
              Copy Task name 
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleShowCase}>View details</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}