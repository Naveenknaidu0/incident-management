"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Filter, RefreshCw } from "lucide-react"
import { AnalyticsDatePicker } from "./analytics-date-picker"

const services = [
  { value: "all", label: "All Services" },
  { value: "payment", label: "Payment Gateway" },
  { value: "auth", label: "Authentication" },
  { value: "database", label: "Core Database" },
  { value: "api", label: "API Gateway" },
  { value: "cdn", label: "CDN" },
]

const assignmentGroups = [
  { value: "all", label: "All Groups" },
  { value: "platform", label: "Platform Engineering" },
  { value: "network", label: "Network Operations" },
  { value: "database", label: "Database Team" },
  { value: "security", label: "Security Operations" },
  { value: "application", label: "Application Support" },
]

const priorities = [
  { value: "all", label: "All Priorities" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
]

const regions = [
  { value: "all", label: "All Regions" },
  { value: "us-east", label: "US East" },
  { value: "us-west", label: "US West" },
  { value: "eu-west", label: "EU West" },
  { value: "apac", label: "APAC" },
]

interface AnalyticsFilterBarProps {
  onFiltersChange?: (filters: Record<string, string>) => void
  onRefresh?: () => void
  lastUpdated?: Date
}

export function AnalyticsFilterBar({ onFiltersChange, onRefresh, lastUpdated }: AnalyticsFilterBarProps) {
  const [filters, setFilters] = useState({
    service: "all",
    assignmentGroup: "all",
    priority: "all",
    region: "all",
  })

  const activeFilterCount = Object.values(filters).filter(v => v !== "all").length

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const clearFilters = () => {
    const defaultFilters = {
      service: "all",
      assignmentGroup: "all",
      priority: "all",
      region: "all",
    }
    setFilters(defaultFilters)
    onFiltersChange?.(defaultFilters)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Date Picker */}
      <AnalyticsDatePicker />

      {/* Service Filter */}
      <Select value={filters.service} onValueChange={(v) => handleFilterChange("service", v)}>
        <SelectTrigger className="h-8 w-[140px] text-xs">
          <SelectValue placeholder="Service" />
        </SelectTrigger>
        <SelectContent>
          {services.map((s) => (
            <SelectItem key={s.value} value={s.value} className="text-xs">
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Assignment Group Filter */}
      <Select value={filters.assignmentGroup} onValueChange={(v) => handleFilterChange("assignmentGroup", v)}>
        <SelectTrigger className="h-8 w-[150px] text-xs">
          <SelectValue placeholder="Assignment Group" />
        </SelectTrigger>
        <SelectContent>
          {assignmentGroups.map((g) => (
            <SelectItem key={g.value} value={g.value} className="text-xs">
              {g.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Priority Filter */}
      <Select value={filters.priority} onValueChange={(v) => handleFilterChange("priority", v)}>
        <SelectTrigger className="h-8 w-[120px] text-xs">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          {priorities.map((p) => (
            <SelectItem key={p.value} value={p.value} className="text-xs">
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Region Filter */}
      <Select value={filters.region} onValueChange={(v) => handleFilterChange("region", v)}>
        <SelectTrigger className="h-8 w-[120px] text-xs">
          <SelectValue placeholder="Region" />
        </SelectTrigger>
        <SelectContent>
          {regions.map((r) => (
            <SelectItem key={r.value} value={r.value} className="text-xs">
              {r.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Active Filters Indicator */}
      {activeFilterCount > 0 && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 gap-1 text-xs">
          <X className="h-3 w-3" />
          Clear ({activeFilterCount})
        </Button>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Last Updated & Refresh */}
      <div className="flex items-center gap-2">
        {lastUpdated && (
          <span className="text-[10px] text-muted-foreground">
            Updated {lastUpdated.toLocaleTimeString()}
          </span>
        )}
        <Button variant="outline" size="sm" onClick={onRefresh} className="h-8 gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </Button>
      </div>
    </div>
  )
}
