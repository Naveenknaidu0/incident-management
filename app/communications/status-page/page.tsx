"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Home,
  Globe,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Wrench,
  Clock,
  ExternalLink,
  Plus,
  Settings,
  Eye,
} from "lucide-react"

const services = [
  { name: "API Gateway", status: "operational", uptime: "99.99%", lastIncident: "15 days ago" },
  { name: "Payment Processing", status: "degraded", uptime: "99.85%", lastIncident: "Active" },
  { name: "User Authentication", status: "operational", uptime: "99.97%", lastIncident: "3 days ago" },
  { name: "Database Cluster", status: "operational", uptime: "99.99%", lastIncident: "30 days ago" },
  { name: "CDN Edge Nodes", status: "maintenance", uptime: "99.95%", lastIncident: "Scheduled" },
  { name: "Email Service", status: "operational", uptime: "99.92%", lastIncident: "7 days ago" },
  { name: "Search Engine", status: "operational", uptime: "99.98%", lastIncident: "21 days ago" },
  { name: "File Storage", status: "operational", uptime: "99.99%", lastIncident: "45 days ago" },
]

const activeIncidents = [
  {
    id: "INC001",
    title: "Payment Processing Degradation",
    status: "investigating",
    impact: "minor",
    services: ["Payment Processing"],
    startedAt: "2 hours ago",
    updates: [
      { time: "5 min ago", message: "Engineering teams are investigating increased latency." },
      { time: "1 hour ago", message: "We are aware of degraded performance on payment processing." },
    ],
  },
]

const scheduledMaintenance = [
  {
    id: "MAINT001",
    title: "CDN Edge Node Updates",
    scheduledFor: "Tomorrow 02:00 UTC",
    duration: "2 hours",
    services: ["CDN Edge Nodes"],
    impact: "No customer impact expected",
  },
  {
    id: "MAINT002",
    title: "Database Cluster Upgrade",
    scheduledFor: "Sat 04:00 UTC",
    duration: "4 hours",
    services: ["Database Cluster"],
    impact: "Brief connection interruptions possible",
  },
]

const pastIncidents = [
  {
    id: "INC000",
    title: "API Gateway Outage",
    date: "May 5, 2024",
    duration: "45 minutes",
    impact: "major",
    resolved: true,
  },
  {
    id: "INC999",
    title: "Authentication Service Slowdown",
    date: "May 2, 2024",
    duration: "15 minutes",
    impact: "minor",
    resolved: true,
  },
]

const statusConfig = {
  operational: { label: "Operational", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  degraded: { label: "Degraded", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
  outage: { label: "Outage", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
  maintenance: { label: "Maintenance", icon: Wrench, color: "text-blue-600", bg: "bg-blue-50" },
}

export default function StatusPagePage() {
  const [activeTab, setActiveTab] = useState("current")

  const operationalCount = services.filter((s) => s.status === "operational").length
  const allOperational = operationalCount === services.length

  return (
    <AppShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Breadcrumb */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1">
                    <Home className="h-3.5 w-3.5" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/communications">Communications</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Status Page</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#0D3133]/10 p-2">
                <Globe className="h-5 w-5 text-[#0D3133]" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#0D3133]">Status Page Management</h1>
                <p className="text-sm text-muted-foreground">Manage your public status page (UI Preview Only)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                Preview
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Settings className="h-3.5 w-3.5" />
                Settings
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                View Public Page
              </Button>
            </div>
          </div>
        </div>

        {/* Overall Status */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className={`rounded-lg p-4 ${allOperational ? "bg-green-50" : "bg-amber-50"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {allOperational ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                )}
                <div>
                  <h2 className={`font-semibold ${allOperational ? "text-green-800" : "text-amber-800"}`}>
                    {allOperational ? "All Systems Operational" : "Some Systems Experiencing Issues"}
                  </h2>
                  <p className={`text-sm ${allOperational ? "text-green-700" : "text-amber-700"}`}>
                    {operationalCount} of {services.length} services operational
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="auto-publish" defaultChecked />
                  <Label htmlFor="auto-publish" className="text-sm">Auto-publish updates</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="sticky top-0 bg-card border-b border-border px-6">
              <TabsList className="h-10 bg-transparent p-0 gap-4">
                <TabsTrigger
                  value="current"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Current Status
                </TabsTrigger>
                <TabsTrigger
                  value="incidents"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Active Incidents
                  {activeIncidents.length > 0 && (
                    <Badge variant="destructive" className="ml-1.5">{activeIncidents.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="maintenance"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Scheduled Maintenance
                  <Badge variant="secondary" className="ml-1.5">{scheduledMaintenance.length}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  History
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="current" className="mt-0 p-6">
              <div className="space-y-3">
                {services.map((service) => {
                  const config = statusConfig[service.status as keyof typeof statusConfig]
                  const Icon = config.icon
                  return (
                    <Card key={service.name}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <div className={`rounded-lg p-2 ${config.bg}`}>
                            <Icon className={`h-4 w-4 ${config.color}`} />
                          </div>
                          <div>
                            <h4 className="font-medium text-[#0D3133]">{service.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {service.uptime} uptime • Last incident: {service.lastIncident}
                            </p>
                          </div>
                        </div>
                        <Badge className={`${config.bg} ${config.color} border-0`}>
                          {config.label}
                        </Badge>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="incidents" className="mt-0 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#0D3133]">Active Incidents</h3>
                <Button size="sm" className="gap-1.5 bg-[#0D3133] hover:bg-[#0D3133]/90">
                  <Plus className="h-3.5 w-3.5" />
                  Report Incident
                </Button>
              </div>
              {activeIncidents.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h4 className="font-medium text-[#0D3133]">No Active Incidents</h4>
                    <p className="text-sm text-muted-foreground mt-1">All systems are operating normally</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activeIncidents.map((incident) => (
                    <Card key={incident.id} className="border-amber-200">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-600" />
                              {incident.title}
                            </CardTitle>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                {incident.status}
                              </Badge>
                              <Badge variant="secondary">{incident.impact} impact</Badge>
                              <span className="text-xs text-muted-foreground">Started {incident.startedAt}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Update
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Affected:</span>
                            {incident.services.map((s) => (
                              <Badge key={s} variant="secondary">{s}</Badge>
                            ))}
                          </div>
                          <div className="border-l-2 border-amber-200 pl-4 space-y-3">
                            {incident.updates.map((update, i) => (
                              <div key={i}>
                                <p className="text-xs text-muted-foreground">{update.time}</p>
                                <p className="text-sm">{update.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="maintenance" className="mt-0 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#0D3133]">Scheduled Maintenance</h3>
                <Button size="sm" className="gap-1.5 bg-[#0D3133] hover:bg-[#0D3133]/90">
                  <Plus className="h-3.5 w-3.5" />
                  Schedule Maintenance
                </Button>
              </div>
              <div className="space-y-3">
                {scheduledMaintenance.map((maint) => (
                  <Card key={maint.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="rounded-lg bg-blue-50 p-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-[#0D3133]">{maint.title}</h4>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{maint.scheduledFor}</span>
                              <span>•</span>
                              <span>Duration: {maint.duration}</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              {maint.services.map((s) => (
                                <Badge key={s} variant="secondary">{s}</Badge>
                              ))}
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{maint.impact}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-0 p-6">
              <h3 className="font-semibold text-[#0D3133] mb-4">Past Incidents</h3>
              <div className="space-y-3">
                {pastIncidents.map((incident) => (
                  <Card key={incident.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-medium text-[#0D3133]">{incident.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {incident.date} • Duration: {incident.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{incident.impact}</Badge>
                        <Badge className="bg-green-50 text-green-700 border-0">Resolved</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}
