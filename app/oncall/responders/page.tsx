"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponderTable } from "@/components/oncall/responder-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  Users,
} from "lucide-react"

const responders = [
  { id: "1", name: "Sarah Chen", initials: "SC", team: "Platform", currentShift: "Primary", escalationLevel: "L1" as const, availability: "available" as const, activeIncidents: 2, status: "available" as const },
  { id: "2", name: "John Smith", initials: "JS", team: "Database", currentShift: "Primary", escalationLevel: "L2" as const, availability: "busy" as const, activeIncidents: 1, status: "busy" as const },
  { id: "3", name: "Emily Davis", initials: "ED", team: "Network", currentShift: "Secondary", escalationLevel: "L1" as const, availability: "available" as const, activeIncidents: 0, status: "available" as const },
  { id: "4", name: "Mike Wilson", initials: "MW", team: "Security", currentShift: "Primary", escalationLevel: "L3" as const, availability: "escalated" as const, activeIncidents: 3, status: "escalated" as const },
  { id: "5", name: "Lisa Brown", initials: "LB", team: "Platform", currentShift: "Backup", escalationLevel: "L1" as const, availability: "available" as const, activeIncidents: 0, status: "available" as const },
  { id: "6", name: "David Lee", initials: "DL", team: "Database", currentShift: "Off-duty", escalationLevel: "L2" as const, availability: "offline" as const, activeIncidents: 0, status: "offline" as const },
  { id: "7", name: "Anna Martinez", initials: "AM", team: "Network", currentShift: "Primary", escalationLevel: "L1" as const, availability: "in-major-incident" as const, activeIncidents: 1, status: "in-major-incident" as const },
  { id: "8", name: "Chris Taylor", initials: "CT", team: "Security", currentShift: "Secondary", escalationLevel: "L2" as const, availability: "available" as const, activeIncidents: 0, status: "available" as const },
]

export default function RespondersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [teamFilter, setTeamFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredResponders = responders.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.team.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTeam = teamFilter === "all" || r.team.toLowerCase() === teamFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || r.status === statusFilter
    return matchesSearch && matchesTeam && matchesStatus
  })

  return (
    <AppShell>
      <div className="flex flex-col h-full min-h-0">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#0D3133]">Responder Directory</h1>
              <p className="text-sm text-muted-foreground">Manage on-call responders and their availability</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-4 w-4" />
                Add Responder
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6">
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all" className="gap-1">
                  <Users className="h-4 w-4" />
                  All Responders
                </TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="busy">Busy</TabsTrigger>
                <TabsTrigger value="offline">Offline</TabsTrigger>
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
                <Select value={teamFilter} onValueChange={setTeamFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    <SelectItem value="platform">Platform</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="network">Network</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                    <SelectItem value="in-major-incident">In Major Incident</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all">
              <ResponderTable responders={filteredResponders} />
            </TabsContent>

            <TabsContent value="available">
              <ResponderTable responders={filteredResponders.filter((r) => r.status === "available")} />
            </TabsContent>

            <TabsContent value="busy">
              <ResponderTable responders={filteredResponders.filter((r) => r.status === "busy" || r.status === "escalated" || r.status === "in-major-incident")} />
            </TabsContent>

            <TabsContent value="offline">
              <ResponderTable responders={filteredResponders.filter((r) => r.status === "offline")} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}
