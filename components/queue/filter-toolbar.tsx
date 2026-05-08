"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Search,
  X,
  ChevronDown,
  SlidersHorizontal,
  Save,
  CalendarIcon,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface FilterState {
  status: string[]
  priority: string[]
  assignmentGroup: string[]
  assignedEngineer: string[]
  slaState: string[]
  category: string[]
  service: string[]
  severity: string[]
  tags: string[]
  dateRange: { from?: Date; to?: Date }
}

interface FilterToolbarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onOpenAdvanced: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

const statusOptions = [
  "New",
  "Assigned",
  "In Progress",
  "Pending",
  "Waiting for Vendor",
  "Resolved",
  "Closed",
  "Major Incident",
]

const priorityOptions = ["Critical", "High", "Medium", "Low"]

const slaOptions = ["On Track", "At Risk", "Breached", "Paused"]

const assignmentGroups = [
  "Service Desk",
  "Network Operations",
  "Database Team",
  "Cloud Infrastructure",
  "Security Operations",
  "Application Support",
]

const services = [
  "Payment Gateway",
  "User Authentication",
  "Core Banking",
  "Mobile App",
  "Web Portal",
  "API Platform",
]

const categories = [
  "Hardware",
  "Software",
  "Network",
  "Security",
  "Database",
  "Application",
]

function FilterDropdown({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string
  options: string[]
  selected: string[]
  onSelect: (values: string[]) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-1.5 text-sm",
            selected.length > 0 && "border-[#E69F50] bg-[#E69F50]/10"
          )}
        >
          {label}
          {selected.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 h-4 min-w-4 rounded-full bg-[#E69F50] px-1 text-[10px] text-white"
            >
              {selected.length}
            </Badge>
          )}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel className="text-xs">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selected.includes(option)}
            onCheckedChange={(checked) => {
              if (checked) {
                onSelect([...selected, option])
              } else {
                onSelect(selected.filter((s) => s !== option))
              }
            }}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function FilterToolbar({
  filters,
  onFiltersChange,
  onOpenAdvanced,
  searchQuery,
  onSearchChange,
}: FilterToolbarProps) {
  const [recentSearches] = useState([
    "INC0042781",
    "payment failed",
    "John Smith",
  ])

  const activeFilterCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value)) return count + value.length
    if (value?.from || value?.to) return count + 1
    return count
  }, 0)

  const clearAllFilters = () => {
    onFiltersChange({
      status: [],
      priority: [],
      assignmentGroup: [],
      assignedEngineer: [],
      slaState: [],
      category: [],
      service: [],
      severity: [],
      tags: [],
      dateRange: {},
    })
  }

  return (
    <div className="shrink-0 border-b border-border bg-card px-6 py-3">
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search incidents, IDs, services..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-8 pl-9 pr-20 text-sm"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="rounded p-0.5 hover:bg-muted"
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </button>
            )}
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
          {/* Recent searches dropdown would go here */}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-border" />

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown
            label="Status"
            options={statusOptions}
            selected={filters.status}
            onSelect={(values) => onFiltersChange({ ...filters, status: values })}
          />
          <FilterDropdown
            label="Priority"
            options={priorityOptions}
            selected={filters.priority}
            onSelect={(values) => onFiltersChange({ ...filters, priority: values })}
          />
          <FilterDropdown
            label="Assignment Group"
            options={assignmentGroups}
            selected={filters.assignmentGroup}
            onSelect={(values) =>
              onFiltersChange({ ...filters, assignmentGroup: values })
            }
          />
          <FilterDropdown
            label="SLA State"
            options={slaOptions}
            selected={filters.slaState}
            onSelect={(values) => onFiltersChange({ ...filters, slaState: values })}
          />
          <FilterDropdown
            label="Service"
            options={services}
            selected={filters.service}
            onSelect={(values) => onFiltersChange({ ...filters, service: values })}
          />
          <FilterDropdown
            label="Category"
            options={categories}
            selected={filters.category}
            onSelect={(values) => onFiltersChange({ ...filters, category: values })}
          />

          {/* Date Range */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 gap-1.5 text-sm",
                  (filters.dateRange.from || filters.dateRange.to) &&
                    "border-[#E69F50] bg-[#E69F50]/10"
                )}
              >
                <CalendarIcon className="h-3.5 w-3.5" />
                Date Range
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{
                  from: filters.dateRange.from,
                  to: filters.dateRange.to,
                }}
                onSelect={(range) =>
                  onFiltersChange({
                    ...filters,
                    dateRange: { from: range?.from, to: range?.to },
                  })
                }
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2">
          {activeFilterCount > 0 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-8 gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
                Clear all ({activeFilterCount})
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-sm">
                <Save className="h-3.5 w-3.5" />
                Save Filter
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenAdvanced}
            className="h-8 gap-1.5 text-sm"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Advanced
          </Button>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {filters.status.map((status) => (
            <Badge
              key={status}
              variant="secondary"
              className="gap-1 bg-[#0D3133]/10 text-[#0D3133]"
            >
              Status: {status}
              <button
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    status: filters.status.filter((s) => s !== status),
                  })
                }
                className="ml-0.5 rounded-full hover:bg-[#0D3133]/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.priority.map((priority) => (
            <Badge
              key={priority}
              variant="secondary"
              className="gap-1 bg-[#0D3133]/10 text-[#0D3133]"
            >
              Priority: {priority}
              <button
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    priority: filters.priority.filter((p) => p !== priority),
                  })
                }
                className="ml-0.5 rounded-full hover:bg-[#0D3133]/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.assignmentGroup.map((group) => (
            <Badge
              key={group}
              variant="secondary"
              className="gap-1 bg-[#0D3133]/10 text-[#0D3133]"
            >
              Group: {group}
              <button
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    assignmentGroup: filters.assignmentGroup.filter(
                      (g) => g !== group
                    ),
                  })
                }
                className="ml-0.5 rounded-full hover:bg-[#0D3133]/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.slaState.map((sla) => (
            <Badge
              key={sla}
              variant="secondary"
              className="gap-1 bg-[#0D3133]/10 text-[#0D3133]"
            >
              SLA: {sla}
              <button
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    slaState: filters.slaState.filter((s) => s !== sla),
                  })
                }
                className="ml-0.5 rounded-full hover:bg-[#0D3133]/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.service.map((service) => (
            <Badge
              key={service}
              variant="secondary"
              className="gap-1 bg-[#0D3133]/10 text-[#0D3133]"
            >
              Service: {service}
              <button
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    service: filters.service.filter((s) => s !== service),
                  })
                }
                className="ml-0.5 rounded-full hover:bg-[#0D3133]/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {(filters.dateRange.from || filters.dateRange.to) && (
            <Badge
              variant="secondary"
              className="gap-1 bg-[#0D3133]/10 text-[#0D3133]"
            >
              Date:{" "}
              {filters.dateRange.from
                ? format(filters.dateRange.from, "MMM d")
                : "Start"}{" "}
              -{" "}
              {filters.dateRange.to
                ? format(filters.dateRange.to, "MMM d")
                : "End"}
              <button
                onClick={() =>
                  onFiltersChange({ ...filters, dateRange: {} })
                }
                className="ml-0.5 rounded-full hover:bg-[#0D3133]/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
