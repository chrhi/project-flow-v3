import {
    ArrowDownToLine,
    ArrowRightToLine,
    ArrowUpCircle,
    ArrowUpToLine,
    CheckCircle2,
    Circle,
    HelpCircle,
    XCircle,
  } from "lucide-react"
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
 

  export const statuses = [
  
    {
      value: "TODO",
      label: "Todo",
      icon: Circle,
    },
    {
      value: "DOING",
      label: "In Progress",
      icon: ArrowUpCircle,
    },
    {
      value: "DONE",
      label: "Done",
      icon: CheckCircle2,
    },
    {
      value: "CANCELED",
      label: "Canceled",
      icon: XCircle,
    },
  ]
  

  export const priorities = [
    {
      label: "very low",
      value: "VERY_LOW",
      icon: ArrowDownToLine,
    },
    {
      label: "Low",
      value: "LOW",
      icon: ArrowDownToLine,
    },
    {
      label: "Medium",
      value: "MEDIUM",
      icon: ArrowRightToLine,
    },
    {
      label: "High",
      value: "HEIGH",
      icon: ArrowUpToLine,
    },
    {
      label: "very heigh",
      value: "VERY_HEIGH",
      icon: ArrowUpToLine,
    },
  ]