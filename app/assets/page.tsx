"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CMDBKPIStrip } from "@/components/cmdb/cmdb-kpi-strip"
import { CMDBFilterBar } from "@/components/cmdb/cmdb-filter-bar"
import { ServiceHealthGrid } from "@/components/cmdb/service-health-grid"
import { ServiceCard } from "@/components/cmdb/service-card"
import { DependencyGraph } from "@/components/cmdb/dependency-graph"
import { OutageImpactPanel } from "@/components/cmdb/outage-impact-panel"
import { 
  Server, 
  Globe, 
  Database, 
  Cloud, 
  AlertCircle,
  ArrowRight,
  Activity
} from "lucide-react"
import Link from "next/link"

// Mock data for service health
const mockServiceHealth = [
  { id: "1", name: "Payment Gateway", status: "operational" as const, uptime: "99.98%", activeIncidents: 0, trend: "stable" as const },
  { id: "2", name: "User Authentication", status: "degraded" as const, uptime: "99.85%", activeIncidents: 1, trend: "down" as const },
  { id: "3", name: "Order Processing", status: "major-outage" as const, uptime: "98.50%", activeIncidents: 3, trend: "down" as const },
  { id: "4", name: "Inventory Service", status: "operational" as const, uptime: "99.99%", activeIncidents: 0, trend: "up" as const },
  { id: "5", name: "Notification Hub", status: "partial-outage" as const, uptime: "99.20%", activeIncidents: 2, trend: "down" as const },
  { id: "6", name: "Analytics Engine", status: "operational" as const, uptime: "99.95%", activeIncidents: 0, trend: "stable" as const },
]

// Mock services
const mockServices = [
  { id: "1", name: "Payment Gateway", owner: "Payments Team", status: "operational" as const, environment: "production" as const, dependencyCount: 12, activeIncidents: 0 },
  { id: "2", name: "User Authentication", owner: "Identity Team", status: "degraded" as const, environment: "production" as const, dependencyCount: 8, activeIncidents: 1 },
  { id: "3", name: "Order Processing", owner: "Commerce Team", status: "major-outage" as const, environment: "production" as const, dependencyCount: 15, activeIncidents: 3 },
  { id: "4", name: "Inventory Service", owner: "Supply Chain", status: "operational" as const, environment: "production" as const, dependencyCount: 6, activeIncidents: 0 },
  { id: "5", name: "Customer Portal", owner: "Frontend Team", status: "operational" as const, environment: "production" as const, dependencyCount: 10, activeIncidents: 0 },
  { id: "6", name: "Email Service", owner: "Communications", status: "maintenance" as const, environment: "staging" as const, dependencyCount: 3, activeIncidents: 0 },
]

// Mock graph nodes
const mockNodes = [
  { id: "1", name: "Order API", type: "api" as const, status: "outage" as const, x: 300, y: 80 },
  { id: "2", name: "Payment", type: "service" as const, status: "operational" as const, x: 150, y: 180 },
  { id: "3", name: "Inventory", type: "service" as const, status: "degraded" as const, x: 450, y: 180 },
  { id: "4", name: "Orders DB", type: "database" as const, status: "outage" as const, x: 300, y: 280 },
  { id: "5", name: "Cache", type: "infrastructure" as const, status: "operational" as const, x: 150, y: 320 },
  { id: "6", name: "Cloud Storage", type: "cloud" as const, status: "operational" as const, x: 450, y: 320 },
]

const mockEdges = [
  { source: "1", target: "2", type: "depends-on" as const },
  { source: "1", target: "3", type: "depends-on" as const },
  { source: "1", target: "4", type: "depends-on" as const },
  { source: "2", target: "5", type: "connected-to" as const },
  { source: "3", target: "6", type: "hosted-on" as const },
]

// Mock outage data
const mockOutage = {
  rootCause: "Database cluster failure - Orders DB primary node unresponsive",
  duration: "47 min",
  impactedServices: [
    { id: "1", name: "Order Processing", status: "major-outage" as const, impactLevel: "direct" as const },
    { id: "2", name: "Order API", status: "major-outage" as const, impactLevel: "direct" as const },
    { id: "3", name: "Inventory Service", status: "degraded" as const, impactLevel: "indirect" as const },
    { id: "4", name: "Customer Portal", status: "degraded" as const, impactLevel: "indirect" as const },
  ],
  affectedUsers: 12500,
  affectedRegions: ["US-East", "US-West", "EU-West"],
  estimatedRevenueLoss: "$125,000/hr",
  affectedBusinessUnits: ["E-Commerce", "Customer Support", "Fulfillment"],
}

export default function CMDBPage() {
  const [selectedNode, setSelectedNode] = useState<string>()

  return (
    <AppShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#0D3133]">
                CMDB & Service Impact
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Configuration management and service dependency visualization
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/cmdb/ci">
                  <Server className="mr-2 h-4 w-4" />
                  CI Explorer
                </Link>
              </Button>
              <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90" asChild>
                <Link href="/cmdb/services">
                  <Globe className="mr-2 h-4 w-4" />
                  Service Catalog
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-6">
            {/* KPI Strip */}
            <CMDBKPIStrip />

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
                <TabsTrigger value="outages">Active Outages</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Active Outage Alert */}
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    {/* Service Health */}
                    <ServiceHealthGrid services={mockServiceHealth} />
                  </div>
                  <div>
                    <OutageImpactPanel {...mockOutage} />
                  </div>
                </div>

                {/* Dependency Graph */}
                <DependencyGraph
                  nodes={mockNodes}
                  edges={mockEdges}
                  selectedNodeId={selectedNode}
                  onNodeSelect={setSelectedNode}
                />

                {/* Quick Links */}
                <div className="grid gap-4 md:grid-cols-4">
                  <Link href="/cmdb/services">
                    <Card className="group cursor-pointer transition-all hover:border-[#E69F50]/50 hover:shadow-md">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-lg bg-blue-50 p-3">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#0D3133] group-hover:text-[#E69F50]">
                            Service Catalog
                          </p>
                          <p className="text-sm text-muted-foreground">284 services</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/cmdb/ci">
                    <Card className="group cursor-pointer transition-all hover:border-[#E69F50]/50 hover:shadow-md">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-lg bg-purple-50 p-3">
                          <Server className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#0D3133] group-hover:text-[#E69F50]">
                            Configuration Items
                          </p>
                          <p className="text-sm text-muted-foreground">1,847 CIs</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/cmdb/dependencies">
                    <Card className="group cursor-pointer transition-all hover:border-[#E69F50]/50 hover:shadow-md">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-lg bg-green-50 p-3">
                          <Database className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#0D3133] group-hover:text-[#E69F50]">
                            Dependencies
                          </p>
                          <p className="text-sm text-muted-foreground">3,421 mapped</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/cmdb/impact">
                    <Card className="group cursor-pointer transition-all hover:border-[#E69F50]/50 hover:shadow-md">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-lg bg-amber-50 p-3">
                          <Activity className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#0D3133] group-hover:text-[#E69F50]">
                            Impact Analysis
                          </p>
                          <p className="text-sm text-muted-foreground">Real-time view</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="services" className="space-y-4">
                <CMDBFilterBar />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {mockServices.map((service) => (
                    <ServiceCard key={service.id} {...service} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="dependencies" className="space-y-4">
                <CMDBFilterBar />
                <DependencyGraph
                  nodes={mockNodes}
                  edges={mockEdges}
                  selectedNodeId={selectedNode}
                  onNodeSelect={setSelectedNode}
                  className="h-[600px]"
                />
              </TabsContent>

              <TabsContent value="outages" className="space-y-4">
                <div className="grid gap-6 lg:grid-cols-2">
                  <OutageImpactPanel {...mockOutage} />
                  <Card>
                    <CardHeader className="border-b bg-muted/30 py-3">
                      <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        Recent Outages
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 p-4">
                      {[
                        { id: "OUT-001", service: "Order Processing", duration: "47 min", status: "Active" },
                        { id: "OUT-002", service: "Email Gateway", duration: "2h 15m", status: "Resolved" },
                        { id: "OUT-003", service: "CDN Edge", duration: "35 min", status: "Resolved" },
                      ].map((outage) => (
                        <div
                          key={outage.id}
                          className="flex items-center justify-between rounded-lg border px-4 py-3"
                        >
                          <div>
                            <p className="font-medium">{outage.service}</p>
                            <p className="text-xs text-muted-foreground">
                              {outage.id} &middot; Duration: {outage.duration}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              outage.status === "Active"
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {outage.status}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
