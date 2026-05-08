"use client"

import { MessageSquare, UserPlus, AlertTriangle, Clock, ArrowUpRight, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineItem {
  id: string
  type: "comment" | "status" | "assignment" | "sla" | "escalation" | "system"
  content: string
  user?: { name: string; initials: string }
  timestamp: string
  isSystem?: boolean
}

const timelineItems: TimelineItem[] = [
  {
    id: "1",
    type: "comment",
    content: "Deployed hotfix to payment service. Monitoring for 15 minutes before confirming resolution.",
    user: { name: "Sarah Chen", initials: "SC" },
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "status",
    content: "Status changed from Open to In Progress",
    user: { name: "Sarah Chen", initials: "SC" },
    timestamp: "15 min ago",
    isSystem: true,
  },
  {
    id: "3",
    type: "assignment",
    content: "Assigned to Sarah Chen (Payment Ops)",
    user: { name: "Mike Johnson", initials: "MJ" },
    timestamp: "18 min ago",
    isSystem: true,
  },
  {
    id: "4",
    type: "comment",
    content: "Root cause identified: Database connection pool exhaustion. Preparing hotfix.",
    user: { name: "Sarah Chen", initials: "SC" },
    timestamp: "25 min ago",
  },
  {
    id: "5",
    type: "sla",
    content: "SLA warning threshold reached (50% time remaining)",
    timestamp: "32 min ago",
    isSystem: true,
  },
  {
    id: "6",
    type: "escalation",
    content: "Escalated to Tier 2 Support",
    user: { name: "Auto-escalation", initials: "AE" },
    timestamp: "45 min ago",
    isSystem: true,
  },
  {
    id: "7",
    type: "comment",
    content: "Initial investigation shows increased error rates in payment gateway logs. Looking into database connections.",
    user: { name: "John Doe", initials: "JD" },
    timestamp: "50 min ago",
  },
  {
    id: "8",
    type: "status",
    content: "Incident created from monitoring alert",
    timestamp: "1 hour ago",
    isSystem: true,
  },
]

const typeConfig = {
  comment: { icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
  status: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  assignment: { icon: UserPlus, color: "text-purple-600", bg: "bg-purple-50" },
  sla: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  escalation: { icon: ArrowUpRight, color: "text-red-600", bg: "bg-red-50" },
  system: { icon: AlertTriangle, color: "text-slate-500", bg: "bg-slate-100" },
}

export function ActivityTimeline() {
  return (
    <div className="space-y-4">
      {/* Comment Input */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0D3133] text-xs font-semibold text-white">
            JD
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Add a comment or work note..."
              className="min-h-[80px] w-full resize-none rounded-md border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:border-[#E69F50] focus:outline-none focus:ring-1 focus:ring-[#E69F50]"
            />
            <div className="mt-2 flex justify-end gap-2">
              <button className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-card-foreground hover:bg-muted">
                Work Note
              </button>
              <button className="rounded-md bg-[#E69F50] px-3 py-1.5 text-xs font-medium text-[#0D3133] hover:bg-[#E69F50]/90">
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-border" />

        <div className="space-y-4">
          {timelineItems.map((item) => {
            const config = typeConfig[item.isSystem ? "system" : item.type]
            const Icon = config.icon

            return (
              <div key={item.id} className="relative flex gap-4 pl-10">
                {/* Icon */}
                <div
                  className={cn(
                    "absolute left-0 flex h-8 w-8 items-center justify-center rounded-full",
                    config.bg
                  )}
                >
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "flex-1 rounded-lg border border-border p-3",
                    item.isSystem ? "bg-muted/30" : "bg-card"
                  )}
                >
                  {item.user && !item.isSystem && (
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-medium text-card-foreground">
                        {item.user.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                    </div>
                  )}
                  <p className={cn("text-sm", item.isSystem ? "text-muted-foreground" : "text-card-foreground")}>
                    {item.content}
                  </p>
                  {item.isSystem && (
                    <span className="mt-1 inline-block text-xs text-muted-foreground">
                      {item.user ? `${item.user.name} • ` : ""}{item.timestamp}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
