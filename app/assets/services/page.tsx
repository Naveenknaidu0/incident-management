"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CMDBFilterBar } from "@/components/cmdb/cmdb-filter-bar"
import { ServiceCard } from "@/components/cmdb/service-card"
import { 
  Globe, 
  Server, 
  Database, 
  Cloud, 
  Network, 
  Cpu,
  Plus,
  LayoutGrid,
  List
} from "lucide-react"
import Link from "next/link"

// Service categories with counts
const categories = [
  { id: "business", label: "Business Services", icon: Globe, count: 42 },
  { id: "infrastructure", label: "Infrastructure", icon: Server, count: 86 },
  { id: "applications", label: "Applications", icon: Cpu, count: 64 },
  { id: "databases", label: "Databases", icon: Database, count: 38 },
  { id: "cloud", label: "Cloud Resources", icon: Cloud, count: 32 },
  { id: "network", label: "Network Services", icon: Network, count: 22 },
]

// Mock services data
const mockServices = [
  { id: "svc-001", name: "Payment Gateway", owner: "Payments Team", status: "operational" as const, environment: "production" as const, dependencyCount: 12, activeIncidents: 0, category: "business" },
  { id: "svc-002", name: "User Authentication", owner: "Identity Team", status: "degraded" as const, environment: "production" as const, dependencyCount: 8, activeIncidents: 1, category: "business" },
  { id: "svc-003", name: "Order Processing", owner: "Commerce Team", status: "major-outage" as const, environment: "production" as const, dependencyCount: 15, activeIncidents: 3, category: "business" },
  { id: "svc-004", name: "Inventory API", owner: "Supply Chain", status: "operational" as const, environment: "production" as const, dependencyCount: 6, activeIncidents: 0, category: "applications" },
  { id: "svc-005", name: "Customer Portal", owner: "Frontend Team", status: "operational" as const, environment: "production" as const, dependencyCount: 10, activeIncidents: 0, category: "applications" },
  { id: "svc-006", name: "Email Service", owner: "Communications", status: "maintenance" as const, environment: "staging" as const, dependencyCount: 3, activeIncidents: 0, category: "infrastructure" },
  { id: "svc-007", name: "PostgreSQL Cluster", owner: "DBA Team", status: "operational" as const, environment: "production" as const, dependencyCount: 24, activeIncidents: 0, category: "databases" },
  { id: "svc-008", name: "Redis Cache", owner: "Platform Team", status: "operational" as const, environment: "production" as const, dependencyCount: 18, activeIncidents: 0, category: "databases" },
  { id: "svc-009", name: "AWS S3 Storage", owner: "Cloud Ops", status: "operational" as const, environment: "production" as const, dependencyCount: 14, activeIncidents: 0, category: "cloud" },
  { id: "svc-010", name: "Kubernetes Cluster", owner: "Platform Team", status: "partial-outage" as const, environment: "production" as const, dependencyCount: 45, activeIncidents: 2, category: "infrastructure" },
  { id: "svc-011", name: "CDN Edge Network", owner: "Network Team", status: "operational" as const, environment: "production" as const, dependencyCount: 8, activeIncidents: 0, category: "network" },
  { id: "svc-012", name: "API Gateway", owner: "Platform Team", status: "operational" as const, environment: "production" as const, dependencyCount: 32, activeIncidents: 0, category: "infrastructure" },
]

export default function ServiceCatalogPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredServices = selectedCategory === "all"
    ? mockServices
    : mockServices.filter((s) => s.category === selectedCategory)

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
                  Service Catalog
                </h1>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {mockServices.length} services across {categories.length} categories
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory === "all" ? "bg-[#0D3133]" : ""}
              >
                All Services
                <Badge variant="secondary" className="ml-2">
                  {mockServices.length}
                </Badge>
              </Button>
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={selectedCategory === cat.id ? "bg-[#0D3133]" : ""}
                  >
                    <Icon className="mr-1.5 h-3.5 w-3.5" />
                    {cat.label}
                    <Badge variant="secondary" className="ml-2">
                      {cat.count}
                    </Badge>
                  </Button>
                )
              })}
            </div>

            {/* Filters */}
            <CMDBFilterBar />

            {/* Services Grid */}
            <div className={viewMode === "grid"
              ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "space-y-3"
            }>
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  owner={service.owner}
                  status={service.status}
                  environment={service.environment}
                  dependencyCount={service.dependencyCount}
                  activeIncidents={service.activeIncidents}
                />
              ))}
            </div>

            {filteredServices.length === 0 && (
              <Card className="py-12">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <Globe className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No services found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your filters or search criteria
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
