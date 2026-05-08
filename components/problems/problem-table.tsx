"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProblemStateBadge } from "./problem-state-badge"
import { PriorityBadge } from "@/components/ui/priority-badge"
import {
  ArrowUpDown,
  MoreHorizontal,
  ExternalLink,
  Link2,
  Search,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

export interface Problem {
  id: string
  title: string
  state: "new" | "under-investigation" | "root-cause-identified" | "permanent-fix-planned" | "monitoring" | "resolved" | "closed"
  relatedIncidents: number
  priority: "critical" | "high" | "medium" | "low"
  affectedService: string
  owner?: { name: string; avatar?: string }
  createdAt: string
  isRecurring?: boolean
  hasKnownError?: boolean
}

interface ProblemTableProps {
  problems: Problem[]
  onProblemClick?: (problem: Problem) => void
}

export function ProblemTable({ problems, onProblemClick }: ProblemTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [sortColumn, setSortColumn] = useState<string>("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? problems.map((p) => p.id) : [])
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedIds(
      checked ? [...selectedIds, id] : selectedIds.filter((i) => i !== id)
    )
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const priorityBorderColors = {
    critical: "border-l-red-500",
    high: "border-l-orange-500",
    medium: "border-l-yellow-500",
    low: "border-l-green-500",
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-muted/50">
            <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3 w-10">
                <Checkbox
                  checked={selectedIds.length === problems.length && problems.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-2 py-3 w-12"></th>
              <th className="px-3 py-3">
                <button onClick={() => handleSort("id")} className="flex items-center gap-1 hover:text-foreground">
                  Problem ID <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-3 py-3 min-w-[250px]">Title</th>
              <th className="px-3 py-3">
                <button onClick={() => handleSort("state")} className="flex items-center gap-1 hover:text-foreground">
                  RCA Status <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-3 py-3">Related</th>
              <th className="px-3 py-3">Service</th>
              <th className="px-3 py-3">Owner</th>
              <th className="px-3 py-3">Created</th>
              <th className="px-2 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr
                key={problem.id}
                className={cn(
                  "group border-b border-border transition-colors hover:bg-muted/50",
                  selectedIds.includes(problem.id) && "bg-[#E69F50]/5",
                  `border-l-4 ${priorityBorderColors[problem.priority]}`
                )}
              >
                <td className="px-4 py-2.5">
                  <Checkbox
                    checked={selectedIds.includes(problem.id)}
                    onCheckedChange={(checked) => handleSelectRow(problem.id, checked as boolean)}
                  />
                </td>
                <td className="px-2 py-2.5">
                  <PriorityBadge priority={problem.priority} showLabel={false} />
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/problems/${problem.id}`}
                      className="font-mono text-sm font-medium text-[#0D3133] hover:underline"
                    >
                      {problem.id}
                    </Link>
                    {problem.isRecurring && (
                      <span className="text-red-500" title="Recurring">
                        <AlertTriangle className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {problem.hasKnownError && (
                      <span className="text-purple-500" title="Known Error">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <p className="text-sm text-foreground line-clamp-1">{problem.title}</p>
                </td>
                <td className="px-3 py-2.5">
                  <ProblemStateBadge state={problem.state} />
                </td>
                <td className="px-3 py-2.5">
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <Link2 className="h-3 w-3" />
                    {problem.relatedIncidents}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <span className="text-sm text-foreground">{problem.affectedService}</span>
                </td>
                <td className="px-3 py-2.5">
                  {problem.owner ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px] bg-[#0D3133] text-white">
                          {problem.owner.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-foreground truncate max-w-[100px]">
                        {problem.owner.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unassigned</span>
                  )}
                </td>
                <td className="px-3 py-2.5">
                  <span className="text-xs text-muted-foreground">{problem.createdAt}</span>
                </td>
                <td className="px-2 py-2.5">
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
                      <DropdownMenuItem asChild className="gap-2">
                        <Link href={`/problems/${problem.id}`}>
                          <ExternalLink className="h-3.5 w-3.5" />
                          Open RCA Workspace
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Search className="h-3.5 w-3.5" />
                        Start Investigation
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Link2 className="h-3.5 w-3.5" />
                        Link Incident
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Mark as Known Error
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
