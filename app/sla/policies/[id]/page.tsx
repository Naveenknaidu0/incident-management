"use client"

import { use } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Copy, Trash2, Plus, X } from "lucide-react"
import Link from "next/link"

// Mock policy data
const policyData = {
  id: "1",
  name: "P1 Critical Resolution",
  description: "SLA policy for critical priority incidents requiring immediate resolution",
  slaType: "Resolution",
  targetTime: "4",
  targetUnit: "hours",
  status: "active",
  conditions: [
    { field: "Priority", operator: "equals", value: "P1" },
    { field: "Impact", operator: "equals", value: "Critical" },
  ],
  businessHours: {
    type: "24x7",
    timezone: "UTC",
  },
  pauseConditions: [
    { condition: "Waiting for Customer Response", enabled: true },
    { condition: "Waiting for Vendor", enabled: true },
    { condition: "Scheduled Maintenance", enabled: false },
  ],
  escalationRules: [
    { level: 1, threshold: "50%", notify: "Team Lead", action: "Email + SMS" },
    { level: 2, threshold: "75%", notify: "Manager", action: "Email + SMS + Call" },
    { level: 3, threshold: "90%", notify: "Director", action: "Email + SMS + Call" },
  ],
  notificationRules: [
    { event: "SLA Warning (50%)", recipients: "Assigned Engineer, Team Lead", channel: "Email" },
    { event: "SLA Critical (75%)", recipients: "Team Lead, Manager", channel: "Email + SMS" },
    { event: "SLA Breach", recipients: "Manager, Director", channel: "Email + SMS + Call" },
  ],
  breachActions: [
    { action: "Auto-escalate to next level", enabled: true },
    { action: "Create follow-up task", enabled: true },
    { action: "Notify stakeholders", enabled: true },
    { action: "Update incident priority", enabled: false },
  ],
}

export default function SLAPolicyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <AppShell>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link href="/sla/policies">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">{policyData.name}</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Policy ID: {id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-red-600 border-red-200 hover:bg-red-50">
                <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                Delete
              </Button>
              <Button size="sm" className="h-8 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Save className="mr-1.5 h-3.5 w-3.5" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="basic" className="text-xs">Basic Info</TabsTrigger>
              <TabsTrigger value="conditions" className="text-xs">Conditions</TabsTrigger>
              <TabsTrigger value="hours" className="text-xs">Business Hours</TabsTrigger>
              <TabsTrigger value="pause" className="text-xs">Pause Conditions</TabsTrigger>
              <TabsTrigger value="escalation" className="text-xs">Escalation Rules</TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs">Notifications</TabsTrigger>
              <TabsTrigger value="breach" className="text-xs">Breach Actions</TabsTrigger>
            </TabsList>

            {/* Basic Information */}
            <TabsContent value="basic">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Policy Name</Label>
                      <Input id="name" defaultValue={policyData.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slaType">SLA Type</Label>
                      <Select defaultValue={policyData.slaType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Response">Response</SelectItem>
                          <SelectItem value="Resolution">Resolution</SelectItem>
                          <SelectItem value="Update">Update</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" defaultValue={policyData.description} rows={3} />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="targetTime">Target Time</Label>
                      <Input id="targetTime" type="number" defaultValue={policyData.targetTime} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetUnit">Time Unit</Label>
                      <Select defaultValue={policyData.targetUnit}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minutes">Minutes</SelectItem>
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="days">Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select defaultValue={policyData.status}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Conditions */}
            <TabsContent value="conditions">
              <Card>
                <CardHeader className="py-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Conditions</CardTitle>
                  <Button variant="outline" size="sm" className="h-8">
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    Add Condition
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {policyData.conditions.map((condition, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                      <Select defaultValue={condition.field}>
                        <SelectTrigger className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Priority">Priority</SelectItem>
                          <SelectItem value="Impact">Impact</SelectItem>
                          <SelectItem value="Urgency">Urgency</SelectItem>
                          <SelectItem value="Category">Category</SelectItem>
                          <SelectItem value="Service">Service</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue={condition.operator}>
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="not_equals">Not Equals</SelectItem>
                          <SelectItem value="contains">Contains</SelectItem>
                          <SelectItem value="in">In</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input className="flex-1" defaultValue={condition.value} />
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-600">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Business Hours */}
            <TabsContent value="hours">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base">Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Schedule Type</Label>
                      <Select defaultValue={policyData.businessHours.type}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24x7">24x7</SelectItem>
                          <SelectItem value="business">Business Hours Only</SelectItem>
                          <SelectItem value="custom">Custom Schedule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select defaultValue={policyData.businessHours.timezone}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                          <SelectItem value="Europe/London">London</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pause Conditions */}
            <TabsContent value="pause">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base">Pause Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {policyData.pauseConditions.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <span className="text-sm">{item.condition}</span>
                      <Switch defaultChecked={item.enabled} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Escalation Rules */}
            <TabsContent value="escalation">
              <Card>
                <CardHeader className="py-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Escalation Rules</CardTitle>
                  <Button variant="outline" size="sm" className="h-8">
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    Add Level
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase text-muted-foreground">Level</th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase text-muted-foreground">Threshold</th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase text-muted-foreground">Notify</th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase text-muted-foreground">Action</th>
                          <th className="px-4 py-2 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {policyData.escalationRules.map((rule) => (
                          <tr key={rule.level}>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                                L{rule.level}
                              </span>
                            </td>
                            <td className="px-4 py-3">{rule.threshold}</td>
                            <td className="px-4 py-3">{rule.notify}</td>
                            <td className="px-4 py-3">{rule.action}</td>
                            <td className="px-4 py-3">
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-600">
                                <X className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader className="py-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Notification Rules</CardTitle>
                  <Button variant="outline" size="sm" className="h-8">
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    Add Rule
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase text-muted-foreground">Event</th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase text-muted-foreground">Recipients</th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase text-muted-foreground">Channel</th>
                          <th className="px-4 py-2 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {policyData.notificationRules.map((rule, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3">{rule.event}</td>
                            <td className="px-4 py-3">{rule.recipients}</td>
                            <td className="px-4 py-3">{rule.channel}</td>
                            <td className="px-4 py-3">
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-600">
                                <X className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Breach Actions */}
            <TabsContent value="breach">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base">Breach Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {policyData.breachActions.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <span className="text-sm">{item.action}</span>
                      <Switch defaultChecked={item.enabled} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}
