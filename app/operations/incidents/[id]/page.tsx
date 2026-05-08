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
import { Home } from "lucide-react"
import { IncidentHeader } from "@/components/incidents/incident-header"
import { IncidentTabs } from "@/components/incidents/incident-tabs"
import { ActivityTimeline } from "@/components/incidents/activity-timeline"
import { ContextPanel } from "@/components/incidents/context-panel"
import { OverviewTab } from "@/components/incidents/tabs/overview-tab"
import { TasksTab } from "@/components/incidents/tabs/tasks-tab"
import { CommunicationsTab } from "@/components/incidents/tabs/communications-tab"
import { SLATab } from "@/components/incidents/tabs/sla-tab"
import { TimelineTab } from "@/components/incidents/tabs/timeline-tab"
import { AuditTab } from "@/components/incidents/tabs/audit-tab"
import { RelatedRecordsTab } from "@/components/incidents/tabs/related-records-tab"
import { KnowledgeTab } from "@/components/incidents/tabs/knowledge-tab"
import { AIInsightsTab } from "@/components/incidents/tabs/ai-insights-tab"

const mockIncident = {
  id: "INC0042781",
  title: "Payment Gateway - Transaction Failures Affecting Multiple Regions",
  priority: "critical" as const,
  status: "in-progress" as const,
  sla: { remaining: "00:45:22", status: "warning" as const },
  assignee: "Sarah Chen",
  assignmentGroup: "Payment Ops",
  impact: "High",
  urgency: "Critical",
}

export default function IncidentDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />
      case "activity":
        return <ActivityTimeline />
      case "tasks":
        return <TasksTab />
      case "communications":
        return <CommunicationsTab />
      case "sla":
        return <SLATab />
      case "related":
        return <RelatedRecordsTab />
      case "timeline":
        return <TimelineTab />
      case "audit":
        return <AuditTab />
      case "knowledge":
        return <KnowledgeTab />
      case "ai-insights":
        return <AIInsightsTab />
      default:
        return <OverviewTab />
    }
  }

  return (
    <AppShell>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Breadcrumb */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1">
                    <Home className="h-3.5 w-3.5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/incidents/all">Incidents</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{mockIncident.id}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Sticky Header - 72px */}
        <IncidentHeader incident={mockIncident} />

        {/* Sticky Tabs */}
        <IncidentTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Workspace - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 min-w-0">
            {renderTabContent()}
          </div>

          {/* Right Context Panel - Sticky with independent scroll */}
          <div className="hidden xl:block w-80 shrink-0 border-l border-border bg-card px-4">
            <ContextPanel />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
