"use client"

import { Card } from "@/components/ui/card"
import { Users, AlertTriangle, Bell, Clock, Calendar, CheckCircle } from "lucide-react"

const kpis = [
  { label: "Active On-Call", value: "12", icon: Users, trend: "3 teams", color: "text-[#0D3133]" },
  { label: "Escalated Incidents", value: "5", icon: AlertTriangle, trend: "+2 today", color: "text-orange-600" },
  { label: "Unacknowledged", value: "3", icon: Bell, trend: "2 critical", color: "text-red-600" },
  { label: "Response SLA", value: "94%", icon: Clock, trend: "Target: 95%", color: "text-amber-600" },
  { label: "Active Rotations", value: "8", icon: Calendar, trend: "All covered", color: "text-[#0D3133]" },
  { label: "Ack Rate", value: "98.2%", icon: CheckCircle, trend: "+1.2%", color: "text-green-600" },
]

export function OnCallKPIStrip() {
  return (
    <div className="grid grid-cols-6 gap-3">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card key={kpi.label} className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.trend}</p>
              </div>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
