"use client"

import { cn } from "@/lib/utils"
import {
  Play,
  AlertTriangle,
  ArrowUpRight,
  UserPlus,
  Bell,
  XCircle,
  CheckCircle,
  Clock,
  Pause,
} from "lucide-react"

type TimelineEventType =
  | "sla_started"
  | "warning_triggered"
  | "escalation_triggered"
  | "reassignment"
  | "management_notification"
  | "sla_breach"
  | "resolution"
  | "paused"
  | "resumed"

interface TimelineEvent {
  id: string
  type: TimelineEventType
  title: string
  description?: string
  timestamp: string
  actor?: string
  level?: number
}

interface EscalationTimelineProps {
  events: TimelineEvent[]
  className?: string
}

const eventConfig: Record<TimelineEventType, { icon: typeof Play; color: string; bg: string }> = {
  sla_started: { icon: Play, color: "text-emerald-600", bg: "bg-emerald-100" },
  warning_triggered: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-100" },
  escalation_triggered: { icon: ArrowUpRight, color: "text-orange-600", bg: "bg-orange-100" },
  reassignment: { icon: UserPlus, color: "text-blue-600", bg: "bg-blue-100" },
  management_notification: { icon: Bell, color: "text-purple-600", bg: "bg-purple-100" },
  sla_breach: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
  resolution: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
  paused: { icon: Pause, color: "text-slate-600", bg: "bg-slate-100" },
  resumed: { icon: Play, color: "text-blue-600", bg: "bg-blue-100" },
}

export function EscalationTimeline({ events, className }: EscalationTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-0">
        {events.map((event, index) => {
          const config = eventConfig[event.type]
          const Icon = config.icon
          const isLast = index === events.length - 1

          return (
            <div
              key={event.id}
              className={cn(
                "relative flex gap-4 py-3",
                !isLast && "border-b border-border/50"
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  config.bg
                )}
              >
                <Icon className={cn("h-4 w-4", config.color)} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {event.title}
                      {event.level && (
                        <span className="ml-2 inline-flex items-center rounded bg-orange-100 px-1.5 py-0.5 text-xs font-medium text-orange-700">
                          L{event.level}
                        </span>
                      )}
                    </p>
                    {event.description && (
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    )}
                    {event.actor && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        By: {event.actor}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                    <Clock className="h-3 w-3" />
                    {event.timestamp}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
