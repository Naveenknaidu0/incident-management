"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, X, Filter, Download, RefreshCw } from "lucide-react"

interface AuditFilterBarProps {
  onSearch: (query: string) => void
  onFilter: (filters: Record<string, string>) => void
  onExport: () => void
  onRefresh: () => void
}

export function AuditFilterBar({ onSearch, onFilter, onExport, onRefresh }: AuditFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [eventType, setEventType] = useState("")
  const [module, setModule] = useState("")
  const [dateRange, setDateRange] = useState("")
  const [severity, setSeverity] = useState("")

  const activeFilters = [eventType, module, dateRange, severity].filter(Boolean).length

  const clearFilters = () => {
    setEventType("")
    setModule("")
    setDateRange("")
    setSeverity("")
    onFilter({})
  }

  return (
    <div className="flex flex-col gap-3 border-b border-border bg-card px-4 py-3">
      {/* Search Row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search audit events..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              onSearch(e.target.value)
            }}
            className="pl-9 h-9"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm" onClick={onRefresh} className="gap-2">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={onExport} className="gap-2">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="h-4 w-4 text-muted-foreground" />

        <Select value={eventType} onValueChange={setEventType}>
          <SelectTrigger className="h-8 w-[160px] text-xs">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="incident-created">Incident Created</SelectItem>
            <SelectItem value="status-changed">Status Changed</SelectItem>
            <SelectItem value="sla-modified">SLA Modified</SelectItem>
            <SelectItem value="workflow-updated">Workflow Updated</SelectItem>
            <SelectItem value="escalation-triggered">Escalation Triggered</SelectItem>
            <SelectItem value="notification-sent">Notification Sent</SelectItem>
            <SelectItem value="assignment-changed">Assignment Changed</SelectItem>
            <SelectItem value="configuration-updated">Configuration Updated</SelectItem>
          </SelectContent>
        </Select>

        <Select value={module} onValueChange={setModule}>
          <SelectTrigger className="h-8 w-[140px] text-xs">
            <SelectValue placeholder="Module" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="incidents">Incidents</SelectItem>
            <SelectItem value="workflows">Workflows</SelectItem>
            <SelectItem value="sla">SLA</SelectItem>
            <SelectItem value="automation">Automation</SelectItem>
            <SelectItem value="notifications">Notifications</SelectItem>
            <SelectItem value="cmdb">CMDB</SelectItem>
            <SelectItem value="settings">Settings</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="h-8 w-[130px] text-xs">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">Last Hour</SelectItem>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        <Select value={severity} onValueChange={setSeverity}>
          <SelectTrigger className="h-8 w-[120px] text-xs">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>

        {activeFilters > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 gap-1 text-xs text-muted-foreground">
            <X className="h-3 w-3" />
            Clear ({activeFilters})
          </Button>
        )}
      </div>
    </div>
  )
}
