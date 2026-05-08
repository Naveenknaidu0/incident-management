"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Eye,
  ChevronUp,
  ChevronDown,
} from "lucide-react"

interface SLAPolicy {
  id: string
  name: string
  slaType: string
  priorityMapping: string[]
  businessHours: string
  escalationRule: string
  status: "active" | "inactive" | "draft"
}

interface SLAPolicyTableProps {
  policies: SLAPolicy[]
  onEdit?: (id: string) => void
  onDuplicate?: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
}

const statusStyles = {
  active: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  inactive: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
  draft: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
}

const statusLabels = {
  active: "Active",
  inactive: "Inactive",
  draft: "Draft",
}

type SortField = "name" | "slaType" | "status"
type SortDirection = "asc" | "desc"

export function SLAPolicyTable({
  policies,
  onEdit,
  onDuplicate,
  onDelete,
  className,
}: SLAPolicyTableProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(search.toLowerCase()) ||
      policy.slaType.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || policy.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
    <div className={cn("space-y-4", className)}>
      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search policies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <SortHeader field="name">Policy Name</SortHeader>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <SortHeader field="slaType">SLA Type</SortHeader>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Priority Mapping
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Business Hours
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Escalation Rule
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <SortHeader field="status">Status</SortHeader>
                </th>
                <th className="w-10 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link
                      href={`/sla/policies/${policy.id}`}
                      className="font-medium text-[#0D3133] hover:text-[#E69F50] transition-colors"
                    >
                      {policy.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{policy.slaType}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {policy.priorityMapping.map((priority) => (
                        <span
                          key={priority}
                          className="inline-flex items-center rounded bg-[#0D3133]/5 px-1.5 py-0.5 text-xs font-medium text-[#0D3133]"
                        >
                          {priority}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{policy.businessHours}</td>
                  <td className="px-4 py-3 text-sm">{policy.escalationRule}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium",
                      statusStyles[policy.status].bg,
                      statusStyles[policy.status].text
                    )}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", statusStyles[policy.status].dot)} />
                      {statusLabels[policy.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem asChild>
                          <Link href={`/sla/policies/${policy.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit?.(policy.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDuplicate?.(policy.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDelete?.(policy.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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
    </div>
  )
}
