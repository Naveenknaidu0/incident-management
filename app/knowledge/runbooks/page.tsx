"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RunbookCard } from "@/components/knowledge/runbook-card"
import {
  Home,
  Search,
  Plus,
  BookOpen,
  Play,
  Clock,
  CheckCircle,
  Users,
  Filter,
  Grid3X3,
  List,
} from "lucide-react"

const mockRunbooks = [
  {
    id: "RB0000089",
    title: "VPN Service Recovery Procedure",
    type: "vpn-troubleshooting" as const,
    steps: 8,
    estimatedTime: "15 min",
    successRate: 96,
    lastUsed: "1 hour ago",
    category: "Network",
    description: "Step-by-step procedure to recover VPN services after an outage.",
    executions: 234,
  },
  {
    id: "RB0000076",
    title: "Database Restart and Health Check",
    type: "database-restart" as const,
    steps: 12,
    estimatedTime: "25 min",
    successRate: 94,
    lastUsed: "3 hours ago",
    category: "Database",
    description: "Safe database restart procedure with pre and post health checks.",
    executions: 187,
  },
  {
    id: "RB0000065",
    title: "Network Outage Recovery Steps",
    type: "network-recovery" as const,
    steps: 15,
    estimatedTime: "45 min",
    successRate: 89,
    lastUsed: "1 day ago",
    category: "Network",
    description: "Comprehensive network outage recovery including switch and router restart.",
    executions: 156,
  },
  {
    id: "RB0000054",
    title: "Application Service Restart",
    type: "service-restart" as const,
    steps: 6,
    estimatedTime: "10 min",
    successRate: 98,
    lastUsed: "2 days ago",
    category: "Application",
    description: "Standard procedure for restarting application services with minimal downtime.",
    executions: 423,
  },
  {
    id: "RB0000043",
    title: "Major Outage Response",
    type: "outage-recovery" as const,
    steps: 20,
    estimatedTime: "60 min",
    successRate: 87,
    lastUsed: "1 week ago",
    category: "Operations",
    description: "Complete major outage response playbook including communication templates.",
    executions: 45,
  },
  {
    id: "RB0000032",
    title: "Email Server Recovery",
    type: "service-restart" as const,
    steps: 10,
    estimatedTime: "30 min",
    successRate: 92,
    lastUsed: "3 days ago",
    category: "Email",
    description: "Email server recovery procedure including queue management.",
    executions: 98,
  },
]

export default function RunbooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredRunbooks = mockRunbooks.filter((runbook) => {
    if (categoryFilter !== "all" && runbook.category !== categoryFilter) return false
    if (searchQuery && !runbook.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

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
                  <Link href="/knowledge">Knowledge Base</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Runbooks</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-xl font-semibold text-[#0D3133]">
                <BookOpen className="h-5 w-5 text-[#0D3133]" />
                Operational Runbooks
              </h1>
              <p className="text-sm text-muted-foreground">
                Step-by-step operational procedures and playbooks
              </p>
            </div>
            <Button size="sm" className="gap-2 bg-[#E69F50] hover:bg-[#E69F50]/90">
              <Plus className="h-4 w-4" />
              New Runbook
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <Card className="p-3">
              <p className="text-xs text-muted-foreground">Total Runbooks</p>
              <p className="text-2xl font-semibold text-[#0D3133]">89</p>
            </Card>
            <Card className="p-3">
              <p className="text-xs text-muted-foreground">Executions Today</p>
              <p className="text-2xl font-semibold text-[#E69F50]">34</p>
            </Card>
            <Card className="p-3">
              <p className="text-xs text-muted-foreground">Avg Success Rate</p>
              <p className="text-2xl font-semibold text-green-600">94.2%</p>
            </Card>
            <Card className="p-3">
              <p className="text-xs text-muted-foreground">Time Saved</p>
              <p className="text-2xl font-semibold text-[#0D3133]">127h</p>
            </Card>
            <Card className="p-3">
              <p className="text-xs text-muted-foreground">Most Used</p>
              <p className="text-sm font-medium text-[#0D3133] truncate">Service Restart</p>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 md:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search runbooks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Network">Network</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="Application">Application</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
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
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredRunbooks.map((runbook) => (
                <RunbookCard
                  key={runbook.id}
                  id={runbook.id}
                  title={runbook.title}
                  type={runbook.type}
                  steps={runbook.steps}
                  estimatedTime={runbook.estimatedTime}
                  successRate={runbook.successRate}
                  lastUsed={runbook.lastUsed}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRunbooks.map((runbook) => (
                <Card key={runbook.id} className="transition-all hover:border-[#E69F50]/50">
                  <CardContent className="flex items-center justify-between gap-4 p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0D3133]/5">
                        <BookOpen className="h-5 w-5 text-[#0D3133]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{runbook.id}</span>
                          <Badge variant="secondary" className="text-[10px]">{runbook.category}</Badge>
                        </div>
                        <h3 className="text-sm font-semibold text-[#0D3133]">{runbook.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">{runbook.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-xs">
                      <div className="text-center">
                        <p className="font-medium">{runbook.steps}</p>
                        <p className="text-muted-foreground">Steps</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{runbook.estimatedTime}</p>
                        <p className="text-muted-foreground">Duration</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-green-600">{runbook.successRate}%</p>
                        <p className="text-muted-foreground">Success</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{runbook.executions}</p>
                        <p className="text-muted-foreground">Executions</p>
                      </div>
                      <Button size="sm" className="gap-1 bg-[#0D3133]">
                        <Play className="h-3 w-3" />
                        Execute
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
