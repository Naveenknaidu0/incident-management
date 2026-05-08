"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ResponderStatusBadge } from "./responder-status-badge"
import { EscalationLevelBadge } from "./escalation-level-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, Phone, MessageSquare, MoreHorizontal } from "lucide-react"

interface Responder {
  id: string
  name: string
  initials: string
  team: string
  currentShift: string
  escalationLevel: "L1" | "L2" | "L3" | "manager" | "executive"
  availability: "available" | "busy" | "offline" | "escalated" | "in-major-incident"
  activeIncidents: number
  status: "available" | "busy" | "offline" | "escalated" | "in-major-incident"
}

interface ResponderTableProps {
  responders: Responder[]
  onPage?: (id: string) => void
}

export function ResponderTable({ responders, onPage }: ResponderTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [sortField, setSortField] = useState<string>("name")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  const toggleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? responders.map((r) => r.id) : [])
  }

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedIds(checked ? [...selectedIds, id] : selectedIds.filter((i) => i !== id))
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left w-10">
                <Checkbox
                  checked={selectedIds.length === responders.length && responders.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </th>
              <th className="px-3 py-3 text-left">
                <button
                  className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort("name")}
                >
                  Name
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground">Team</th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground">Current Shift</th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground">Level</th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground">Availability</th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground">Active</th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-3 py-3 text-right text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {responders.map((responder) => (
              <tr
                key={responder.id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedIds.includes(responder.id)}
                    onCheckedChange={(checked) => toggleSelect(responder.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-[#0D3133] text-white text-xs">
                        {responder.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-[#0D3133]">{responder.name}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-muted-foreground">{responder.team}</td>
                <td className="px-3 py-3 text-muted-foreground">{responder.currentShift}</td>
                <td className="px-3 py-3">
                  <EscalationLevelBadge level={responder.escalationLevel} />
                </td>
                <td className="px-3 py-3">
                  <ResponderStatusBadge status={responder.availability} />
                </td>
                <td className="px-3 py-3">
                  <span className={responder.activeIncidents > 0 ? "font-medium text-[#0D3133]" : "text-muted-foreground"}>
                    {responder.activeIncidents}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <ResponderStatusBadge status={responder.status} />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onPage?.(responder.id)}
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MessageSquare className="h-3.5 w-3.5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>View Schedule</DropdownMenuItem>
                        <DropdownMenuItem>Assign Incident</DropdownMenuItem>
                        <DropdownMenuItem>Set Availability</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
