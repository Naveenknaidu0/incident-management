"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OutageImpactPanel } from "@/components/cmdb/outage-impact-panel"
import { DependencyGraph } from "@/components/cmdb/dependency-graph"
import { ServiceHealthBadge } from "@/components/cmdb/service-health-badge"
import {
  AlertTriangle,
  Play,
  RefreshCw,
  TrendingDown,
  Users,
  DollarSign,
  Building2,
  Zap,
} from "lucide-react"
import Link from "next/link"

// Mock services for simulation
const mockServices = [
  { id: "svc-001", name: "Payment Gateway" },
  { id: "svc-002", name: "User Authentication" },
  { id: "svc-003", name: "Order Processing" },
  { id: "svc-004", name: "Inventory Service" },
  { id: "svc-005", name: "Customer Portal" },
  { id: "svc-006", name: "Email Service" },
]

// Mock impact simulation result
const mockImpactResult = {
  rootCause: "Simulated outage: Orders Database Primary",
  duration: "Estimated 2h",
  impactedServices: [
    { id: "1", name: "Order Processing", status: "major-outage" as const, impactLevel: "direct" as const },
    { id: "2", name: "Order API", status: "major-outage" as const, impactLevel: "direct" as const },
    { id: "3", name: "Customer Portal", status: "partial-outage" as const, impactLevel: "indirect" as const },
    { id: "4", name: "Inventory Service", status: "degraded" as const, impactLevel: "indirect" as const },
    { id: "5", name: "Analytics Dashboard", status: "degraded" as const, impactLevel: "indirect" as const },
  ],
  affectedUsers: 45000,
  affectedRegions: ["US-East", "US-West", "EU-West", "APAC"],
  estimatedRevenueLoss: "$380,000/hr",
  affectedBusinessUnits: ["E-Commerce", "Customer Support", "Fulfillment", "Finance"],
}

// Mock graph for impact visualization
const mockNodes = [
  { id: "root", name: "Orders DB", type: "database" as const, status: "outage" as const, x: 300, y: 50 },
  { id: "1", name: "Order Processing", type: "service" as const, status: "outage" as const, x: 200, y: 150 },
  { id: "2", name: "Order API", type: "api" as const, status: "outage" as const, x: 400, y: 150 },
  { id: "3", name: "Customer Portal", type: "application" as const, status: "degraded" as const, x: 100, y: 260 },
  { id: "4", name: "Inventory", type: "service" as const, status: "degraded" as const, x: 300, y: 260 },
  { id: "5", name: "Analytics", type: "service" as const, status: "degraded" as const, x: 500, y: 260 },
  { id: "6", name: "Mobile App", type: "application" as const, status: "operational" as const, x: 150, y: 360 },
  { id: "7", name: "Reporting", type: "service" as const, status: "operational" as const, x: 450, y: 360 },
]

const mockEdges = [
  { source: "1", target: "root", type: "depends-on" as const },
  { source: "2", target: "root", type: "depends-on" as const },
  { source: "3", target: "1", type: "depends-on" as const },
  { source: "4", target: "1", type: "depends-on" as const },
  { source: "5", target: "2", type: "depends-on" as const },
  { source: "6", target: "3", type: "connected-to" as const },
  { source: "7", target: "5", type: "connected-to" as const },
]

// Active outages
const activeOutages = [
  {
    id: "OUT-001",
    service: "Order Processing",
    status: "major-outage",
    duration: "47 min",
    impactedServices: 5,
    affectedUsers: 12500,
  },
]

export default function ImpactAnalysisPage() {
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedNode, setSelectedNode] = useState<string>()
  const [showSimulation, setShowSimulation] = useState(false)

  const handleRunSimulation = () => {
    if (selectedService) {
      setShowSimulation(true)
    }
  }

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
                  Business Impact Analysis
                </h1>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Analyze and simulate service outage impact
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-6">
            {/* Active Outages Alert */}
            {activeOutages.length > 0 && (
              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold text-red-800">
                      <Zap className="h-4 w-4" />
                      Active Outages
                    </CardTitle>
                    <Badge variant="destructive" className="animate-pulse">
                      {activeOutages.length} Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  {activeOutages.map((outage) => (
                    <div
                      key={outage.id}
                      className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium text-red-800">{outage.service}</p>
                          <p className="text-sm text-red-700">
                            Duration: {outage.duration} &middot; {outage.impactedServices} services impacted
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm text-red-700">{outage.affectedUsers.toLocaleString()} users affected</p>
                        </div>
                        <Button variant="destructive" size="sm" asChild>
                          <Link href={`/cmdb?outage=${outage.id}`}>View Impact</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Impact Simulation */}
            <Card>
              <CardHeader className="border-b bg-muted/30 py-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <AlertTriangle className="h-4 w-4 text-[#E69F50]" />
                  Impact Simulation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-end gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="service" className="text-sm">
                      Select Service or CI
                    </Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Choose a service to simulate outage..." />
                      </SelectTrigger>
                      <SelectContent>
                        {mockServices.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-[150px]">
                    <Label htmlFor="outageType" className="text-sm">
                      Outage Type
                    </Label>
                    <Select defaultValue="full">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Outage</SelectItem>
                        <SelectItem value="partial">Partial Outage</SelectItem>
                        <SelectItem value="degraded">Degraded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={handleRunSimulation}
                    disabled={!selectedService}
                    className="bg-[#0D3133] hover:bg-[#0D3133]/90"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Run Simulation
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Simulation Results */}
            {showSimulation && (
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  {/* Impact Summary */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-lg bg-red-50 p-3">
                          <TrendingDown className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Impacted Services</p>
                          <p className="text-xl font-semibold text-[#0D3133]">
                            {mockImpactResult.impactedServices.length}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-lg bg-amber-50 p-3">
                          <Users className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Affected Users</p>
                          <p className="text-xl font-semibold text-[#0D3133]">
                            {mockImpactResult.affectedUsers.toLocaleString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-lg bg-purple-50 p-3">
                          <Building2 className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Business Units</p>
                          <p className="text-xl font-semibold text-[#0D3133]">
                            {mockImpactResult.affectedBusinessUnits.length}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-red-500">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-lg bg-red-50 p-3">
                          <DollarSign className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Revenue Impact</p>
                          <p className="text-lg font-semibold text-red-700">
                            {mockImpactResult.estimatedRevenueLoss}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Impact Visualization */}
                  <DependencyGraph
                    nodes={mockNodes}
                    edges={mockEdges}
                    selectedNodeId={selectedNode}
                    onNodeSelect={setSelectedNode}
                    className="h-[450px]"
                  />

                  {/* Impacted Services List */}
                  <Card>
                    <CardHeader className="border-b bg-muted/30 py-3">
                      <CardTitle className="text-sm font-semibold">Impacted Services</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 p-4">
                      {mockImpactResult.impactedServices.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center justify-between rounded-lg border px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{service.name}</span>
                            <Badge
                              variant="secondary"
                              className={
                                service.impactLevel === "direct"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-amber-100 text-amber-700"
                              }
                            >
                              {service.impactLevel}
                            </Badge>
                          </div>
                          <ServiceHealthBadge status={service.status} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Right Panel - Impact Details */}
                <div>
                  <OutageImpactPanel {...mockImpactResult} />
                </div>
              </div>
            )}

            {/* Empty State */}
            {!showSimulation && (
              <Card className="py-16">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <AlertTriangle className="h-16 w-16 text-muted-foreground/30" />
                  <h3 className="mt-6 text-xl font-medium">Run an Impact Simulation</h3>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Select a service or configuration item above and run a simulation to see the
                    potential business impact of an outage.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
