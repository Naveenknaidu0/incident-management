"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Home,
  Plus,
  Search,
  Filter,
  GitBranch,
  Zap,
  XCircle,
  Clock,
  ArrowUpRight,
  CheckCircle,
  TrendingUp,
  Folder,
} from "lucide-react"
import { AutomationKPICard } from "@/components/automation/automation-kpi-card"
import { AutomationTable, type Automation } from "@/components/automation/automation-table"
import { ExecutionHistoryTable, demoExecutions } from "@/components/automation/execution-history-table"
import { AutomationAnalytics } from "@/components/automation/automation-analytics"
import { AutomationTemplates } from "@/components/automation/automation-templates"

// Demo automation data
const demoAutomations: Automation[] = [
  {
    id: "wf-001",
    name: "SLA Breach Escalation",
    description: "Escalate incidents when SLA is breached",
    state: "active",
    trigger: "SLA Breached",
    lastRun: "2 mins ago",
    runs24h: 47,
    successRate: 99.2,
    folder: "SLA",
    createdBy: "John Smith",
    updatedAt: "1 hour ago",
  },
  {
    id: "wf-002",
    name: "VIP Incident Routing",
    description: "Route VIP incidents to priority support",
    state: "active",
    trigger: "Incident Created",
    lastRun: "15 mins ago",
    runs24h: 23,
    successRate: 98.5,
    folder: "Assignment",
    createdBy: "Sarah Chen",
    updatedAt: "2 days ago",
  },
  {
    id: "wf-003",
    name: "Auto Assignment by Category",
    description: "Automatically assign based on category",
    state: "active",
    trigger: "Incident Created",
    lastRun: "5 mins ago",
    runs24h: 156,
    successRate: 97.8,
    folder: "Assignment",
    createdBy: "Mike Johnson",
    updatedAt: "1 week ago",
  },
  {
    id: "wf-004",
    name: "Major Incident Notification",
    description: "Notify executives for major incidents",
    state: "paused",
    trigger: "Major Incident",
    lastRun: "3 hours ago",
    runs24h: 2,
    successRate: 100,
    folder: "Notification",
    createdBy: "Emily Davis",
    updatedAt: "3 days ago",
  },
  {
    id: "wf-005",
    name: "Priority Change Handler",
    description: "Handle priority escalation notifications",
    state: "failed",
    trigger: "Priority Changed",
    lastRun: "1 hour ago",
    runs24h: 12,
    successRate: 75.0,
    folder: "Escalation",
    createdBy: "David Wilson",
    updatedAt: "5 hours ago",
  },
  {
    id: "wf-006",
    name: "SLA Warning Alert",
    description: "Send alerts before SLA breach",
    state: "active",
    trigger: "SLA Warning",
    lastRun: "30 mins ago",
    runs24h: 89,
    successRate: 99.8,
    folder: "SLA",
    createdBy: "John Smith",
    updatedAt: "2 weeks ago",
  },
  {
    id: "wf-007",
    name: "Auto Closure Workflow",
    description: "Close resolved incidents after 48h",
    state: "draft",
    trigger: "Status Changed",
    runs24h: 0,
    successRate: 0,
    folder: "Lifecycle",
    createdBy: "Sarah Chen",
    updatedAt: "1 day ago",
  },
]

const folders = [
  { id: "all", name: "All Workflows", count: 7 },
  { id: "sla", name: "SLA", count: 2 },
  { id: "escalation", name: "Escalation", count: 1 },
  { id: "assignment", name: "Assignment", count: 2 },
  { id: "notification", name: "Notifications", count: 1 },
  { id: "lifecycle", name: "Lifecycle", count: 1 },
]

export default function AutomationDashboardPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const [activeFolder, setActiveFolder] = useState("all")
  const [activeTab, setActiveTab] = useState("workflows")

  // Filter automations
  const filteredAutomations = demoAutomations.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesState = stateFilter === "all" || a.state === stateFilter
    const matchesFolder =
      activeFolder === "all" || a.folder.toLowerCase() === activeFolder
    return matchesSearch && matchesState && matchesFolder
  })

  const handleToggleState = (id: string, active: boolean) => {
    console.log("Toggle state", id, active)
  }

  const handleRetryExecution = (id: string) => {
    console.log("Retry execution", id)
  }

  // Calculate KPIs
  const totalAutomations = demoAutomations.length
  const activeWorkflows = demoAutomations.filter((a) => a.state === "active").length
  const failedRuns = demoAutomations.filter((a) => a.state === "failed").length
  const avgSuccessRate =
    demoAutomations.reduce((sum, a) => sum + a.successRate, 0) / demoAutomations.length

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
                <BreadcrumbPage>Automation Center</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Page Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#0D3133]">Automation Center</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Manage workflows, triggers, and automations
              </p>
            </div>
            <Button asChild className="bg-[#E69F50] text-[#0D3133] hover:bg-[#E69F50]/90">
              <Link href="/automation/workflows/new">
                <Plus className="mr-1.5 h-4 w-4" />
                New Workflow
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar - Folders */}
          <div className="hidden w-56 shrink-0 border-r border-border bg-muted/20 lg:block">
            <div className="p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
                Folders
              </h3>
              <div className="space-y-1">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setActiveFolder(folder.id)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                      activeFolder === folder.id
                        ? "bg-[#0D3133] text-white"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Folder className="h-4 w-4" />
                      {folder.name}
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        activeFolder === folder.id
                          ? "bg-white/20 text-white"
                          : ""
                      }`}
                    >
                      {folder.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Area */}
          <div className="flex flex-1 flex-col min-h-0 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                <AutomationKPICard
                  title="Total Automations"
                  value={totalAutomations}
                  icon={GitBranch}
                />
                <AutomationKPICard
                  title="Active Workflows"
                  value={activeWorkflows}
                  icon={Zap}
                  variant="success"
                />
                <AutomationKPICard
                  title="Failed Runs (24h)"
                  value={failedRuns}
                  icon={XCircle}
                  variant="danger"
                />
                <AutomationKPICard
                  title="SLA Automations"
                  value={2}
                  icon={Clock}
                />
                <AutomationKPICard
                  title="Escalation Rules"
                  value={3}
                  icon={ArrowUpRight}
                />
                <AutomationKPICard
                  title="Success Rate"
                  value={`${avgSuccessRate.toFixed(1)}%`}
                  icon={CheckCircle}
                  variant="success"
                  trend={{ value: 2.3, label: "vs last week" }}
                />
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="workflows" className="gap-1.5">
                      <GitBranch className="h-4 w-4" />
                      Workflows
                    </TabsTrigger>
                    <TabsTrigger value="executions" className="gap-1.5">
                      <Zap className="h-4 w-4" />
                      Executions
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="gap-1.5">
                      <TrendingUp className="h-4 w-4" />
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="gap-1.5">
                      <Folder className="h-4 w-4" />
                      Templates
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Workflows Tab */}
                <TabsContent value="workflows" className="mt-4">
                  {/* Filters */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search workflows..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Select value={stateFilter} onValueChange={setStateFilter}>
                      <SelectTrigger className="w-40">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All States</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Table */}
                  <AutomationTable
                    automations={filteredAutomations}
                    selectedIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                    onToggleState={handleToggleState}
                  />
                </TabsContent>

                {/* Executions Tab */}
                <TabsContent value="executions" className="mt-4">
                  <ExecutionHistoryTable
                    executions={demoExecutions}
                    onRetry={handleRetryExecution}
                  />
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="mt-4">
                  <AutomationAnalytics />
                </TabsContent>

                {/* Templates Tab */}
                <TabsContent value="templates" className="mt-4">
                  <AutomationTemplates
                    onSelectTemplate={(template) => {
                      console.log("Selected template:", template)
                    }}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
