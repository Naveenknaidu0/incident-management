"use client"

import { useState } from "react"
import { use } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { MIMHeader } from "@/components/mim/mim-header"
import { LiveStatusBanner } from "@/components/mim/live-status-banner"
import { IncidentTimeline } from "@/components/mim/incident-timeline"
import { WarRoomPanel } from "@/components/mim/war-room-panel"
import { ServiceImpactPanel } from "@/components/mim/service-impact-panel"
import { RecoveryTracker } from "@/components/mim/recovery-tracker"
import { CommunicationCenter } from "@/components/mim/communication-center"
import { ExecutiveSummary } from "@/components/mim/executive-summary"
import { StakeholderPanel } from "@/components/mim/stakeholder-panel"
import { MIMTaskBoard } from "@/components/mim/mim-task-board"
import { PIRSection } from "@/components/mim/pir-section"
import { RightOpsPanel } from "@/components/mim/right-ops-panel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  Users,
  Server,
  MessageSquare,
  TrendingUp,
  Building2,
  ListTodo,
} from "lucide-react"

// Mock data
const mockIncident = {
  id: "MIM0001234",
  title: "Global Payment Processing Outage - All Regions Affected",
  severity: "SEV-1" as const,
  status: "Active - Mitigation in Progress",
  businessImpact: "Critical" as const,
  commander: { name: "Sarah Chen", avatar: "" },
  startTime: "14:32 UTC",
  elapsedDuration: "2h 47m",
  affectedRegions: ["US-East", "EU-West", "APAC"],
  impactedServices: 12,
}

const mockTimelineEvents = [
  {
    id: "1",
    type: "incident-created" as const,
    title: "Major Incident Declared",
    description: "Payment processing failure detected across all regions",
    timestamp: "14:32",
    user: { name: "System" },
    metadata: { Severity: "SEV-1", Impact: "Critical" },
  },
  {
    id: "2",
    type: "war-room" as const,
    title: "War Room Activated",
    description: "Bridge call initiated with core response team",
    timestamp: "14:35",
    user: { name: "Sarah Chen" },
  },
  {
    id: "3",
    type: "escalation" as const,
    title: "Escalated to L3 Engineering",
    description: "Database team engaged for investigation",
    timestamp: "14:42",
    user: { name: "Mike Johnson" },
  },
  {
    id: "4",
    type: "communication" as const,
    title: "Initial Customer Communication Sent",
    description: "Status page updated, customer notification sent",
    timestamp: "14:48",
    user: { name: "Lisa Wong" },
  },
  {
    id: "5",
    type: "service-outage" as const,
    title: "Secondary Service Impact Detected",
    description: "Reporting service showing degraded performance",
    timestamp: "15:02",
    metadata: { Service: "Analytics Dashboard" },
  },
  {
    id: "6",
    type: "recovery-milestone" as const,
    title: "Root Cause Identified",
    description: "Database connection pool exhaustion confirmed",
    timestamp: "15:28",
    user: { name: "David Park" },
  },
  {
    id: "7",
    type: "status-change" as const,
    title: "Mitigation Started",
    description: "Implementing database connection pool increase",
    timestamp: "15:45",
    user: { name: "Emily Brown" },
  },
  {
    id: "8",
    type: "stakeholder-update" as const,
    title: "Executive Update Sent",
    description: "VP of Engineering briefed on current status",
    timestamp: "16:15",
    user: { name: "Sarah Chen" },
  },
]

const mockResponders = [
  { id: "1", name: "Sarah Chen", role: "Incident Commander", team: "SRE", status: "active" as const },
  { id: "2", name: "Mike Johnson", role: "Technical Lead", team: "Platform", status: "active" as const },
  { id: "3", name: "Emily Brown", role: "Database Engineer", team: "DBA", status: "active" as const },
  { id: "4", name: "David Park", role: "Backend Engineer", team: "Payments", status: "active" as const },
  { id: "5", name: "Lisa Wong", role: "Communications Lead", team: "Support", status: "away" as const },
]

const mockSupportTeams = [
  { name: "Platform Engineering", members: 8, active: 4 },
  { name: "Database Team", members: 5, active: 3 },
  { name: "Payment Services", members: 6, active: 2 },
  { name: "Customer Support", members: 12, active: 5 },
]

const mockServices = [
  { id: "1", name: "Payment Gateway", status: "outage" as const, outageDuration: "2h 47m", dependencies: ["Database", "Auth"] },
  { id: "2", name: "Transaction Processing", status: "outage" as const, outageDuration: "2h 47m" },
  { id: "3", name: "Analytics Dashboard", status: "degraded" as const, outageDuration: "1h 22m" },
  { id: "4", name: "Reporting Service", status: "degraded" as const },
  { id: "5", name: "Customer Portal", status: "operational" as const },
]

const mockRegions = [
  { name: "US-East", status: "outage" as const, affectedUsers: 125000 },
  { name: "US-West", status: "degraded" as const, affectedUsers: 45000 },
  { name: "EU-West", status: "outage" as const, affectedUsers: 78000 },
  { name: "APAC", status: "degraded" as const, affectedUsers: 52000 },
]

const mockMilestones = [
  { id: "1", phase: "identified" as const, title: "Issue Identified", status: "completed" as const, completedAt: "14:35" },
  { id: "2", phase: "mitigation" as const, title: "Database Pool Expansion", status: "in-progress" as const, team: "DBA", eta: "30 min" },
  { id: "3", phase: "partial-recovery" as const, title: "US-East Recovery", status: "pending" as const, team: "Platform" },
  { id: "4", phase: "monitoring" as const, title: "Full System Monitoring", status: "pending" as const },
  { id: "5", phase: "resolved" as const, title: "Incident Closure", status: "pending" as const },
]

const mockCommunications = [
  {
    id: "1",
    type: "internal" as const,
    title: "Initial Response Team Notification",
    content: "Major incident declared for payment processing. All hands response initiated.",
    author: { name: "Sarah Chen" },
    timestamp: "14:35",
    severity: "critical" as const,
    status: "sent" as const,
  },
  {
    id: "2",
    type: "stakeholder" as const,
    title: "Executive Briefing",
    content: "Payment processing experiencing critical outage. ETA for resolution: 1-2 hours.",
    author: { name: "Sarah Chen" },
    timestamp: "15:00",
    severity: "critical" as const,
    status: "sent" as const,
  },
  {
    id: "3",
    type: "customer" as const,
    title: "Customer Service Alert",
    content: "We are aware of issues affecting payment processing. Our team is working to resolve.",
    author: { name: "Lisa Wong" },
    timestamp: "14:48",
    severity: "warning" as const,
    status: "sent" as const,
  },
  {
    id: "4",
    type: "status-page" as const,
    title: "Status Page Update",
    content: "Investigating: Payment processing delays affecting all regions.",
    author: { name: "System" },
    timestamp: "14:40",
    severity: "critical" as const,
    status: "sent" as const,
  },
]

const mockStakeholders = [
  { id: "1", name: "Jennifer Lee", role: "executive" as const, title: "VP of Engineering", status: "acknowledged" as const, lastCommunication: "15:00", notificationPreference: "slack" as const },
  { id: "2", name: "Robert Kim", role: "executive" as const, title: "CTO", status: "notified" as const, notificationPreference: "sms" as const },
  { id: "3", name: "Amanda Torres", role: "service-owner" as const, title: "Payment Services Owner", status: "engaged" as const, lastCommunication: "14:45", notificationPreference: "slack" as const },
  { id: "4", name: "Chris Martin", role: "engineering-lead" as const, title: "Platform Lead", status: "engaged" as const, notificationPreference: "email" as const },
  { id: "5", name: "Stripe Support", role: "vendor" as const, title: "Payment Processor", organization: "Stripe", status: "notified" as const, notificationPreference: "email" as const },
]

const mockTasks = [
  { id: "1", title: "Increase database connection pool", owner: { name: "Emily Brown" }, team: "DBA", priority: "critical" as const, status: "in-progress" as const, eta: "20 min" },
  { id: "2", title: "Deploy hotfix to payment gateway", owner: { name: "David Park" }, team: "Payments", priority: "critical" as const, status: "pending" as const, eta: "45 min" },
  { id: "3", title: "Monitor transaction throughput", owner: { name: "Mike Johnson" }, team: "Platform", priority: "high" as const, status: "in-progress" as const },
  { id: "4", title: "Prepare customer communication", owner: { name: "Lisa Wong" }, team: "Support", priority: "high" as const, status: "completed" as const, completedAt: "14:48" },
  { id: "5", title: "Notify enterprise customers directly", team: "Support", priority: "medium" as const, status: "pending" as const },
]

const mockRightPanelData = {
  escalations: [
    { id: "1", level: "L3", target: "Database Team", time: "45m ago" },
    { id: "2", level: "Exec", target: "VP Engineering", time: "30m ago" },
  ],
  customers: [
    { id: "1", name: "Acme Corp", tier: "enterprise" as const, status: "escalated" as const },
    { id: "2", name: "TechStart Inc", tier: "business" as const, status: "notified" as const },
    { id: "3", name: "GlobalRetail", tier: "enterprise" as const, status: "escalated" as const },
    { id: "4", name: "FinanceHub", tier: "enterprise" as const, status: "monitoring" as const },
  ],
  slaRisks: [
    { id: "1", type: "Response SLA", remaining: "13 min", status: "warning" as const },
    { id: "2", type: "Resolution SLA", remaining: "1h 23m", status: "safe" as const },
    { id: "3", type: "Communication SLA", remaining: "BREACHED", status: "breach" as const },
  ],
  relatedIncidents: [
    { id: "INC0042781", title: "Database connection timeout", severity: "P2", status: "Linked" },
    { id: "INC0042779", title: "API latency spike", severity: "P3", status: "Related" },
  ],
  responderActivity: [
    { id: "1", name: "Emily Brown", action: "Updated task status", time: "2m ago" },
    { id: "2", name: "David Park", action: "Added comment", time: "5m ago" },
    { id: "3", name: "Sarah Chen", action: "Sent exec update", time: "12m ago" },
  ],
  dependencies: [
    { id: "1", name: "Auth Service", type: "upstream" as const, status: "healthy" as const },
    { id: "2", name: "Database Cluster", type: "upstream" as const, status: "degraded" as const },
    { id: "3", name: "Analytics", type: "downstream" as const, status: "degraded" as const },
    { id: "4", name: "Notifications", type: "downstream" as const, status: "healthy" as const },
  ],
}

export default function MIMWorkbenchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState("timeline")

  return (
    <AppShell>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Live Status Banner */}
        <LiveStatusBanner
          severity={mockIncident.severity}
          status={mockIncident.status}
          impactedServices={mockIncident.impactedServices}
          recoveryProgress={35}
          lastUpdate="3 min ago"
        />

        {/* MIM Header */}
        <MIMHeader incident={mockIncident} />

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left/Center Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
              <TabsList className="shrink-0 w-full justify-start rounded-none border-b bg-card px-4 h-10">
                <TabsTrigger value="timeline" className="text-xs gap-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  Timeline
                </TabsTrigger>
                <TabsTrigger value="war-room" className="text-xs gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  War Room
                </TabsTrigger>
                <TabsTrigger value="impact" className="text-xs gap-1.5">
                  <Server className="h-3.5 w-3.5" />
                  Service Impact
                </TabsTrigger>
                <TabsTrigger value="comms" className="text-xs gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Communications
                </TabsTrigger>
                <TabsTrigger value="recovery" className="text-xs gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Recovery
                </TabsTrigger>
                <TabsTrigger value="stakeholders" className="text-xs gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  Stakeholders
                </TabsTrigger>
                <TabsTrigger value="tasks" className="text-xs gap-1.5">
                  <ListTodo className="h-3.5 w-3.5" />
                  Tasks
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="timeline" className="h-full m-0 p-4 overflow-y-auto scrollbar-thin">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Card>
                        <CardHeader className="py-3 px-4">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Activity className="h-4 w-4 text-[#E69F50]" />
                            Live Incident Timeline
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 pt-0">
                          <IncidentTimeline events={mockTimelineEvents} />
                        </CardContent>
                      </Card>
                    </div>
                    <div className="space-y-4">
                      <ExecutiveSummary
                        businessImpact="Critical"
                        outageDuration="2h 47m"
                        affectedRevenueServices={4}
                        escalatedCustomers={23}
                        communicationsSent={12}
                        recoveryProgress={35}
                        estimatedRevenueLoss="$1.2M/hour"
                      />
                      <PIRSection
                        incidentId={id}
                        canCreatePIR={false}
                        rootCausePlaceholder="Database connection pool exhaustion due to traffic spike"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="war-room" className="h-full m-0 p-4 overflow-y-auto scrollbar-thin">
                  <div className="grid grid-cols-2 gap-4">
                    <WarRoomPanel
                      responders={mockResponders}
                      supportTeams={mockSupportTeams}
                      slackChannel="#mim-payment-outage"
                      teamsChannel="MIM Response Team"
                    />
                    <MIMTaskBoard tasks={mockTasks} />
                  </div>
                </TabsContent>

                <TabsContent value="impact" className="h-full m-0 p-4 overflow-y-auto scrollbar-thin">
                  <ServiceImpactPanel
                    services={mockServices}
                    regions={mockRegions}
                    totalAffectedUsers={300000}
                    affectedCustomers={847}
                  />
                </TabsContent>

                <TabsContent value="comms" className="h-full m-0 overflow-hidden">
                  <CommunicationCenter communications={mockCommunications} />
                </TabsContent>

                <TabsContent value="recovery" className="h-full m-0 p-4 overflow-y-auto scrollbar-thin">
                  <RecoveryTracker
                    currentPhase="mitigation"
                    milestones={mockMilestones}
                    estimatedRecovery="45 min"
                  />
                </TabsContent>

                <TabsContent value="stakeholders" className="h-full m-0 p-4 overflow-y-auto scrollbar-thin">
                  <StakeholderPanel stakeholders={mockStakeholders} />
                </TabsContent>

                <TabsContent value="tasks" className="h-full m-0 p-4 overflow-y-auto scrollbar-thin">
                  <MIMTaskBoard tasks={mockTasks} />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Right Operational Panel */}
          <div className="w-72 shrink-0 border-l border-border bg-card overflow-hidden">
            <RightOpsPanel {...mockRightPanelData} />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
