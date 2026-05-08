"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CommKPIStrip } from "@/components/communications/comm-kpi-strip"
import { MessageCard } from "@/components/communications/message-card"
import { MessageComposer } from "@/components/communications/message-composer"
import { CommTimeline } from "@/components/communications/comm-timeline"
import { CommContextPanel } from "@/components/communications/comm-context-panel"
import { CommAnalytics } from "@/components/communications/comm-analytics"
import {
  Home,
  Search,
  Plus,
  RefreshCw,
  Filter,
  Download,
  Settings,
  PenSquare,
} from "lucide-react"

const mockMessages = [
  {
    id: "MSG001",
    subject: "Major Incident Update - Payment Gateway Outage",
    preview: "We are currently experiencing degraded performance on our payment processing systems. Engineering teams are actively investigating...",
    sender: { name: "Sarah Chen", initials: "SC" },
    sentAt: "5 min ago",
    status: "delivered" as const,
    priority: "critical" as const,
    channels: ["email" as const, "slack" as const, "sms" as const],
    audience: "All Stakeholders",
    incidentId: "INC0042781",
  },
  {
    id: "MSG002",
    subject: "Executive Briefing - Q4 Service Availability",
    preview: "Summary of service availability metrics for Q4 2024. Overall uptime maintained at 99.95% across all critical services...",
    sender: { name: "John Smith", initials: "JS" },
    sentAt: "1 hour ago",
    status: "read" as const,
    priority: "executive-critical" as const,
    channels: ["email" as const],
    audience: "Executives",
  },
  {
    id: "MSG003",
    subject: "SLA Breach Warning - Database Response Time",
    preview: "Warning: Database response times are approaching SLA thresholds. Current P95 latency is 450ms against 500ms target...",
    sender: { name: "System", initials: "SY" },
    sentAt: "2 hours ago",
    status: "acknowledged" as const,
    priority: "warning" as const,
    channels: ["email" as const, "slack" as const],
    audience: "Service Owners",
    incidentId: "INC0042756",
  },
  {
    id: "MSG004",
    subject: "Maintenance Complete - CDN Edge Nodes",
    preview: "Scheduled maintenance on CDN edge nodes has been completed successfully. All services are operating normally...",
    sender: { name: "Mike Wilson", initials: "MW" },
    sentAt: "3 hours ago",
    status: "delivered" as const,
    priority: "informational" as const,
    channels: ["email" as const, "status-page" as const],
    audience: "Customers",
  },
  {
    id: "MSG005",
    subject: "Failed Delivery Alert",
    preview: "Unable to deliver notification to 3 recipients. Please review and retry...",
    sender: { name: "System", initials: "SY" },
    sentAt: "4 hours ago",
    status: "failed" as const,
    priority: "warning" as const,
    channels: ["email" as const],
    audience: "Operations Team",
  },
]

const timelineEvents = [
  {
    id: "1",
    type: "sent" as const,
    subject: "Major Incident Update - Payment Gateway",
    sender: { name: "Sarah Chen", initials: "SC" },
    timestamp: "5 min ago",
    channel: "email" as const,
    priority: "critical" as const,
    audience: "All Stakeholders",
  },
  {
    id: "2",
    type: "acknowledged" as const,
    subject: "Executive Briefing",
    sender: { name: "John Smith", initials: "JS" },
    timestamp: "1 hour ago",
    details: "Acknowledged by CTO, VP Engineering",
  },
  {
    id: "3",
    type: "escalated" as const,
    subject: "SLA Breach - Database",
    sender: { name: "System", initials: "SY" },
    timestamp: "2 hours ago",
    details: "Escalated to L2 Engineering",
  },
  {
    id: "4",
    type: "broadcast" as const,
    subject: "Service Restoration Notice",
    sender: { name: "Mike Wilson", initials: "MW" },
    timestamp: "3 hours ago",
    audience: "847 recipients",
  },
  {
    id: "5",
    type: "failed" as const,
    subject: "Customer Notification",
    sender: { name: "System", initials: "SY" },
    timestamp: "4 hours ago",
    details: "3 delivery failures",
  },
]

export default function CommunicationsPage() {
  const [showComposer, setShowComposer] = useState(false)
  const [activeTab, setActiveTab] = useState("internal")

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
                <BreadcrumbPage>Communications</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#0D3133]">Communication Center</h1>
              <p className="text-sm text-muted-foreground">Manage notifications and stakeholder communications</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <Settings className="h-3.5 w-3.5" />
                Settings
              </Button>
              <Button
                size="sm"
                className="h-8 gap-1.5 bg-[#0D3133] hover:bg-[#0D3133]/90"
                onClick={() => setShowComposer(true)}
              >
                <PenSquare className="h-3.5 w-3.5" />
                Compose
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <CommKPIStrip />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 min-h-0">
          {/* Left: Messages & Timeline */}
          <div className="flex flex-1 flex-col min-h-0 border-r border-border">
            {/* Toolbar */}
            <div className="shrink-0 border-b border-border px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search communications..." className="h-8 pl-8 text-sm" />
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1.5">
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Tabs Content */}
            <div className="flex-1 overflow-y-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                <div className="sticky top-0 bg-card border-b border-border px-4">
                  <TabsList className="h-10 bg-transparent p-0 gap-4">
                    <TabsTrigger
                      value="internal"
                      className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                    >
                      Internal
                    </TabsTrigger>
                    <TabsTrigger
                      value="stakeholder"
                      className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                    >
                      Stakeholder
                    </TabsTrigger>
                    <TabsTrigger
                      value="executive"
                      className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                    >
                      Executive
                    </TabsTrigger>
                    <TabsTrigger
                      value="customer"
                      className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                    >
                      Customer
                    </TabsTrigger>
                    <TabsTrigger
                      value="broadcast"
                      className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                    >
                      Broadcasts
                    </TabsTrigger>
                    <TabsTrigger
                      value="timeline"
                      className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                    >
                      Timeline
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="internal" className="mt-0 p-4">
                  {showComposer && (
                    <div className="mb-4">
                      <MessageComposer onClose={() => setShowComposer(false)} />
                    </div>
                  )}
                  <div className="space-y-3">
                    {mockMessages.map((message) => (
                      <MessageCard key={message.id} {...message} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="stakeholder" className="mt-0 p-4">
                  <div className="space-y-3">
                    {mockMessages.filter((m) => m.audience.includes("Stakeholder")).map((message) => (
                      <MessageCard key={message.id} {...message} />
                    ))}
                    {mockMessages.length > 0 && (
                      <MessageCard {...mockMessages[0]} audience="Service Owners" />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="executive" className="mt-0 p-4">
                  <div className="space-y-3">
                    {mockMessages.filter((m) => m.priority === "executive-critical").map((message) => (
                      <MessageCard key={message.id} {...message} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="customer" className="mt-0 p-4">
                  <div className="space-y-3">
                    {mockMessages.filter((m) => m.audience === "Customers").map((message) => (
                      <MessageCard key={message.id} {...message} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="broadcast" className="mt-0 p-4">
                  <div className="space-y-3">
                    {mockMessages.slice(0, 3).map((message) => (
                      <MessageCard key={message.id} {...message} audience="All Recipients (847)" />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="mt-0 p-4">
                  <CommTimeline events={timelineEvents} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Analytics Footer */}
            <div className="shrink-0 border-t border-border p-4">
              <CommAnalytics />
            </div>
          </div>

          {/* Right: Context Panel */}
          <div className="hidden w-[320px] shrink-0 lg:flex lg:flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-4">
              <CommContextPanel />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
