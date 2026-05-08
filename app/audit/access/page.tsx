"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Eye,
  Shield,
  Users,
  Settings,
  Activity,
  Lock,
  Unlock,
  Search,
  Download,
  Filter,
  Clock,
  AlertTriangle,
} from "lucide-react"

const moduleAccessLogs = [
  { id: "1", user: "Sarah Chen", module: "Incidents", action: "View", count: 145, lastAccess: "2 min ago" },
  { id: "2", user: "Mike Johnson", module: "Settings", action: "Edit", count: 23, lastAccess: "15 min ago" },
  { id: "3", user: "Admin User", module: "Automation", action: "Edit", count: 12, lastAccess: "1 hour ago" },
  { id: "4", user: "Emily Davis", module: "CMDB", action: "View", count: 67, lastAccess: "30 min ago" },
  { id: "5", user: "David Wilson", module: "Analytics", action: "Export", count: 8, lastAccess: "2 hours ago" },
]

const operationalActions = [
  { id: "1", user: "Sarah Chen", action: "Resolved Incident", entity: "INC0042781", time: "5 min ago", risk: "low" },
  { id: "2", user: "Mike Johnson", action: "Escalated Incident", entity: "INC0042756", time: "12 min ago", risk: "medium" },
  { id: "3", user: "Admin User", action: "Modified Workflow", entity: "WF-AUTO-023", time: "1 hour ago", risk: "high" },
  { id: "4", user: "Emily Davis", action: "Updated SLA Policy", entity: "SLA-POL-001", time: "2 hours ago", risk: "high" },
  { id: "5", user: "System", action: "Auto-escalation", entity: "INC0042789", time: "25 min ago", risk: "low" },
]

const adminActivities = [
  { id: "1", admin: "Admin User", action: "Created new user", target: "john.doe@company.com", time: "30 min ago" },
  { id: "2", admin: "Admin User", action: "Modified role permissions", target: "Service Desk Role", time: "1 hour ago" },
  { id: "3", admin: "Super Admin", action: "Updated system settings", target: "Email Integration", time: "3 hours ago" },
  { id: "4", admin: "Admin User", action: "Exported audit logs", target: "Last 30 days", time: "4 hours ago" },
]

const configurationAccess = [
  { id: "1", module: "SLA Policies", viewers: 12, editors: 3, lastEdit: "2 hours ago", editedBy: "Admin User" },
  { id: "2", module: "Escalation Rules", viewers: 8, editors: 2, lastEdit: "1 day ago", editedBy: "Admin User" },
  { id: "3", module: "Workflows", viewers: 15, editors: 4, lastEdit: "3 hours ago", editedBy: "Admin User" },
  { id: "4", module: "Notification Templates", viewers: 10, editors: 2, lastEdit: "5 hours ago", editedBy: "Emily Davis" },
]

const escalationApprovals = [
  { id: "1", incident: "INC0042756", type: "L3 Escalation", approver: "Manager Smith", status: "approved", time: "15 min ago" },
  { id: "2", incident: "INC0042781", type: "SLA Override", approver: "Director Jones", status: "pending", time: "1 hour ago" },
  { id: "3", incident: "INC0042789", type: "Emergency Access", approver: "Security Team", status: "approved", time: "2 hours ago" },
]

const riskColors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
}

export default function AccessVisibilityPage() {
  const [activeTab, setActiveTab] = useState("module-access")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AppShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#0D3133]">Access Visibility</h1>
              <p className="text-sm text-muted-foreground">
                Operational access audit, admin activities, and configuration access tracking
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Button size="sm" className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Shield className="h-4 w-4" />
                Access Policies
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-4">
          <div className="grid grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Active Users</span>
                </div>
                <p className="mt-1 text-xl font-semibold text-[#0D3133]">47</p>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Total Actions</span>
                </div>
                <p className="mt-1 text-xl font-semibold text-[#0D3133]">2,847</p>
                <p className="text-xs text-muted-foreground">Today</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Config Changes</span>
                </div>
                <p className="mt-1 text-xl font-semibold text-[#0D3133]">12</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span className="text-xs text-muted-foreground">High Risk</span>
                </div>
                <p className="mt-1 text-xl font-semibold text-amber-600">3</p>
                <p className="text-xs text-muted-foreground">Actions today</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Pending Approvals</span>
                </div>
                <p className="mt-1 text-xl font-semibold text-[#0D3133]">5</p>
                <p className="text-xs text-muted-foreground">Awaiting review</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="sticky top-0 z-10 border-b border-border bg-card px-6">
              <TabsList className="h-10 bg-transparent p-0">
                <TabsTrigger value="module-access" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <Eye className="h-4 w-4" />
                  Module Access
                </TabsTrigger>
                <TabsTrigger value="operational" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <Activity className="h-4 w-4" />
                  Operational Actions
                </TabsTrigger>
                <TabsTrigger value="admin" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <Shield className="h-4 w-4" />
                  Admin Activities
                </TabsTrigger>
                <TabsTrigger value="configuration" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <Settings className="h-4 w-4" />
                  Configuration Access
                </TabsTrigger>
                <TabsTrigger value="approvals" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#E69F50] rounded-none">
                  <Lock className="h-4 w-4" />
                  Escalation Approvals
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Search/Filter Bar */}
            <div className="border-b border-border bg-card px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search users, actions, entities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
                <Select defaultValue="24h">
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last hour</SelectItem>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            <TabsContent value="module-access" className="m-0 p-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Module Access Logs</h3>
                <div className="rounded-lg border">
                  <table className="w-full text-sm">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Module</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Action</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Access Count</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Last Access</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moduleAccessLogs.map((log) => (
                        <tr key={log.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-[10px] bg-[#0D3133] text-white">
                                  {log.user.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">{log.user}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs">{log.module}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="text-xs">{log.action}</Badge>
                          </td>
                          <td className="px-4 py-3 text-xs font-mono">{log.count}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{log.lastAccess}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="operational" className="m-0 p-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Operational Actions</h3>
                <div className="space-y-3">
                  {operationalActions.map((action) => (
                    <Card key={action.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs bg-[#0D3133] text-white">
                              {action.user.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{action.action}</p>
                            <p className="text-xs text-muted-foreground">
                              {action.user} • <span className="font-mono">{action.entity}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={riskColors[action.risk as keyof typeof riskColors]}>
                            {action.risk} risk
                          </Badge>
                          <span className="text-xs text-muted-foreground">{action.time}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="m-0 p-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Admin Activities</h3>
                <div className="space-y-3">
                  {adminActivities.map((activity) => (
                    <Card key={activity.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-[#E69F50]/10 flex items-center justify-center">
                            <Shield className="h-4 w-4 text-[#E69F50]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.admin} • Target: {activity.target}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="configuration" className="m-0 p-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Configuration Access</h3>
                <div className="rounded-lg border">
                  <table className="w-full text-sm">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Module</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Viewers</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Editors</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Last Edit</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Edited By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {configurationAccess.map((config) => (
                        <tr key={config.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Settings className="h-4 w-4 text-muted-foreground" />
                              <span className="text-xs font-medium">{config.module}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs">{config.viewers}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <Unlock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs">{config.editors}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{config.lastEdit}</td>
                          <td className="px-4 py-3 text-xs">{config.editedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="approvals" className="m-0 p-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Escalation Approvals</h3>
                <div className="space-y-3">
                  {escalationApprovals.map((approval) => (
                    <Card key={approval.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm font-medium text-[#0D3133]">{approval.incident}</span>
                            <Badge variant="outline">{approval.type}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Approver: {approval.approver}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={approval.status === "approved" ? "default" : "outline"}>
                            {approval.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{approval.time}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}
