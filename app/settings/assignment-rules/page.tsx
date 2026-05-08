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
import { Home, Plus, MoreHorizontal, Edit, Trash2, Users, ArrowRight, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface AssignmentRule {
  id: string
  name: string
  condition: string
  assignTo: string
  method: "round-robin" | "least-busy" | "direct"
  priority: number
  active: boolean
  matchCount: number
}

const mockRules: AssignmentRule[] = [
  { id: "1", name: "Critical to Senior Engineers", condition: "Priority = Critical", assignTo: "Senior Engineering Team", method: "least-busy", priority: 1, active: true, matchCount: 234 },
  { id: "2", name: "Network Issues to NOC", condition: "Category = Network", assignTo: "Network Operations Center", method: "round-robin", priority: 2, active: true, matchCount: 456 },
  { id: "3", name: "VIP Customers", condition: "Customer Type = VIP", assignTo: "VIP Support Team", method: "least-busy", priority: 3, active: true, matchCount: 89 },
  { id: "4", name: "Database Issues", condition: "Category = Database", assignTo: "DBA Team", method: "round-robin", priority: 4, active: true, matchCount: 123 },
  { id: "5", name: "Security Incidents", condition: "Category = Security", assignTo: "Security Operations", method: "direct", priority: 5, active: true, matchCount: 45 },
  { id: "6", name: "APAC Region", condition: "Region = APAC", assignTo: "APAC Support Team", method: "round-robin", priority: 6, active: true, matchCount: 567 },
  { id: "7", name: "Hardware Requests", condition: "Category = Hardware", assignTo: "Desktop Support", method: "round-robin", priority: 7, active: true, matchCount: 789 },
  { id: "8", name: "Default Assignment", condition: "All other incidents", assignTo: "Service Desk L1", method: "round-robin", priority: 100, active: true, matchCount: 2345 },
]

const methodLabels: Record<string, string> = {
  "round-robin": "Round Robin",
  "least-busy": "Least Busy",
  direct: "Direct Assignment",
}

export default function AssignmentRulesPage() {
  const [rules, setRules] = useState(mockRules)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<AssignmentRule | null>(null)

  const handleEdit = (rule: AssignmentRule) => {
    setEditingRule(rule)
    setDrawerOpen(true)
  }

  const handleAdd = () => {
    setEditingRule(null)
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
                <BreadcrumbPage>Assignment Rules</BreadcrumbPage>
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
                  Assignment Rules
                </h1>
                <p className="text-sm text-muted-foreground">
                  Configure automatic routing and assignment logic
                </p>
              </div>
              <Button onClick={handleAdd} className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-4 w-4" />
                Add Rule
              </Button>
            </div>

            {/* Info Card */}
            <Card className="mb-6 bg-muted/30">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  Rules are evaluated in priority order. The first matching rule assigns the incident.
                  Drag to reorder rules or adjust priority numbers.
                </p>
              </CardContent>
            </Card>

            {/* Rules List */}
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {rules.sort((a, b) => a.priority - b.priority).map((rule) => (
                    <div
                      key={rule.id}
                      className={cn(
                        "flex items-center gap-4 p-4 hover:bg-muted/30",
                        !rule.active && "opacity-50"
                      )}
                    >
                      <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs font-medium">
                        {rule.priority}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-[#0D3133] truncate">
                            {rule.name}
                          </p>
                          {!rule.active && (
                            <Badge variant="secondary" className="text-xs">
                              Inactive
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {rule.condition}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <div className="min-w-[180px]">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{rule.assignTo}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {methodLabels[rule.method]}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {rule.matchCount} matches
                      </Badge>
                      <Switch checked={rule.active} />
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
                    </div>
                  ))}
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
        title={editingRule ? "Edit Assignment Rule" : "Add Assignment Rule"}
        description="Configure routing conditions and target group"
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
        <div className="space-y-4">
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
            <Label>Condition Field</Label>
            <Select defaultValue="priority">
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="customer">Customer Type</SelectItem>
                <SelectItem value="region">Region</SelectItem>
                <SelectItem value="service">Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Assignment Group</Label>
            <Select defaultValue={editingRule?.assignTo || ""}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Service Desk L1">Service Desk L1</SelectItem>
                <SelectItem value="Senior Engineering Team">Senior Engineering Team</SelectItem>
                <SelectItem value="Network Operations Center">Network Operations Center</SelectItem>
                <SelectItem value="DBA Team">DBA Team</SelectItem>
                <SelectItem value="Security Operations">Security Operations</SelectItem>
                <SelectItem value="Desktop Support">Desktop Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Assignment Method</Label>
            <Select defaultValue={editingRule?.method || "round-robin"}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="round-robin">Round Robin</SelectItem>
                <SelectItem value="least-busy">Least Busy</SelectItem>
                <SelectItem value="direct">Direct Assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priority">Priority Order</Label>
            <Input
              id="priority"
              type="number"
              defaultValue={editingRule?.priority || rules.length + 1}
              className="mt-1.5 w-24"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Lower numbers are evaluated first
            </p>
          </div>
        </div>
      </SettingsDrawer>
    </AppShell>
  )
}
