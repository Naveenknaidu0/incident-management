"use client"

import { Card } from "@/components/ui/card"
import {
  Zap,
  Timer,
  Bell,
  FormInput,
  FileEdit,
  AlertTriangle,
} from "lucide-react"

const kpiData = [
  { label: "Active Workflows", value: "47", icon: Zap, trend: "+3 this week" },
  { label: "SLA Policies", value: "12", icon: Timer, trend: "2 pending review" },
  { label: "Notification Rules", value: "34", icon: Bell, trend: "Active" },
  { label: "Dynamic Forms", value: "8", icon: FormInput, trend: "1 draft" },
  { label: "Active Templates", value: "23", icon: FileEdit, trend: "5 recently used" },
  { label: "Escalation Policies", value: "6", icon: AlertTriangle, trend: "All active" },
]

export function AdminKPIStrip() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {kpiData.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card key={kpi.label} className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {kpi.label}
                </p>
                <p className="mt-1 text-2xl font-semibold text-[#0D3133]">
                  {kpi.value}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {kpi.trend}
                </p>
              </div>
              <div className="rounded-md bg-muted p-1.5">
                <Icon className="h-4 w-4 text-[#73847B]" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
