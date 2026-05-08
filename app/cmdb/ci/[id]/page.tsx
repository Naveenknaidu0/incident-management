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
import { CITypeBadge } from "@/components/cmdb/ci-type-badge"
import { DependencyGraph } from "@/components/cmdb/dependency-graph"
import {
  ArrowLeft,
  Edit,
  GitBranch,
  AlertCircle,
  Clock,
  User,
  Calendar,
  Server,
  FileText,
  Activity,
  ExternalLink,
} from "lucide-react"

// Mock CI data
const mockCI = {
  id: "ci-002",
  name: "orders-db-primary",
  type: "database" as const,
  environment: "production" as const,
  status: "major-outage" as const,
  owner: "DBA Team",
  ownerContact: "dba-team@company.com",
  description: "Primary PostgreSQL database cluster for order management system. Handles all order transactions, inventory updates, and customer data.",
  lastUpdated: "47 min ago",
  createdAt: "2022-01-15",
  version: "PostgreSQL 15.2",
  location: "us-east-1",
  notes: "Critical infrastructure component. Any changes require CAB approval. Maintenance window: Sundays 02:00-06:00 UTC.",
}

// Mock relationships
const mockRelationships = [
  { id: "svc-003", name: "Order Processing", type: "Service", relationship: "Backs" },
  { id: "ci-003", name: "payment-api", type: "API", relationship: "Connected To" },
  { id: "ci-007", name: "k8s-node-pool-a", type: "Container", relationship: "Hosted On" },
  { id: "ci-010", name: "redis-cache-cluster", type: "Database", relationship: "Replicated To" },
  { id: "ci-011", name: "orders-db-replica", type: "Database", relationship: "Replicated To" },
]

// Mock incidents
const mockIncidents = [
  { id: "INC-2024-0847", title: "Database cluster failure - primary node unresponsive", priority: "critical", status: "In Progress" },
  { id: "INC-2024-0845", title: "Connection pool exhaustion", priority: "high", status: "Investigating" },
  { id: "INC-2024-0842", title: "Replication lag exceeding threshold", priority: "medium", status: "Pending" },
]

// Mock graph
const mockNodes = [
  { id: "ci-002", name: "orders-db-primary", type: "database" as const, status: "outage" as const, x: 300, y: 50 },
  { id: "svc-003", name: "Order Processing", type: "service" as const, status: "outage" as const, x: 150, y: 150 },
  { id: "ci-003", name: "payment-api", type: "api" as const, status: "operational" as const, x: 450, y: 150 },
  { id: "ci-010", name: "redis-cache", type: "database" as const, status: "operational" as const, x: 200, y: 250 },
  { id: "ci-011", name: "orders-db-replica", type: "database" as const, status: "degraded" as const, x: 400, y: 250 },
]

const mockEdges = [
  { source: "svc-003", target: "ci-002", type: "depends-on" as const },
  { source: "ci-003", target: "ci-002", type: "connected-to" as const },
  { source: "ci-002", target: "ci-010", type: "connected-to" as const },
  { source: "ci-002", target: "ci-011", type: "connected-to" as const },
]

// Mock audit log
const mockAuditLog = [
  { timestamp: "2024-01-15 14:32", action: "Status Changed", details: "Status changed from Operational to Major Outage", user: "System" },
  { timestamp: "2024-01-15 13:45", action: "Incident Linked", details: "Linked to INC-2024-0847", user: "System" },
  { timestamp: "2024-01-14 09:00", action: "Configuration Updated", details: "Connection pool size increased from 100 to 150", user: "John Smith" },
  { timestamp: "2024-01-10 16:20", action: "Maintenance Completed", details: "PostgreSQL version upgraded to 15.2", user: "Sarah Chen" },
]

export default function CIDetailPage() {
  const params = useParams()
  const [selectedNode, setSelectedNode] = useState<string>()

  return (
    <AppShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cmdb/ci">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-[#0D3133]">
                  {mockCI.name}
                </h1>
                <CITypeBadge type={mockCI.type} />
                <EnvironmentBadge environment={mockCI.environment} />
                <ServiceHealthBadge status={mockCI.status} />
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {mockCI.version} &middot; {mockCI.location} &middot; {mockCI.owner}
              </p>
            </div>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit CI
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-6">
            {/* Quick Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <GitBranch className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Relationships</p>
                    <p className="text-xl font-semibold text-[#0D3133]">{mockRelationships.length}</p>
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
                  <div className="rounded-lg bg-green-50 p-3">
                    <Server className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Related Services</p>
                    <p className="text-xl font-semibold text-[#0D3133]">12</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="rounded-lg bg-amber-50 p-3">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Updated</p>
                    <p className="text-xl font-semibold text-[#0D3133]">{mockCI.lastUpdated}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="relationships">Relationships</TabsTrigger>
                <TabsTrigger value="incidents">Incidents</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="audit">Audit Log</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Description */}
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-semibold">Description</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm text-muted-foreground">{mockCI.description}</p>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* CI Details */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                        <Server className="h-4 w-4 text-[#E69F50]" />
                        Configuration Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Type</span>
                        <CITypeBadge type={mockCI.type} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Environment</span>
                        <EnvironmentBadge environment={mockCI.environment} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Version</span>
                        <span className="text-sm font-medium">{mockCI.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Location</span>
                        <span className="text-sm font-medium">{mockCI.location}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Ownership */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                        <User className="h-4 w-4 text-[#E69F50]" />
                        Ownership
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Owner</span>
                        <span className="text-sm font-medium">{mockCI.owner}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Contact</span>
                        <a href={`mailto:${mockCI.ownerContact}`} className="text-sm text-[#E69F50] hover:underline">
                          {mockCI.ownerContact}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Created</span>
                        <span className="text-sm font-medium">{mockCI.createdAt}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Operational Notes */}
                {mockCI.notes && (
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                        <FileText className="h-4 w-4 text-[#E69F50]" />
                        Operational Notes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-sm text-muted-foreground">{mockCI.notes}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="relationships" className="space-y-4">
                <DependencyGraph
                  nodes={mockNodes}
                  edges={mockEdges}
                  selectedNodeId={selectedNode}
                  onNodeSelect={setSelectedNode}
                  className="h-[400px]"
                />

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-semibold">All Relationships</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 pb-4">
                    {mockRelationships.map((rel) => (
                      <Link
                        key={rel.id}
                        href={rel.type === "Service" ? `/cmdb/services/${rel.id}` : `/cmdb/ci/${rel.id}`}
                        className="group flex items-center justify-between rounded-lg border px-4 py-3 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <GitBranch className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-[#0D3133] group-hover:text-[#E69F50]">{rel.name}</p>
                            <p className="text-xs text-muted-foreground">{rel.type}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{rel.relationship}</Badge>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
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
                    <h3 className="mt-4 text-lg font-medium">CI Metrics</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Performance and health metrics will appear here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audit" className="space-y-3">
                {mockAuditLog.map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 rounded-lg border bg-card p-4"
                  >
                    <div className="mt-0.5 rounded-full bg-muted p-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-[#0D3133]">{entry.action}</p>
                        <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{entry.details}</p>
                      <p className="mt-1 text-xs text-muted-foreground">By: {entry.user}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
