"use client"

import { AppShell } from "@/components/layout/app-shell"
import { KPICard } from "@/components/dashboard/kpi-card"
import { IncidentTrendChart } from "@/components/dashboard/incident-trend-chart"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye,
  Users,
} from "lucide-react"

const kpis = [
  {
    title: "Governance Items",
    value: 45,
    change: { value: "All compliant", trend: "down" as const },
    icon: Shield,
    variant: "default" as const,
  },
  {
    title: "Compliance Issues",
    value: 0,
    change: { value: "0 critical", trend: "down" as const },
    icon: AlertTriangle,
    variant: "success" as const,
  },
  {
    title: "Audit Trails",
    value: 12453,
    change: { value: "+342 this week", trend: "up" as const },
    icon: Eye,
    variant: "default" as const,
  },
  {
    title: "Access Policies",
    value: 67,
    change: { value: "2 pending review", trend: "neutral" as const },
    icon: Lock,
    variant: "warning" as const,
  },
  {
    title: "Compliance Score",
    value: "99.8%",
    change: { value: "+0.1%", trend: "up" as const },
    icon: CheckCircle,
    variant: "success" as const,
  },
  {
    title: "Active Users",
    value: 156,
    change: { value: "+3 this week", trend: "up" as const },
    icon: Users,
    variant: "default" as const,
  },
]

export default function PlatformDashboard() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">Platform Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Governance, audit, compliance, and access control
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
