"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Search, Users, User, CheckCircle2, TrendingUp, Clock, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface AssignmentGroup {
  id: string
  name: string
  queueSize: number
  avgResolutionTime: string
  availability: "high" | "medium" | "low"
  members: { id: string; name: string; initials: string; status: "available" | "busy" | "offline" }[]
}

const assignmentGroups: AssignmentGroup[] = [
  {
    id: "grp-001",
    name: "Payment Operations",
    queueSize: 12,
    avgResolutionTime: "2.3 hrs",
    availability: "high",
    members: [
      { id: "usr-001", name: "Sarah Chen", initials: "SC", status: "available" },
      { id: "usr-002", name: "Mike Johnson", initials: "MJ", status: "available" },
      { id: "usr-003", name: "Lisa Park", initials: "LP", status: "busy" },
    ],
  },
  {
    id: "grp-002",
    name: "Database Team",
    queueSize: 8,
    avgResolutionTime: "3.1 hrs",
    availability: "medium",
    members: [
      { id: "usr-004", name: "John Smith", initials: "JS", status: "available" },
      { id: "usr-005", name: "Emma Davis", initials: "ED", status: "busy" },
    ],
  },
  {
    id: "grp-003",
    name: "Network Operations",
    queueSize: 15,
    avgResolutionTime: "1.8 hrs",
    availability: "high",
    members: [
      { id: "usr-006", name: "Tom Wilson", initials: "TW", status: "available" },
      { id: "usr-007", name: "Amy Brown", initials: "AB", status: "available" },
      { id: "usr-008", name: "Chris Lee", initials: "CL", status: "offline" },
    ],
  },
  {
    id: "grp-004",
    name: "Security Operations",
    queueSize: 5,
    avgResolutionTime: "4.2 hrs",
    availability: "low",
    members: [
      { id: "usr-009", name: "Rachel Green", initials: "RG", status: "busy" },
      { id: "usr-010", name: "David Kim", initials: "DK", status: "busy" },
    ],
  },
  {
    id: "grp-005",
    name: "Application Support",
    queueSize: 22,
    avgResolutionTime: "2.8 hrs",
    availability: "medium",
    members: [
      { id: "usr-011", name: "James Taylor", initials: "JT", status: "available" },
      { id: "usr-012", name: "Maria Garcia", initials: "MG", status: "available" },
    ],
  },
]

interface AssignmentSelectorProps {
  selectedGroup: string
  selectedAssignee: string
  onGroupChange: (groupId: string) => void
  onAssigneeChange: (assigneeId: string) => void
  suggestedGroup?: string
}

export function AssignmentSelector({
  selectedGroup,
  selectedAssignee,
  onGroupChange,
  onAssigneeChange,
  suggestedGroup,
}: AssignmentSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredGroups = assignmentGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedGroupData = assignmentGroups.find(g => g.id === selectedGroup)

  const availabilityColors = {
    high: "bg-green-500",
    medium: "bg-amber-500",
    low: "bg-red-500",
  }

  const availabilityLabels = {
    high: "High Availability",
    medium: "Medium Availability",
    low: "Low Availability",
  }

  const statusColors = {
    available: "bg-green-500",
    busy: "bg-amber-500",
    offline: "bg-slate-400",
  }

  return (
    <div className="space-y-4">
      {/* Assignment Group */}
      <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground">Assignment Group</Label>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-8 text-sm"
          />
        </div>

        {/* Group List */}
        <ScrollArea className="h-[180px] rounded-lg border border-border">
          <div className="p-2 space-y-1">
            {filteredGroups.map((group) => {
              const isSelected = selectedGroup === group.id
              const isSuggested = suggestedGroup === group.id
              
              return (
                <button
                  key={group.id}
                  onClick={() => {
                    onGroupChange(group.id)
                    onAssigneeChange("")
                  }}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
                    isSelected
                      ? "bg-[#0D3133]/10 border border-[#0D3133]/20"
                      : "hover:bg-muted border border-transparent"
                  )}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">{group.name}</span>
                      {isSuggested && (
                        <Badge variant="secondary" className="bg-[#E69F50]/20 text-[#E69F50] text-[10px]">
                          Suggested
                        </Badge>
                      )}
                      {isSelected && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E69F50]" />
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {group.queueSize} in queue
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {group.avgResolutionTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className={cn("h-1.5 w-1.5 rounded-full", availabilityColors[group.availability])} />
                        {availabilityLabels[group.availability]}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Assignee Selection */}
      {selectedGroupData && (
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground">
            Assign To (Optional)
          </Label>
          <div className="rounded-lg border border-border p-3">
            <div className="flex flex-wrap gap-2">
              {selectedGroupData.members.map((member) => {
                const isSelected = selectedAssignee === member.id
                
                return (
                  <button
                    key={member.id}
                    onClick={() => onAssigneeChange(isSelected ? "" : member.id)}
                    disabled={member.status === "offline"}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors",
                      isSelected
                        ? "border-[#E69F50] bg-[#E69F50]/10"
                        : "border-border hover:border-[#0D3133]/20 hover:bg-muted",
                      member.status === "offline" && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className="relative">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[10px] bg-[#0D3133] text-white">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className={cn(
                        "absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-white",
                        statusColors[member.status]
                      )} />
                    </div>
                    <span className="text-xs font-medium">{member.name}</span>
                    {isSelected && <CheckCircle2 className="h-3 w-3 text-[#E69F50]" />}
                  </button>
                )
              })}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Leave unassigned to route to group queue
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export { assignmentGroups }
