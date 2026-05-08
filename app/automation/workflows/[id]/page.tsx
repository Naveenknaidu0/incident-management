"use client"

import { useState, use } from "react"
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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home,
  ArrowLeft,
  Edit,
  Play,
  Pause,
  Copy,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  MoreHorizontal,
  Zap,
  GitBranch,
  Users,
  Mail,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { WorkflowStateBadge } from "@/components/automation/workflow-state-badge"
import { WorkflowCanvas, type WorkflowNode } from "@/components/automation/workflow-canvas"
import { ExecutionHistoryTable, demoExecutions } from "@/components/automation/execution-history-table"

// Demo workflow data
const workflowData = {
  id: "wf-001",
  name: "SLA Breach Escalation",
  description: "Automatically escalate incidents when SLA is breached to ensure timely resolution",
  state: "active" as const,
  trigger: "SLA Breached",
  createdBy: "John Smith",
  createdAt: "2024-01-15",
  updatedAt: "2 hours ago",
  runs24h: 47,
  totalRuns: 1245,
  successRate: 99.2,
  avgDuration: "1.2s",
}

const workflowNodes: WorkflowNode[] = [
  {
    id: "trigger-1",
    type: "trigger",
    name: "SLA Breached",
    description: "Fires when any SLA is breached",
    icon: Zap,
  },
  {
    id: "condition-1",
    type: "condition",
    name: "Check Priority",
    description: "If priority is Critical or High",
    icon: GitBranch,
  },
  {
    id: "action-1",
    type: "action",
    name: "Escalate to Manager",
    description: "Escalate to assignment group manager",
    icon: Users,
  },
  {
    id: "action-2",
    type: "action",
    name: "Send Notification",
    description: "Email stakeholders about breach",
    icon: Mail,
  },
]

export default function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>()

  // In a real app, fetch workflow data based on id
  const workflow = workflowData

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
                  <Link href="/automation">Automation</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{workflow.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Page Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/automation">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-semibold text-[#0D3133]">{workflow.name}</h1>
                  <WorkflowStateBadge state={workflow.state} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground max-w-xl">
                  {workflow.description}
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Created by {workflow.createdBy}</span>
                  <span>·</span>
                  <span>Updated {workflow.updatedAt}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {workflow.state === "active" ? (
                <Button variant="outline" size="sm">
                  <Pause className="mr-1.5 h-4 w-4" />
                  Pause
                </Button>
              ) : (
                <Button variant="outline" size="sm">
                  <Play className="mr-1.5 h-4 w-4" />
                  Activate
                </Button>
              )}
              <Button asChild size="sm" className="bg-[#E69F50] text-[#0D3133] hover:bg-[#E69F50]/90">
                <Link href={`/automation/workflows/${id}/edit`}>
                  <Edit className="mr-1.5 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Run Now
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Runs (24h)</p>
                      <p className="text-2xl font-semibold text-[#0D3133]">{workflow.runs24h}</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E69F50]/10">
                      <Zap className="h-5 w-5 text-[#E69F50]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Runs</p>
                      <p className="text-2xl font-semibold text-[#0D3133]">{workflow.totalRuns}</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0D3133]/5">
                      <RefreshCw className="h-5 w-5 text-[#0D3133]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                      <p className="text-2xl font-semibold text-green-600">{workflow.successRate}%</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Avg Duration</p>
                      <p className="text-2xl font-semibold text-[#0D3133]">{workflow.avgDuration}</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#73847B]/10">
                      <Clock className="h-5 w-5 text-[#73847B]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Workflow</TabsTrigger>
                <TabsTrigger value="executions">Execution History</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Workflow Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-[#F8F7F5] rounded-lg p-6 min-h-[400px]">
                      <WorkflowCanvas
                        nodes={workflowNodes}
                        selectedNodeId={selectedNodeId}
                        onSelectNode={setSelectedNodeId}
                        onAddNode={() => {}}
                        onRemoveNode={() => {}}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="executions" className="mt-4">
                <ExecutionHistoryTable
                  executions={demoExecutions.filter((e) => e.workflowId === "wf-001" || e.workflowId === id)}
                  onRetry={(execId) => console.log("Retry:", execId)}
                />
              </TabsContent>

              <TabsContent value="settings" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Workflow Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Workflow ID</p>
                          <p className="text-sm font-mono">{id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Trigger</p>
                          <p className="text-sm">{workflow.trigger}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Created</p>
                          <p className="text-sm">{workflow.createdAt}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Last Updated</p>
                          <p className="text-sm">{workflow.updatedAt}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
