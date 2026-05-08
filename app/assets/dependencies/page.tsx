"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CMDBFilterBar } from "@/components/cmdb/cmdb-filter-bar"
import { DependencyGraph } from "@/components/cmdb/dependency-graph"
import { ServiceHealthBadge } from "@/components/cmdb/service-health-badge"
import {
  GitBranch,
  Plus,
  Download,
  ArrowRight,
  AlertTriangle,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

// Mock dependency statistics
const stats = {
  totalDependencies: 3421,
  criticalPaths: 47,
  circularDependencies: 3,
  orphanedServices: 12,
}

// Mock critical dependency paths
const criticalPaths = [
  { 
    id: "path-1",
    name: "Order Processing Chain",
    services: ["Customer Portal", "Order API", "Payment Gateway", "Orders DB"],
    status: "at-risk",
    lastImpact: "2 days ago"
  },
  { 
    id: "path-2",
    name: "Authentication Flow",
    services: ["Login Service", "User Auth", "Session Store", "User DB"],
    status: "healthy",
    lastImpact: "2 weeks ago"
  },
  { 
    id: "path-3",
    name: "Inventory Sync",
    services: ["Inventory API", "Stock Service", "Warehouse DB", "ERP Integration"],
    status: "degraded",
    lastImpact: "4 hours ago"
  },
]

// Mock dependency alerts
const dependencyAlerts = [
  { source: "Order API", target: "Orders DB", issue: "Connection failures", severity: "critical" },
  { source: "Inventory Service", target: "Cache Cluster", issue: "High latency", severity: "warning" },
  { source: "Payment Gateway", target: "External API", issue: "Rate limiting", severity: "warning" },
]

// Mock graph data
const mockNodes = [
  { id: "1", name: "Customer Portal", type: "application" as const, status: "operational" as const, x: 300, y: 50 },
  { id: "2", name: "Order API", type: "api" as const, status: "degraded" as const, x: 150, y: 150 },
  { id: "3", name: "Payment Gateway", type: "service" as const, status: "operational" as const, x: 450, y: 150 },
  { id: "4", name: "Inventory API", type: "api" as const, status: "operational" as const, x: 100, y: 280 },
  { id: "5", name: "Orders DB", type: "database" as const, status: "outage" as const, x: 300, y: 280 },
  { id: "6", name: "User Auth", type: "service" as const, status: "operational" as const, x: 500, y: 280 },
  { id: "7", name: "Cache Cluster", type: "infrastructure" as const, status: "operational" as const, x: 200, y: 380 },
  { id: "8", name: "Message Queue", type: "infrastructure" as const, status: "operational" as const, x: 400, y: 380 },
]

const mockEdges = [
  { source: "1", target: "2", type: "depends-on" as const },
  { source: "1", target: "3", type: "depends-on" as const },
  { source: "1", target: "6", type: "depends-on" as const },
  { source: "2", target: "4", type: "depends-on" as const },
  { source: "2", target: "5", type: "depends-on" as const },
  { source: "3", target: "5", type: "connected-to" as const },
  { source: "4", target: "7", type: "connected-to" as const },
  { source: "5", target: "8", type: "connected-to" as const },
]

export default function DependenciesPage() {
  const [selectedNode, setSelectedNode] = useState<string>()

  return (
    <AppShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href="/cmdb"
                  className="text-sm text-muted-foreground hover:text-[#E69F50]"
                >
                  CMDB
                </Link>
                <span className="text-muted-foreground">/</span>
                <h1 className="text-xl font-semibold text-[#0D3133]">
                  Dependency Mapping
                </h1>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Service topology and dependency visualization
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Dependency
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-6">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <GitBranch className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Dependencies</p>
                    <p className="text-2xl font-semibold text-[#0D3133]">
                      {stats.totalDependencies.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="rounded-lg bg-amber-50 p-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Critical Paths</p>
                    <p className="text-2xl font-semibold text-[#0D3133]">{stats.criticalPaths}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="rounded-lg bg-red-50 p-3">
                    <RefreshCw className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Circular Dependencies</p>
                    <p className="text-2xl font-semibold text-[#0D3133]">{stats.circularDependencies}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="rounded-lg bg-slate-100 p-3">
                    <GitBranch className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Orphaned Services</p>
                    <p className="text-2xl font-semibold text-[#0D3133]">{stats.orphanedServices}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dependency Alerts */}
            {dependencyAlerts.length > 0 && (
              <Card className="border-l-4 border-l-amber-500">
                <CardHeader className="py-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                    <AlertTriangle className="h-4 w-4" />
                    Dependency Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-2">
                    {dependencyAlerts.map((alert, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-2"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{alert.source}</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{alert.target}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{alert.issue}</span>
                          <Badge
                            variant="secondary"
                            className={
                              alert.severity === "critical"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                            }
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Filters */}
            <CMDBFilterBar />

            {/* Dependency Graph */}
            <DependencyGraph
              nodes={mockNodes}
              edges={mockEdges}
              selectedNodeId={selectedNode}
              onNodeSelect={setSelectedNode}
              className="h-[500px]"
            />

            {/* Critical Paths */}
            <Card>
              <CardHeader className="border-b bg-muted/30 py-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <GitBranch className="h-4 w-4 text-[#E69F50]" />
                  Critical Dependency Paths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                {criticalPaths.map((path) => (
                  <div
                    key={path.id}
                    className="rounded-lg border p-4 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium text-[#0D3133]">{path.name}</h4>
                        <ServiceHealthBadge
                          status={
                            path.status === "healthy"
                              ? "operational"
                              : path.status === "degraded"
                              ? "degraded"
                              : "partial-outage"
                          }
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Last impact: {path.lastImpact}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {path.services.map((service, idx) => (
                        <div key={service} className="flex items-center gap-2">
                          <Badge variant="outline">{service}</Badge>
                          {idx < path.services.length - 1 && (
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
