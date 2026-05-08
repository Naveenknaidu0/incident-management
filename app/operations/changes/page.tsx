"use client"

import { AppShell } from "@/components/layout/app-shell"
import { KPICard } from "@/components/dashboard/kpi-card"
import { IncidentTrendChart } from "@/components/dashboard/incident-trend-chart"
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
} from "lucide-react"

const kpis = [
  {
    title: "Total Changes",
    value: 127,
    change: { value: "+8 this week", trend: "up" as const },
    icon: AlertCircle,
    variant: "default" as const,
  },
  {
    title: "Pending Approval",
    value: 8,
    change: { value: "2 emergency", trend: "up" as const },
    icon: Clock,
    variant: "warning" as const,
  },
  {
    title: "In Implementation",
    value: 3,
    change: { value: "-1 from yesterday", trend: "down" as const },
    icon: AlertTriangle,
    variant: "warning" as const,
  },
  {
    title: "Completed",
    value: 89,
    change: { value: "+12 this week", trend: "up" as const },
    icon: CheckCircle,
    variant: "success" as const,
  },
  {
    title: "Success Rate",
    value: "96.8%",
    change: { value: "+0.5%", trend: "up" as const },
    icon: CheckCircle,
    variant: "success" as const,
  },
  {
    title: "Avg Duration",
    value: "4h 22m",
    change: { value: "-18min", trend: "down" as const },
    icon: Clock,
    variant: "success" as const,
  },
]

export default function ChangesDashboard() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">Change Management Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage all infrastructure and application changes
          </p>
        </div>

        {/* KPI Row */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {kpis.map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </div>

        {/* Charts and Tables */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <IncidentTrendChart />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
