"use client"

import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { SLAKPICard } from "@/components/sla/sla-kpi-card"
import { SLAMonitoringTable } from "@/components/sla/sla-monitoring-table"
import { SLAFilterBar } from "@/components/sla/sla-filter-bar"
import { SLAQuickActions } from "@/components/sla/sla-quick-actions"
import { AtRiskPanel } from "@/components/sla/at-risk-panel"
import {
  Clock,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Timer,
  CheckCircle,
  RefreshCw,
  Settings,
} from "lucide-react"

// Mock data
const kpiData = {
  activeSLAs: 847,
  breaches: 23,
  atRisk: 45,
  escalated: 12,
  avgResolutionTime: "4.2h",
  complianceRate: 94.7,
}

const mockSLARecords = [
  {
    id: "1",
    incidentId: "INC0042781",
    incidentTitle: "Payment Gateway Timeout Errors",
    slaType: "Resolution",
    remainingHours: 0,
    remainingMinutes: 45,
    breachRisk: "critical" as const,
    state: "warning" as const,
    assignmentGroup: "Network Operations",
    escalationLevel: 1,
    updatedAt: "2 min ago",
  },
  {
    id: "2",
    incidentId: "INC0042780",
    incidentTitle: "Authentication Service Degradation",
    slaType: "Response",
    remainingHours: 2,
    remainingMinutes: 30,
    breachRisk: "high" as const,
    state: "active" as const,
    assignmentGroup: "Application Support",
    escalationLevel: 0,
    updatedAt: "5 min ago",
  },
  {
    id: "3",
    incidentId: "INC0042779",
    incidentTitle: "Database Connection Pool Exhaustion",
    slaType: "Resolution",
    remainingHours: -1,
    remainingMinutes: 15,
    breachRisk: "critical" as const,
    state: "breached" as const,
    assignmentGroup: "Database Team",
    escalationLevel: 2,
    updatedAt: "1 min ago",
  },
  {
    id: "4",
    incidentId: "INC0042778",
    incidentTitle: "CDN Cache Invalidation Failure",
    slaType: "Resolution",
    remainingHours: 4,
    remainingMinutes: 0,
    breachRisk: "medium" as const,
    state: "active" as const,
    assignmentGroup: "Infrastructure",
    escalationLevel: 0,
    updatedAt: "10 min ago",
  },
  {
    id: "5",
    incidentId: "INC0042777",
    incidentTitle: "API Rate Limiting Issues",
    slaType: "Update",
    remainingHours: 0,
    remainingMinutes: 0,
    breachRisk: "low" as const,
    state: "paused" as const,
    assignmentGroup: "Application Support",
    escalationLevel: 0,
    updatedAt: "15 min ago",
  },
  {
    id: "6",
    incidentId: "INC0042776",
    incidentTitle: "SSL Certificate Expiry Warning",
    slaType: "Resolution",
    remainingHours: 1,
    remainingMinutes: 20,
    breachRisk: "high" as const,
    state: "escalated" as const,
    assignmentGroup: "Security Team",
    escalationLevel: 2,
    updatedAt: "3 min ago",
  },
]

const nearBreachIncidents = [
  { id: "1", incidentId: "INC0042781", title: "Payment Gateway Timeout", remainingMinutes: 45, assignmentGroup: "Network Ops", riskType: "near_breach" as const },
  { id: "2", incidentId: "INC0042785", title: "Email Service Delays", remainingMinutes: 32, assignmentGroup: "App Support", riskType: "near_breach" as const },
  { id: "3", incidentId: "INC0042788", title: "Load Balancer Issues", remainingMinutes: 28, assignmentGroup: "Infrastructure", riskType: "near_breach" as const },
]

const predictedEscalations = [
  { id: "1", incidentId: "INC0042790", title: "Database Replication Lag", remainingMinutes: 120, assignmentGroup: "Database Team", riskType: "predicted_escalation" as const },
  { id: "2", incidentId: "INC0042791", title: "Memory Leak in API", remainingMinutes: 90, assignmentGroup: "App Support", riskType: "predicted_escalation" as const },
]

const overloadedGroups = [
  { name: "Network Operations", activeIncidents: 18, nearBreach: 5, capacity: 15 },
  { name: "Database Team", activeIncidents: 12, nearBreach: 3, capacity: 10 },
]

const recurringViolations = [
  { service: "Payment Gateway", violations: 8, trend: "up" as const },
  { service: "Authentication", violations: 5, trend: "stable" as const },
  { service: "API Gateway", violations: 4, trend: "down" as const },
]

export default function SLADashboardPage() {
  return (
    <AppShell>
      <div className="flex h-full overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <div className="shrink-0 border-b border-border bg-card px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">SLA Operations</h1>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  Live
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Settings className="mr-1.5 h-3.5 w-3.5" />
                  Configure
                </Button>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <SLAKPICard
                title="Active SLAs"
                value={kpiData.activeSLAs}
                icon={Clock}
                variant="info"
              />
              <SLAKPICard
                title="SLA Breaches"
                value={kpiData.breaches}
                icon={AlertTriangle}
                variant="danger"
                trend={{ value: 12, direction: "up", label: "vs last week" }}
              />
              <SLAKPICard
                title="At Risk"
                value={kpiData.atRisk}
                icon={TrendingUp}
                variant="warning"
              />
              <SLAKPICard
                title="Escalated"
                value={kpiData.escalated}
                icon={ArrowUpRight}
                variant="warning"
              />
              <SLAKPICard
                title="Avg Resolution"
                value={kpiData.avgResolutionTime}
                icon={Timer}
                variant="default"
              />
              <SLAKPICard
                title="Compliance"
                value={`${kpiData.complianceRate}%`}
                icon={CheckCircle}
                variant="success"
                trend={{ value: 2.3, direction: "up", label: "vs target" }}
              />
            </div>

            {/* Quick Actions */}
            <SLAQuickActions />

            {/* Filters */}
            <SLAFilterBar />

            {/* SLA Monitoring Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-foreground">Live SLA Monitoring</h2>
                <span className="text-xs text-muted-foreground">
                  Showing {mockSLARecords.length} of 847 SLAs
                </span>
              </div>
              <SLAMonitoringTable records={mockSLARecords} />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 shrink-0 border-l border-border bg-muted/30 overflow-y-auto p-4">
          <h2 className="text-sm font-medium text-foreground mb-4">At Risk Monitoring</h2>
          <AtRiskPanel
            nearBreachIncidents={nearBreachIncidents}
            predictedEscalations={predictedEscalations}
            overloadedGroups={overloadedGroups}
            recurringViolations={recurringViolations}
          />
        </div>
      </div>
    </AppShell>
  )
}
