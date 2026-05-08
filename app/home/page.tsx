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

export default function ExecutiveCommandCenter() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto p-6">
        {/* Executive Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Executive Command Center</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enterprise-wide operational intelligence and real-time service health monitoring
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Last updated: Now</p>
            <p className="text-xs text-muted-foreground">Status: Operational</p>
          </div>
        </div>

        {/* Executive KPI Strip - Critical Metrics */}
        <div className="mb-8 border-t border-b border-border/50 bg-gradient-to-r from-background to-muted/30 py-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Executive Metrics</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {kpis.map((kpi) => (
              <KPICard key={kpi.title} {...kpi} />
            ))}
          </div>
        </div>

        {/* Major Incident Alert - Priority Alert */}
        <div className="mb-8">
          <MajorIncidentPanel />
        </div>

        {/* Operational Intelligence Grid */}
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Left Column - Core Operations */}
          <div className="space-y-6 lg:col-span-2">
            {/* Incident Trends */}
            <IncidentTrendChart />
            
            {/* Active Incidents Table */}
            <IncidentTable />
          </div>

          {/* Right Column - Health & Intelligence */}
          <div className="space-y-6 lg:col-span-2">
            {/* Service Health Overview */}
            <ServiceHealthPanel />
            
            {/* AI-Powered Insights */}
            <AIInsightsPanel />
          </div>
        </div>

        {/* Bottom Navigation Info */}
        <div className="mt-12 border-t border-border/30 pt-6">
          <p className="text-xs text-muted-foreground text-center">
            Use the sidebar to navigate to specific modules. Quick links: 
            <a href="/operations/incidents" className="text-[#E69F50] hover:underline mx-1">Incidents</a>
            <a href="/operations/problems" className="text-[#E69F50] hover:underline mx-1">Problems</a>
            <a href="/operations/changes" className="text-[#E69F50] hover:underline mx-1">Changes</a>
            <a href="/assets" className="text-[#E69F50] hover:underline mx-1">Assets</a>
          </p>
        </div>
      </div>
    </AppShell>
  )
}
