"use client"

import { AppShell } from "@/components/layout/app-shell"
import { KPICard } from "@/components/dashboard/kpi-card"
import { IncidentTrendChart } from "@/components/dashboard/incident-trend-chart"
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Plus,
  AlertTriangle,
  Bug,
  Wrench,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  Clock,
  Link2,
  Users,
  FileText,
} from "lucide-react"

const kpis = [
  {
    title: "Open Problems",
    value: 23,
    change: { value: "+5 this week", trend: "up" as const },
    icon: AlertTriangle,
    variant: "default" as const,
  },
  {
    title: "Known Errors",
    value: 12,
    change: { value: "3 with workarounds", trend: "neutral" as const },
    icon: Bug,
    variant: "warning" as const,
  },
  {
    title: "Permanent Fixes",
    value: 8,
    change: { value: "2 in progress", trend: "up" as const },
    icon: Wrench,
    variant: "success" as const,
  },
  {
    title: "RCA In Progress",
    value: 5,
    change: { value: "Avg 3.2 days", trend: "neutral" as const },
    icon: Clock,
    variant: "default" as const,
  },
  {
    title: "Recurring",
    value: 7,
    change: { value: "4 high frequency", trend: "up" as const },
    icon: TrendingUp,
    variant: "critical" as const,
  },
  {
    title: "Learning Records",
    value: 156,
    change: { value: "+12 this month", trend: "up" as const },
    icon: Lightbulb,
    variant: "default" as const,
  },
]

const recentProblems = [
  {
    id: "PRB0001847",
    title: "Database Connection Pool Exhaustion During Peak Hours",
    status: "RCA In Progress",
    incidents: 34,
    created: "3 days ago",
    owner: "Database Team",
  },
  {
    id: "PRB0001846",
    title: "Authentication Service Memory Leak",
    status: "Known Error",
    incidents: 18,
    created: "1 week ago",
    owner: "Platform Team",
  },
  {
    id: "PRB0001845",
    title: "Payment Gateway Timeout Under Load",
    status: "Permanent Fix",
    incidents: 42,
    created: "2 weeks ago",
    owner: "Payment Team",
  },
]

const quickActions = [
  { icon: Plus, label: "Create Problem", href: "#" },
  { icon: Bug, label: "Add Known Error", href: "#" },
  { icon: Link2, label: "Link Incident", href: "#" },
  { icon: Wrench, label: "Permanent Fix", href: "#" },
  { icon: FileText, label: "Start RCA", href: "#" },
  { icon: Users, label: "Assign Owner", href: "#" },
]

export default function ProblemManagementPage() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Problem Management</h1>
            <p className="text-sm text-muted-foreground">
              Root cause analysis, known errors, and permanent fixes
            </p>
          </div>
          <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Problem
          </Button>
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
                <CardTitle className="text-base">Recent Problems</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {recentProblems.map((problem) => (
                    <div
                      key={problem.id}
                      className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{problem.id}</span>
                          <span className="text-sm font-medium">{problem.title}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{problem.created}</span>
                          <Badge variant="outline" className="text-xs">{problem.incidents} incidents</Badge>
                        </div>
                      </div>
                      <Badge
                        className="text-xs"
                        variant={
                          problem.status === "Permanent Fix"
                            ? "secondary"
                            : problem.status === "Known Error"
                            ? "outline"
                            : "default"
                        }
                      >
                        {problem.status}
                      </Badge>
                    </div>
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
