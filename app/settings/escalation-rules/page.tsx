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
import { Home, Plus, MoreHorizontal, Edit, Trash2, AlertTriangle, ArrowUp, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface EscalationRule {
  id: string
  name: string
  trigger: string
  levels: { level: string; time: string; target: string }[]
  priority: string[]
  active: boolean
}

const mockRules: EscalationRule[] = [
  {
    id: "1",
    name: "Critical SLA Escalation",
    trigger: "SLA Breach",
    priority: ["Critical"],
    active: true,
    levels: [
      { level: "L1", time: "15 min", target: "Team Lead" },
      { level: "L2", time: "30 min", target: "Manager" },
      { level: "L3", time: "1 hour", target: "Director" },
      { level: "Executive", time: "2 hours", target: "VP Operations" },
    ],
  },
  {
    id: "2",
    name: "High Priority Escalation",
    trigger: "SLA At Risk",
    priority: ["High"],
    active: true,
    levels: [
      { level: "L1", time: "30 min", target: "Team Lead" },
      { level: "L2", time: "1 hour", target: "Manager" },
      { level: "L3", time: "4 hours", target: "Director" },
    ],
  },
  {
    id: "3",
    name: "Major Incident Escalation",
    trigger: "Major Incident",
    priority: ["Critical", "High"],
    active: true,
    levels: [
      { level: "L1", time: "Immediate", target: "Incident Manager" },
      { level: "L2", time: "15 min", target: "Problem Manager" },
      { level: "L3", time: "30 min", target: "IT Director" },
      { level: "Executive", time: "1 hour", target: "CTO" },
    ],
  },
  {
    id: "4",
    name: "VIP Customer Escalation",
    trigger: "VIP Flag",
    priority: ["All"],
    active: true,
    levels: [
      { level: "L1", time: "5 min", target: "Senior Engineer" },
      { level: "L2", time: "15 min", target: "Team Lead" },
      { level: "L3", time: "30 min", target: "Account Manager" },
    ],
  },
  {
    id: "5",
    name: "Unassigned Incident",
    trigger: "No Assignment",
    priority: ["All"],
    active: true,
    levels: [
      { level: "L1", time: "15 min", target: "Queue Manager" },
      { level: "L2", time: "30 min", target: "Shift Supervisor" },
    ],
  },
  {
    id: "6",
    name: "Stale Incident",
    trigger: "No Update",
    priority: ["Medium", "Low"],
    active: false,
    levels: [
      { level: "L1", time: "4 hours", target: "Assigned User" },
      { level: "L2", time: "8 hours", target: "Team Lead" },
    ],
  },
]

const priorityColors: Record<string, string> = {
  Critical: "bg-red-100 text-red-800",
  High: "bg-orange-100 text-orange-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
  All: "bg-purple-100 text-purple-800",
}

export default function EscalationRulesPage() {
  const [rules, setRules] = useState(mockRules)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<EscalationRule | null>(null)

  const handleEdit = (rule: EscalationRule) => {
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
                <BreadcrumbPage>Escalation Rules</BreadcrumbPage>
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
                  Escalation Rules
                </h1>
                <p className="text-sm text-muted-foreground">
                  Define escalation paths and triggers for incident management
                </p>
              </div>
              <Button onClick={handleAdd} className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-4 w-4" />
                Add Rule
              </Button>
            </div>

            {/* Rules List */}
            <div className="space-y-4">
              {rules.map((rule) => (
                <Card key={rule.id} className={cn(!rule.active && "opacity-60")}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{rule.name}</CardTitle>
                          {!rule.active && (
                            <Badge variant="secondary" className="text-xs">
                              Inactive
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <AlertTriangle className="h-3 w-3" />
                          Trigger: {rule.trigger}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
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
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3 flex gap-1">
                      {rule.priority.map((p) => (
                        <Badge key={p} variant="secondary" className={cn("text-xs", priorityColors[p])}>
                          {p}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 overflow-x-auto pb-2">
                      {rule.levels.map((level, idx) => (
                        <div key={level.level} className="flex items-center gap-2">
                          <div className="rounded-lg border border-border bg-muted/30 p-3 min-w-[140px]">
                            <div className="flex items-center gap-2 text-xs font-semibold text-[#0D3133]">
                              <ArrowUp className="h-3 w-3" />
                              {level.level}
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {level.time}
                            </div>
                            <p className="mt-1 text-sm">{level.target}</p>
                          </div>
                          {idx < rule.levels.length - 1 && (
                            <div className="h-px w-4 bg-border" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SettingsLayout>
      </div>

      {/* Edit Drawer */}
      <SettingsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingRule ? "Edit Escalation Rule" : "Add Escalation Rule"}
        description="Configure escalation triggers and levels"
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
            <Label>Trigger Condition</Label>
            <Select defaultValue={editingRule?.trigger || ""}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SLA Breach">SLA Breach</SelectItem>
                <SelectItem value="SLA At Risk">SLA At Risk (75%)</SelectItem>
                <SelectItem value="Major Incident">Major Incident Declared</SelectItem>
                <SelectItem value="VIP Flag">VIP Customer Flag</SelectItem>
                <SelectItem value="No Assignment">No Assignment</SelectItem>
                <SelectItem value="No Update">No Update (Stale)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2 block">Escalation Levels</Label>
            <div className="space-y-2">
              {(editingRule?.levels || [{ level: "L1", time: "", target: "" }]).map((level, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input defaultValue={level.level} placeholder="Level" className="w-20" />
                  <Input defaultValue={level.time} placeholder="Time" className="w-24" />
                  <Input defaultValue={level.target} placeholder="Target" className="flex-1" />
                </div>
              ))}
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-3 w-3" />
                Add Level
              </Button>
            </div>
          </div>
        </div>
      </SettingsDrawer>
    </AppShell>
  )
}
