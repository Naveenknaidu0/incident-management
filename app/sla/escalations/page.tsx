"use client"

import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EscalationCard } from "@/components/sla/escalation-card"
import { EscalationTimeline } from "@/components/sla/escalation-timeline"
import { SLAContextPanel } from "@/components/sla/sla-context-panel"
import { RefreshCw, Filter } from "lucide-react"

// Mock data
const escalationsByLevel = {
  level1: [
    {
      incidentId: "INC0042781",
      incidentTitle: "Payment Gateway Timeout Errors",
      slaBreached: "Resolution SLA",
      escalationOwner: { name: "John Smith", initials: "JS", role: "Team Lead" },
      impactedService: "Payment Gateway",
      businessImpact: "high" as const,
      elapsedOverdue: "00:45:23",
      escalationLevel: 1,
    },
    {
      incidentId: "INC0042785",
      incidentTitle: "Email Service Delivery Delays",
      slaBreached: "Response SLA",
      escalationOwner: { name: "Sarah Johnson", initials: "SJ", role: "Team Lead" },
      impactedService: "Email Service",
      businessImpact: "medium" as const,
      elapsedOverdue: "00:32:10",
      escalationLevel: 1,
    },
  ],
  level2: [
    {
      incidentId: "INC0042779",
      incidentTitle: "Database Connection Pool Exhaustion",
      slaBreached: "Resolution SLA",
      escalationOwner: { name: "Michael Chen", initials: "MC", role: "Sr. Manager" },
      impactedService: "Database Cluster",
      businessImpact: "critical" as const,
      elapsedOverdue: "01:15:47",
      escalationLevel: 2,
    },
  ],
  manager: [
    {
      incidentId: "INC0042776",
      incidentTitle: "SSL Certificate Expiry Warning",
      slaBreached: "Resolution SLA",
      escalationOwner: { name: "David Wilson", initials: "DW", role: "IT Manager" },
      impactedService: "Security Infrastructure",
      businessImpact: "high" as const,
      elapsedOverdue: "02:30:15",
      escalationLevel: 3,
    },
  ],
  critical: [
    {
      incidentId: "INC0042770",
      incidentTitle: "Core Banking System Outage",
      slaBreached: "Resolution SLA",
      escalationOwner: { name: "Jennifer Lee", initials: "JL", role: "Director" },
      impactedService: "Core Banking",
      businessImpact: "critical" as const,
      elapsedOverdue: "04:12:33",
      escalationLevel: 4,
    },
  ],
  majorIncident: [
    {
      incidentId: "MJR0000123",
      incidentTitle: "Complete Service Degradation - All Regions",
      slaBreached: "Major Incident SLA",
      escalationOwner: { name: "Robert Martinez", initials: "RM", role: "VP Operations" },
      impactedService: "All Services",
      businessImpact: "critical" as const,
      elapsedOverdue: "06:45:00",
      escalationLevel: 5,
    },
  ],
}

const timelineEvents = [
  { id: "1", type: "sla_started" as const, title: "SLA Started", description: "Resolution SLA clock started", timestamp: "09:00:00" },
  { id: "2", type: "warning_triggered" as const, title: "Warning Threshold", description: "50% of SLA time elapsed", timestamp: "11:00:00" },
  { id: "3", type: "escalation_triggered" as const, title: "Level 1 Escalation", description: "Escalated to Team Lead", timestamp: "12:30:00", actor: "System", level: 1 },
  { id: "4", type: "reassignment" as const, title: "Reassigned", description: "Moved to Database Team", timestamp: "12:45:00", actor: "John Smith" },
  { id: "5", type: "management_notification" as const, title: "Management Notified", description: "IT Manager notified via email", timestamp: "13:00:00" },
  { id: "6", type: "escalation_triggered" as const, title: "Level 2 Escalation", description: "Escalated to Sr. Manager", timestamp: "13:30:00", actor: "System", level: 2 },
  { id: "7", type: "sla_breach" as const, title: "SLA Breached", description: "Resolution SLA exceeded", timestamp: "14:00:00" },
]

const contextData = {
  assignmentLoad: [
    { name: "John Smith", initials: "JS", load: 8, capacity: 10 },
    { name: "Sarah Johnson", initials: "SJ", load: 12, capacity: 10 },
    { name: "Michael Chen", initials: "MC", load: 6, capacity: 10 },
  ],
  businessImpact: {
    level: "critical" as const,
    affectedUsers: 125000,
    revenue: "$45,000/hr",
  },
  affectedServices: [
    { name: "Payment Gateway", status: "degraded" as const },
    { name: "Authentication", status: "operational" as const },
    { name: "Database Cluster", status: "outage" as const },
  ],
  escalationPath: [
    { level: 1, role: "Team Lead", name: "John Smith" },
    { level: 2, role: "Sr. Manager", name: "Michael Chen" },
    { level: 3, role: "IT Manager", name: "David Wilson" },
    { level: 4, role: "Director", name: "Jennifer Lee" },
  ],
  linkedIncidents: [
    { id: "INC0042780", title: "Auth Service Issues", status: "In Progress" },
    { id: "INC0042782", title: "API Timeout", status: "Open" },
  ],
}

export default function EscalationCenterPage() {
  return (
    <AppShell>
      <div className="flex h-full overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <div className="shrink-0 border-b border-border bg-card px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">Escalation Center</h1>
                <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                  {Object.values(escalationsByLevel).flat().length} Active
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="mr-1.5 h-3.5 w-3.5" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <Tabs defaultValue="level1" className="space-y-4">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="level1" className="text-xs">
                  Level 1 ({escalationsByLevel.level1.length})
                </TabsTrigger>
                <TabsTrigger value="level2" className="text-xs">
                  Level 2 ({escalationsByLevel.level2.length})
                </TabsTrigger>
                <TabsTrigger value="manager" className="text-xs">
                  Manager ({escalationsByLevel.manager.length})
                </TabsTrigger>
                <TabsTrigger value="critical" className="text-xs">
                  Critical ({escalationsByLevel.critical.length})
                </TabsTrigger>
                <TabsTrigger value="majorIncident" className="text-xs">
                  Major Incident ({escalationsByLevel.majorIncident.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="level1" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {escalationsByLevel.level1.map((escalation) => (
                    <EscalationCard key={escalation.incidentId} {...escalation} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="level2" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {escalationsByLevel.level2.map((escalation) => (
                    <EscalationCard key={escalation.incidentId} {...escalation} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="manager" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {escalationsByLevel.manager.map((escalation) => (
                    <EscalationCard key={escalation.incidentId} {...escalation} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="critical" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {escalationsByLevel.critical.map((escalation) => (
                    <EscalationCard key={escalation.incidentId} {...escalation} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="majorIncident" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {escalationsByLevel.majorIncident.map((escalation) => (
                    <EscalationCard key={escalation.incidentId} {...escalation} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Escalation Timeline */}
            <div className="mt-8">
              <h2 className="text-sm font-medium text-foreground mb-4">Recent Escalation Activity</h2>
              <div className="rounded-lg border border-border bg-card p-4">
                <EscalationTimeline events={timelineEvents} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 shrink-0 border-l border-border bg-muted/30 overflow-y-auto p-4">
          <h2 className="text-sm font-medium text-foreground mb-4">Context</h2>
          <SLAContextPanel {...contextData} />
        </div>
      </div>
    </AppShell>
  )
}
