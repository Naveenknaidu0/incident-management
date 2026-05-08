"use client"

import { 
  AlertCircle, CheckCircle2, Clock, ArrowUpRight, UserPlus, 
  MessageSquare, Wrench, Bell, FileText, XCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineEvent {
  id: string
  type: "creation" | "acknowledgement" | "escalation" | "assignment" | "communication" | "sla" | "status" | "action" | "resolution"
  title: string
  description: string
  timestamp: string
  user?: { name: string; initials: string }
  metadata?: Record<string, string>
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    type: "creation",
    title: "Incident Created",
    description: "Incident automatically created from monitoring alert",
    timestamp: "14:32 UTC",
    metadata: { source: "Datadog Alert", severity: "Critical" },
  },
  {
    id: "2",
    type: "sla",
    title: "Response SLA Started",
    description: "15-minute response SLA clock started",
    timestamp: "14:32 UTC",
  },
  {
    id: "3",
    type: "acknowledgement",
    title: "Incident Acknowledged",
    description: "On-call engineer acknowledged the incident",
    timestamp: "14:40 UTC",
    user: { name: "John Doe", initials: "JD" },
  },
  {
    id: "4",
    type: "sla",
    title: "Response SLA Met",
    description: "Responded within 8 minutes (target: 15 min)",
    timestamp: "14:40 UTC",
  },
  {
    id: "5",
    type: "assignment",
    title: "Assigned to Payment Ops",
    description: "Incident assigned to Payment Operations team",
    timestamp: "14:42 UTC",
    user: { name: "John Doe", initials: "JD" },
  },
  {
    id: "6",
    type: "assignment",
    title: "Assigned to Sarah Chen",
    description: "Primary responder assigned",
    timestamp: "14:44 UTC",
    user: { name: "Mike Johnson", initials: "MJ" },
  },
  {
    id: "7",
    type: "status",
    title: "Status: In Progress",
    description: "Investigation started",
    timestamp: "14:44 UTC",
    user: { name: "Sarah Chen", initials: "SC" },
  },
  {
    id: "8",
    type: "communication",
    title: "Stakeholder Notification Sent",
    description: "Initial notification sent to executive team",
    timestamp: "14:55 UTC",
    user: { name: "John Doe", initials: "JD" },
    metadata: { channel: "Email", recipients: "12" },
  },
  {
    id: "9",
    type: "action",
    title: "Diagnostic Script Executed",
    description: "Database connection pool analysis completed",
    timestamp: "15:10 UTC",
    user: { name: "Sarah Chen", initials: "SC" },
  },
  {
    id: "10",
    type: "escalation",
    title: "Escalated to Tier 2",
    description: "Auto-escalation triggered due to severity",
    timestamp: "15:17 UTC",
    metadata: { team: "Database Operations" },
  },
  {
    id: "11",
    type: "communication",
    title: "War Room Bridge Started",
    description: "Conference bridge established with 8 participants",
    timestamp: "15:20 UTC",
    user: { name: "John Doe", initials: "JD" },
  },
  {
    id: "12",
    type: "action",
    title: "Root Cause Identified",
    description: "Database connection pool exhaustion confirmed",
    timestamp: "15:45 UTC",
    user: { name: "Sarah Chen", initials: "SC" },
  },
  {
    id: "13",
    type: "sla",
    title: "Resolution SLA Warning",
    description: "50% of resolution time elapsed",
    timestamp: "16:32 UTC",
  },
  {
    id: "14",
    type: "action",
    title: "Hotfix Deployed",
    description: "payment-service v2.4.2 deployed to production",
    timestamp: "16:45 UTC",
    user: { name: "Sarah Chen", initials: "SC" },
  },
]

const typeConfig = {
  creation: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-100", lineColor: "bg-red-200" },
  acknowledgement: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100", lineColor: "bg-green-200" },
  escalation: { icon: ArrowUpRight, color: "text-orange-600", bg: "bg-orange-100", lineColor: "bg-orange-200" },
  assignment: { icon: UserPlus, color: "text-purple-600", bg: "bg-purple-100", lineColor: "bg-purple-200" },
  communication: { icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-100", lineColor: "bg-blue-200" },
  sla: { icon: Clock, color: "text-amber-600", bg: "bg-amber-100", lineColor: "bg-amber-200" },
  status: { icon: FileText, color: "text-slate-600", bg: "bg-slate-100", lineColor: "bg-slate-200" },
  action: { icon: Wrench, color: "text-teal-600", bg: "bg-teal-100", lineColor: "bg-teal-200" },
  resolution: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100", lineColor: "bg-green-200" },
}

export function TimelineTab() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-card-foreground">Full Incident Timeline</h3>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {timelineEvents.length} events
        </span>
      </div>

      {/* Timeline */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[18px] top-0 h-full w-0.5 bg-border" />

          <div className="space-y-6">
            {timelineEvents.map((event, idx) => {
              const config = typeConfig[event.type]
              const Icon = config.icon
              const isLast = idx === timelineEvents.length - 1

              return (
                <div key={event.id} className="relative flex gap-4 pl-10">
                  {/* Icon Node */}
                  <div
                    className={cn(
                      "absolute left-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-background",
                      config.bg
                    )}
                  >
                    <Icon className={cn("h-4 w-4", config.color)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-lg border border-border bg-background p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-medium text-card-foreground">{event.title}</h4>
                        <p className="mt-0.5 text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <span className="shrink-0 rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                        {event.timestamp}
                      </span>
                    </div>

                    {/* Metadata */}
                    {(event.user || event.metadata) && (
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        {event.user && (
                          <span className="flex items-center gap-1.5">
                            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0D3133] text-[8px] font-semibold text-white">
                              {event.user.initials}
                            </div>
                            {event.user.name}
                          </span>
                        )}
                        {event.metadata && Object.entries(event.metadata).map(([key, value]) => (
                          <span key={key} className="flex items-center gap-1">
                            <span className="capitalize">{key}:</span>
                            <span className="font-medium text-card-foreground">{value}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
