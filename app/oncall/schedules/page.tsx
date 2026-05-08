"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScheduleCalendar } from "@/components/oncall/schedule-calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  Calendar,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Settings,
  Copy,
  Trash2,
} from "lucide-react"

const rotations = [
  {
    id: "1",
    name: "Platform On-Call",
    team: "Platform",
    type: "weekly",
    participants: [
      { name: "Sarah Chen", initials: "SC" },
      { name: "Lisa Brown", initials: "LB" },
      { name: "Chris Taylor", initials: "CT" },
    ],
    currentPrimary: { name: "Sarah Chen", initials: "SC" },
    nextHandoff: "Jan 21, 9:00 AM",
    coverage: 100,
  },
  {
    id: "2",
    name: "Database On-Call",
    team: "Database",
    type: "weekly",
    participants: [
      { name: "John Smith", initials: "JS" },
      { name: "David Lee", initials: "DL" },
    ],
    currentPrimary: { name: "John Smith", initials: "JS" },
    nextHandoff: "Jan 22, 9:00 AM",
    coverage: 92,
  },
  {
    id: "3",
    name: "Network On-Call",
    team: "Network",
    type: "bi-weekly",
    participants: [
      { name: "Emily Davis", initials: "ED" },
      { name: "Anna Martinez", initials: "AM" },
    ],
    currentPrimary: { name: "Emily Davis", initials: "ED" },
    nextHandoff: "Jan 28, 9:00 AM",
    coverage: 100,
  },
  {
    id: "4",
    name: "Security On-Call",
    team: "Security",
    type: "monthly",
    participants: [
      { name: "Mike Wilson", initials: "MW" },
      { name: "Chris Taylor", initials: "CT" },
    ],
    currentPrimary: { name: "Mike Wilson", initials: "MW" },
    nextHandoff: "Feb 1, 9:00 AM",
    coverage: 85,
  },
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

export default function SchedulesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [teamFilter, setTeamFilter] = useState("all")

  return (
    <AppShell>
      <div className="flex flex-col h-full min-h-0">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#0D3133]">Rotation Schedules</h1>
              <p className="text-sm text-muted-foreground">Manage on-call rotations and shift schedules</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Clock className="h-4 w-4" />
                Overrides
              </Button>
              <Button size="sm" className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-4 w-4" />
                New Rotation
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6">
          <Tabs defaultValue="rotations">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="rotations" className="gap-1">
                  <Users className="h-4 w-4" />
                  Rotations
                </TabsTrigger>
                <TabsTrigger value="calendar" className="gap-1">
                  <Calendar className="h-4 w-4" />
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="coverage">Coverage</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search rotations..."
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
              </div>
            </div>

            <TabsContent value="rotations" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {rotations.map((rotation) => (
                  <Card key={rotation.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold text-[#0D3133]">
                          {rotation.name}
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" />
                              Edit Rotation
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{rotation.team}</Badge>
                        <Badge variant="secondary">{rotation.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Current Primary</span>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-[#0D3133] text-white text-[10px]">
                                {rotation.currentPrimary.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{rotation.currentPrimary.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Next Handoff</span>
                          <span className="text-sm">{rotation.nextHandoff}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Participants</span>
                          <div className="flex -space-x-2">
                            {rotation.participants.map((p) => (
                              <Avatar key={p.initials} className="h-6 w-6 border-2 border-background">
                                <AvatarFallback className="bg-[#73847B] text-white text-[10px]">
                                  {p.initials}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Coverage</span>
                            <span className="font-medium">{rotation.coverage}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${rotation.coverage}%`,
                                backgroundColor: rotation.coverage >= 95 ? "#059669" :
                                  rotation.coverage >= 85 ? "#E69F50" : "#DC2626"
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar">
              <ScheduleCalendar slots={scheduleSlots} />
            </TabsContent>

            <TabsContent value="coverage">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-[#0D3133]">
                    Coverage Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rotations.map((rotation) => (
                      <div key={rotation.id} className="flex items-center gap-4">
                        <div className="w-40">
                          <p className="text-sm font-medium text-[#0D3133]">{rotation.name}</p>
                          <p className="text-xs text-muted-foreground">{rotation.team}</p>
                        </div>
                        <div className="flex-1">
                          <div className="h-4 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${rotation.coverage}%`,
                                backgroundColor: rotation.coverage >= 95 ? "#059669" :
                                  rotation.coverage >= 85 ? "#E69F50" : "#DC2626"
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{rotation.coverage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}
