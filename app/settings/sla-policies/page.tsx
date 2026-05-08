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
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Timer,
  AlertTriangle,
  Clock,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SLAPolicy {
  id: string
  name: string
  priority: string
  responseTime: string
  resolutionTime: string
  businessHours: string
  escalationEnabled: boolean
  active: boolean
  usageCount: number
}

const mockPolicies: SLAPolicy[] = [
  { id: "1", name: "Critical Priority SLA", priority: "Critical", responseTime: "15 min", resolutionTime: "4 hours", businessHours: "24x7", escalationEnabled: true, active: true, usageCount: 45 },
  { id: "2", name: "High Priority SLA", priority: "High", responseTime: "30 min", resolutionTime: "8 hours", businessHours: "24x7", escalationEnabled: true, active: true, usageCount: 123 },
  { id: "3", name: "Medium Priority SLA", priority: "Medium", responseTime: "2 hours", resolutionTime: "24 hours", businessHours: "Business Hours", escalationEnabled: true, active: true, usageCount: 289 },
  { id: "4", name: "Low Priority SLA", priority: "Low", responseTime: "4 hours", resolutionTime: "72 hours", businessHours: "Business Hours", escalationEnabled: false, active: true, usageCount: 156 },
  { id: "5", name: "VIP Customer SLA", priority: "All", responseTime: "5 min", resolutionTime: "2 hours", businessHours: "24x7", escalationEnabled: true, active: true, usageCount: 12 },
]

const priorityColors: Record<string, string> = {
  Critical: "bg-red-100 text-red-800",
  High: "bg-orange-100 text-orange-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
  All: "bg-purple-100 text-purple-800",
}

export default function SLAPoliciesPage() {
  const [policies, setPolicies] = useState(mockPolicies)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingPolicy, setEditingPolicy] = useState<SLAPolicy | null>(null)

  const handleEdit = (policy: SLAPolicy) => {
    setEditingPolicy(policy)
    setDrawerOpen(true)
  }

  const handleAdd = () => {
    setEditingPolicy(null)
    setDrawerOpen(true)
  }

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
                <BreadcrumbPage>SLA Policies</BreadcrumbPage>
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
                  SLA Policies
                </h1>
                <p className="text-sm text-muted-foreground">
                  Define service level agreements for incident response and resolution
                </p>
              </div>
              <Button onClick={handleAdd} className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-4 w-4" />
                Add Policy
              </Button>
            </div>

            {/* Stats */}
            <div className="mb-6 grid gap-4 sm:grid-cols-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-muted p-2">
                    <Timer className="h-4 w-4 text-[#0D3133]" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#0D3133]">12</p>
                    <p className="text-xs text-muted-foreground">Active Policies</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-green-100 p-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#0D3133]">94.2%</p>
                    <p className="text-xs text-muted-foreground">SLA Compliance</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-red-100 p-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#0D3133]">23</p>
                    <p className="text-xs text-muted-foreground">Breaches Today</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-amber-100 p-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#0D3133]">18</p>
                    <p className="text-xs text-muted-foreground">At Risk</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Policies Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Policy Definitions</CardTitle>
                <CardDescription>
                  Configure response and resolution targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                          Policy Name
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                          Priority
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                          Response
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                          Resolution
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                          Hours
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                          Escalation
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                          Status
                        </th>
                        <th className="pb-3 text-right text-xs font-semibold uppercase text-muted-foreground">
                          Usage
                        </th>
                        <th className="pb-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {policies.map((policy) => (
                        <tr key={policy.id} className="border-b border-border last:border-0">
                          <td className="py-3 text-sm font-medium text-[#0D3133]">
                            {policy.name}
                          </td>
                          <td className="py-3">
                            <Badge
                              variant="secondary"
                              className={cn("text-xs", priorityColors[policy.priority])}
                            >
                              {policy.priority}
                            </Badge>
                          </td>
                          <td className="py-3 text-sm">{policy.responseTime}</td>
                          <td className="py-3 text-sm">{policy.resolutionTime}</td>
                          <td className="py-3 text-sm text-muted-foreground">
                            {policy.businessHours}
                          </td>
                          <td className="py-3">
                            {policy.escalationEnabled ? (
                              <Badge variant="outline" className="text-xs">
                                Enabled
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">Disabled</span>
                            )}
                          </td>
                          <td className="py-3">
                            <Switch checked={policy.active} />
                          </td>
                          <td className="py-3 text-right text-sm text-muted-foreground">
                            {policy.usageCount} incidents
                          </td>
                          <td className="py-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(policy)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Duplicate
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
        title={editingPolicy ? "Edit SLA Policy" : "Add SLA Policy"}
        description="Configure SLA targets and escalation rules"
        width="lg"
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90">
              {editingPolicy ? "Save Changes" : "Create Policy"}
            </Button>
          </div>
        }
      >
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="targets">Targets</TabsTrigger>
            <TabsTrigger value="escalation">Escalation</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div>
              <Label htmlFor="name">Policy Name</Label>
              <Input
                id="name"
                defaultValue={editingPolicy?.name}
                placeholder="Enter policy name"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Priority</Label>
              <Select defaultValue={editingPolicy?.priority || "Medium"}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="All">All Priorities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Business Hours</Label>
              <Select defaultValue={editingPolicy?.businessHours || "Business Hours"}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24x7">24x7</SelectItem>
                  <SelectItem value="Business Hours">Business Hours</SelectItem>
                  <SelectItem value="Extended Hours">Extended Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="targets" className="space-y-4">
            <div>
              <Label>Response Time Target</Label>
              <Select defaultValue={editingPolicy?.responseTime || "30 min"}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5 min">5 minutes</SelectItem>
                  <SelectItem value="15 min">15 minutes</SelectItem>
                  <SelectItem value="30 min">30 minutes</SelectItem>
                  <SelectItem value="1 hour">1 hour</SelectItem>
                  <SelectItem value="2 hours">2 hours</SelectItem>
                  <SelectItem value="4 hours">4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Resolution Time Target</Label>
              <Select defaultValue={editingPolicy?.resolutionTime || "24 hours"}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2 hours">2 hours</SelectItem>
                  <SelectItem value="4 hours">4 hours</SelectItem>
                  <SelectItem value="8 hours">8 hours</SelectItem>
                  <SelectItem value="24 hours">24 hours</SelectItem>
                  <SelectItem value="48 hours">48 hours</SelectItem>
                  <SelectItem value="72 hours">72 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="escalation" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Escalation</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically escalate when SLA is at risk
                </p>
              </div>
              <Switch defaultChecked={editingPolicy?.escalationEnabled ?? true} />
            </div>
            <div>
              <Label>Warning Threshold</Label>
              <Select defaultValue="75">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50% of time elapsed</SelectItem>
                  <SelectItem value="75">75% of time elapsed</SelectItem>
                  <SelectItem value="90">90% of time elapsed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </SettingsDrawer>
    </AppShell>
  )
}
