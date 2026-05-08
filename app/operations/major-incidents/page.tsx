"use client"

import { AppShell } from "@/components/layout/app-shell"
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
} from "lucide-react"
import Link from "next/link"

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
  {
    id: "MIM0001230",
    title: "API Gateway Rate Limiting Issue",
    severity: "SEV-3" as const,
    status: "Resolved",
    duration: "32m",
    resolvedAt: "2 days ago",
    commander: { name: "Lisa Wong" },
  },
]

export default function MajorIncidentsPage() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Major Incident Management</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Command center for critical business-impacting incidents
              </p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Declare Major Incident
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-red-600 uppercase tracking-wide font-medium">Active SEV-1</p>
                    <p className="text-2xl font-bold text-red-700 mt-1">1</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-orange-600 uppercase tracking-wide font-medium">Active SEV-2</p>
                    <p className="text-2xl font-bold text-orange-700 mt-1">1</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">This Month</p>
                    <p className="text-2xl font-bold text-foreground mt-1">8</p>
                  </div>
                  <History className="h-8 w-8 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Avg Resolution</p>
                    <p className="text-2xl font-bold text-foreground mt-1">2h 15m</p>
                  </div>
                  <Clock className="h-8 w-8 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

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
                    href={`/major-incidents/${incident.id}`}
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

          {/* Recent Major Incidents */}
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
                    href={`/major-incidents/${incident.id}`}
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
