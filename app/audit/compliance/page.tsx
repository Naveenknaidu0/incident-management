"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ComplianceStatusBadge } from "@/components/audit/compliance-status-badge"
import {
  Shield,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Users,
  TrendingUp,
  ChevronRight,
  Download,
  Filter,
} from "lucide-react"

const complianceMetrics = [
  { label: "Overall Compliance", value: 94.2, target: 95, status: "warning" as const },
  { label: "SLA Adherence", value: 97.8, target: 95, status: "compliant" as const },
  { label: "Escalation Compliance", value: 89.5, target: 90, status: "warning" as const },
  { label: "Approval Compliance", value: 92.1, target: 95, status: "warning" as const },
]

const policyViolations = [
  { id: "1", category: "SLA Policy", description: "SLA paused without approval", count: 3, severity: "warning" as const },
  { id: "2", category: "Escalation Policy", description: "Escalation level skipped", count: 2, severity: "violated" as const },
  { id: "3", category: "Change Policy", description: "Configuration changed outside window", count: 1, severity: "critical" as const },
  { id: "4", category: "Approval Policy", description: "Missing manager approval", count: 5, severity: "warning" as const },
]

const overdueIncidents = [
  { id: "INC0042701", title: "Database connectivity issue", slaStatus: "breached", overdueBy: "2h 15m", priority: "P1" },
  { id: "INC0042689", title: "Email delivery failure", slaStatus: "breached", overdueBy: "45m", priority: "P2" },
  { id: "INC0042756", title: "VPN access issue", slaStatus: "at-risk", overdueBy: "15m", priority: "P2" },
]

const missingApprovals = [
  { id: "1", type: "SLA Override", entity: "INC0042781", requester: "Mike Johnson", pending: "1h 30m" },
  { id: "2", type: "Escalation Bypass", entity: "INC0042789", requester: "Sarah Chen", pending: "45m" },
  { id: "3", type: "Configuration Change", entity: "SLA-POL-001", requester: "Admin User", pending: "2h 15m" },
]

const escalationFailures = [
  { id: "1", incident: "INC0042801", reason: "On-call engineer unavailable", time: "30 min ago", resolution: "Manual escalation" },
  { id: "2", incident: "INC0042756", reason: "Notification delivery failed", time: "1 hour ago", resolution: "Retry successful" },
]

const criticalIncidents = [
  { id: "INC0042756", title: "Payment gateway outage", status: "In Progress", age: "4h 32m", escalationLevel: "L3" },
  { id: "INC0042701", title: "Database cluster failure", status: "Investigating", age: "2h 15m", escalationLevel: "L2" },
]

export default function ComplianceMonitoringPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <AppShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#0D3133]">Compliance Monitoring</h1>
              <p className="text-sm text-muted-foreground">
                Operational policy compliance, SLA adherence, and approval tracking
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Button size="sm" className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Shield className="h-4 w-4" />
                Configure Policies
              </Button>
            </div>
          </div>
        </div>

        {/* Compliance Metrics Strip */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-4">
          <div className="grid grid-cols-4 gap-4">
            {complianceMetrics.map((metric) => (
              <Card key={metric.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">{metric.label}</span>
                    <ComplianceStatusBadge status={metric.status} showLabel={false} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#0D3133]">{metric.value}%</span>
                    <span className="text-xs text-muted-foreground">/ {metric.target}% target</span>
                  </div>
                  <Progress
                    value={metric.value}
                    className="h-1.5 mt-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="sticky top-0 z-10 border-b border-border bg-card px-6">
              <TabsList className="h-10 bg-transparent p-0">
                <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <Shield className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="violations" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <XCircle className="h-4 w-4" />
                  Policy Violations
                </TabsTrigger>
                <TabsTrigger value="overdue" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <Clock className="h-4 w-4" />
                  Overdue Incidents
                </TabsTrigger>
                <TabsTrigger value="approvals" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <FileText className="h-4 w-4" />
                  Missing Approvals
                </TabsTrigger>
                <TabsTrigger value="escalations" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <AlertTriangle className="h-4 w-4" />
                  Escalation Failures
                </TabsTrigger>
                <TabsTrigger value="critical" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <AlertTriangle className="h-4 w-4" />
                  Critical Incidents
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="m-0 p-6">
              <div className="grid grid-cols-3 gap-6">
                {/* Policy Violations Summary */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      Policy Violations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {policyViolations.slice(0, 3).map((violation) => (
                      <div key={violation.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium">{violation.category}</p>
                          <p className="text-[10px] text-muted-foreground">{violation.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-[10px]">{violation.count}</Badge>
                          <ComplianceStatusBadge status={violation.severity} showLabel={false} />
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      View All <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Overdue Incidents Summary */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      Overdue Incidents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {overdueIncidents.slice(0, 3).map((incident) => (
                      <div key={incident.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-mono font-medium text-[#0D3133]">{incident.id}</p>
                          <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">{incident.title}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={incident.slaStatus === "breached" ? "destructive" : "outline"} className="text-[10px]">
                            {incident.slaStatus}
                          </Badge>
                          <p className="text-[10px] text-red-600 mt-0.5">+{incident.overdueBy}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      View All <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Missing Approvals Summary */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="h-4 w-4 text-orange-500" />
                      Missing Approvals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {missingApprovals.slice(0, 3).map((approval) => (
                      <div key={approval.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium">{approval.type}</p>
                          <p className="text-[10px] text-muted-foreground">{approval.requester}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-mono text-[#0D3133]">{approval.entity}</p>
                          <p className="text-[10px] text-amber-600">Pending: {approval.pending}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      View All <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="violations" className="m-0 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">All Policy Violations ({policyViolations.length})</h3>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
                <div className="space-y-3">
                  {policyViolations.map((violation) => (
                    <Card key={violation.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium">{violation.category}</h4>
                            <ComplianceStatusBadge status={violation.severity} />
                          </div>
                          <p className="text-xs text-muted-foreground">{violation.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-lg font-semibold text-[#0D3133]">{violation.count}</p>
                            <p className="text-[10px] text-muted-foreground">occurrences</p>
                          </div>
                          <Button size="sm">Review</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="overdue" className="m-0 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Overdue Incidents ({overdueIncidents.length})</h3>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
                <div className="space-y-3">
                  {overdueIncidents.map((incident) => (
                    <Card key={incident.id} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm font-medium text-[#0D3133]">{incident.id}</span>
                            <Badge variant="outline">{incident.priority}</Badge>
                            <Badge variant={incident.slaStatus === "breached" ? "destructive" : "outline"}>
                              {incident.slaStatus}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{incident.title}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-lg font-semibold text-red-600">+{incident.overdueBy}</p>
                            <p className="text-[10px] text-muted-foreground">overdue</p>
                          </div>
                          <Button size="sm">Take Action</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="approvals" className="m-0 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Missing Approvals ({missingApprovals.length})</h3>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
                <div className="space-y-3">
                  {missingApprovals.map((approval) => (
                    <Card key={approval.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium">{approval.type}</h4>
                            <span className="font-mono text-xs text-[#0D3133]">{approval.entity}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Requested by: {approval.requester}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-amber-600">{approval.pending}</p>
                            <p className="text-[10px] text-muted-foreground">pending</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Reject</Button>
                            <Button size="sm">Approve</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="escalations" className="m-0 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Escalation Failures ({escalationFailures.length})</h3>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
                <div className="space-y-3">
                  {escalationFailures.map((failure) => (
                    <Card key={failure.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm font-medium text-[#0D3133]">{failure.incident}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Reason: {failure.reason}</p>
                          <p className="text-xs text-muted-foreground">Resolution: {failure.resolution}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-xs text-muted-foreground">{failure.time}</p>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="critical" className="m-0 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Unresolved Critical Incidents ({criticalIncidents.length})</h3>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
                <div className="space-y-3">
                  {criticalIncidents.map((incident) => (
                    <Card key={incident.id} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm font-medium text-[#0D3133]">{incident.id}</span>
                            <Badge variant="destructive">Critical</Badge>
                            <Badge variant="outline">{incident.status}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{incident.title}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{incident.age}</p>
                            <p className="text-[10px] text-muted-foreground">Escalation: {incident.escalationLevel}</p>
                          </div>
                          <Button size="sm">View Incident</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}
