"use client"

import { AppShell } from "@/components/layout/app-shell"
import { KPICard } from "@/components/dashboard/kpi-card"
import { IncidentTrendChart } from "@/components/dashboard/incident-trend-chart"
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"

const kpis = [
  {
    title: "Total Requests",
    value: 1420,
    change: { value: "+52 this week", trend: "up" as const },
    icon: FileText,
    variant: "default" as const,
  },
  {
    title: "Open Requests",
    value: 15,
    change: { value: "3 urgent", trend: "up" as const },
    icon: AlertTriangle,
    variant: "warning" as const,
  },
  {
    title: "In Progress",
    value: 7,
    change: { value: "-2 from yesterday", trend: "down" as const },
    icon: Clock,
    variant: "warning" as const,
  },
  {
    title: "Fulfilled",
    value: 1098,
    change: { value: "+38 this week", trend: "up" as const },
    icon: CheckCircle,
    variant: "success" as const,
  },
  {
    title: "Fulfillment Rate",
    value: "97.3%",
    change: { value: "+0.2%", trend: "up" as const },
    icon: TrendingUp,
    variant: "success" as const,
  },
  {
    title: "Avg Resolution",
    value: "8h 45m",
    change: { value: "-22min", trend: "down" as const },
    icon: Clock,
    variant: "success" as const,
  },
]

export default function RequestsDashboard() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">Request Management Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Monitor service requests and fulfillment operations
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
