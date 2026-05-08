"use client"

import { AppShell } from "@/components/layout/app-shell"
import { KPICard } from "@/components/dashboard/kpi-card"
import { IncidentTrendChart } from "@/components/dashboard/incident-trend-chart"
import { IncidentTable } from "@/components/dashboard/incident-table"
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Plus,
  AlertCircle,
  AlertTriangle,
  Clock,
  TrendingDown,
  CheckCircle,
  ArrowUpRight,
  Eye,
  Star,
  Activity,
  Phone,
  Users,
  Zap,
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
    title: "Critical",
    value: 5,
    change: { value: "+2 today", trend: "up" as const },
    icon: AlertTriangle,
    variant: "critical" as const,
  },
  {
    title: "SLA Breaches",
    value: 3,
    change: { value: "-1 today", trend: "down" as const },
    icon: Clock,
    variant: "warning" as const,
  },
  {
    title: "MTTR",
    value: "2h 14m",
    change: { value: "-12m", trend: "down" as const },
    icon: TrendingDown,
    variant: "success" as const,
  },
  {
    title: "VIP",
    value: 3,
    change: { value: "0 critical", trend: "neutral" as const },
    icon: Star,
    variant: "default" as const,
  },
  {
    title: "Resolution Rate",
    value: "94.2%",
    change: { value: "+1.3%", trend: "up" as const },
    icon: CheckCircle,
    variant: "success" as const,
  },
]

const recentIncidents = [
  {
    id: "INC0042789",
    title: "Payment Processing Timeout",
    status: "In Progress",
    severity: "critical",
    created: "2h ago",
    assigned: "Sarah Chen",
  },
  {
    id: "INC0042788",
    title: "Database Connection Pool Exhausted",
    status: "Open",
    severity: "high",
    created: "3h ago",
    assigned: "Unassigned",
  },
  {
    id: "INC0042787",
    title: "API Rate Limiting Triggered",
    status: "Resolved",
    severity: "medium",
    created: "5h ago",
    assigned: "Mike Johnson",
  },
]

const quickActions = [
  { icon: Plus, label: "Create Incident", href: "/operations/incidents/create" },
  { icon: AlertTriangle, label: "Escalate", href: "#" },
  { icon: Phone, label: "Major Incident", href: "/operations/major-incidents" },
  { icon: Users, label: "Assign Queue", href: "#" },
  { icon: Zap, label: "Create Problem", href: "/operations/problems" },
  { icon: Activity, label: "Create Change", href: "/operations/changes" },
]

export default function IncidentsLandingPage() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Incident Management</h1>
            <p className="text-sm text-muted-foreground">
              Real-time incident operations and resolution management
            </p>
          </div>
          <Link href="/operations/incidents/create">
            <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Incident
            </Button>
          </Link>
        </div>

        {/* KPI Strip */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {kpis.map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href}>
              <Button
                variant="outline"
                className="w-full justify-start text-xs h-9"
              >
                <action.icon className="h-3.5 w-3.5 mr-1.5" />
                {action.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            <IncidentTrendChart />
            <Card>
              <CardHeader className="py-4 px-5 border-b">
                <CardTitle className="text-base">Recent Incidents</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {recentIncidents.map((incident) => (
                    <Link
                      key={incident.id}
                      href={`/operations/incidents/all`}
                      className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{incident.id}</span>
                          <span className="text-sm font-medium">{incident.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{incident.created}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{incident.status}</Badge>
                        <Badge
                          className="text-xs"
                          variant={
                            incident.severity === "critical"
                              ? "destructive"
                              : incident.severity === "high"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {incident.severity}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <AIInsightsPanel />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
