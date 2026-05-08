"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ServiceHealthBadge } from "./service-health-badge"
import { EnvironmentBadge } from "./environment-badge"
import { CITypeBadge } from "./ci-type-badge"
import { 
  MoreHorizontal, 
  ExternalLink, 
  GitBranch, 
  AlertCircle,
  ArrowUpDown 
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface ConfigurationItem {
  id: string
  name: string
  type: "server" | "database" | "application" | "api" | "cloud" | "network" | "container" | "storage"
  environment: "production" | "staging" | "qa" | "development" | "dr"
  status: "operational" | "degraded" | "partial-outage" | "major-outage" | "maintenance"
  owner: string
  relatedServices: number
  activeIncidents: number
  lastUpdated: string
}

interface CITableProps {
  items: ConfigurationItem[]
  onItemClick?: (item: ConfigurationItem) => void
}

export function CITable({ items, onItemClick }: CITableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [sortField, setSortField] = useState<keyof ConfigurationItem>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? items.map((i) => i.id) : [])
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    )
  }

  const handleSort = (field: keyof ConfigurationItem) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedItems = [...items].sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    const modifier = sortDirection === "asc" ? 1 : -1
    if (typeof aVal === "string" && typeof bVal === "string") {
      return aVal.localeCompare(bVal) * modifier
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * modifier
    }
    return 0
  })

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="w-10 px-4">
                <Checkbox
                  checked={selectedIds.length === items.length && items.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="px-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 gap-1"
                  onClick={() => handleSort("name")}
                >
                  CI Name
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="px-3">Type</TableHead>
              <TableHead className="px-3">Environment</TableHead>
              <TableHead className="px-3">Status</TableHead>
              <TableHead className="px-3">Owner</TableHead>
              <TableHead className="px-3 text-center">Services</TableHead>
              <TableHead className="px-3 text-center">Incidents</TableHead>
              <TableHead className="px-3">Last Updated</TableHead>
              <TableHead className="w-10 px-2" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedItems.map((item) => (
              <TableRow
                key={item.id}
                className={cn(
                  "group cursor-pointer hover:bg-muted/50",
                  selectedIds.includes(item.id) && "bg-[#E69F50]/5"
                )}
              >
                <TableCell className="px-4">
                  <Checkbox
                    checked={selectedIds.includes(item.id)}
                    onCheckedChange={(checked) =>
                      handleSelectRow(item.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="px-3">
                  <Link
                    href={`/cmdb/ci/${item.id}`}
                    className="font-medium text-[#0D3133] hover:text-[#E69F50] hover:underline"
                  >
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell className="px-3">
                  <CITypeBadge type={item.type} />
                </TableCell>
                <TableCell className="px-3">
                  <EnvironmentBadge environment={item.environment} />
                </TableCell>
                <TableCell className="px-3">
                  <ServiceHealthBadge status={item.status} />
                </TableCell>
                <TableCell className="px-3 text-sm text-muted-foreground">
                  {item.owner}
                </TableCell>
                <TableCell className="px-3 text-center">
                  <span className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <GitBranch className="h-3.5 w-3.5" />
                    {item.relatedServices}
                  </span>
                </TableCell>
                <TableCell className="px-3 text-center">
                  {item.activeIncidents > 0 ? (
                    <span className="flex items-center justify-center gap-1 text-sm text-red-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {item.activeIncidents}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">0</span>
                  )}
                </TableCell>
                <TableCell className="px-3 text-sm text-muted-foreground">
                  {item.lastUpdated}
                </TableCell>
                <TableCell className="px-2">
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
                      <DropdownMenuItem asChild>
                        <Link href={`/cmdb/ci/${item.id}`} className="gap-2">
                          <ExternalLink className="h-3.5 w-3.5" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <GitBranch className="h-3.5 w-3.5" />
                        View Dependencies
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
