"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  MessageSquare,
  UserPlus,
  Server,
  CheckCircle,
  Clock,
  Send,
  Video,
  ArrowUpRight,
  Shield,
  Zap,
} from "lucide-react"

type TimelineEventType =
  | "incident-created"
  | "escalation"
  | "service-outage"
  | "communication"
  | "assignment"
  | "stakeholder-update"
  | "recovery-milestone"
  | "sla-breach"
  | "war-room"
  | "status-change"

interface TimelineEvent {
  id: string
  type: TimelineEventType
  title: string
  description?: string
  timestamp: string
  user?: {
    name: string
    avatar?: string
  }
  metadata?: Record<string, string>
}

interface IncidentTimelineProps {
  events: TimelineEvent[]
  className?: string
}

const eventIcons: Record<TimelineEventType, typeof AlertTriangle> = {
  "incident-created": AlertTriangle,
  escalation: ArrowUpRight,
  "service-outage": Server,
  communication: Send,
  assignment: UserPlus,
  "stakeholder-update": MessageSquare,
  "recovery-milestone": CheckCircle,
  "sla-breach": Clock,
  "war-room": Video,
  "status-change": Zap,
}

const eventColors: Record<TimelineEventType, { bg: string; icon: string; border: string }> = {
  "incident-created": { bg: "bg-red-100", icon: "text-red-600", border: "border-red-200" },
  escalation: { bg: "bg-orange-100", icon: "text-orange-600", border: "border-orange-200" },
  "service-outage": { bg: "bg-red-100", icon: "text-red-600", border: "border-red-200" },
  communication: { bg: "bg-blue-100", icon: "text-blue-600", border: "border-blue-200" },
  assignment: { bg: "bg-[#0D3133]/10", icon: "text-[#0D3133]", border: "border-[#0D3133]/20" },
  "stakeholder-update": { bg: "bg-purple-100", icon: "text-purple-600", border: "border-purple-200" },
  "recovery-milestone": { bg: "bg-green-100", icon: "text-green-600", border: "border-green-200" },
  "sla-breach": { bg: "bg-amber-100", icon: "text-amber-600", border: "border-amber-200" },
  "war-room": { bg: "bg-[#E69F50]/20", icon: "text-[#E69F50]", border: "border-[#E69F50]/30" },
  "status-change": { bg: "bg-slate-100", icon: "text-slate-600", border: "border-slate-200" },
}

export function IncidentTimeline({ events, className }: IncidentTimelineProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {events.map((event, index) => {
        const Icon = eventIcons[event.type]
        const colors = eventColors[event.type]

        return (
          <div key={event.id} className="flex gap-3 group">
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
                  colors.bg,
                  colors.border
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", colors.icon)} />
              </div>
              {index < events.length - 1 && (
                <div className="w-px flex-1 bg-border min-h-[16px]" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-3 pt-0.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{event.title}</span>
                    {event.user && (
                      <>
                        <span className="text-muted-foreground">by</span>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage src={event.user.avatar} />
                            <AvatarFallback className="text-[8px] bg-muted">
                              {event.user.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{event.user.name}</span>
                        </div>
                      </>
                    )}
                  </div>
                  {event.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                  {event.metadata && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {Object.entries(event.metadata).map(([key, value]) => (
                        <span
                          key={key}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                        >
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">
                  {event.timestamp}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
