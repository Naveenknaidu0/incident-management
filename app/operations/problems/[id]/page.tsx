"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProblemStateBadge } from "@/components/problems/problem-state-badge"
import { RootCauseCategoryBadge } from "@/components/problems/root-cause-category-badge"
import { PriorityBadge } from "@/components/ui/priority-badge"
import { RCATimeline } from "@/components/problems/rca-timeline"
import { CorrectiveActionsTable } from "@/components/problems/corrective-actions-table"
import { ProblemContextPanel } from "@/components/problems/problem-context-panel"
import {
  ArrowLeft,
  Save,
  Clock,
  Link2,
  Server,
  AlertTriangle,
  CheckCircle,
  FileText,
  Lightbulb,
  GitBranch,
  BarChart3,
  History,
} from "lucide-react"

const timelineEvents = [
  { id: "1", type: "incident-created" as const, title: "Initial Incident Reported", description: "INC-4521 created - API Gateway Timeout reported by monitoring", timestamp: "Jan 15, 09:23 AM", metadata: [{ label: "Reporter", value: "System Monitor" }] },
  { id: "2", type: "escalation" as const, title: "Escalated to L2", description: "Incident escalated due to SLA breach risk", timestamp: "Jan 15, 09:45 AM", metadata: [{ label: "SLA Remaining", value: "15min" }] },
  { id: "3", type: "service-failure" as const, title: "Service Degradation Detected", description: "Payment Service showing 50% error rate", timestamp: "Jan 15, 10:02 AM", metadata: [{ label: "Error Rate", value: "50%" }] },
  { id: "4", type: "outage-propagation" as const, title: "Cascading Failure", description: "Order Service impacted due to Payment Service dependency", timestamp: "Jan 15, 10:15 AM", metadata: [{ label: "Impact", value: "Critical" }] },
  { id: "5", type: "responder-action" as const, title: "Root Cause Identified", description: "Database connection pool exhaustion confirmed", timestamp: "Jan 15, 10:45 AM", metadata: [{ label: "By", value: "Sarah Chen" }] },
  { id: "6", type: "recovery" as const, title: "Services Recovered", description: "All services back to normal operation", timestamp: "Jan 15, 11:30 AM", metadata: [{ label: "Duration", value: "2h 7min" }] },
]

const correctiveActions = [
  { id: "CA-001", title: "Increase database connection pool size from 100 to 200", type: "configuration" as const, owner: { name: "Mike Johnson" }, dueDate: "Jan 20", status: "completed" as const, impact: "high" as const, linkedProblem: "PRB-001" },
  { id: "CA-002", title: "Implement circuit breaker for database connections", type: "automation" as const, owner: { name: "Sarah Chen" }, dueDate: "Jan 25", status: "in-progress" as const, impact: "high" as const, linkedProblem: "PRB-001" },
  { id: "CA-003", title: "Add connection pool monitoring alerts at 70% threshold", type: "monitoring" as const, owner: { name: "James Wilson" }, dueDate: "Jan 22", status: "pending" as const, impact: "medium" as const, linkedProblem: "PRB-001" },
  { id: "CA-004", title: "Update runbook with connection pool recovery steps", type: "process" as const, owner: { name: "Emily Davis" }, dueDate: "Jan 28", status: "pending" as const, impact: "low" as const, linkedProblem: "PRB-001" },
]

export default function RCAWorkspacePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("summary")

  return (
    <AppShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Sticky Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/problems">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium text-[#0D3133]">{params.id}</span>
                  <ProblemStateBadge state="under-investigation" />
                  <PriorityBadge priority="critical" />
                </div>
                <h1 className="text-lg font-semibold text-[#0D3133]">
                  Recurring API Gateway Timeouts During Peak Hours
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mr-4">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px] bg-[#0D3133] text-white">SC</AvatarFallback>
                </Avatar>
                <span>Sarah Chen</span>
              </div>
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                History
              </Button>
              <Button size="sm" className="bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 min-h-0">
          {/* Left: RCA Workspace */}
          <div className="flex-1 overflow-y-auto border-r border-border">
            <div className="p-6 space-y-6">
              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="summary" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Summary
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="gap-2">
                    <History className="h-4 w-4" />
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger value="root-cause" className="gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Root Cause
                  </TabsTrigger>
                  <TabsTrigger value="services" className="gap-2">
                    <Server className="h-4 w-4" />
                    Services
                  </TabsTrigger>
                  <TabsTrigger value="actions" className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Actions
                  </TabsTrigger>
                  <TabsTrigger value="learnings" className="gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Learnings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="mt-4 space-y-4">
                  {/* Incident Summary */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold">Incident Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Related Incidents</Label>
                          <div className="mt-1 flex items-center gap-2">
                            <Link2 className="h-4 w-4 text-[#E69F50]" />
                            <span className="text-sm font-medium">8 incidents</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Total Outage Duration</Label>
                          <div className="mt-1 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium">12h 45min</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Affected Services</Label>
                          <div className="mt-1 flex items-center gap-2">
                            <Server className="h-4 w-4 text-purple-500" />
                            <span className="text-sm font-medium">4 services</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Problem Description</Label>
                        <Textarea
                          className="mt-1"
                          rows={3}
                          defaultValue="Multiple incidents of API Gateway timeouts occurring during peak traffic hours (9 AM - 11 AM, 2 PM - 4 PM). Investigation revealed correlation with database connection pool exhaustion."
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-4 gap-3">
                    <Card className="p-3">
                      <div className="text-xs text-muted-foreground">First Occurrence</div>
                      <div className="mt-1 text-sm font-medium">Jan 10, 2024</div>
                    </Card>
                    <Card className="p-3">
                      <div className="text-xs text-muted-foreground">Recurrence Count</div>
                      <div className="mt-1 text-sm font-medium text-red-600">5 times</div>
                    </Card>
                    <Card className="p-3">
                      <div className="text-xs text-muted-foreground">Business Impact</div>
                      <div className="mt-1 text-sm font-medium text-amber-600">$45,000</div>
                    </Card>
                    <Card className="p-3">
                      <div className="text-xs text-muted-foreground">Customers Affected</div>
                      <div className="mt-1 text-sm font-medium">2,340</div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="mt-4">
                  <RCATimeline events={timelineEvents} />
                </TabsContent>

                <TabsContent value="root-cause" className="mt-4 space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold">Root Cause Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Root Cause Category</Label>
                          <Select defaultValue="capacity-issue">
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="infrastructure-failure">Infrastructure Failure</SelectItem>
                              <SelectItem value="network-issue">Network Issue</SelectItem>
                              <SelectItem value="human-error">Human Error</SelectItem>
                              <SelectItem value="application-defect">Application Defect</SelectItem>
                              <SelectItem value="capacity-issue">Capacity Issue</SelectItem>
                              <SelectItem value="security-incident">Security Incident</SelectItem>
                              <SelectItem value="third-party-failure">Third-Party Failure</SelectItem>
                              <SelectItem value="process-failure">Process Failure</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Failure Point</Label>
                          <Select defaultValue="database">
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="database">Database Cluster</SelectItem>
                              <SelectItem value="api">API Gateway</SelectItem>
                              <SelectItem value="network">Network Layer</SelectItem>
                              <SelectItem value="application">Application Layer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground">Technical Root Cause</Label>
                        <Textarea
                          className="mt-1"
                          rows={3}
                          defaultValue="Database connection pool configured with maximum 100 connections. During peak hours, traffic exceeds this limit causing connection exhaustion. Requests queue and eventually timeout."
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground">Business Impact</Label>
                        <Textarea
                          className="mt-1"
                          rows={2}
                          defaultValue="Payment processing delays causing failed transactions. Estimated revenue impact of $45,000 across 5 occurrences. Customer satisfaction score dropped 15 points."
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground">Contributing Factors</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline">Undersized connection pool</Badge>
                          <Badge variant="outline">No auto-scaling configured</Badge>
                          <Badge variant="outline">Missing monitoring alerts</Badge>
                          <Badge variant="outline">Peak traffic growth +30%</Badge>
                          <Button variant="ghost" size="sm" className="h-6 text-xs">+ Add Factor</Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground">Dependency Failures</Label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center gap-2 rounded-md border p-2">
                            <GitBranch className="h-4 w-4 text-purple-500" />
                            <span className="text-sm">Payment Service</span>
                            <Badge variant="outline" className="text-xs">Downstream</Badge>
                            <span className="text-xs text-muted-foreground ml-auto">50% error rate</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-md border p-2">
                            <GitBranch className="h-4 w-4 text-purple-500" />
                            <span className="text-sm">Order Service</span>
                            <Badge variant="outline" className="text-xs">Downstream</Badge>
                            <span className="text-xs text-muted-foreground ml-auto">30% error rate</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="services" className="mt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold">Affected Services & Dependencies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: "Database Cluster", type: "Primary", impact: "critical", status: "recovered" },
                          { name: "API Gateway", type: "Primary", impact: "critical", status: "recovered" },
                          { name: "Payment Service", type: "Downstream", impact: "high", status: "monitoring" },
                          { name: "Order Service", type: "Downstream", impact: "medium", status: "recovered" },
                        ].map((service) => (
                          <div key={service.name} className="flex items-center justify-between rounded-md border p-3">
                            <div className="flex items-center gap-3">
                              <Server className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{service.name}</p>
                                <p className="text-xs text-muted-foreground">{service.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={
                                  service.impact === "critical" ? "border-red-200 text-red-700" :
                                  service.impact === "high" ? "border-orange-200 text-orange-700" :
                                  "border-amber-200 text-amber-700"
                                }
                              >
                                {service.impact}
                              </Badge>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                service.status === "recovered" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                              }`}>
                                {service.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="actions" className="mt-4">
                  <CorrectiveActionsTable actions={correctiveActions} />
                </TabsContent>

                <TabsContent value="learnings" className="mt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold">Lessons Learned & Preventive Measures</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Lessons Learned</Label>
                        <Textarea
                          className="mt-1"
                          rows={3}
                          defaultValue="1. Connection pool monitoring should alert at 70% threshold, not 90%&#10;2. Auto-scaling should be configured for all database connection pools&#10;3. Runbooks need clear escalation paths for capacity issues"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Process Recommendations</Label>
                        <Textarea
                          className="mt-1"
                          rows={3}
                          defaultValue="1. Quarterly capacity reviews for all critical services&#10;2. Load testing before major traffic events&#10;3. Automated scaling policies for peak hours"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Monitoring Gaps Identified</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge className="bg-amber-100 text-amber-700">Connection pool utilization</Badge>
                          <Badge className="bg-amber-100 text-amber-700">Query queue depth</Badge>
                          <Badge className="bg-amber-100 text-amber-700">Connection wait time</Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Automation Opportunities</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge className="bg-purple-100 text-purple-700">Auto-scale connection pools</Badge>
                          <Badge className="bg-purple-100 text-purple-700">Circuit breaker automation</Badge>
                          <Badge className="bg-purple-100 text-purple-700">Load shedding rules</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right: Context Panel */}
          <div className="w-[340px] shrink-0 overflow-y-auto bg-muted/30">
            <div className="p-4">
              <ProblemContextPanel problemId={params.id} />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
