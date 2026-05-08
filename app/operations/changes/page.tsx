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
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  AlertCircle,
  Zap,
  Users,
  GitBranch,
  RotateCcw,
} from "lucide-react"

const kpis = [
  {
    title: "Active Changes",
    value: 24,
    change: { value: "+4 today", trend: "up" as const },
    icon: GitBranch,
    variant: "default" as const,
  },
  {
    title: "Emergency Changes",
    value: 3,
    change: { value: "All approved", trend: "down" as const },
    icon: AlertTriangle,
    variant: "critical" as const,
  },
  {
    title: "CAB Pending",
    value: 8,
    change: { value: "Meeting in 2h", trend: "neutral" as const },
    icon: Clock,
    variant: "warning" as const,
  },
  {
    title: "Scheduled",
    value: 15,
    change: { value: "This month", trend: "neutral" as const },
    icon: Calendar,
    variant: "default" as const,
  },
  {
    title: "Success Rate",
    value: "96.8%",
    change: { value: "+0.5%", trend: "up" as const },
    icon: CheckCircle,
    variant: "success" as const,
  },
  {
    title: "Rollback Events",
    value: 2,
    change: { value: "This month", trend: "down" as const },
    icon: RotateCcw,
    variant: "warning" as const,
  },
]

const recentChanges = [
  {
    id: "CHG0045231",
    title: "Database Migration to v14.2",
    status: "Implementing",
    risk: "high",
    scheduled: "Jan 22, 2024",
    cab: "Approved",
  },
  {
    id: "CHG0045230",
    title: "Payment Gateway API Update",
    status: "CAB Pending",
    risk: "medium",
    scheduled: "Jan 25, 2024",
    cab: "Pending Review",
  },
  {
    id: "CHG0045229",
    title: "Load Balancer Configuration Optimization",
    status: "Scheduled",
    risk: "low",
    scheduled: "Jan 28, 2024",
    cab: "Approved",
  },
]

const quickActions = [
  { icon: Plus, label: "Create Change", href: "#" },
  { icon: Clock, label: "Schedule", href: "#" },
  { icon: Users, label: "Open CAB", href: "#" },
  { icon: Zap, label: "Emergency", href: "#" },
  { icon: RotateCcw, label: "Trigger Rollback", href: "#" },
  { icon: Calendar, label: "Maintenance Window", href: "#" },
]

export default function ChangesDashboard() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Change Management</h1>
            <p className="text-sm text-muted-foreground">
              Enterprise change governance and deployment management
            </p>
          </div>
          <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Change
          </Button>
        </div>

        {/* KPI Row */}
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
                <CardTitle className="text-base">Recent Changes</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {recentChanges.map((change) => (
                    <div
                      key={change.id}
                      className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{change.id}</span>
                          <span className="text-sm font-medium">{change.title}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{change.scheduled}</span>
                          <Badge variant="outline" className="text-xs">{change.cab}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className="text-xs"
                          variant={
                            change.risk === "high"
                              ? "destructive"
                              : change.risk === "medium"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {change.risk} risk
                        </Badge>
                        <Badge variant="outline" className="text-xs">{change.status}</Badge>
                      </div>
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
