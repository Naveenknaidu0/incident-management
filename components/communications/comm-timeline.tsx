"use client"

import { DeliveryStatusBadge } from "./delivery-status-badge"
import { ChannelBadge } from "./channel-badge"
import { MessagePriorityBadge } from "./message-priority-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, AlertCircle, CheckCheck, Clock, Bell, ArrowUpRight } from "lucide-react"

type TimelineEventType = "sent" | "failed" | "acknowledged" | "escalated" | "scheduled" | "broadcast"

interface TimelineEvent {
  id: string
  type: TimelineEventType
  subject: string
  sender: { name: string; initials: string }
  timestamp: string
  channel?: "email" | "slack" | "teams" | "sms" | "push"
  priority?: "informational" | "warning" | "critical" | "executive-critical"
  audience?: string
  details?: string
}

const eventConfig: Record<TimelineEventType, { icon: typeof Send; color: string; bg: string }> = {
  sent: { icon: Send, color: "text-green-600", bg: "bg-green-50" },
  failed: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
  acknowledged: { icon: CheckCheck, color: "text-[#0D3133]", bg: "bg-[#0D3133]/10" },
  escalated: { icon: ArrowUpRight, color: "text-amber-600", bg: "bg-amber-50" },
  scheduled: { icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
  broadcast: { icon: Bell, color: "text-purple-600", bg: "bg-purple-50" },
}

interface CommTimelineProps {
  events: TimelineEvent[]
}

export function CommTimeline({ events }: CommTimelineProps) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => {
        const config = eventConfig[event.type]
        const Icon = config.icon
        return (
          <div key={event.id} className="relative flex gap-3">
            {/* Timeline line */}
            {index < events.length - 1 && (
              <div className="absolute left-4 top-10 h-full w-px bg-border" />
            )}
            
            {/* Icon */}
            <div className={`shrink-0 rounded-full p-2 ${config.bg}`}>
              <Icon className={`h-4 w-4 ${config.color}`} />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#0D3133] truncate">{event.subject}</p>
                  <div className="mt-1 flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="bg-muted text-[10px]">
                          {event.sender.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{event.sender.name}</span>
                    </div>
                    {event.channel && <ChannelBadge channel={event.channel} showLabel={false} />}
                    {event.priority && <MessagePriorityBadge priority={event.priority} />}
                  </div>
                  {event.audience && (
                    <p className="mt-1 text-xs text-muted-foreground">To: {event.audience}</p>
                  )}
                  {event.details && (
                    <p className="mt-1 text-xs text-muted-foreground">{event.details}</p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{event.timestamp}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
