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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EventTypeBadge } from "./event-type-badge"
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Eye,
  Download,
  ExternalLink,
} from "lucide-react"

export interface AuditEvent {
  id: string
  timestamp: string
  eventType: "incident-created" | "status-changed" | "sla-modified" | "workflow-updated" | "escalation-triggered" | "notification-sent" | "assignment-changed" | "configuration-updated" | "template-modified" | "automation-edited" | "access-granted" | "access-revoked" | "record-deleted" | "policy-violation"
  entity: string
  entityId: string
  action: string
  previousValue?: string
  newValue?: string
  performedBy: { name: string; avatar?: string }
  sourceModule: string
  ipAddress?: string
}

interface AuditEventTableProps {
  events: AuditEvent[]
  selectedIds: string[]
  onSelectionChange: (ids: string[]) => void
  onEventClick: (event: AuditEvent) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalCount: number
  pageSize: number
}

export function AuditEventTable({
  events,
  selectedIds,
  onSelectionChange,
  onEventClick,
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
  pageSize,
}: AuditEventTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>("timestamp")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(events.map((e) => e.id))
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

  const startRecord = (currentPage - 1) * pageSize + 1
  const endRecord = Math.min(currentPage * pageSize, totalCount)

  return (
    <div className="flex flex-col">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 border-b border-border bg-muted/50">
            <tr>
              <th className="px-4 py-2.5 text-left">
                <Checkbox
                  checked={selectedIds.length === events.length && events.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </th>
              <th className="px-3 py-2.5 text-left">
                <button onClick={() => handleSort("timestamp")} className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
                  Timestamp
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Event Type</th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Entity</th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Action</th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Previous</th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">New</th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Performed By</th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Source</th>
              <th className="px-2 py-2.5 text-left text-xs font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className={cn(
                  "group border-b border-border transition-colors hover:bg-muted/50",
                  selectedIds.includes(event.id) && "bg-[#E69F50]/5"
                )}
              >
                <td className="px-4 py-2">
                  <Checkbox
                    checked={selectedIds.includes(event.id)}
                    onCheckedChange={(checked) => handleSelectRow(event.id, checked as boolean)}
                    aria-label={`Select event ${event.id}`}
                  />
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {event.timestamp}
                </td>
                <td className="px-3 py-2">
                  <EventTypeBadge type={event.eventType} />
                </td>
                <td className="px-3 py-2">
                  <Link href={`/incidents/${event.entityId}`} className="font-mono text-xs font-medium text-[#0D3133] hover:underline">
                    {event.entity}
                  </Link>
                </td>
                <td className="px-3 py-2 text-xs max-w-[200px] truncate" title={event.action}>
                  {event.action}
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground max-w-[100px] truncate" title={event.previousValue}>
                  {event.previousValue || "-"}
                </td>
                <td className="px-3 py-2 text-xs max-w-[100px] truncate" title={event.newValue}>
                  {event.newValue || "-"}
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-[10px] bg-[#0D3133] text-white">
                        {event.performedBy.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{event.performedBy.name}</span>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <span className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {event.sourceModule}
                  </span>
                </td>
                <td className="px-2 py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEventClick(event)} className="gap-2">
                        <Eye className="h-3.5 w-3.5" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="gap-2">
                        <Link href={`/incidents/${event.entityId}`}>
                          <ExternalLink className="h-3.5 w-3.5" />
                          Open Entity
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Download className="h-3.5 w-3.5" />
                        Export Event
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <p className="text-xs text-muted-foreground">
          Showing {startRecord} to {endRecord} of {totalCount.toLocaleString()} events
        </p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="px-3 text-xs text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
