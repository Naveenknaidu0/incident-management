"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  AlertTriangle,
  Server,
  ArrowUpRight,
  Link as LinkIcon,
} from "lucide-react"

interface TeamMember {
  name: string
  initials: string
  load: number
  capacity: number
}

interface Service {
  name: string
  status: "operational" | "degraded" | "outage"
}

interface EscalationPath {
  level: number
  role: string
  name: string
}

interface LinkedIncident {
  id: string
  title: string
  status: string
}

interface SLAContextPanelProps {
  assignmentLoad: TeamMember[]
  businessImpact: {
    level: "low" | "medium" | "high" | "critical"
    affectedUsers: number
    revenue: string
  }
  affectedServices: Service[]
  escalationPath: EscalationPath[]
  linkedIncidents: LinkedIncident[]
  className?: string
}

const impactColors = {
  low: "text-emerald-600 bg-emerald-50",
  medium: "text-amber-600 bg-amber-50",
  high: "text-orange-600 bg-orange-50",
  critical: "text-red-600 bg-red-50",
}

const serviceStatusColors = {
  operational: "bg-emerald-500",
  degraded: "bg-amber-500",
  outage: "bg-red-500",
}

export function SLAContextPanel({
  assignmentLoad,
  businessImpact,
  affectedServices,
  escalationPath,
  linkedIncidents,
  className,
}: SLAContextPanelProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Assignment Load */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Users className="h-4 w-4 text-muted-foreground" />
            Assignment Load
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <div className="space-y-3">
            {assignmentLoad.map((member) => (
              <div key={member.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px] bg-[#0D3133] text-white">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{member.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {member.load}/{member.capacity}
                  </span>
                </div>
                <Progress
                  value={(member.load / member.capacity) * 100}
                  className="h-1.5"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Impact */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            Business Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Impact Level</span>
              <span className={cn(
                "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium capitalize",
                impactColors[businessImpact.level]
              )}>
                {businessImpact.level}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Affected Users</span>
              <span className="text-sm font-medium">{businessImpact.affectedUsers.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Est. Revenue Impact</span>
              <span className="text-sm font-medium text-red-600">{businessImpact.revenue}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Affected Services */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Server className="h-4 w-4 text-muted-foreground" />
            Affected Services
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <div className="space-y-2">
            {affectedServices.map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <span className="text-sm">{service.name}</span>
                <span className={cn(
                  "h-2 w-2 rounded-full",
                  serviceStatusColors[service.status]
                )} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Escalation Path */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            Escalation Path
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <div className="space-y-2">
            {escalationPath.map((step, index) => (
              <div key={step.level} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0D3133] text-[10px] font-medium text-white">
                  L{step.level}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{step.name}</p>
                  <p className="text-xs text-muted-foreground">{step.role}</p>
                </div>
                {index < escalationPath.length - 1 && (
                  <div className="absolute left-[11px] mt-8 h-4 w-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Linked Incidents */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
            Linked Incidents
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <div className="space-y-2">
            {linkedIncidents.map((incident) => (
              <div key={incident.id} className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#0D3133]">{incident.id}</span>
                <span className="text-xs text-muted-foreground">{incident.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
