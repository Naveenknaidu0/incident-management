"use client"

import { useState } from "react"
import { 
  ChevronDown, ArrowUpRight, CheckCircle, Plus, MoreHorizontal,
  AlertCircle, Clock, Users, Target
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { PriorityBadge } from "@/components/ui/priority-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface IncidentHeaderProps {
  incident: {
    id: string
    title: string
    priority: "critical" | "high" | "medium" | "low"
    status: "open" | "in-progress" | "resolved" | "closed" | "escalated" | "pending" | "waiting-vendor" | "new" | "assigned" | "major-incident"
    sla: { remaining: string; status: "safe" | "warning" | "breach" | "breached" }
    assignee: string
    assignmentGroup: string
    impact?: string
    urgency?: string
  }
}

export function IncidentHeader({ incident }: IncidentHeaderProps) {
  const [status, setStatus] = useState(incident.status)

  const slaColors = {
    safe: "text-green-600 bg-green-50",
    warning: "text-amber-600 bg-amber-50",
    breach: "text-red-600 bg-red-50 animate-pulse",
    breached: "text-red-700 bg-red-100",
  }

  return (
    <div className="shrink-0 border-b border-border bg-card">
      <div className="h-[72px] px-6 flex items-center justify-between gap-4">
        {/* Left Section: Incident Info */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Incident ID & Badges */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-sm font-semibold text-muted-foreground">
              {incident.id}
            </span>
            <PriorityBadge priority={incident.priority} />
            <StatusBadge status={status} />
          </div>

          {/* SLA Widget */}
          <div className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 ${slaColors[incident.sla.status]}`}>
            <Clock className="h-3.5 w-3.5" />
            <div className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">SLA</span>
              <span className="font-mono text-sm font-bold">{incident.sla.remaining}</span>
            </div>
          </div>

          {/* Incident Title */}
          <h1 className="text-sm font-semibold text-card-foreground truncate max-w-md">
            {incident.title}
          </h1>
        </div>

        {/* Center Section: Assignment Info */}
        <div className="hidden lg:flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Group</span>
              <span className="text-xs text-card-foreground">{incident.assignmentGroup}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0D3133] text-[10px] font-semibold text-white">
              {incident.assignee.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Assigned</span>
              <span className="text-xs text-card-foreground">{incident.assignee}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Impact</span>
              <span className="text-xs text-card-foreground">{incident.impact || "High"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Urgency</span>
              <span className="text-xs text-card-foreground">{incident.urgency || "Critical"}</span>
            </div>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Status Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Status
                <ChevronDown className="ml-1.5 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatus("new")}>New</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("assigned")}>Assigned</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("in-progress")}>In Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("pending")}>Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("waiting-vendor")}>Waiting for Vendor</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatus("resolved")}>Resolved</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("closed")}>Closed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Assignment */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0D3133] text-[10px] font-semibold text-white">
                  {incident.assignee.split(" ").map((n) => n[0]).join("")}
                </div>
                <ChevronDown className="ml-1.5 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Reassign...</DropdownMenuItem>
              <DropdownMenuItem>Assign to me</DropdownMenuItem>
              <DropdownMenuItem>Change group...</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Escalate */}
          <Button variant="outline" size="sm" className="text-amber-600 hover:bg-amber-50 hover:text-amber-700">
            <ArrowUpRight className="mr-1.5 h-3.5 w-3.5" />
            Escalate
          </Button>

          {/* Add Task */}
          <Button variant="outline" size="sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Task
          </Button>

          {/* Resolve */}
          <Button size="sm" className="bg-[#059669] text-white hover:bg-[#059669]/90">
            <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
            Resolve
          </Button>

          {/* More Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-8 px-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Add Note</DropdownMenuItem>
              <DropdownMenuItem>Clone Incident</DropdownMenuItem>
              <DropdownMenuItem>Create Problem</DropdownMenuItem>
              <DropdownMenuItem>Create Change</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Launch War Room</DropdownMenuItem>
              <DropdownMenuItem>Notify Stakeholders</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Cancel Incident</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
