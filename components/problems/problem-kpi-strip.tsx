"use client"

import { Card } from "@/components/ui/card"
import { AlertTriangle, Bug, RefreshCw, Search, CheckCircle, TrendingUp } from "lucide-react"

const kpis = [
  { label: "Active Problems", value: "24", icon: AlertTriangle, trend: "+3", trendUp: true, color: "text-amber-600" },
  { label: "Known Errors", value: "12", icon: Bug, trend: "-2", trendUp: false, color: "text-purple-600" },
  { label: "Recurring Incidents", value: "8", icon: RefreshCw, trend: "+1", trendUp: true, color: "text-red-600" },
  { label: "RCA Pending", value: "6", icon: Search, trend: "0", trendUp: false, color: "text-blue-600" },
  { label: "Permanent Fixes", value: "15", icon: CheckCircle, trend: "+4", trendUp: false, color: "text-green-600" },
  { label: "Resolution Rate", value: "87%", icon: TrendingUp, trend: "+5%", trendUp: false, color: "text-[#0D3133]" },
]

export function ProblemKPIStrip() {
  return (
    <div className="grid grid-cols-6 gap-3">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="p-3">
          <div className="flex items-center justify-between">
            <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            <span className={`text-xs font-medium ${kpi.trendUp ? "text-red-600" : "text-green-600"}`}>
              {kpi.trend}
            </span>
          </div>
          <div className="mt-2">
            <p className="text-xl font-semibold text-[#0D3133]">{kpi.value}</p>
            <p className="text-xs text-muted-foreground truncate">{kpi.label}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
