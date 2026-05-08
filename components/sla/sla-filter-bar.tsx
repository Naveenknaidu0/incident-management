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
import { Search, X, Filter } from "lucide-react"

interface ActiveFilter {
  key: string
  label: string
  value: string
}

interface SLAFilterBarProps {
  onFilterChange?: (filters: Record<string, string>) => void
  className?: string
}

export function SLAFilterBar({ onFilterChange, className }: SLAFilterBarProps) {
  const [search, setSearch] = useState("")
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])
  const [filters, setFilters] = useState<Record<string, string>>({
    status: "all",
    breachState: "all",
    priority: "all",
    assignmentGroup: "all",
    slaType: "all",
    service: "all",
  })

  const handleFilterChange = (key: string, value: string, label?: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Update active filters
    if (value !== "all") {
      const existing = activeFilters.find((f) => f.key === key)
      if (existing) {
        setActiveFilters(
          activeFilters.map((f) =>
            f.key === key ? { ...f, value, label: label || value } : f
          )
        )
      } else {
        setActiveFilters([
          ...activeFilters,
          { key, value, label: label || value },
        ])
      }
    } else {
      setActiveFilters(activeFilters.filter((f) => f.key !== key))
    }

    onFilterChange?.(newFilters)
  }

  const removeFilter = (key: string) => {
    handleFilterChange(key, "all")
  }

  const clearAllFilters = () => {
    setFilters({
      status: "all",
      breachState: "all",
      priority: "all",
      assignmentGroup: "all",
      slaType: "all",
      service: "all",
    })
    setActiveFilters([])
    setSearch("")
    onFilterChange?.({})
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search incidents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        {/* Breach State */}
        <Select
          value={filters.breachState}
          onValueChange={(v) =>
            handleFilterChange(
              "breachState",
              v,
              v === "breached"
                ? "Breached"
                : v === "near_breach"
                ? "Near Breach"
                : v === "escalated"
                ? "Escalated"
                : v === "paused"
                ? "Paused"
                : undefined
            )
          }
        >
          <SelectTrigger className="w-32 h-9">
            <SelectValue placeholder="Breach State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            <SelectItem value="breached">Breached</SelectItem>
            <SelectItem value="near_breach">Near Breach</SelectItem>
            <SelectItem value="escalated">Escalated</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority */}
        <Select
          value={filters.priority}
          onValueChange={(v) => handleFilterChange("priority", v, v !== "all" ? v : undefined)}
        >
          <SelectTrigger className="w-28 h-9">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="P1">P1 - Critical</SelectItem>
            <SelectItem value="P2">P2 - High</SelectItem>
            <SelectItem value="P3">P3 - Medium</SelectItem>
            <SelectItem value="P4">P4 - Low</SelectItem>
          </SelectContent>
        </Select>

        {/* Assignment Group */}
        <Select
          value={filters.assignmentGroup}
          onValueChange={(v) => handleFilterChange("assignmentGroup", v, v !== "all" ? v : undefined)}
        >
          <SelectTrigger className="w-36 h-9">
            <SelectValue placeholder="Assignment Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Groups</SelectItem>
            <SelectItem value="network">Network Operations</SelectItem>
            <SelectItem value="database">Database Team</SelectItem>
            <SelectItem value="application">Application Support</SelectItem>
            <SelectItem value="security">Security Team</SelectItem>
            <SelectItem value="infrastructure">Infrastructure</SelectItem>
          </SelectContent>
        </Select>

        {/* SLA Type */}
        <Select
          value={filters.slaType}
          onValueChange={(v) => handleFilterChange("slaType", v, v !== "all" ? v : undefined)}
        >
          <SelectTrigger className="w-32 h-9">
            <SelectValue placeholder="SLA Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="response">Response</SelectItem>
            <SelectItem value="resolution">Resolution</SelectItem>
            <SelectItem value="update">Update</SelectItem>
          </SelectContent>
        </Select>

        {/* Service */}
        <Select
          value={filters.service}
          onValueChange={(v) => handleFilterChange("service", v, v !== "all" ? v : undefined)}
        >
          <SelectTrigger className="w-36 h-9">
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="payment">Payment Gateway</SelectItem>
            <SelectItem value="auth">Authentication</SelectItem>
            <SelectItem value="api">API Gateway</SelectItem>
            <SelectItem value="database">Database Cluster</SelectItem>
            <SelectItem value="cdn">CDN</SelectItem>
          </SelectContent>
        </Select>

        {/* Advanced Filter */}
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="mr-1.5 h-3.5 w-3.5" />
          More
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1 rounded-full bg-[#0D3133]/10 px-2.5 py-1 text-xs font-medium text-[#0D3133]"
            >
              {filter.label}
              <button
                onClick={() => removeFilter(filter.key)}
                className="ml-0.5 hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
