"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AuditEntry {
  id: string
  field: string
  oldValue: string
  newValue: string
  changedBy: { name: string; initials: string }
  timestamp: string
  source: "user" | "system" | "automation"
}

const auditEntries: AuditEntry[] = [
  {
    id: "1",
    field: "Status",
    oldValue: "Open",
    newValue: "In Progress",
    changedBy: { name: "Sarah Chen", initials: "SC" },
    timestamp: "16:45 UTC",
    source: "user",
  },
  {
    id: "2",
    field: "Assigned To",
    oldValue: "Unassigned",
    newValue: "Sarah Chen",
    changedBy: { name: "Mike Johnson", initials: "MJ" },
    timestamp: "14:44 UTC",
    source: "user",
  },
  {
    id: "3",
    field: "Assignment Group",
    oldValue: "Tier 1 Support",
    newValue: "Payment Ops",
    changedBy: { name: "Mike Johnson", initials: "MJ" },
    timestamp: "14:42 UTC",
    source: "user",
  },
  {
    id: "4",
    field: "Priority",
    oldValue: "High",
    newValue: "Critical",
    changedBy: { name: "Auto-escalation", initials: "AE" },
    timestamp: "15:17 UTC",
    source: "automation",
  },
  {
    id: "5",
    field: "Escalation Level",
    oldValue: "Tier 1",
    newValue: "Tier 2",
    changedBy: { name: "Auto-escalation", initials: "AE" },
    timestamp: "15:17 UTC",
    source: "automation",
  },
  {
    id: "6",
    field: "Root Cause",
    oldValue: "(empty)",
    newValue: "Database connection pool exhaustion",
    changedBy: { name: "Sarah Chen", initials: "SC" },
    timestamp: "15:45 UTC",
    source: "user",
  },
  {
    id: "7",
    field: "Work Notes",
    oldValue: "(empty)",
    newValue: "Initial investigation started...",
    changedBy: { name: "John Doe", initials: "JD" },
    timestamp: "14:50 UTC",
    source: "user",
  },
  {
    id: "8",
    field: "Impacted Services",
    oldValue: "Payment API",
    newValue: "Payment API, Checkout Service, Order Processing",
    changedBy: { name: "Sarah Chen", initials: "SC" },
    timestamp: "15:00 UTC",
    source: "user",
  },
  {
    id: "9",
    field: "SLA Pause Reason",
    oldValue: "(empty)",
    newValue: "Waiting for vendor response",
    changedBy: { name: "System", initials: "SY" },
    timestamp: "16:00 UTC",
    source: "system",
  },
  {
    id: "10",
    field: "Workaround",
    oldValue: "(empty)",
    newValue: "Increased connection pool limit to 750",
    changedBy: { name: "Sarah Chen", initials: "SC" },
    timestamp: "16:30 UTC",
    source: "user",
  },
]

const sourceConfig = {
  user: { label: "User", color: "bg-blue-100 text-blue-700" },
  system: { label: "System", color: "bg-slate-100 text-slate-700" },
  automation: { label: "Automation", color: "bg-purple-100 text-purple-700" },
}

export function AuditTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSource, setFilterSource] = useState<string>("all")

  const filteredEntries = auditEntries.filter((entry) => {
    const matchesSearch = 
      entry.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.oldValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.newValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.changedBy.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterSource === "all" || entry.source === filterSource

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-card-foreground">Audit History</h3>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {filteredEntries.length} changes
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search changes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-48 rounded-md border border-border bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:border-[#E69F50] focus:outline-none focus:ring-1 focus:ring-[#E69F50]"
            />
          </div>
          {/* Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-1.5 h-3.5 w-3.5" />
                {filterSource === "all" ? "All Sources" : sourceConfig[filterSource as keyof typeof sourceConfig].label}
                <ChevronDown className="ml-1.5 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterSource("all")}>All Sources</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterSource("user")}>User</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterSource("system")}>System</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterSource("automation")}>Automation</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Audit Table */}
      <div className="rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="sticky top-0 border-b border-border bg-muted/50">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Field</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Old Value</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground"></th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">New Value</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Changed By</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Source</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEntries.map((entry) => {
                const srcConfig = sourceConfig[entry.source]

                return (
                  <tr key={entry.id} className="hover:bg-muted/20">
                    <td className="px-4 py-2.5">
                      <span className="text-sm font-medium text-card-foreground">{entry.field}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-sm text-muted-foreground line-through">{entry.oldValue}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-sm text-card-foreground">{entry.newValue}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold ${
                          entry.source === "user" ? "bg-[#0D3133] text-white" : "bg-muted text-muted-foreground"
                        }`}>
                          {entry.changedBy.initials}
                        </div>
                        <span className="text-sm text-card-foreground">{entry.changedBy.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex rounded px-1.5 py-0.5 text-xs font-medium ${srcConfig.color}`}>
                        {srcConfig.label}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="font-mono text-xs text-muted-foreground">{entry.timestamp}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredEntries.length === 0 && (
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm text-muted-foreground">No audit entries found</p>
          </div>
        )}
      </div>
    </div>
  )
}
