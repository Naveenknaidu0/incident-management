"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusBadge } from "@/components/ui/status-badge"
import { PriorityBadge } from "@/components/ui/priority-badge"
import { SLATimer } from "@/components/ui/sla-timer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  ExternalLink,
  UserPlus,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Pin,
  PinOff,
  Eye,
} from "lucide-react"

export interface Incident {
  id: string
  title: string
  status: "new" | "assigned" | "in-progress" | "pending" | "waiting-vendor" | "resolved" | "closed" | "major-incident"
  priority: "critical" | "high" | "medium" | "low"
  severity: "1" | "2" | "3" | "4"
  sla: { remaining: string; status: "safe" | "warning" | "breach" | "breached" }
  assignmentGroup: string
  assignedTo?: { name: string; avatar?: string }
  service: string
  updatedAt: string
  createdAt: string
  tags: string[]
  isPinned?: boolean
  isStale?: boolean
  isRecentlyUpdated?: boolean
}

interface IncidentQueueTableProps {
  incidents: Incident[]
  selectedIds: string[]
  onSelectionChange: (ids: string[]) => void
  onIncidentClick: (incident: Incident) => void
  onPinIncident?: (id: string, pinned: boolean) => void
  density: "compact" | "comfortable"
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalCount: number
  pageSize: number
}

const priorityBorderColors = {
  critical: "border-l-red-500",
  high: "border-l-orange-500",
  medium: "border-l-yellow-500",
  low: "border-l-green-500",
}

export function IncidentQueueTable({
  incidents,
  selectedIds,
  onSelectionChange,
  onIncidentClick,
  onPinIncident,
  density,
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
  pageSize,
}: IncidentQueueTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>("updatedAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const rowPadding = density === "compact" ? "py-2" : "py-3"
  const textSize = density === "compact" ? "text-xs" : "text-sm"

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(incidents.map((i) => i.id))
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
      setSortDirection("desc")
    }
  }

  const isAllSelected = incidents.length > 0 && selectedIds.length === incidents.length
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < incidents.length

  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalCount)

  return (
    <div className="flex h-full flex-col">
      {/* Table Container */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          {/* Sticky Header */}
          <thead className="sticky top-0 z-10 bg-card">
            <tr className="border-b border-border">
              <th className="w-10 px-4 py-3 text-left">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                  className={isSomeSelected ? "data-[state=checked]:bg-[#E69F50]" : ""}
                />
              </th>
              <th className="w-10 px-2 py-3"></th>
              <SortableHeader
                column="id"
                label="Incident ID"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
                className="w-28"
              />
              <SortableHeader
                column="title"
                label="Title"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
                className="min-w-[200px]"
              />
              <SortableHeader
                column="status"
                label="Status"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
                className="w-32"
              />
              <SortableHeader
                column="severity"
                label="Severity"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
                className="w-20"
              />
              <SortableHeader
                column="sla"
                label="SLA"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
                className="w-24"
              />
              <SortableHeader
                column="assignmentGroup"
                label="Assignment Group"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
                className="w-36"
              />
              <SortableHeader
                column="assignedTo"
                label="Assigned To"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
                className="w-36"
              />
              <SortableHeader
                column="service"
                label="Service"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
                className="w-32"
              />
              <SortableHeader
                column="updatedAt"
                label="Updated"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
                className="w-28"
              />
              <SortableHeader
                column="createdAt"
                label="Created"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
                className="w-28"
              />
              <th className="w-16 px-2 py-3 text-left text-xs font-medium text-muted-foreground">
                Tags
              </th>
              <th className="w-10 px-2 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr
                key={incident.id}
                className={cn(
                  "group border-b border-border transition-colors hover:bg-muted/50",
                  selectedIds.includes(incident.id) && "bg-[#E69F50]/5",
                  incident.isPinned && "bg-[#0D3133]/5",
                  incident.isStale && "opacity-60",
                  `border-l-4 ${priorityBorderColors[incident.priority]}`
                )}
              >
                <td className={cn("px-4", rowPadding)}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedIds.includes(incident.id)}
                      onCheckedChange={(checked) =>
                        handleSelectRow(incident.id, checked as boolean)
                      }
                      aria-label={`Select incident ${incident.id}`}
                    />
                    {incident.isPinned && (
                      <Pin className="h-3 w-3 text-[#E69F50]" />
                    )}
                  </div>
                </td>
                <td className={cn("px-2", rowPadding)}>
                  <div className="flex items-center gap-1">
                    <PriorityBadge priority={incident.priority} showLabel={false} />
                    {incident.isRecentlyUpdated && (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                      </span>
                    )}
                  </div>
                </td>
                <td className={cn("px-3", rowPadding)}>
                  <Link
                    href={`/incidents/${incident.id}`}
                    className={cn(
                      "font-mono font-medium text-[#0D3133] hover:underline",
                      textSize
                    )}
                  >
                    {incident.id}
                  </Link>
                </td>
                <td className={cn("px-3", rowPadding)}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onIncidentClick(incident)}
                          className={cn(
                            "max-w-[250px] truncate text-left font-medium text-foreground hover:text-[#0D3133]",
                            textSize
                          )}
                        >
                          {incident.title}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-sm">
                        <p>{incident.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className={cn("px-3", rowPadding)}>
                  <StatusBadge status={incident.status} />
                </td>
                <td className={cn("px-3", rowPadding)}>
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded font-semibold",
                      textSize,
                      incident.severity === "1" && "bg-red-100 text-red-700",
                      incident.severity === "2" && "bg-orange-100 text-orange-700",
                      incident.severity === "3" && "bg-yellow-100 text-yellow-700",
                      incident.severity === "4" && "bg-green-100 text-green-700"
                    )}
                  >
                    {incident.severity}
                  </span>
                </td>
                <td className={cn("px-3", rowPadding)}>
                  <SLATimer
                    remaining={incident.sla.remaining}
                    status={incident.sla.status}
                  />
                </td>
                <td className={cn("px-3", rowPadding)}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={cn(
                            "block max-w-[120px] truncate text-muted-foreground",
                            textSize
                          )}
                        >
                          {incident.assignmentGroup}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{incident.assignmentGroup}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className={cn("px-3", rowPadding)}>
                  {incident.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={incident.assignedTo.avatar} />
                        <AvatarFallback className="text-[10px]">
                          {incident.assignedTo.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={cn(
                          "max-w-[100px] truncate text-foreground",
                          textSize
                        )}
                      >
                        {incident.assignedTo.name}
                      </span>
                    </div>
                  ) : (
                    <span className={cn("text-muted-foreground", textSize)}>
                      Unassigned
                    </span>
                  )}
                </td>
                <td className={cn("px-3", rowPadding)}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={cn(
                            "block max-w-[100px] truncate text-muted-foreground",
                            textSize
                          )}
                        >
                          {incident.service}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{incident.service}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className={cn("px-3", rowPadding)}>
                  <span className={cn("text-muted-foreground", textSize)}>
                    {incident.updatedAt}
                  </span>
                </td>
                <td className={cn("px-3", rowPadding)}>
                  <span className={cn("text-muted-foreground", textSize)}>
                    {incident.createdAt}
                  </span>
                </td>
                <td className={cn("px-3", rowPadding)}>
                  <div className="flex gap-1">
                    {incident.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="h-5 px-1.5 text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {incident.tags.length > 2 && (
                      <Badge
                        variant="outline"
                        className="h-5 px-1.5 text-[10px]"
                      >
                        +{incident.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </td>
                <td className={cn("px-2", rowPadding)}>
                  <div className="flex items-center gap-1">
                    {/* Quick Preview Button */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onIncidentClick(incident)}
                            className="h-7 w-7 opacity-0 group-hover:opacity-100"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Quick Preview</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Pin Button */}
                    {onPinIncident && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onPinIncident(incident.id, !incident.isPinned)}
                              className="h-7 w-7 opacity-0 group-hover:opacity-100"
                            >
                              {incident.isPinned ? (
                                <PinOff className="h-4 w-4 text-[#E69F50]" />
                              ) : (
                                <Pin className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {incident.isPinned ? "Unpin" : "Pin to top"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}

                    {/* More Actions */}
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
                          <Link href={`/incidents/${incident.id}`}>
                            <ExternalLink className="h-3.5 w-3.5" />
                            Open in Workspace
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <UserPlus className="h-3.5 w-3.5" />
                          Assign to Me
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <MessageSquare className="h-3.5 w-3.5" />
                          Add Comment
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Escalate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Resolve
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

      {/* Pagination */}
      <div className="shrink-0 border-t border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{startItem}</span> to{" "}
            <span className="font-medium">{endItem}</span> of{" "}
            <span className="font-medium">{totalCount.toLocaleString()}</span> incidents
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      currentPage === pageNum && "bg-[#0D3133] hover:bg-[#0D3133]/90"
                    )}
                    onClick={() => onPageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SortableHeader({
  column,
  label,
  currentSort,
  direction,
  onSort,
  className,
}: {
  column: string
  label: string
  currentSort: string | null
  direction: "asc" | "desc"
  onSort: (column: string) => void
  className?: string
}) {
  const isActive = currentSort === column

  return (
    <th className={cn("px-3 py-3 text-left", className)}>
      <button
        onClick={() => onSort(column)}
        className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        {label}
        <ArrowUpDown
          className={cn(
            "h-3 w-3",
            isActive && "text-[#E69F50]"
          )}
        />
      </button>
    </th>
  )
}
