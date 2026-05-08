"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { WorkflowStateBadge } from "./workflow-state-badge"
import {
  ArrowUpDown,
  MoreHorizontal,
  Play,
  Pause,
  Edit,
  Copy,
  Trash2,
  Eye,
  GitBranch,
  Zap,
  Clock,
  AlertTriangle,
} from "lucide-react"

export interface Automation {
  id: string
  name: string
  description: string
  state: "draft" | "active" | "paused" | "failed" | "archived"
  trigger: string
  lastRun?: string
  runs24h: number
  successRate: number
  folder: string
  createdBy: string
  updatedAt: string
}

interface AutomationTableProps {
  automations: Automation[]
  selectedIds: string[]
  onSelectionChange: (ids: string[]) => void
  onToggleState: (id: string, active: boolean) => void
}

export function AutomationTable({
  automations,
  selectedIds,
  onSelectionChange,
  onToggleState,
}: AutomationTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(automations.map((a) => a.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, id])
    } else {
      onSelectionChange(selectedIds.filter((i) => i !== id))
    }
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const allSelected = automations.length > 0 && selectedIds.length === automations.length
  const someSelected = selectedIds.length > 0 && selectedIds.length < automations.length

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={allSelected}
                  ref={(el) => {
                    if (el) (el as HTMLButtonElement & { indeterminate: boolean }).indeterminate = someSelected
                  }}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </th>
              <th className="px-3 py-3 text-left">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 text-xs font-semibold uppercase text-muted-foreground hover:text-foreground"
                >
                  Workflow
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-3 py-3 text-left">
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  State
                </span>
              </th>
              <th className="px-3 py-3 text-left">
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  Trigger
                </span>
              </th>
              <th className="px-3 py-3 text-left">
                <button
                  onClick={() => handleSort("runs24h")}
                  className="flex items-center gap-1 text-xs font-semibold uppercase text-muted-foreground hover:text-foreground"
                >
                  Runs (24h)
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-3 py-3 text-left">
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  Success Rate
                </span>
              </th>
              <th className="px-3 py-3 text-left">
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  Last Run
                </span>
              </th>
              <th className="w-12 px-2 py-3" />
            </tr>
          </thead>
          <tbody>
            {automations.map((automation) => (
              <tr
                key={automation.id}
                className={cn(
                  "group border-b border-border transition-colors hover:bg-muted/50",
                  selectedIds.includes(automation.id) && "bg-[#E69F50]/5"
                )}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedIds.includes(automation.id)}
                    onCheckedChange={(checked) => handleSelectRow(automation.id, checked as boolean)}
                    aria-label={`Select ${automation.name}`}
                  />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0D3133]/5">
                      <GitBranch className="h-4 w-4 text-[#0D3133]" />
                    </div>
                    <div>
                      <Link
                        href={`/automation/workflows/${automation.id}`}
                        className="font-medium text-[#0D3133] hover:underline"
                      >
                        {automation.name}
                      </Link>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {automation.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <WorkflowStateBadge state={automation.state} />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Zap className="h-3.5 w-3.5" />
                    {automation.trigger}
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm font-medium">{automation.runs24h}</span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          automation.successRate >= 95
                            ? "bg-green-500"
                            : automation.successRate >= 80
                            ? "bg-amber-500"
                            : "bg-red-500"
                        )}
                        style={{ width: `${automation.successRate}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {automation.successRate}%
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {automation.lastRun || "Never"}
                  </div>
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 opacity-0 group-hover:opacity-100"
                            onClick={() => onToggleState(automation.id, automation.state !== "active")}
                          >
                            {automation.state === "active" ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {automation.state === "active" ? "Pause" : "Activate"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/automation/workflows/${automation.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/automation/workflows/${automation.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
