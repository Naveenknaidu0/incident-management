"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ComplianceStatusBadge } from "@/components/audit/compliance-status-badge"
import { GovernanceAlertCard } from "@/components/audit/governance-alert-card"
import {
  ViolationsByTypeChart,
  AuditActivityTrendChart,
} from "@/components/audit/audit-analytics-charts"
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  Clock,
  Users,
  GitBranch,
  FileText,
  CheckCircle,
  XCircle,
  AlertOctagon,
  ChevronRight,
  Download,
} from "lucide-react"

const governanceKPIs = [
  { label: "Policy Violations", value: "12", change: "+3 this week", icon: XCircle, status: "critical" as const },
  { label: "Escalation Anomalies", value: "5", change: "-2 vs last week", icon: AlertTriangle, status: "warning" as const },
  { label: "Unauthorized Changes", value: "3", change: "+1 today", icon: AlertOctagon, status: "violated" as const },
  { label: "Audit Failures", value: "0", change: "No issues", icon: CheckCircle, status: "compliant" as const },
  { label: "Workflow Overrides", value: "8", change: "+2 this week", icon: GitBranch, status: "warning" as const },
  { label: "SLA Override Trends", value: "15", change: "Within threshold", icon: Clock, status: "compliant" as const },
]

const policyViolations = [
  { id: "1", policy: "Change Window Policy", entity: "WF-AUTO-023", severity: "critical" as const, time: "1 hour ago", assignee: "Security Team" },
  { id: "2", policy: "Approval Requirement", entity: "INC0042781", severity: "warning" as const, time: "2 hours ago", assignee: "Compliance Team" },
  { id: "3", policy: "SLA Pause Policy", entity: "INC0042756", severity: "violated" as const, time: "3 hours ago", assignee: "Manager Review" },
]

const escalationAnomalies = [
  { id: "1", type: "Skipped Level", incident: "INC0042789", from: "L1", to: "L3", time: "45 min ago" },
  { id: "2", type: "Delayed Escalation", incident: "INC0042756", threshold: "15 min", actual: "32 min", time: "1 hour ago" },
  { id: "3", type: "Manual Override", incident: "INC0042801", reason: "Customer request", time: "2 hours ago" },
]

const unauthorizedChanges = [
  { id: "1", change: "Workflow trigger modified", module: "Automation", user: "Admin User", time: "3 hours ago" },
  { id: "2", change: "SLA policy updated", module: "Settings", user: "Unknown", time: "5 hours ago" },
  { id: "3", change: "Escalation path changed", module: "Settings", user: "Admin User", time: "1 day ago" },
]

export default function GovernanceDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <AppShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#0D3133]">Governance Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Policy compliance, anomaly detection, and operational governance
              </p>
            </div>
            <div className="flex items-center gap-2">
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

        {/* KPI Strip */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-4">
          <div className="grid grid-cols-6 gap-3">
            {governanceKPIs.map((kpi) => {
              const Icon = kpi.icon
              return (
                <Card key={kpi.label} className="border-l-4" style={{ borderLeftColor: kpi.status === "compliant" ? "#22c55e" : kpi.status === "warning" ? "#f59e0b" : "#ef4444" }}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${kpi.status === "compliant" ? "text-green-600" : kpi.status === "warning" ? "text-amber-600" : "text-red-600"}`} />
                      <span className="text-xs text-muted-foreground">{kpi.label}</span>
                    </div>
                    <p className="mt-1 text-xl font-semibold text-[#0D3133]">{kpi.value}</p>
                    <p className="text-xs text-muted-foreground">{kpi.change}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
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
                <TabsTrigger value="anomalies" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <AlertTriangle className="h-4 w-4" />
                  Escalation Anomalies
                </TabsTrigger>
                <TabsTrigger value="unauthorized" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <AlertOctagon className="h-4 w-4" />
                  Unauthorized Changes
                </TabsTrigger>
                <TabsTrigger value="sla" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <Clock className="h-4 w-4" />
                  SLA Governance
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="m-0 p-6">
              <div className="grid grid-cols-3 gap-6">
                {/* Charts */}
                <div className="col-span-2 space-y-6">
                  <AuditActivityTrendChart />
                  <ViolationsByTypeChart />
                </div>

                {/* Active Alerts */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        Active Governance Alerts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {policyViolations.slice(0, 3).map((violation) => (
                        <div key={violation.id} className="flex items-center justify-between p-2 rounded border hover:bg-muted/50 cursor-pointer">
                          <div>
                            <p className="text-xs font-medium">{violation.policy}</p>
                            <p className="text-[10px] text-muted-foreground">{violation.entity} • {violation.time}</p>
                          </div>
                          <ComplianceStatusBadge status={violation.severity} showLabel={false} />
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="w-full text-xs">
                        View All Alerts <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        Compliance Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-[#0D3133]">94.2%</p>
                          <p className="text-xs text-muted-foreground">Overall Compliance</p>
                        </div>
                        <ComplianceStatusBadge status="warning" />
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-amber-500" style={{ width: "94.2%" }} />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-2">Target: 95% compliance rate</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="violations" className="m-0 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Policy Violations ({policyViolations.length})</h3>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
                <div className="space-y-3">
                  {policyViolations.map((violation) => (
                    <Card key={violation.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium">{violation.policy}</h4>
                              <ComplianceStatusBadge status={violation.severity} />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Entity: <span className="font-mono">{violation.entity}</span> • {violation.time}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Assigned to: {violation.assignee}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Acknowledge</Button>
                            <Button size="sm">Investigate</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="anomalies" className="m-0 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Escalation Anomalies ({escalationAnomalies.length})</h3>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
                <div className="space-y-3">
                  {escalationAnomalies.map((anomaly) => (
                    <Card key={anomaly.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">{anomaly.type}</Badge>
                              <span className="font-mono text-xs text-[#0D3133]">{anomaly.incident}</span>
                            </div>
                            {anomaly.from && anomaly.to && (
                              <p className="text-xs text-muted-foreground">
                                Escalation: {anomaly.from} → {anomaly.to}
                              </p>
                            )}
                            {anomaly.threshold && (
                              <p className="text-xs text-muted-foreground">
                                Threshold: {anomaly.threshold} | Actual: {anomaly.actual}
                              </p>
                            )}
                            {anomaly.reason && (
                              <p className="text-xs text-muted-foreground">
                                Reason: {anomaly.reason}
                              </p>
                            )}
                            <p className="text-[10px] text-muted-foreground mt-1">{anomaly.time}</p>
                          </div>
                          <Button size="sm" variant="outline">Review</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="unauthorized" className="m-0 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Unauthorized Changes ({unauthorizedChanges.length})</h3>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
                <div className="space-y-3">
                  {unauthorizedChanges.map((change) => (
                    <Card key={change.id} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-medium">{change.change}</h4>
                            <p className="text-xs text-muted-foreground">
                              Module: {change.module} • User: {change.user}
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-1">{change.time}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Revert</Button>
                            <Button size="sm">Investigate</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sla" className="m-0 p-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">SLA Overrides This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-[#0D3133]">15</div>
                    <p className="text-xs text-muted-foreground">Within acceptable threshold (20)</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Approved Overrides</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Pending Approval</span>
                        <span className="font-medium text-amber-600">2</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Unauthorized</span>
                        <span className="font-medium text-red-600">1</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Escalation Bypasses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-amber-600">5</div>
                    <p className="text-xs text-muted-foreground">Requires review</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>With Manager Approval</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Customer Requested</span>
                        <span className="font-medium">1</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Unreviewed</span>
                        <span className="font-medium text-red-600">1</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}
