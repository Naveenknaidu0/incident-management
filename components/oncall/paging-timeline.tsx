"use client"

import { cn } from "@/lib/utils"
import { PagingStatusBadge } from "./paging-status-badge"
import {
  Bell,
  Phone,
  MessageSquare,
  Mail,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react"

interface PagingEvent {
  id: string
  type: "sms" | "phone" | "push" | "slack" | "teams" | "email"
  recipient: string
  status: "queued" | "delivered" | "acknowledged" | "failed" | "escalated"
  timestamp: string
  retryCount?: number
}

interface PagingTimelineProps {
  events: PagingEvent[]
}

const channelIcons: Record<string, React.ElementType> = {
  sms: MessageSquare,
  phone: Phone,
  push: Bell,
  slack: MessageSquare,
  teams: MessageSquare,
  email: Mail,
}

const channelLabels: Record<string, string> = {
  sms: "SMS",
  phone: "Phone Call",
  push: "Push Notification",
  slack: "Slack",
  teams: "Microsoft Teams",
  email: "Email",
}

export function PagingTimeline({ events }: PagingTimelineProps) {
  return (
    <div className="space-y-3">
      {events.map((event, index) => {
        const Icon = channelIcons[event.type] || Bell
        return (
          <div key={event.id} className="flex items-start gap-3">
            <div className="relative">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  event.status === "acknowledged" ? "bg-green-100 text-green-700" :
                  event.status === "failed" ? "bg-red-100 text-red-700" :
                  event.status === "escalated" ? "bg-orange-100 text-orange-700" :
                  "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              {index < events.length - 1 && (
                <div className="absolute left-1/2 top-8 h-full w-px -translate-x-1/2 bg-border" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#0D3133]">
                    {channelLabels[event.type]}
                  </span>
                  <PagingStatusBadge status={event.status} />
                </div>
                <span className="text-xs text-muted-foreground">{event.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Sent to {event.recipient}
              </p>
              {event.retryCount && event.retryCount > 0 && (
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <RefreshCw className="h-3 w-3" />
                  {event.retryCount} retry attempts
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
