"use client"

import { AppShell } from "@/components/layout/app-shell"
import { KPICard } from "@/components/dashboard/kpi-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SeverityBadge } from "@/components/mim/severity-badge"
import { cn } from "@/lib/utils"
import {
  Plus,
  Clock,
  Server,
  Users,
  Globe,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  History,
  Phone,
  MessageSquare,
  Zap,
} from "lucide-react"
import Link from "next/link"

const kpis = [
  {
    title: "Active SEV-1",
    value: 1,
    change: { value: "In mitigation", trend: "neutral" as const },
    icon: AlertTriangle,
    variant: "critical" as const,
  },
  {
    title: "Active SEV-2",
    value: 1,
    change: { value: "Monitoring", trend: "neutral" as const },
    icon: AlertTriangle,
    variant: "warning" as const,
  },
  {
    title: "This Month",
    value: 8,
    change: { value: "-2 from last month", trend: "down" as const },
    icon: History,
    variant: "default" as const,
  },
  {
    title: "Avg Resolution",
    value: "2h 15m",
    change: { value: "-18min", trend: "down" as const },
    icon: Clock,
    variant: "success" as const,
  },
  {
    title: "Total MIMs",
    value: 47,
    change: { value: "This year", trend: "neutral" as const },
    icon: Zap,
    variant: "default" as const,
  },
  {
    title: "MTTR Trend",
    value: "Improving",
    change: { value: "+8.2%", trend: "up" as const },
    icon: TrendingUp,
    variant: "success" as const,
  },
]

const activeMajorIncidents = [
  {
    id: "MIM0001234",
    title: "Global Payment Processing Outage",
    severity: "SEV-1" as const,
    status: "Active - Mitigation",
    duration: "2h 47m",
    commander: { name: "Sarah Chen" },
    impactedServices: 12,
    affectedRegions: ["US-East", "EU-West", "APAC"],
    affectedUsers: 300000,
    recoveryProgress: 35,
    startTime: "14:32 UTC",
  },
  {
    id: "MIM0001233",
    title: "Authentication Service Degradation",
    severity: "SEV-2" as const,
    status: "Active - Monitoring",
    duration: "45m",
    commander: { name: "Mike Johnson" },
    impactedServices: 5,
    affectedRegions: ["US-West"],
    affectedUsers: 45000,
    recoveryProgress: 85,
    startTime: "16:45 UTC",
  },
]

const recentMajorIncidents = [
  {
    id: "MIM0001232",
    title: "Database Cluster Failover",
    severity: "SEV-1" as const,
    status: "Resolved",
    duration: "4h 12m",
    resolvedAt: "Today 10:22 UTC",
    commander: { name: "Emily Brown" },
  },
  {
    id: "MIM0001231",
    title: "CDN Edge Node Outage",
    severity: "SEV-2" as const,
    status: "Resolved",
    duration: "1h 45m",
    resolvedAt: "Yesterday 18:30 UTC",
    commander: { name: "David Park" },
  },
]

const quickActions = [
  { icon: Plus, label: "Declare Outage", href: "#" },
  { icon: Phone, label: "Start Bridge", href: "#" },
  { icon: MessageSquare, label: "Send Broadcast", href: "#" },
  { icon: AlertTriangle, label: "Executive Alert", href: "#" },
  { icon: Zap, label: "Start PIR", href: "#" },
  { icon: Users, label: "Command Team", href: "#" },
]

export default function MajorIncidentsPage() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Major Incident Management</h1>
            <p className="text-sm text-muted-foreground">
              Command center for critical business-impacting incidents
            </p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Declare Outage
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
        <div className="space-y-6">
          {/* Active Major Incidents */}
          <Card>
            <CardHeader className="py-4 px-5 border-b">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <div className="relative">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500 animate-ping" />
                </div>
                Active Major Incidents
                <Badge variant="destructive" className="ml-2">{activeMajorIncidents.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {activeMajorIncidents.map((incident) => (
                  <Link
                    key={incident.id}
                    href={`/operations/major-incidents/${incident.id}`}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <SeverityBadge severity={incident.severity} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{incident.id}</span>
                          <span className="font-medium">{incident.title}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {incident.duration}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Server className="h-3 w-3" />
                            {incident.impactedServices} services
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {incident.affectedRegions.join(", ")}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {incident.affectedUsers.toLocaleString()} users
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px] bg-[#0D3133] text-white">
                            {incident.commander.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{incident.commander.name}</span>
                      </div>
                      <div className="flex items-center gap-2 w-32">
                        <TrendingUp className="h-3.5 w-3.5 text-[#E69F50]" />
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#E69F50] rounded-full"
                            style={{ width: `${incident.recoveryProgress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{incident.recoveryProgress}%</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {incident.status}
                      </Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recently Resolved */}
          <Card>
            <CardHeader className="py-4 px-5 border-b">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Recently Resolved
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentMajorIncidents.map((incident) => (
                  <Link
                    key={incident.id}
                    href={`/operations/major-incidents/${incident.id}`}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <SeverityBadge severity={incident.severity} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{incident.id}</span>
                          <span className="font-medium">{incident.title}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Duration: {incident.duration}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Resolved: {incident.resolvedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px] bg-[#0D3133] text-white">
                            {incident.commander.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{incident.commander.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        {incident.status}
                      </Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
