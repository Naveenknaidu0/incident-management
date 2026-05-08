"use client"

import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  Clock,
  User,
  TrendingUp,
  AlertOctagon,
  Inbox,
} from "lucide-react"

interface MetricCardProps {
  label: string
  value: number
  icon: React.ReactNode
  variant?: "default" | "critical" | "warning" | "success"
  trend?: { value: number; isUp: boolean }
}

function MetricCard({ label, value, icon, variant = "default", trend }: MetricCardProps) {
  const variantStyles = {
    default: "border-border bg-card",
    critical: "border-red-200 bg-red-50",
    warning: "border-amber-200 bg-amber-50",
    success: "border-green-200 bg-green-50",
  }

  const valueStyles = {
    default: "text-foreground",
    critical: "text-red-700",
    warning: "text-amber-700",
    success: "text-green-700",
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border px-4 py-3",
        variantStyles[variant]
      )}
    >
      <div className={cn("text-muted-foreground", variant !== "default" && valueStyles[variant])}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-muted-foreground">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className={cn("text-lg font-semibold", valueStyles[variant])}>
            {value.toLocaleString()}
          </p>
          {trend && (
            <span
              className={cn(
                "flex items-center text-xs font-medium",
                trend.isUp ? "text-red-600" : "text-green-600"
              )}
            >
              <TrendingUp
                className={cn("mr-0.5 h-3 w-3", !trend.isUp && "rotate-180")}
              />
              {trend.value}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

interface QueueSummaryStripProps {
  metrics: {
    open: number
    critical: number
    slaBreached: number
    assignedToMe: number
    escalated: number
    majorIncidents: number
  }
}

export function QueueSummaryStrip({ metrics }: QueueSummaryStripProps) {
  return (
    <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-3">
      <div className="grid grid-cols-6 gap-3">
        <MetricCard
          label="Open Incidents"
          value={metrics.open}
          icon={<Inbox className="h-4 w-4" />}
          trend={{ value: 5, isUp: true }}
        />
        <MetricCard
          label="Critical"
          value={metrics.critical}
          icon={<AlertTriangle className="h-4 w-4" />}
          variant="critical"
        />
        <MetricCard
          label="SLA Breached"
          value={metrics.slaBreached}
          icon={<Clock className="h-4 w-4" />}
          variant="warning"
        />
        <MetricCard
          label="Assigned to Me"
          value={metrics.assignedToMe}
          icon={<User className="h-4 w-4" />}
        />
        <MetricCard
          label="Escalated"
          value={metrics.escalated}
          icon={<TrendingUp className="h-4 w-4" />}
          variant="warning"
        />
        <MetricCard
          label="Major Incidents"
          value={metrics.majorIncidents}
          icon={<AlertOctagon className="h-4 w-4" />}
          variant={metrics.majorIncidents > 0 ? "critical" : "default"}
        />
      </div>
    </div>
  )
}
