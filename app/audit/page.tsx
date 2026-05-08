"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuditKPIStrip } from "@/components/audit/audit-kpi-strip"
import { AuditFilterBar } from "@/components/audit/audit-filter-bar"
import { AuditEventTable, type AuditEvent } from "@/components/audit/audit-event-table"
import { AuditTimeline } from "@/components/audit/audit-timeline"
import { AuditContextPanel } from "@/components/audit/audit-context-panel"
import { GovernanceAlertCard } from "@/components/audit/governance-alert-card"
import {
  AuditActivityTrendChart,
  ViolationsByTypeChart,
  EventDistributionChart,
  WorkflowChangesChart,
} from "@/components/audit/audit-analytics-charts"
import {
  Activity,
  Settings,
  GitBranch,
  Clock,
  AlertTriangle,
  Shield,
  TrendingUp,
  Download,
} from "lucide-react"

const mockAuditEvents: AuditEvent[] = [
  {
    id: "AUD001",
    timestamp: "2024-01-15 15:42:33",
    eventType: "status-changed",
    entity: "INC0042781",
    entityId: "INC0042781",
    action: "Status changed from 'In Progress' to 'Resolved'",
    previousValue: "In Progress",
    newValue: "Resolved",
    performedBy: { name: "Sarah Chen" },
    sourceModule: "Incidents",
  },
  {
    id: "AUD002",
    timestamp: "2024-01-15 15:38:12",
    eventType: "escalation-triggered",
    entity: "INC0042756",
    entityId: "INC0042756",
    action: "Escalated to Level 3 - Engineering",
    previousValue: "L2",
    newValue: "L3",
    performedBy: { name: "System" },
    sourceModule: "Automation",
  },
  {
    id: "AUD003",
    timestamp: "2024-01-15 15:35:45",
    eventType: "sla-modified",
    entity: "INC0042781",
    entityId: "INC0042781",
    action: "SLA clock paused - awaiting customer response",
    previousValue: "Running",
    newValue: "Paused",
    performedBy: { name: "Mike Johnson" },
    sourceModule: "SLA",
  },
  {
    id: "AUD004",
    timestamp: "2024-01-15 15:30:18",
    eventType: "workflow-updated",
    entity: "WF-AUTO-023",
    entityId: "WF-AUTO-023",
    action: "Modified trigger conditions for critical escalation workflow",
    previousValue: "Priority = P1",
    newValue: "Priority = P1 OR Impact = Critical",
    performedBy: { name: "Admin User" },
    sourceModule: "Automation",
  },
  {
    id: "AUD005",
    timestamp: "2024-01-15 15:25:03",
    eventType: "assignment-changed",
    entity: "INC0042789",
    entityId: "INC0042789",
    action: "Reassigned from Service Desk to Network Team",
    previousValue: "Service Desk",
    newValue: "Network Team",
    performedBy: { name: "Sarah Chen" },
    sourceModule: "Incidents",
  },
  {
    id: "AUD006",
    timestamp: "2024-01-15 15:20:44",
    eventType: "configuration-updated",
    entity: "SLA-POL-001",
    entityId: "SLA-POL-001",
    action: "Updated response time target for P1 incidents",
    previousValue: "15 minutes",
    newValue: "10 minutes",
    performedBy: { name: "Admin User" },
    sourceModule: "Settings",
  },
  {
    id: "AUD007",
    timestamp: "2024-01-15 15:15:22",
    eventType: "notification-sent",
    entity: "INC0042756",
    entityId: "INC0042756",
    action: "Sent escalation notification to on-call engineer",
    performedBy: { name: "System" },
    sourceModule: "Notifications",
  },
  {
    id: "AUD008",
    timestamp: "2024-01-15 15:10:11",
    eventType: "incident-created",
    entity: "INC0042792",
    entityId: "INC0042792",
    action: "New incident created via email integration",
    newValue: "P2 - High",
    performedBy: { name: "Email Parser" },
    sourceModule: "Integrations",
  },
]

const mockTimelineEvents = mockAuditEvents.slice(0, 5).map((e) => ({
  id: e.id,
  timestamp: e.timestamp,
  eventType: e.eventType,
  entity: e.entity,
  action: e.action,
  performedBy: e.performedBy,
}))

const mockGovernanceAlerts = [
  {
    id: "GOV001",
    title: "SLA Override Without Approval",
    description: "SLA for INC0042781 was paused without manager approval",
    severity: "warning" as const,
    timestamp: "15 min ago",
    triggeredBy: "Mike Johnson",
    entity: "INC0042781",
    entityLink: "/incidents/INC0042781",
  },
  {
    id: "GOV002",
    title: "Escalation Bypass Detected",
    description: "L2 escalation was skipped for critical incident",
    severity: "critical" as const,
    timestamp: "32 min ago",
    triggeredBy: "System",
    entity: "INC0042756",
    entityLink: "/incidents/INC0042756",
  },
  {
    id: "GOV003",
    title: "Unauthorized Workflow Modification",
    description: "Production workflow modified outside change window",
    severity: "violated" as const,
    timestamp: "1 hour ago",
    triggeredBy: "Admin User",
    entity: "WF-AUTO-023",
    entityLink: "/automation/workflows/WF-AUTO-023",
  },
]

export default function AuditPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all-events")

  const handleSearch = (query: string) => {
    console.log("Search:", query)
  }

  const handleFilter = (filters: Record<string, string>) => {
    console.log("Filters:", filters)
  }

  const handleExport = () => {
    console.log("Export audit log")
  }

  const handleRefresh = () => {
    console.log("Refresh audit log")
  }

  const handleEventClick = (event: AuditEvent) => {
    console.log("Event clicked:", event)
  }

  return (
    <AppShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#0D3133]">Audit Command Center</h1>
              <p className="text-sm text-muted-foreground">
                Enterprise audit tracking, governance, and compliance monitoring
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Button size="sm" className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Shield className="h-4 w-4" />
                Compliance Report
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-4">
          <AuditKPIStrip />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 min-h-0">
          {/* Left Content */}
          <div className="flex flex-1 flex-col min-h-0 border-r border-border">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col min-h-0">
              <div className="shrink-0 border-b border-border px-4">
                <TabsList className="h-10 bg-transparent p-0">
                  <TabsTrigger value="all-events" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                    <Activity className="h-4 w-4" />
                    All Events
                  </TabsTrigger>
                  <TabsTrigger value="configuration" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                    <Settings className="h-4 w-4" />
                    Configuration
                  </TabsTrigger>
                  <TabsTrigger value="workflows" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                    <GitBranch className="h-4 w-4" />
                    Workflows
                  </TabsTrigger>
                  <TabsTrigger value="sla" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                    <Clock className="h-4 w-4" />
                    SLA
                  </TabsTrigger>
                  <TabsTrigger value="governance" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                    <AlertTriangle className="h-4 w-4" />
                    Governance
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                    <TrendingUp className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all-events" className="flex-1 flex flex-col m-0 min-h-0">
                <AuditFilterBar
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                  onExport={handleExport}
                  onRefresh={handleRefresh}
                />
                <div className="flex-1 overflow-y-auto">
                  <AuditEventTable
                    events={mockAuditEvents}
                    selectedIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                    onEventClick={handleEventClick}
                    currentPage={currentPage}
                    totalPages={125}
                    onPageChange={setCurrentPage}
                    totalCount={24892}
                    pageSize={20}
                  />
                </div>
              </TabsContent>

              <TabsContent value="configuration" className="flex-1 flex flex-col m-0 min-h-0">
                <AuditFilterBar
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                  onExport={handleExport}
                  onRefresh={handleRefresh}
                />
                <div className="flex-1 overflow-y-auto">
                  <AuditEventTable
                    events={mockAuditEvents.filter((e) => e.eventType === "configuration-updated")}
                    selectedIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                    onEventClick={handleEventClick}
                    currentPage={1}
                    totalPages={8}
                    onPageChange={setCurrentPage}
                    totalCount={156}
                    pageSize={20}
                  />
                </div>
              </TabsContent>

              <TabsContent value="workflows" className="flex-1 flex flex-col m-0 min-h-0">
                <AuditFilterBar
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                  onExport={handleExport}
                  onRefresh={handleRefresh}
                />
                <div className="flex-1 overflow-y-auto">
                  <AuditEventTable
                    events={mockAuditEvents.filter((e) => e.eventType === "workflow-updated")}
                    selectedIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                    onEventClick={handleEventClick}
                    currentPage={1}
                    totalPages={2}
                    onPageChange={setCurrentPage}
                    totalCount={34}
                    pageSize={20}
                  />
                </div>
              </TabsContent>

              <TabsContent value="sla" className="flex-1 flex flex-col m-0 min-h-0">
                <AuditFilterBar
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                  onExport={handleExport}
                  onRefresh={handleRefresh}
                />
                <div className="flex-1 overflow-y-auto">
                  <AuditEventTable
                    events={mockAuditEvents.filter((e) => e.eventType === "sla-modified")}
                    selectedIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                    onEventClick={handleEventClick}
                    currentPage={1}
                    totalPages={5}
                    onPageChange={setCurrentPage}
                    totalCount={89}
                    pageSize={20}
                  />
                </div>
              </TabsContent>

              <TabsContent value="governance" className="flex-1 m-0 overflow-y-auto">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Active Governance Alerts</h3>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  <div className="space-y-3">
                    {mockGovernanceAlerts.map((alert) => (
                      <GovernanceAlertCard
                        key={alert.id}
                        {...alert}
                        onAcknowledge={() => console.log("Acknowledge", alert.id)}
                        onInvestigate={() => console.log("Investigate", alert.id)}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="flex-1 m-0 overflow-y-auto">
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <AuditActivityTrendChart />
                    <ViolationsByTypeChart />
                    <EventDistributionChart />
                    <WorkflowChangesChart />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Context Panel */}
          <div className="hidden w-[320px] shrink-0 lg:block min-h-0">
            <AuditContextPanel />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
