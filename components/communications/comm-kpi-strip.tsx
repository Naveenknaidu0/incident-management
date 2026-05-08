"use client"

import { Card } from "@/components/ui/card"
import { Bell, Send, AlertCircle, Briefcase, Megaphone, Users } from "lucide-react"

const kpis = [
  { label: "Active Notifications", value: "23", icon: Bell, trend: "+5", trendUp: true },
  { label: "Sent Updates", value: "156", icon: Send, trend: "+12", trendUp: true },
  { label: "Failed Deliveries", value: "3", icon: AlertCircle, trend: "-2", trendUp: false, variant: "warning" },
  { label: "Executive Comms", value: "8", icon: Briefcase, trend: "+1", trendUp: true },
  { label: "Broadcasts", value: "12", icon: Megaphone, trend: "+3", trendUp: true },
  { label: "Stakeholder Reach", value: "847", icon: Users, trend: "+24", trendUp: true },
]

export function CommKPIStrip() {
  return (
    <div className="grid grid-cols-6 gap-3">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card
            key={kpi.label}
            className={`p-3 ${kpi.variant === "warning" ? "border-amber-200 bg-amber-50/50" : ""}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="mt-1 text-xl font-semibold text-[#0D3133]">{kpi.value}</p>
              </div>
              <div className={`rounded-md p-1.5 ${kpi.variant === "warning" ? "bg-amber-100" : "bg-muted"}`}>
                <Icon className={`h-4 w-4 ${kpi.variant === "warning" ? "text-amber-600" : "text-muted-foreground"}`} />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <span className={`text-xs font-medium ${kpi.trendUp && kpi.variant !== "warning" ? "text-green-600" : kpi.variant === "warning" ? "text-green-600" : "text-muted-foreground"}`}>
                {kpi.trend}
              </span>
              <span className="text-xs text-muted-foreground">today</span>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
