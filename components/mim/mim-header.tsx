"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SeverityBadge } from "./severity-badge"
import {
  Video,
  Send,
  AlertTriangle,
  UserPlus,
  CheckCircle,
  MoreHorizontal,
  Clock,
  Globe,
  Server,
  Building2,
} from "lucide-react"

interface MIMHeaderProps {
  incident: {
    id: string
    title: string
    severity: "SEV-1" | "SEV-2" | "SEV-3" | "SEV-4"
    status: string
    businessImpact: "Critical" | "High" | "Medium" | "Low"
    commander: {
      name: string
      avatar?: string
    }
    startTime: string
    elapsedDuration: string
    affectedRegions: string[]
    impactedServices: number
  }
  onLaunchWarRoom?: () => void
  onSendUpdate?: () => void
  onEscalate?: () => void
  onAddStakeholders?: () => void
  onResolve?: () => void
}

const impactColors = {
  Critical: "bg-red-100 text-red-800 border-red-200",
  High: "bg-orange-100 text-orange-800 border-orange-200",
  Medium: "bg-amber-100 text-amber-800 border-amber-200",
  Low: "bg-green-100 text-green-800 border-green-200",
}

export function MIMHeader({
  incident,
  onLaunchWarRoom,
  onSendUpdate,
  onEscalate,
  onAddStakeholders,
  onResolve,
}: MIMHeaderProps) {
  return (
    <div className="shrink-0 h-20 border-b border-border bg-card px-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-muted-foreground">{incident.id}</span>
            <SeverityBadge severity={incident.severity} size="sm" />
            <span className={`px-2 py-0.5 text-xs font-medium rounded border ${impactColors[incident.businessImpact]}`}>
              {incident.businessImpact} Impact
            </span>
          </div>
          <h1 className="text-base font-semibold text-foreground truncate max-w-[300px]">
            {incident.title}
          </h1>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={incident.commander.avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {incident.commander.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Commander</span>
            <span className="text-xs font-medium">{incident.commander.name}</span>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Started</span>
            <span className="text-xs font-medium">{incident.startTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Duration</span>
            <span className="text-xs font-semibold text-red-600">{incident.elapsedDuration}</span>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-1.5">
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Regions</span>
            <span className="text-xs font-medium">{incident.affectedRegions.join(", ")}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Server className="h-3.5 w-3.5 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Services</span>
            <span className="text-xs font-medium">{incident.impactedServices} Impacted</span>
          </div>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white h-8"
          onClick={onLaunchWarRoom}
        >
          <Video className="h-3.5 w-3.5 mr-1.5" />
          War Room
        </Button>
        <Button size="sm" variant="outline" className="h-8" onClick={onSendUpdate}>
          <Send className="h-3.5 w-3.5 mr-1.5" />
          Send Update
        </Button>
        <Button size="sm" variant="outline" className="h-8" onClick={onEscalate}>
          <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
          Escalate
        </Button>
        <Button size="sm" variant="outline" className="h-8" onClick={onAddStakeholders}>
          <UserPlus className="h-3.5 w-3.5 mr-1.5" />
          Stakeholders
        </Button>
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white h-8"
          onClick={onResolve}
        >
          <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
          Resolve
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Clone Incident</DropdownMenuItem>
            <DropdownMenuItem>Export Timeline</DropdownMenuItem>
            <DropdownMenuItem>Create PIR</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Merge Incident</DropdownMenuItem>
            <DropdownMenuItem>Link Problem</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Cancel Incident</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
