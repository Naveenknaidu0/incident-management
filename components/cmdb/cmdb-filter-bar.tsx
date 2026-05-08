"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, X, SlidersHorizontal } from "lucide-react"

interface CMDBFilterBarProps {
  onSearchChange?: (value: string) => void
  onFilterChange?: (filters: Record<string, string>) => void
}

export function CMDBFilterBar({ onSearchChange, onFilterChange }: CMDBFilterBarProps) {
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState<Record<string, string>>({})

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onSearchChange?.(value)
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    if (value === "all") delete newFilters[key]
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const clearFilters = () => {
    setFilters({})
    setSearch("")
    onFilterChange?.({})
    onSearchChange?.("")
  }

  const activeFilterCount = Object.keys(filters).length + (search ? 1 : 0)

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search services, CIs, applications..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters */}
        <Select
          value={filters.environment || "all"}
          onValueChange={(v) => handleFilterChange("environment", v)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Environment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Environments</SelectItem>
            <SelectItem value="production">Production</SelectItem>
            <SelectItem value="staging">Staging</SelectItem>
            <SelectItem value="qa">QA</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="dr">DR</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status || "all"}
          onValueChange={(v) => handleFilterChange("status", v)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="operational">Operational</SelectItem>
            <SelectItem value="degraded">Degraded</SelectItem>
            <SelectItem value="partial-outage">Partial Outage</SelectItem>
            <SelectItem value="major-outage">Major Outage</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.type || "all"}
          onValueChange={(v) => handleFilterChange("type", v)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="CI Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="server">Server</SelectItem>
            <SelectItem value="database">Database</SelectItem>
            <SelectItem value="application">Application</SelectItem>
            <SelectItem value="api">API</SelectItem>
            <SelectItem value="cloud">Cloud Resource</SelectItem>
            <SelectItem value="network">Network</SelectItem>
            <SelectItem value="container">Container</SelectItem>
            <SelectItem value="storage">Storage</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>

        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5">
            <X className="h-3.5 w-3.5" />
            Clear
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          </Button>
        )}
      </div>
    </div>
  )
}
