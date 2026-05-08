"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceHealthBadge } from "@/components/cmdb/service-health-badge"
import { EnvironmentBadge } from "@/components/cmdb/environment-badge"
import { DependencyGraph } from "@/components/cmdb/dependency-graph"
import { CMDBContextPanel } from "@/components/cmdb/cmdb-context-panel"
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  GitBranch,
  AlertCircle,
  Clock,
  Activity,
  TrendingUp,
  Building2,
  User,
  Calendar,
  Server,
  Database,
  FileText,
} from "lucide-react"

// Mock service data
const mockService = {
  id: "svc-003",
  name: "Order Processing",
  description: "Core order management and fulfillment service handling all customer orders, payment processing integration, and inventory synchronization.",
  status: "major-outage" as const,
  environment: "production" as const,
  uptime: "98.5%",
  owner: "Commerce Team",
  ownerContact: {
    name: "Sarah Chen",
    team: "Commerce Engineering",
    email: "sarah.chen@company.com",
    phone: "+1 555-0123",
  },
  escalationContacts: [
    { name: "Mike Johnson", role: "Team Lead" },
    { name: "Lisa Park", role: "Engineering Manager" },
    { name: "David Wilson", role: "VP Engineering" },
  ],
  createdAt: "2022-03-15",
  lastUpdated: "2024-01-15 14:32",
  regions: ["US-East", "US-West", "EU-West"],
  tier: "Tier 1",
  category: "Business Critical",
}

// Mock dependencies
const mockNodes = [
  { id: "svc-003", name: "Order Processing", type: "service" as const, status: "outage" as const, x: 300, y: 50 },
  { id: "dep-1", name: "Payment Gateway", type: "service" as const, status: "operational" as const, x: 150, y: 150 },
  { id: "dep-2", name: "Inventory API", type: "api" as const, status: "degraded" as const, x: 450, y: 150 },
  { id: "dep-3", name: "Orders DB", type: "database" as const, status: "outage" as const, x: 200, y: 250 },
  { id: "dep-4", name: "Redis Cache", type: "database" as const, status: "operational" as const, x: 400, y: 250 },
  { id: "dep-5", name: "Message Queue", type: "infrastructure" as const, status: "operational" as const, x: 300, y: 350 },
]

const mockEdges = [
  { source: "svc-003", target: "dep-1", type: "depends-on" as const },
  { source: "svc-003", target: "dep-2", type: "depends-on" as const },
  { source: "svc-003", target: "dep-3", type: "depends-on" as const },
  { source: "svc-003", target: "dep-4", type: "connected-to" as const },
  { source: "dep-3", target: "dep-5", type: "connected-to" as const },
]

// Mock incidents
const mockIncidents = [
  { id: "INC-2024-0847", title: "Order submission failures - 500 errors", priority: "critical" as const, status: "In Progress" },
  { id: "INC-2024-0845", title: "Delayed order confirmations", priority: "high" as const, status: "Investigating" },
  { id: "INC-2024-0842", title: "Inventory sync delays", priority: "medium" as const, status: "Pending" },
]

// Mock alerts
const mockDependencyAlerts = [
  { service: "Orders DB", status: "outage" as const, since: "47 min ago" },
  { service: "Inventory API", status: "degraded" as const, since: "1h 12m ago" },
]

export default function ServiceDetailPage() {
  const params = useParams()
  const [selectedNode, setSelectedNode] = useState<string>()

  return (
    <AppShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cmdb/services">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-[#0D3133]">
                  {mockService.name}
                </h1>
                <ServiceHealthBadge status={mockService.status} size="md" />
                <EnvironmentBadge environment={mockService.environment} />
                <Badge variant="outline">{mockService.tier}</Badge>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {mockService.category} &middot; {mockService.owner}
              </p>
            </div>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Service
            </Button>
          </div>
        </div>

        {/* Content with Sidebar */}
        <div className="flex flex-1 min-h-0">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6 p-6">
              {/* Quick Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="rounded-lg bg-green-50 p-3">
                      <Activity className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Uptime (30d)</p>
                      <p className="text-xl font-semibold text-[#0D3133]">{mockService.uptime}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="rounded-lg bg-red-50 p-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Active Incidents</p>
                      <p className="text-xl font-semibold text-[#0D3133]">{mockIncidents.length}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <GitBranch className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Dependencies</p>
                      <p className="text-xl font-semibold text-[#0D3133]">{mockNodes.length - 1}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="rounded-lg bg-amber-50 p-3">
                      <TrendingUp className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Regions</p>
                      <p className="text-xl font-semibold text-[#0D3133]">{mockService.regions.length}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
                  <TabsTrigger value="incidents">Incidents</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="changes">Changes</TabsTrigger>
                  <TabsTrigger value="audit">Audit Timeline</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Description */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-semibold">Description</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-sm text-muted-foreground">{mockService.description}</p>
                    </CardContent>
                  </Card>

                  {/* Service Metadata */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                          <Server className="h-4 w-4 text-[#E69F50]" />
                          Service Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 pb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Category</span>
                          <span className="text-sm font-medium">{mockService.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Service Tier</span>
                          <Badge variant="outline">{mockService.tier}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Environment</span>
                          <EnvironmentBadge environment={mockService.environment} />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Regions</span>
                          <div className="flex flex-wrap gap-1 justify-end">
                            {mockService.regions.map((r) => (
                              <Badge key={r} variant="secondary" className="text-xs">
                                {r}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                          <Calendar className="h-4 w-4 text-[#E69F50]" />
                          Metadata
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 pb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Created</span>
                          <span className="text-sm font-medium">{mockService.createdAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Last Updated</span>
                          <span className="text-sm font-medium">{mockService.lastUpdated}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Owner</span>
                          <span className="text-sm font-medium">{mockService.owner}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="dependencies" className="space-y-4">
                  <DependencyGraph
                    nodes={mockNodes}
                    edges={mockEdges}
                    selectedNodeId={selectedNode}
                    onNodeSelect={setSelectedNode}
                    className="h-[500px]"
                  />
                </TabsContent>

                <TabsContent value="incidents" className="space-y-3">
                  {mockIncidents.map((incident) => (
                    <Link
                      key={incident.id}
                      href={`/incidents/${incident.id}`}
                      className="group flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="font-medium text-[#0D3133] group-hover:text-[#E69F50]">
                            {incident.id}
                          </span>
                          <Badge
                            variant="secondary"
                            className={
                              incident.priority === "critical"
                                ? "bg-red-100 text-red-700"
                                : incident.priority === "high"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {incident.priority}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{incident.title}</p>
                      </div>
                      <Badge variant="outline">{incident.status}</Badge>
                    </Link>
                  ))}
                </TabsContent>

                <TabsContent value="metrics">
                  <Card className="py-12">
                    <CardContent className="flex flex-col items-center justify-center text-center">
                      <Activity className="h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-medium">Service Metrics</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Performance and availability metrics will appear here
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="changes">
                  <Card className="py-12">
                    <CardContent className="flex flex-col items-center justify-center text-center">
                      <FileText className="h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-medium">Change History</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Recent changes and deployments will appear here
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="audit">
                  <Card className="py-12">
                    <CardContent className="flex flex-col items-center justify-center text-center">
                      <Clock className="h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-medium">Audit Timeline</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Complete audit history will appear here
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Context Panel */}
          <div className="hidden w-[340px] shrink-0 border-l border-border bg-muted/10 lg:block">
            <div className="h-full overflow-y-auto p-4">
              <CMDBContextPanel
                relatedIncidents={mockIncidents}
                dependencyAlerts={mockDependencyAlerts}
                owner={mockService.ownerContact}
                escalationContacts={mockService.escalationContacts}
              />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
