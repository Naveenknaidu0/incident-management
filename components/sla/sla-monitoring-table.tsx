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
import { SLAStateBadge, type SLAState } from "./sla-state-badge"
import { SLACountdown } from "./sla-countdown"
import {
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  ExternalLink,
  UserPlus,
  Pause,
  Play,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react"

interface SLARecord {
  id: string
  incidentId: string
  incidentTitle: string
  slaType: string
  remainingHours: number
  remainingMinutes: number
  breachRisk: "low" | "medium" | "high" | "critical"
  state: SLAState
  assignmentGroup: string
  escalationLevel: number
  updatedAt: string
}

interface SLAMonitoringTableProps {
  records: SLARecord[]
  onEscalate?: (id: string) => void
  onPause?: (id: string) => void
  onReassign?: (id: string) => void
  className?: string
}

type SortField = "incidentId" | "slaType" | "remainingHours" | "breachRisk" | "state" | "escalationLevel" | "updatedAt"
type SortDirection = "asc" | "desc"

const breachRiskStyles = {
  low: "text-emerald-600 bg-emerald-50",
  medium: "text-amber-600 bg-amber-50",
  high: "text-orange-600 bg-orange-50",
  critical: "text-red-600 bg-red-50",
}

const breachRiskLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
}

export function SLAMonitoringTable({
  records,
  onEscalate,
  onPause,
  onReassign,
  className,
}: SLAMonitoringTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [sortField, setSortField] = useState<SortField>("remainingHours")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(records.map(r => r.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedIds(newSelected)
  }

  const getSLACountdownState = (state: SLAState, breachRisk: string) => {
    if (state === "paused") return "paused"
    if (state === "breached") return "breached"
    if (breachRisk === "critical") return "critical"
    if (breachRisk === "high") return "warning"
    return "healthy"
  }

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 text-left hover:text-foreground transition-colors"
    >
      {children}
      {sortField === field && (
        sortDirection === "asc" ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )
      )}
    </button>
  )

  return (
    <div className={cn("rounded-lg border border-border bg-card", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-muted/50 border-b border-border">
            <tr>
              <th className="w-10 px-3 py-3">
                <Checkbox
                  checked={selectedIds.size === records.length && records.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <SortHeader field="incidentId">Incident</SortHeader>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <SortHeader field="slaType">SLA Type</SortHeader>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <SortHeader field="remainingHours">Remaining</SortHeader>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <SortHeader field="breachRisk">Breach Risk</SortHeader>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <SortHeader field="state">State</SortHeader>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Assignment Group
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <SortHeader field="escalationLevel">Escalation</SortHeader>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <SortHeader field="updatedAt">Updated</SortHeader>
              </th>
              <th className="w-10 px-3 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {records.map((record) => (
              <tr
                key={record.id}
                className={cn(
                  "hover:bg-muted/30 transition-colors",
                  selectedIds.has(record.id) && "bg-primary/5"
                )}
              >
                <td className="px-3 py-3">
                  <Checkbox
                    checked={selectedIds.has(record.id)}
                    onCheckedChange={(checked) => handleSelectRow(record.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-3">
                  <div className="flex flex-col gap-0.5">
                    <Link
                      href={`/incidents/${record.incidentId}`}
                      className="font-medium text-[#0D3133] hover:text-[#E69F50] transition-colors"
                    >
                      {record.incidentId}
                    </Link>
                    <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {record.incidentTitle}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm">{record.slaType}</span>
                </td>
                <td className="px-3 py-3">
                  <SLACountdown
                    hours={record.remainingHours}
                    minutes={record.remainingMinutes}
                    state={getSLACountdownState(record.state, record.breachRisk)}
                    compact
                  />
                </td>
                <td className="px-3 py-3">
                  <span className={cn(
                    "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium",
                    breachRiskStyles[record.breachRisk]
                  )}>
                    {breachRiskLabels[record.breachRisk]}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <SLAStateBadge state={record.state} />
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm">{record.assignmentGroup}</span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1">
                    {record.escalationLevel > 0 ? (
                      <>
                        <ArrowUpRight className="h-3 w-3 text-orange-500" />
                        <span className="text-sm font-medium">L{record.escalationLevel}</span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className="text-xs text-muted-foreground">{record.updatedAt}</span>
                </td>
                <td className="px-3 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href={`/incidents/${record.incidentId}`}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Incident
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onReassign?.(record.id)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Reassign
                      </DropdownMenuItem>
                      {record.state !== "paused" && record.state !== "completed" && record.state !== "breached" && (
                        <DropdownMenuItem onClick={() => onPause?.(record.id)}>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause SLA
                        </DropdownMenuItem>
                      )}
                      {record.state === "paused" && (
                        <DropdownMenuItem onClick={() => onPause?.(record.id)}>
                          <Play className="mr-2 h-4 w-4" />
                          Resume SLA
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onEscalate?.(record.id)}
                        className="text-orange-600"
                      >
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Escalate
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
