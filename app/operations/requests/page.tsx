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
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  ShoppingCart,
  CheckCheck,
  AlertCircle,
  Users,
  Zap,
} from "lucide-react"

const kpis = [
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
    title: "Pending Approval",
    value: 12,
    change: { value: "2 urgent", trend: "up" as const },
    icon: CheckCircle,
    variant: "default" as const,
  },
  {
    title: "Fulfilled This Week",
    value: 38,
    change: { value: "+18%", trend: "up" as const },
    icon: CheckCheck,
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

const recentRequests = [
  {
    id: "REQ0089234",
    title: "Provision New Development Environment",
    status: "In Progress",
    priority: "high",
    created: "2h ago",
    assigned: "Platform Team",
  },
  {
    id: "REQ0089233",
    title: "Request Additional Database Storage",
    status: "Pending Approval",
    priority: "medium",
    created: "4h ago",
    assigned: "Manager Review",
  },
  {
    id: "REQ0089232",
    title: "Employee Laptop Procurement",
    status: "Fulfilled",
    priority: "low",
    created: "1 day ago",
    assigned: "Completed",
  },
]

const quickActions = [
  { icon: Plus, label: "Create Request", href: "#" },
  { icon: ShoppingCart, label: "Service Catalog", href: "#" },
  { icon: Users, label: "Assign Fulfillment", href: "#" },
  { icon: CheckCircle, label: "Approve Requests", href: "#" },
  { icon: AlertCircle, label: "View SLA Risks", href: "#" },
  { icon: Zap, label: "Quick Order", href: "#" },
]

export default function RequestsDashboard() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Service Requests</h1>
            <p className="text-sm text-muted-foreground">
              Monitor fulfillment operations and request approvals
            </p>
          </div>
          <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Request
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
                <CardTitle className="text-base">Recent Requests</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {recentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{request.id}</span>
                          <span className="text-sm font-medium">{request.title}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{request.created}</span>
                          <Badge variant="outline" className="text-xs">{request.assigned}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className="text-xs"
                          variant={
                            request.priority === "high"
                              ? "destructive"
                              : request.priority === "medium"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {request.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{request.status}</Badge>
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
