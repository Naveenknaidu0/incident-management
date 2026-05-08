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
  GripVertical,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Status {
  id: string
  name: string
  color: string
  category: "open" | "in-progress" | "pending" | "resolved" | "closed"
  active: boolean
  order: number
  allowedTransitions: string[]
}

const mockStatuses: Status[] = [
  { id: "1", name: "New", color: "#64748B", category: "open", active: true, order: 1, allowedTransitions: ["2", "3"] },
  { id: "2", name: "Assigned", color: "#3B82F6", category: "open", active: true, order: 2, allowedTransitions: ["3", "4", "5"] },
  { id: "3", name: "In Progress", color: "#F59E0B", category: "in-progress", active: true, order: 3, allowedTransitions: ["4", "5", "6"] },
  { id: "4", name: "Pending", color: "#8B5CF6", category: "pending", active: true, order: 4, allowedTransitions: ["3", "5", "6"] },
  { id: "5", name: "Waiting for Vendor", color: "#6366F1", category: "pending", active: true, order: 5, allowedTransitions: ["3", "4", "6"] },
  { id: "6", name: "Resolved", color: "#22C55E", category: "resolved", active: true, order: 6, allowedTransitions: ["3", "7"] },
  { id: "7", name: "Closed", color: "#71717A", category: "closed", active: true, order: 7, allowedTransitions: [] },
  { id: "8", name: "Major Incident", color: "#DC2626", category: "in-progress", active: true, order: 8, allowedTransitions: ["3", "6"] },
]

const categoryColors: Record<string, string> = {
  open: "bg-blue-100 text-blue-800",
  "in-progress": "bg-amber-100 text-amber-800",
  pending: "bg-purple-100 text-purple-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-slate-100 text-slate-800",
}

export default function StatusesPage() {
  const [statuses, setStatuses] = useState(mockStatuses)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingStatus, setEditingStatus] = useState<Status | null>(null)

  const handleEdit = (status: Status) => {
    setEditingStatus(status)
    setDrawerOpen(true)
  }

  const handleAdd = () => {
    setEditingStatus(null)
    setDrawerOpen(true)
  }

  const getStatusById = (id: string) => statuses.find((s) => s.id === id)

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
                <BreadcrumbPage>Statuses</BreadcrumbPage>
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
                  Status Configuration
                </h1>
                <p className="text-sm text-muted-foreground">
                  Define incident lifecycle statuses and transitions
                </p>
              </div>
              <Button onClick={handleAdd} className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-4 w-4" />
                Add Status
              </Button>
            </div>

            {/* Status List */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-base">Status Definitions</CardTitle>
                <CardDescription>
                  Drag to reorder statuses in the lifecycle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {statuses.sort((a, b) => a.order - b.order).map((status) => (
                    <div
                      key={status.id}
                      className="flex items-center gap-4 rounded-lg border border-border p-3 hover:bg-muted/30"
                    >
                      <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: status.color }}
                      />
                      <span className="min-w-[140px] text-sm font-medium text-[#0D3133]">
                        {status.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className={cn("text-xs capitalize", categoryColors[status.category])}
                      >
                        {status.category}
                      </Badge>
                      <div className="flex flex-1 items-center gap-1">
                        <span className="text-xs text-muted-foreground">Transitions:</span>
                        {status.allowedTransitions.length > 0 ? (
                          status.allowedTransitions.map((tid, idx) => {
                            const target = getStatusById(tid)
                            return (
                              <span key={tid} className="flex items-center">
                                {idx > 0 && <span className="mx-1 text-muted-foreground">,</span>}
                                <Badge variant="outline" className="text-xs">
                                  {target?.name}
                                </Badge>
                              </span>
                            )
                          })
                        ) : (
                          <span className="text-xs text-muted-foreground">Final state</span>
                        )}
                      </div>
                      <Switch checked={status.active} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(status)}>
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

            {/* Workflow Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Status Flow Preview</CardTitle>
                <CardDescription>
                  Visual representation of status transitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-3">
                  {statuses
                    .filter((s) => s.active)
                    .sort((a, b) => a.order - b.order)
                    .map((status, idx, arr) => (
                      <div key={status.id} className="flex items-center gap-2">
                        <div
                          className="rounded-md px-3 py-1.5 text-sm font-medium text-white"
                          style={{ backgroundColor: status.color }}
                        >
                          {status.name}
                        </div>
                        {idx < arr.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        )}
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
        title={editingStatus ? "Edit Status" : "Add Status"}
        description="Configure status properties and transitions"
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90">
              {editingStatus ? "Save Changes" : "Create Status"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Status Name</Label>
            <Input
              id="name"
              defaultValue={editingStatus?.name}
              placeholder="Enter status name"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="color">Color</Label>
            <div className="mt-1.5 flex gap-2">
              {["#64748B", "#3B82F6", "#F59E0B", "#8B5CF6", "#22C55E", "#DC2626", "#71717A"].map(
                (color) => (
                  <button
                    key={color}
                    className={cn(
                      "h-8 w-8 rounded-md border-2",
                      editingStatus?.color === color
                        ? "border-[#0D3133]"
                        : "border-transparent"
                    )}
                    style={{ backgroundColor: color }}
                  />
                )
              )}
            </div>
          </div>
          <div>
            <Label>Category</Label>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {Object.keys(categoryColors).map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className={cn(
                    "cursor-pointer capitalize",
                    categoryColors[cat],
                    editingStatus?.category === cat && "ring-2 ring-[#0D3133]"
                  )}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Active</Label>
              <p className="text-xs text-muted-foreground">
                Enable this status in the lifecycle
              </p>
            </div>
            <Switch defaultChecked={editingStatus?.active ?? true} />
          </div>
        </div>
      </SettingsDrawer>
    </AppShell>
  )
}
