"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EscalationCard } from "@/components/oncall/escalation-card"
import { EscalationLevelBadge } from "@/components/oncall/escalation-level-badge"
import {
  Search,
  Filter,
  AlertTriangle,
  Clock,
  Users,
  ArrowUpRight,
} from "lucide-react"

const escalations = [
  { id: "1", incidentId: "INC0042781", incidentTitle: "Payment Gateway High Latency", priority: "critical" as const, level: "L1" as const, assignedTo: { name: "Sarah Chen", initials: "SC" }, elapsedTime: "15m", sla: { remaining: "45m", status: "safe" as const }, service: "Payment Gateway", triggeredAt: "15:00" },
  { id: "2", incidentId: "INC0042780", incidentTitle: "Database Connection Pool Exhaustion", priority: "critical" as const, level: "L2" as const, assignedTo: { name: "John Smith", initials: "JS" }, elapsedTime: "45m", sla: { remaining: "15m", status: "warning" as const }, service: "Core Database", triggeredAt: "14:30" },
  { id: "3", incidentId: "INC0042779", incidentTitle: "Auth Service Timeout Errors", priority: "high" as const, level: "L3" as const, assignedTo: { name: "Mike Wilson", initials: "MW" }, elapsedTime: "1h 20m", sla: { remaining: "40m", status: "safe" as const }, service: "Auth Service", triggeredAt: "13:55" },
  { id: "4", incidentId: "INC0042778", incidentTitle: "Network Switch Failure", priority: "critical" as const, level: "manager" as const, assignedTo: { name: "Emily Davis", initials: "ED" }, elapsedTime: "2h 10m", sla: { remaining: "5m", status: "breach" as const }, service: "Network Infrastructure", triggeredAt: "13:05" },
  { id: "5", incidentId: "INC0042777", incidentTitle: "Data Center Power Issue", priority: "critical" as const, level: "executive" as const, assignedTo: { name: "David Lee", initials: "DL" }, elapsedTime: "3h", sla: { remaining: "0m", status: "breached" as const }, service: "Data Center", triggeredAt: "12:15" },
]

const escalationLevels = [
  { level: "L1" as const, label: "L1 Support", count: 1 },
  { level: "L2" as const, label: "L2 Engineering", count: 1 },
  { level: "L3" as const, label: "L3 Specialists", count: 1 },
  { level: "manager" as const, label: "Manager Escalation", count: 1 },
  { level: "executive" as const, label: "Executive Escalation", count: 1 },
]

export default function EscalationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeLevel, setActiveLevel] = useState("all")

  const filteredEscalations = escalations.filter((e) => {
    const matchesSearch = e.incidentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.incidentTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = activeLevel === "all" || e.level === activeLevel
    return matchesSearch && matchesLevel
  })

  return (
    <AppShell>
      <div className="flex flex-col h-full min-h-0">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-[#0D3133]">Escalation Center</h1>
              <p className="text-sm text-muted-foreground">Monitor and manage active escalations</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Clock className="h-4 w-4" />
                History
              </Button>
              <Button size="sm" className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <ArrowUpRight className="h-4 w-4" />
                Escalate Incident
              </Button>
            </div>
          </div>

          {/* KPI Summary */}
          <div className="grid grid-cols-5 gap-3">
            {escalationLevels.map((level) => (
              <Card
                key={level.level}
                className={`cursor-pointer transition-colors ${activeLevel === level.level ? "border-[#E69F50]" : ""}`}
                onClick={() => setActiveLevel(activeLevel === level.level ? "all" : level.level)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{level.label}</p>
                      <p className="text-2xl font-bold text-[#0D3133]">{level.count}</p>
                    </div>
                    <EscalationLevelBadge level={level.level} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-[#0D3133]">Active Escalations</h2>
              <Badge variant="secondary">{filteredEscalations.length}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search escalations..."
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

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Levels</TabsTrigger>
              <TabsTrigger value="L1">L1</TabsTrigger>
              <TabsTrigger value="L2">L2</TabsTrigger>
              <TabsTrigger value="L3">L3</TabsTrigger>
              <TabsTrigger value="manager">Manager</TabsTrigger>
              <TabsTrigger value="executive">Executive</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {filteredEscalations.map((escalation) => (
                <EscalationCard key={escalation.id} escalation={escalation} />
              ))}
            </TabsContent>

            {["L1", "L2", "L3", "manager", "executive"].map((level) => (
              <TabsContent key={level} value={level} className="space-y-3">
                {escalations
                  .filter((e) => e.level === level)
                  .map((escalation) => (
                    <EscalationCard key={escalation.id} escalation={escalation} />
                  ))}
                {escalations.filter((e) => e.level === level).length === 0 && (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No {level.toUpperCase()} escalations</p>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}
