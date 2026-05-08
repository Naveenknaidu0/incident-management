"use client"

import { AppShell } from "@/components/layout/app-shell"
import { KPICard } from "@/components/dashboard/kpi-card"
import { IncidentTable } from "@/components/dashboard/incident-table"
import { IncidentTrendChart } from "@/components/dashboard/incident-trend-chart"
import { MajorIncidentPanel } from "@/components/dashboard/major-incident-panel"
import { ServiceHealthPanel } from "@/components/dashboard/service-health-panel"
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel"
import {
  AlertCircle,
  AlertTriangle,
  Clock,
  Timer,
  Siren,
  CheckCircle,
} from "lucide-react"

const kpis = [
  {
    title: "Total Incidents",
    value: 892,
    change: { value: "+42 this week", trend: "up" as const },
    icon: AlertCircle,
    variant: "default" as const,
  },
  {
    title: "Critical Issues",
    value: 5,
    change: { value: "2 in progress", trend: "up" as const },
    icon: AlertTriangle,
    variant: "critical" as const,
  },
  {
    title: "Major Incidents",
    value: 2,
    change: { value: "1 active", trend: "neutral" as const },
    icon: Siren,
    variant: "critical" as const,
  },
  {
    title: "Problems Open",
    value: 23,
    change: { value: "+5 this week", trend: "up" as const },
    icon: AlertTriangle,
    variant: "warning" as const,
  },
  {
    title: "Changes Pending",
    value: 8,
    change: { value: "2 emergency", trend: "up" as const },
    icon: Clock,
    variant: "warning" as const,
  },
  {
    title: "Requests",
    value: 156,
    change: { value: "15 fulfilled today", trend: "down" as const },
    icon: CheckCircle,
    variant: "success" as const,
  },
]

export default function OperationsDashboard() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">Operations Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Unified view of incidents, problems, changes, and requests
          </p>
        </div>

        {/* KPI Row */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {kpis.map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </div>

        {/* Major Incident Alert */}
        <div className="mb-6">
          <MajorIncidentPanel />
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Charts and Tables */}
          <div className="space-y-6 lg:col-span-2">
            <IncidentTrendChart />
            <IncidentTable />
          </div>

          {/* Right Column - Panels */}
          <div className="space-y-6">
            <ServiceHealthPanel />
            <AIInsightsPanel />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
