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
    title: "Open Incidents",
    value: 42,
    change: { value: "+8 today", trend: "up" as const },
    icon: AlertCircle,
    variant: "default" as const,
  },
  {
    title: "Critical Incidents",
    value: 5,
    change: { value: "+2 today", trend: "up" as const },
    icon: AlertTriangle,
    variant: "critical" as const,
  },
  {
    title: "SLA Breaches",
    value: 3,
    change: { value: "-1 from yesterday", trend: "down" as const },
    icon: Clock,
    variant: "warning" as const,
  },
  {
    title: "MTTR",
    value: "2h 14m",
    change: { value: "-12min", trend: "down" as const },
    icon: Timer,
    variant: "success" as const,
  },
  {
    title: "Major Incidents",
    value: 2,
    change: { value: "1 active", trend: "neutral" as const },
    icon: Siren,
    variant: "critical" as const,
  },
  {
    title: "Resolution Rate",
    value: "94.2%",
    change: { value: "+1.3%", trend: "up" as const },
    icon: CheckCircle,
    variant: "success" as const,
  },
]

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">Operations Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Real-time overview of incident management operations
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
