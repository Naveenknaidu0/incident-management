"use client"

import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SLAKPICard } from "@/components/sla/sla-kpi-card"
import {
  BreachTrendsChart,
  SLAComplianceChart,
  EscalationFrequencyChart,
  ResolutionPerformanceChart,
  TopBreachedServices,
  LongestRunningIncidents,
} from "@/components/sla/sla-analytics-charts"
import {
  Download,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react"

// Mock data
const breachTrendData = [
  { date: "Mon", breaches: 5, warnings: 12 },
  { date: "Tue", breaches: 8, warnings: 15 },
  { date: "Wed", breaches: 3, warnings: 10 },
  { date: "Thu", breaches: 6, warnings: 14 },
  { date: "Fri", breaches: 4, warnings: 11 },
  { date: "Sat", breaches: 2, warnings: 6 },
  { date: "Sun", breaches: 1, warnings: 4 },
]

const complianceData = [
  { month: "Jan", compliance: 92 },
  { month: "Feb", compliance: 94 },
  { month: "Mar", compliance: 91 },
  { month: "Apr", compliance: 95 },
  { month: "May", compliance: 93 },
  { month: "Jun", compliance: 96 },
]

const escalationData = [
  { level: "Level 1", count: 45 },
  { level: "Level 2", count: 28 },
  { level: "Level 3", count: 15 },
  { level: "Level 4+", count: 8 },
]

const resolutionData = [
  { group: "Network Ops", avgTime: 4.2, target: 4 },
  { group: "Database", avgTime: 6.1, target: 4 },
  { group: "App Support", avgTime: 3.5, target: 4 },
  { group: "Security", avgTime: 5.2, target: 4 },
  { group: "Infrastructure", avgTime: 3.8, target: 4 },
]

const topBreachedServices = [
  { name: "Payment Gateway", breaches: 12, percentage: 100 },
  { name: "Authentication", breaches: 8, percentage: 67 },
  { name: "Database Cluster", breaches: 6, percentage: 50 },
  { name: "API Gateway", breaches: 5, percentage: 42 },
  { name: "Email Service", breaches: 4, percentage: 33 },
]

const longestRunningIncidents = [
  { id: "INC0042770", title: "Core Banking System Issue", duration: "4d 12h", group: "Core Systems" },
  { id: "INC0042765", title: "Legacy Integration Failure", duration: "3d 8h", group: "Integration" },
  { id: "INC0042758", title: "Data Migration Problem", duration: "2d 16h", group: "Database" },
  { id: "INC0042751", title: "Network Latency Issues", duration: "1d 22h", group: "Network Ops" },
]

export default function SLAAnalyticsPage() {
  return (
    <AppShell>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Breach Analytics</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                SLA performance insights and breach analysis
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="7d">
                <SelectTrigger className="w-36 h-8">
                  <Calendar className="mr-1.5 h-3.5 w-3.5" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-8">
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SLAKPICard
              title="Total Breaches"
              value={29}
              subtitle="This period"
              icon={AlertTriangle}
              variant="danger"
              trend={{ value: 12, direction: "down", label: "vs last period" }}
            />
            <SLAKPICard
              title="Compliance Rate"
              value="94.7%"
              subtitle="Target: 95%"
              icon={CheckCircle}
              variant="success"
              trend={{ value: 2.3, direction: "up" }}
            />
            <SLAKPICard
              title="Avg Resolution"
              value="4.5h"
              subtitle="All priorities"
              icon={Clock}
              variant="default"
            />
            <SLAKPICard
              title="Escalation Rate"
              value="18%"
              subtitle="Of total incidents"
              icon={TrendingUp}
              variant="warning"
              trend={{ value: 5, direction: "up" }}
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid md:grid-cols-2 gap-4">
            <BreachTrendsChart data={breachTrendData} />
            <SLAComplianceChart data={complianceData} />
          </div>

          {/* Charts Row 2 */}
          <div className="grid md:grid-cols-2 gap-4">
            <EscalationFrequencyChart data={escalationData} />
            <ResolutionPerformanceChart data={resolutionData} />
          </div>

          {/* Bottom Widgets */}
          <div className="grid md:grid-cols-2 gap-4">
            <TopBreachedServices services={topBreachedServices} />
            <LongestRunningIncidents incidents={longestRunningIncidents} />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
