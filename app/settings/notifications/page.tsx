"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { SettingsDrawer } from "@/components/settings/settings-drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  MessageSquare,
  Bell,
  Smartphone,
  Slack,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationRule {
  id: string
  name: string
  event: string
  channels: string[]
  recipients: string
  active: boolean
  sentCount: number
}

const mockRules: NotificationRule[] = [
  { id: "1", name: "Critical Incident Alert", event: "Incident Created (Critical)", channels: ["email", "slack", "sms"], recipients: "On-Call Team", active: true, sentCount: 234 },
  { id: "2", name: "SLA Breach Warning", event: "SLA At Risk (75%)", channels: ["email", "slack"], recipients: "Assignment Group", active: true, sentCount: 567 },
  { id: "3", name: "SLA Breach Alert", event: "SLA Breached", channels: ["email", "slack", "sms"], recipients: "Manager + On-Call", active: true, sentCount: 123 },
  { id: "4", name: "Assignment Notification", event: "Incident Assigned", channels: ["email"], recipients: "Assigned User", active: true, sentCount: 2345 },
  { id: "5", name: "Escalation Alert", event: "Incident Escalated", channels: ["email", "slack"], recipients: "Escalation Group", active: true, sentCount: 89 },
  { id: "6", name: "Major Incident Started", event: "Major Incident Declared", channels: ["email", "slack", "sms", "teams"], recipients: "All Stakeholders", active: true, sentCount: 12 },
  { id: "7", name: "Resolution Notification", event: "Incident Resolved", channels: ["email"], recipients: "Reporter", active: true, sentCount: 1567 },
  { id: "8", name: "Weekly Digest", event: "Scheduled (Weekly)", channels: ["email"], recipients: "Managers", active: false, sentCount: 52 },
]

const channelIcons: Record<string, React.ElementType> = {
  email: Mail,
  slack: Slack,
  teams: MessageSquare,
  sms: Smartphone,
  push: Bell,
}

const channelColors: Record<string, string> = {
  email: "bg-blue-100 text-blue-800",
  slack: "bg-purple-100 text-purple-800",
  teams: "bg-indigo-100 text-indigo-800",
  sms: "bg-green-100 text-green-800",
  push: "bg-orange-100 text-orange-800",
}

export default function NotificationsPage() {
  const [rules, setRules] = useState(mockRules)
  const [search, setSearch] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<NotificationRule | null>(null)

  const handleEdit = (rule: NotificationRule) => {
    setEditingRule(rule)
    setDrawerOpen(true)
  }

  const handleAdd = () => {
    setEditingRule(null)
    setDrawerOpen(true)
  }

  const filteredRules = rules.filter((rule) =>
    rule.name.toLowerCase().includes(search.toLowerCase())
  )

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
                <BreadcrumbLink asChild>
                  <Link href="/settings">Settings</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Notification Rules</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Content with Settings Layout */}
        <SettingsLayout>
          <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-[#0D3133]">
                  Notification Rules
                </h1>
                <p className="text-sm text-muted-foreground">
                  Configure alert channels and triggers for incident events
                </p>
              </div>
              <Button onClick={handleAdd} className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-4 w-4" />
                Add Rule
              </Button>
            </div>

            {/* Channel Overview */}
            <div className="mb-6 grid gap-4 sm:grid-cols-5">
              {Object.entries(channelIcons).map(([channel, Icon]) => (
                <Card key={channel} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("rounded-md p-2", channelColors[channel].split(" ")[0])}>
                      <Icon className={cn("h-4 w-4", channelColors[channel].split(" ")[1])} />
                    </div>
                    <div>
                      <p className="text-sm font-medium capitalize">{channel}</p>
                      <p className="text-xs text-muted-foreground">
                        {rules.filter((r) => r.channels.includes(channel) && r.active).length} rules
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-4 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search rules..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Rules Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                          Rule Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                          Event
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                          Channels
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                          Recipients
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                          Status
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-muted-foreground">
                          Sent
                        </th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRules.map((rule) => (
                        <tr key={rule.id} className="border-b border-border last:border-0">
                          <td className="px-4 py-3 text-sm font-medium text-[#0D3133]">
                            {rule.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {rule.event}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {rule.channels.map((channel) => {
                                const Icon = channelIcons[channel] || Bell
                                return (
                                  <div
                                    key={channel}
                                    className={cn(
                                      "rounded p-1",
                                      channelColors[channel]?.split(" ")[0] || "bg-gray-100"
                                    )}
                                    title={channel}
                                  >
                                    <Icon className="h-3.5 w-3.5" />
                                  </div>
                                )
                              })}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {rule.recipients}
                          </td>
                          <td className="px-4 py-3">
                            <Switch checked={rule.active} />
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-muted-foreground">
                            {rule.sentCount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(rule)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </SettingsLayout>
      </div>

      {/* Edit Drawer */}
      <SettingsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingRule ? "Edit Notification Rule" : "Add Notification Rule"}
        description="Configure when and how notifications are sent"
        width="lg"
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90">
              {editingRule ? "Save Changes" : "Create Rule"}
            </Button>
          </div>
        }
      >
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="template">Template</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div>
              <Label htmlFor="name">Rule Name</Label>
              <Input
                id="name"
                defaultValue={editingRule?.name}
                placeholder="Enter rule name"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Trigger Event</Label>
              <Select defaultValue={editingRule?.event || ""}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Incident Created">Incident Created</SelectItem>
                  <SelectItem value="Incident Created (Critical)">Incident Created (Critical)</SelectItem>
                  <SelectItem value="Incident Assigned">Incident Assigned</SelectItem>
                  <SelectItem value="Incident Escalated">Incident Escalated</SelectItem>
                  <SelectItem value="SLA At Risk (75%)">SLA At Risk (75%)</SelectItem>
                  <SelectItem value="SLA Breached">SLA Breached</SelectItem>
                  <SelectItem value="Incident Resolved">Incident Resolved</SelectItem>
                  <SelectItem value="Major Incident Declared">Major Incident Declared</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Recipients</Label>
              <Select defaultValue={editingRule?.recipients || ""}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Assigned User">Assigned User</SelectItem>
                  <SelectItem value="Assignment Group">Assignment Group</SelectItem>
                  <SelectItem value="On-Call Team">On-Call Team</SelectItem>
                  <SelectItem value="Manager + On-Call">Manager + On-Call</SelectItem>
                  <SelectItem value="Escalation Group">Escalation Group</SelectItem>
                  <SelectItem value="All Stakeholders">All Stakeholders</SelectItem>
                  <SelectItem value="Reporter">Reporter</SelectItem>
                  <SelectItem value="Managers">Managers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="channels" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Select which channels to use for this notification
            </p>
            {Object.entries(channelIcons).map(([channel, Icon]) => (
              <div
                key={channel}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("rounded-md p-2", channelColors[channel]?.split(" ")[0])}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium capitalize">{channel}</span>
                </div>
                <Switch defaultChecked={editingRule?.channels.includes(channel)} />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="template" className="space-y-4">
            <div>
              <Label htmlFor="subject">Email Subject</Label>
              <Input
                id="subject"
                placeholder="[{priority}] {title}"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="body">Message Body</Label>
              <textarea
                id="body"
                rows={6}
                placeholder="Incident #{number} has been created..."
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Available variables: {"{number}"}, {"{title}"}, {"{priority}"}, {"{category}"}, {"{assignee}"}
            </p>
          </TabsContent>
        </Tabs>
      </SettingsDrawer>
    </AppShell>
  )
}
