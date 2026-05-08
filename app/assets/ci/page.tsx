"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CMDBFilterBar } from "@/components/cmdb/cmdb-filter-bar"
import { CITable, type ConfigurationItem } from "@/components/cmdb/ci-table"
import { CIDetailsDrawer } from "@/components/cmdb/ci-details-drawer"
import { 
  Plus,
  Server,
  Database,
  Globe,
  Cloud,
  Network,
  Container,
  HardDrive,
  Cpu,
  Download,
  Upload
} from "lucide-react"
import Link from "next/link"

// CI Type categories with counts
const ciTypes = [
  { id: "server", label: "Servers", icon: Server, count: 245 },
  { id: "database", label: "Databases", icon: Database, count: 86 },
  { id: "application", label: "Applications", icon: Globe, count: 142 },
  { id: "api", label: "APIs", icon: Cpu, count: 98 },
  { id: "cloud", label: "Cloud Resources", icon: Cloud, count: 312 },
  { id: "network", label: "Network Devices", icon: Network, count: 67 },
  { id: "container", label: "Containers", icon: Container, count: 534 },
  { id: "storage", label: "Storage", icon: HardDrive, count: 45 },
]

// Mock CI data
const mockCIs: ConfigurationItem[] = [
  { id: "ci-001", name: "prod-web-01", type: "server", environment: "production", status: "operational", owner: "Platform Team", relatedServices: 8, activeIncidents: 0, lastUpdated: "2 hours ago" },
  { id: "ci-002", name: "orders-db-primary", type: "database", environment: "production", status: "major-outage", owner: "DBA Team", relatedServices: 12, activeIncidents: 3, lastUpdated: "47 min ago" },
  { id: "ci-003", name: "payment-api", type: "api", environment: "production", status: "operational", owner: "Payments Team", relatedServices: 6, activeIncidents: 0, lastUpdated: "1 day ago" },
  { id: "ci-004", name: "user-auth-service", type: "application", environment: "production", status: "degraded", owner: "Identity Team", relatedServices: 15, activeIncidents: 1, lastUpdated: "3 hours ago" },
  { id: "ci-005", name: "aws-s3-assets", type: "cloud", environment: "production", status: "operational", owner: "Cloud Ops", relatedServices: 22, activeIncidents: 0, lastUpdated: "5 hours ago" },
  { id: "ci-006", name: "core-router-01", type: "network", environment: "production", status: "operational", owner: "Network Team", relatedServices: 45, activeIncidents: 0, lastUpdated: "12 hours ago" },
  { id: "ci-007", name: "k8s-node-pool-a", type: "container", environment: "production", status: "partial-outage", owner: "Platform Team", relatedServices: 34, activeIncidents: 2, lastUpdated: "1 hour ago" },
  { id: "ci-008", name: "san-storage-01", type: "storage", environment: "production", status: "operational", owner: "Infrastructure", relatedServices: 18, activeIncidents: 0, lastUpdated: "2 days ago" },
  { id: "ci-009", name: "staging-web-01", type: "server", environment: "staging", status: "maintenance", owner: "Platform Team", relatedServices: 4, activeIncidents: 0, lastUpdated: "6 hours ago" },
  { id: "ci-010", name: "redis-cache-cluster", type: "database", environment: "production", status: "operational", owner: "DBA Team", relatedServices: 28, activeIncidents: 0, lastUpdated: "4 hours ago" },
]

// Mock CI details for drawer
const mockCIDetail = {
  id: "ci-002",
  name: "orders-db-primary",
  type: "database" as const,
  environment: "production" as const,
  status: "major-outage" as const,
  owner: "DBA Team",
  description: "Primary PostgreSQL database cluster for order management system. Handles all order transactions, inventory updates, and customer data.",
  lastUpdated: "47 min ago",
  createdAt: "2022-01-15",
  relationships: [
    { id: "ci-003", name: "payment-api", type: "API", relationshipType: "connected-to" as const },
    { id: "ci-007", name: "k8s-node-pool-a", type: "Container", relationshipType: "hosted-on" as const },
    { id: "ci-010", name: "redis-cache-cluster", type: "Database", relationshipType: "backed-by" as const },
  ],
  activeIncidents: [
    { id: "INC-2024-0847", title: "Database cluster failure - primary node unresponsive" },
    { id: "INC-2024-0845", title: "Connection pool exhaustion" },
    { id: "INC-2024-0842", title: "Replication lag exceeding threshold" },
  ],
  notes: "Critical infrastructure component. Any changes require CAB approval. Maintenance window: Sundays 02:00-06:00 UTC.",
}

export default function CIExplorerPage() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedCI, setSelectedCI] = useState<typeof mockCIDetail | null>(null)

  const filteredCIs = selectedType === "all"
    ? mockCIs
    : mockCIs.filter((ci) => ci.type === selectedType)

  const handleCIClick = (ci: ConfigurationItem) => {
    // In real app, fetch full CI details
    setSelectedCI(mockCIDetail)
    setDrawerOpen(true)
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
                  Configuration Items
                </h1>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {mockCIs.length} configuration items across {ciTypes.length} types
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="mr-2 h-4 w-4" />
                Add CI
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-6">
            {/* Type Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("all")}
                className={selectedType === "all" ? "bg-[#0D3133]" : ""}
              >
                All CIs
                <Badge variant="secondary" className="ml-2">
                  {mockCIs.length}
                </Badge>
              </Button>
              {ciTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type.id)}
                    className={selectedType === type.id ? "bg-[#0D3133]" : ""}
                  >
                    <Icon className="mr-1.5 h-3.5 w-3.5" />
                    {type.label}
                    <Badge variant="secondary" className="ml-2">
                      {type.count}
                    </Badge>
                  </Button>
                )
              })}
            </div>

            {/* Filters */}
            <CMDBFilterBar />

            {/* CI Table */}
            <CITable items={filteredCIs} onItemClick={handleCIClick} />

            {filteredCIs.length === 0 && (
              <Card className="py-12">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <Server className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No configuration items found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your filters or search criteria
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* CI Details Drawer */}
      <CIDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        ci={selectedCI}
      />
    </AppShell>
  )
}
