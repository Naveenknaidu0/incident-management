"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProblemKPIStrip } from "@/components/problems/problem-kpi-strip"
import { ProblemTable, type Problem } from "@/components/problems/problem-table"
import { KnownErrorCard } from "@/components/problems/known-error-card"
import { PermanentFixTracker } from "@/components/problems/permanent-fix-tracker"
import { LearningCenterCard } from "@/components/problems/learning-center-card"
import { ProblemAnalytics } from "@/components/problems/problem-analytics"
import {
  Search,
  Plus,
  Filter,
  Download,
  RefreshCw,
  Bug,
  Target,
  TrendingUp,
  Lightbulb,
  BarChart3,
} from "lucide-react"

// Sample data
const problems: Problem[] = [
  { id: "PRB-001", title: "Recurring API Gateway Timeouts During Peak Hours", state: "under-investigation", relatedIncidents: 8, priority: "critical", affectedService: "API Gateway", owner: { name: "Sarah Chen" }, createdAt: "2h ago", isRecurring: true },
  { id: "PRB-002", title: "Database Connection Pool Exhaustion", state: "root-cause-identified", relatedIncidents: 5, priority: "high", affectedService: "Database Cluster", owner: { name: "Mike Johnson" }, createdAt: "1d ago", hasKnownError: true },
  { id: "PRB-003", title: "Payment Processing Intermittent Failures", state: "permanent-fix-planned", relatedIncidents: 12, priority: "critical", affectedService: "Payment Service", owner: { name: "Emily Davis" }, createdAt: "3d ago", isRecurring: true },
  { id: "PRB-004", title: "Authentication Service Memory Leak", state: "monitoring", relatedIncidents: 3, priority: "medium", affectedService: "Auth Service", owner: { name: "James Wilson" }, createdAt: "5d ago" },
  { id: "PRB-005", title: "Order Service Degradation Under Load", state: "new", relatedIncidents: 2, priority: "high", affectedService: "Order Service", createdAt: "6h ago" },
  { id: "PRB-006", title: "CDN Cache Invalidation Issues", state: "resolved", relatedIncidents: 4, priority: "medium", affectedService: "CDN", owner: { name: "Lisa Brown" }, createdAt: "1w ago" },
]

const knownErrors = [
  { id: "KE-001", title: "Connection Pool Exhaustion Under High Load", workaround: "Manually restart the affected database nodes and reduce concurrent connection limits temporarily.", linkedIncidents: 5, affectedServices: ["Database Cluster", "API Gateway", "Order Service"], permanentFixStatus: "in-progress" as const, createdAt: "3d ago" },
  { id: "KE-002", title: "Memory Leak in Authentication Module", workaround: "Schedule automatic restarts every 4 hours until permanent fix is deployed.", linkedIncidents: 3, affectedServices: ["Auth Service"], permanentFixStatus: "testing" as const, createdAt: "1w ago" },
  { id: "KE-003", title: "Payment Gateway Timeout on Large Transactions", workaround: "Split large transactions into smaller batches or increase timeout threshold.", linkedIncidents: 8, affectedServices: ["Payment Service", "Order Service"], permanentFixStatus: "scheduled" as const, createdAt: "2w ago" },
]

const permanentFixes = [
  { id: "FIX-001", title: "Implement Connection Pool Auto-Scaling", linkedProblem: "PRB-002", status: "testing" as const, progress: 75, riskLevel: "medium" as const, rollbackReady: true, validationChecks: { passed: 8, total: 10 }, targetDate: "Jan 25" },
  { id: "FIX-002", title: "Memory Management Optimization", linkedProblem: "PRB-004", status: "staging" as const, progress: 90, riskLevel: "low" as const, rollbackReady: true, validationChecks: { passed: 12, total: 12 }, targetDate: "Jan 22" },
  { id: "FIX-003", title: "Payment Service Circuit Breaker", linkedProblem: "PRB-003", status: "development" as const, progress: 45, riskLevel: "high" as const, rollbackReady: false, validationChecks: { passed: 3, total: 8 }, targetDate: "Feb 05" },
]

const learnings = [
  { id: "LRN-001", type: "lesson" as const, title: "Importance of Connection Pool Monitoring", description: "Connection pool exhaustion events could have been prevented with proper monitoring alerts set at 70% threshold.", linkedProblem: "PRB-002", status: "implemented" as const, impact: "high" as const, createdAt: "2d ago" },
  { id: "LRN-002", type: "automation" as const, title: "Auto-scaling for Database Connections", description: "Implement automatic connection pool scaling based on load patterns.", linkedProblem: "PRB-002", status: "approved" as const, impact: "high" as const, createdAt: "3d ago" },
  { id: "LRN-003", type: "monitoring" as const, title: "Enhanced Memory Leak Detection", description: "Add JVM heap monitoring with automatic alerting when memory usage exceeds 80%.", linkedProblem: "PRB-004", status: "proposed" as const, impact: "medium" as const, createdAt: "5d ago" },
]

export default function ProblemsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AppShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-[#0D3133]">Problem Management</h1>
              <p className="text-sm text-muted-foreground">Root cause analysis and permanent fix tracking</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-4 w-4" />
                Create Problem
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* KPI Strip */}
            <ProblemKPIStrip />

            {/* Filters */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search problems, root causes, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="RCA State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="under-investigation">Under Investigation</SelectItem>
                  <SelectItem value="root-cause-identified">Root Cause Identified</SelectItem>
                  <SelectItem value="permanent-fix-planned">Fix Planned</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="api-gateway">API Gateway</SelectItem>
                  <SelectItem value="database">Database Cluster</SelectItem>
                  <SelectItem value="payment">Payment Service</SelectItem>
                  <SelectItem value="auth">Auth Service</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all" className="gap-2">
                  <Target className="h-4 w-4" />
                  All Problems
                </TabsTrigger>
                <TabsTrigger value="known-errors" className="gap-2">
                  <Bug className="h-4 w-4" />
                  Known Errors
                </TabsTrigger>
                <TabsTrigger value="recurring" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Recurring
                </TabsTrigger>
                <TabsTrigger value="fixes" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Permanent Fixes
                </TabsTrigger>
                <TabsTrigger value="learnings" className="gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Learnings
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <ProblemTable problems={problems} />
              </TabsContent>

              <TabsContent value="known-errors" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {knownErrors.map((error) => (
                    <KnownErrorCard key={error.id} error={error} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recurring" className="mt-4">
                <ProblemTable problems={problems.filter((p) => p.isRecurring)} />
              </TabsContent>

              <TabsContent value="fixes" className="mt-4">
                <PermanentFixTracker fixes={permanentFixes} />
              </TabsContent>

              <TabsContent value="learnings" className="mt-4">
                <LearningCenterCard learnings={learnings} />
              </TabsContent>

              <TabsContent value="analytics" className="mt-4">
                <ProblemAnalytics />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
