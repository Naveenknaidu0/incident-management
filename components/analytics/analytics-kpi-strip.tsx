"use client"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { 
  AlertCircle, Clock, CheckCircle, Timer, 
  TrendingUp, TrendingDown, AlertTriangle, Server
} from "lucide-react"

interface KPIData {
  label: string
  value: string | number
  subValue?: string
  trend?: { value: number; direction: "up" | "down" }
  variant?: "default" | "success" | "warning" | "critical"
  icon: React.ElementType
}

const kpiData: KPIData[] = [
  {
    label: "Total Incidents",
    value: "2,847",
    subValue: "This month",
    trend: { value: 12, direction: "up" },
    icon: AlertCircle,
  },
  {
    label: "Open Incidents",
    value: "142",
    subValue: "Across all queues",
    trend: { value: 8, direction: "down" },
    variant: "warning",
    icon: AlertCircle,
  },
  {
    label: "MTTR",
    value: "4.2h",
    subValue: "Mean time to resolve",
    trend: { value: 15, direction: "down" },
    variant: "success",
    icon: Clock,
  },
  {
    label: "MTTA",
    value: "12m",
    subValue: "Mean time to acknowledge",
    trend: { value: 5, direction: "down" },
    variant: "success",
    icon: Timer,
  },
  {
    label: "SLA Compliance",
    value: "94.2%",
    subValue: "Response & Resolution",
    trend: { value: 2.1, direction: "up" },
    variant: "success",
    icon: CheckCircle,
  },
  {
    label: "Escalation Rate",
    value: "8.4%",
    subValue: "Of total incidents",
    trend: { value: 1.2, direction: "down" },
    icon: TrendingUp,
  },
  {
    label: "Major Incidents",
    value: "3",
    subValue: "Active",
    variant: "critical",
    icon: AlertTriangle,
  },
  {
    label: "Service Availability",
    value: "99.92%",
    subValue: "Uptime this month",
    trend: { value: 0.02, direction: "up" },
    variant: "success",
    icon: Server,
  },
]

const variantStyles = {
  default: "border-border",
  success: "border-l-green-500",
  warning: "border-l-amber-500",
  critical: "border-l-red-500",
}

export function AnalyticsKPIStrip() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
      {kpiData.map((kpi) => {
        const Icon = kpi.icon
        const variant = kpi.variant || "default"
        
        return (
          <Card
            key={kpi.label}
            className={cn(
              "border-l-4 p-3",
              variantStyles[variant]
            )}
          >
            <div className="flex items-start justify-between">
              <Icon className="h-4 w-4 text-muted-foreground" />
              {kpi.trend && (
                <div className={cn(
                  "flex items-center gap-0.5 text-[10px] font-medium",
                  kpi.trend.direction === "down" && kpi.label !== "Open Incidents" && kpi.label !== "Escalation Rate"
                    ? "text-red-600"
                    : "text-green-600"
                )}>
                  {kpi.trend.direction === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {kpi.trend.value}%
                </div>
              )}
            </div>
            <div className="mt-2">
              <p className="text-lg font-semibold text-[#0D3133]">{kpi.value}</p>
              <p className="text-[10px] text-muted-foreground">{kpi.label}</p>
              {kpi.subValue && (
                <p className="text-[9px] text-muted-foreground/70">{kpi.subValue}</p>
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
