"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { EventTypeBadge } from "./event-type-badge"
import {
  Plus,
  RefreshCw,
  Clock,
  GitBranch,
  AlertTriangle,
  Bell,
  UserPlus,
  Settings,
} from "lucide-react"

interface TimelineEvent {
  id: string
  timestamp: string
  eventType: "incident-created" | "status-changed" | "sla-modified" | "workflow-updated" | "escalation-triggered" | "notification-sent" | "assignment-changed" | "configuration-updated" | "template-modified" | "automation-edited" | "access-granted" | "access-revoked" | "record-deleted" | "policy-violation"
  entity: string
  action: string
  performedBy: { name: string }
  details?: string
}

interface AuditTimelineProps {
  events: TimelineEvent[]
  className?: string
}

const eventIcons: Record<string, typeof Plus> = {
  "incident-created": Plus,
  "status-changed": RefreshCw,
  "sla-modified": Clock,
  "workflow-updated": GitBranch,
  "escalation-triggered": AlertTriangle,
  "notification-sent": Bell,
  "assignment-changed": UserPlus,
  "configuration-updated": Settings,
}

export function AuditTimeline({ events, className }: AuditTimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {events.map((event, index) => {
        const Icon = eventIcons[event.eventType] || Settings
        const isLast = index === events.length - 1

        return (
          <div key={event.id} className="relative flex gap-4">
            {/* Timeline Line */}
            {!isLast && (
              <div className="absolute left-[19px] top-10 h-[calc(100%-20px)] w-px bg-border" />
            )}

            {/* Icon */}
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-card">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <EventTypeBadge type={event.eventType} />
                  <p className="mt-1 text-sm text-foreground">{event.action}</p>
                  {event.details && (
                    <p className="mt-0.5 text-xs text-muted-foreground">{event.details}</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                  <div className="mt-1 flex items-center gap-1.5 justify-end">
                    <Avatar className="h-4 w-4">
                      <AvatarFallback className="text-[8px] bg-[#0D3133] text-white">
                        {event.performedBy.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{event.performedBy.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
