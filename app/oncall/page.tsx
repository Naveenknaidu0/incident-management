"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { OnCallKPIStrip } from "@/components/oncall/oncall-kpi-strip"
import { ResponderCard } from "@/components/oncall/responder-card"
import { EscalationCard } from "@/components/oncall/escalation-card"
import { ScheduleCalendar } from "@/components/oncall/schedule-calendar"
import { OnCallContextPanel } from "@/components/oncall/oncall-context-panel"
import { OnCallAnalytics } from "@/components/oncall/oncall-analytics"
import { ResponderStatusBadge } from "@/components/oncall/responder-status-badge"
import {
  Search,
  Plus,
  Calendar,
  Users,
  AlertTriangle,
  Bell,
  Settings,
  Filter,
} from "lucide-react"

const activeResponders = [
  { id: "1", name: "Sarah Chen", initials: "SC", team: "Platform", role: "Sr. SRE", status: "available" as const, escalationLevel: "L1" as const, activeIncidents: 2, currentShift: "Primary", phone: "+1-555-0101", email: "sarah@company.com" },
  { id: "2", name: "John Smith", initials: "JS", team: "Database", role: "DBA Lead", status: "busy" as const, escalationLevel: "L2" as const, activeIncidents: 1, currentShift: "Primary", phone: "+1-555-0102", email: "john@company.com" },
  { id: "3", name: "Emily Davis", initials: "ED", team: "Network", role: "Network Engineer", status: "available" as const, escalationLevel: "L1" as const, activeIncidents: 0, currentShift: "Secondary", phone: "+1-555-0103", email: "emily@company.com" },
  { id: "4", name: "Mike Wilson", initials: "MW", team: "Security", role: "Security Analyst", status: "escalated" as const, escalationLevel: "L3" as const, activeIncidents: 3, currentShift: "Primary", phone: "+1-555-0104", email: "mike@company.com" },
]

const escalations = [
  { id: "1", incidentId: "INC0042781", incidentTitle: "Payment Gateway High Latency", priority: "critical" as const, level: "L2" as const, assignedTo: { name: "John Smith", initials: "JS" }, elapsedTime: "45m", sla: { remaining: "15m", status: "warning" as const }, service: "Payment Gateway", triggeredAt: "14:30" },
  { id: "2", incidentId: "INC0042780", incidentTitle: "Database Connection Pool Exhaustion", priority: "high" as const, level: "L3" as const, assignedTo: { name: "Mike Wilson", initials: "MW" }, elapsedTime: "1h 20m", sla: { remaining: "40m", status: "safe" as const }, service: "Core Database", triggeredAt: "13:55" },
  { id: "3", incidentId: "INC0042779", incidentTitle: "Auth Service Timeout Errors", priority: "high" as const, level: "L1" as const, assignedTo: { name: "Sarah Chen", initials: "SC" }, elapsedTime: "15m", sla: { remaining: "45m", status: "safe" as const }, service: "Auth Service", triggeredAt: "15:00" },
]

const scheduleSlots = [
  { date: "2024-01-15", dayOfWeek: "Mon", dayNum: 15, isToday: false, primary: { name: "Sarah Chen", initials: "SC" }, secondary: { name: "John Smith", initials: "JS" }, hasOverride: false },
  { date: "2024-01-16", dayOfWeek: "Tue", dayNum: 16, isToday: false, primary: { name: "Sarah Chen", initials: "SC" }, secondary: { name: "Emily Davis", initials: "ED" }, hasOverride: false },
  { date: "2024-01-17", dayOfWeek: "Wed", dayNum: 17, isToday: true, primary: { name: "John Smith", initials: "JS" }, secondary: { name: "Mike Wilson", initials: "MW" }, hasOverride: false },
  { date: "2024-01-18", dayOfWeek: "Thu", dayNum: 18, isToday: false, primary: { name: "John Smith", initials: "JS" }, secondary: { name: "Sarah Chen", initials: "SC" }, hasOverride: true },
  { date: "2024-01-19", dayOfWeek: "Fri", dayNum: 19, isToday: false, primary: { name: "Emily Davis", initials: "ED" }, secondary: { name: "Mike Wilson", initials: "MW" }, hasOverride: false },
  { date: "2024-01-20", dayOfWeek: "Sat", dayNum: 20, isToday: false, primary: { name: "Mike Wilson", initials: "MW" }, secondary: null, hasOverride: false },
  { date: "2024-01-21", dayOfWeek: "Sun", dayNum: 21, isToday: false, primary: { name: "Mike Wilson", initials: "MW" }, secondary: null, hasOverride: false },
]

export default function OnCallPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <AppShell>
      <div className="flex h-full">
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0 border-r border-border">
          {/* Header */}
          <div className="shrink-0 border-b border-border bg-card px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-[#0D3133]">On-Call Operations</h1>
                <p className="text-sm text-muted-foreground">Manage responders, escalations, and schedules</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedules
                </Button>
                <Button size="sm" className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                  <Plus className="h-4 w-4" />
                  New Rotation
                </Button>
              </div>
            </div>

            {/* KPI Strip */}
            <OnCallKPIStrip />
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-6 space-y-6">
              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="responders">Responders</TabsTrigger>
                    <TabsTrigger value="escalations">Escalations</TabsTrigger>
                    <TabsTrigger value="schedules">Schedules</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search responders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-64"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <TabsContent value="overview" className="space-y-6">
                  {/* Active Responders */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold text-[#0D3133] flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Active On-Call Responders
                        </CardTitle>
                        <Button variant="ghost" size="sm">View All</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {activeResponders.map((responder) => (
                          <ResponderCard key={responder.id} responder={responder} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Escalations */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold text-[#0D3133] flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          Active Escalations
                          <Badge variant="secondary" className="ml-2">{escalations.length}</Badge>
                        </CardTitle>
                        <Button variant="ghost" size="sm">View All</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {escalations.map((escalation) => (
                          <EscalationCard key={escalation.id} escalation={escalation} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Schedule Calendar */}
                  <ScheduleCalendar slots={scheduleSlots} />
                </TabsContent>

                <TabsContent value="responders">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold text-[#0D3133]">
                        All Responders
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-3">
                        {activeResponders.concat(activeResponders).map((responder, idx) => (
                          <ResponderCard key={`${responder.id}-${idx}`} responder={responder} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="escalations">
                  <div className="space-y-4">
                    {["L1", "L2", "L3", "Manager", "Executive"].map((level) => (
                      <Card key={level}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base font-semibold text-[#0D3133]">
                            {level} Escalations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {escalations
                              .filter((e) => e.level.toUpperCase() === level.toUpperCase() || (level === "Manager" && e.level === "manager") || (level === "Executive" && e.level === "executive"))
                              .map((escalation) => (
                                <EscalationCard key={escalation.id} escalation={escalation} />
                              ))}
                            {escalations.filter((e) => e.level.toUpperCase() === level.toUpperCase()).length === 0 && (
                              <p className="text-sm text-muted-foreground text-center py-4">No {level} escalations</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="schedules">
                  <ScheduleCalendar slots={scheduleSlots} />
                </TabsContent>

                <TabsContent value="analytics">
                  <OnCallAnalytics />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Right Context Panel */}
        <div className="hidden w-[320px] shrink-0 lg:flex lg:flex-col min-h-0">
          <div className="flex-1 overflow-y-auto min-h-0">
            <OnCallContextPanel />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
