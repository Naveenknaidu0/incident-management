"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertCircle,
  ArrowUpRight,
  Server,
  User,
  XCircle,
  CheckCircle,
  RefreshCw,
  type LucideIcon,
} from "lucide-react"

interface TimelineEvent {
  id: string
  type: "incident-created" | "escalation" | "service-failure" | "responder-action" | "outage-propagation" | "recovery"
  title: string
  description: string
  timestamp: string
  metadata?: { label: string; value: string }[]
}

interface RCATimelineProps {
  events: TimelineEvent[]
  className?: string
}

const eventConfig: Record<TimelineEvent["type"], { icon: LucideIcon; color: string; bg: string }> = {
  "incident-created": { icon: AlertCircle, color: "text-red-600", bg: "bg-red-100" },
  escalation: { icon: ArrowUpRight, color: "text-orange-600", bg: "bg-orange-100" },
  "service-failure": { icon: Server, color: "text-purple-600", bg: "bg-purple-100" },
  "responder-action": { icon: User, color: "text-blue-600", bg: "bg-blue-100" },
  "outage-propagation": { icon: XCircle, color: "text-red-700", bg: "bg-red-100" },
  recovery: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
}

export function RCATimeline({ events, className }: RCATimelineProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <RefreshCw className="h-4 w-4 text-[#E69F50]" />
          Investigation Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          {events.map((event, index) => {
            const config = eventConfig[event.type]
            const Icon = config.icon
            const isLast = index === events.length - 1

            return (
              <div key={event.id} className="relative flex gap-3 pb-4">
                {/* Timeline line */}
                {!isLast && (
                  <div className="absolute left-[15px] top-8 h-full w-px bg-border" />
                )}
                
                {/* Icon */}
                <div className={cn("relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full", config.bg)}>
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>

                {/* Content */}
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{event.description}</p>
                  {event.metadata && event.metadata.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {event.metadata.map((meta, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-xs"
                        >
                          <span className="text-muted-foreground">{meta.label}:</span>
                          <span className="ml-1 font-medium text-foreground">{meta.value}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
