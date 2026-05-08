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
import {
  Home,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Clock,
  Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface BusinessHours {
  id: string
  name: string
  timezone: string
  schedule: { day: string; start: string; end: string; enabled: boolean }[]
  isDefault: boolean
  active: boolean
}

const mockSchedules: BusinessHours[] = [
  {
    id: "1",
    name: "US Business Hours",
    timezone: "America/New_York",
    isDefault: true,
    active: true,
    schedule: [
      { day: "Monday", start: "09:00", end: "17:00", enabled: true },
      { day: "Tuesday", start: "09:00", end: "17:00", enabled: true },
      { day: "Wednesday", start: "09:00", end: "17:00", enabled: true },
      { day: "Thursday", start: "09:00", end: "17:00", enabled: true },
      { day: "Friday", start: "09:00", end: "17:00", enabled: true },
      { day: "Saturday", start: "09:00", end: "17:00", enabled: false },
      { day: "Sunday", start: "09:00", end: "17:00", enabled: false },
    ],
  },
  {
    id: "2",
    name: "24x7 Support",
    timezone: "UTC",
    isDefault: false,
    active: true,
    schedule: [
      { day: "Monday", start: "00:00", end: "23:59", enabled: true },
      { day: "Tuesday", start: "00:00", end: "23:59", enabled: true },
      { day: "Wednesday", start: "00:00", end: "23:59", enabled: true },
      { day: "Thursday", start: "00:00", end: "23:59", enabled: true },
      { day: "Friday", start: "00:00", end: "23:59", enabled: true },
      { day: "Saturday", start: "00:00", end: "23:59", enabled: true },
      { day: "Sunday", start: "00:00", end: "23:59", enabled: true },
    ],
  },
  {
    id: "3",
    name: "EMEA Business Hours",
    timezone: "Europe/London",
    isDefault: false,
    active: true,
    schedule: [
      { day: "Monday", start: "09:00", end: "18:00", enabled: true },
      { day: "Tuesday", start: "09:00", end: "18:00", enabled: true },
      { day: "Wednesday", start: "09:00", end: "18:00", enabled: true },
      { day: "Thursday", start: "09:00", end: "18:00", enabled: true },
      { day: "Friday", start: "09:00", end: "18:00", enabled: true },
      { day: "Saturday", start: "09:00", end: "18:00", enabled: false },
      { day: "Sunday", start: "09:00", end: "18:00", enabled: false },
    ],
  },
  {
    id: "4",
    name: "APAC Business Hours",
    timezone: "Asia/Singapore",
    isDefault: false,
    active: true,
    schedule: [
      { day: "Monday", start: "09:00", end: "18:00", enabled: true },
      { day: "Tuesday", start: "09:00", end: "18:00", enabled: true },
      { day: "Wednesday", start: "09:00", end: "18:00", enabled: true },
      { day: "Thursday", start: "09:00", end: "18:00", enabled: true },
      { day: "Friday", start: "09:00", end: "18:00", enabled: true },
      { day: "Saturday", start: "09:00", end: "18:00", enabled: false },
      { day: "Sunday", start: "09:00", end: "18:00", enabled: false },
    ],
  },
  {
    id: "5",
    name: "Extended Hours",
    timezone: "America/New_York",
    isDefault: false,
    active: true,
    schedule: [
      { day: "Monday", start: "07:00", end: "21:00", enabled: true },
      { day: "Tuesday", start: "07:00", end: "21:00", enabled: true },
      { day: "Wednesday", start: "07:00", end: "21:00", enabled: true },
      { day: "Thursday", start: "07:00", end: "21:00", enabled: true },
      { day: "Friday", start: "07:00", end: "21:00", enabled: true },
      { day: "Saturday", start: "09:00", end: "17:00", enabled: true },
      { day: "Sunday", start: "09:00", end: "17:00", enabled: false },
    ],
  },
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function BusinessHoursPage() {
  const [schedules, setSchedules] = useState(mockSchedules)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<BusinessHours | null>(null)

  const handleEdit = (schedule: BusinessHours) => {
    setEditingSchedule(schedule)
    setDrawerOpen(true)
  }

  const handleAdd = () => {
    setEditingSchedule(null)
    setDrawerOpen(true)
  }

  const getActiveHours = (schedule: BusinessHours) => {
    const activeDays = schedule.schedule.filter((d) => d.enabled)
    if (activeDays.length === 7) return "24x7"
    if (activeDays.length === 0) return "No hours set"
    return `${activeDays.length} days/week`
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
                <BreadcrumbPage>Business Hours</BreadcrumbPage>
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
                  Business Hours
                </h1>
                <p className="text-sm text-muted-foreground">
                  Configure support schedules for SLA calculations
                </p>
              </div>
              <Button onClick={handleAdd} className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Plus className="h-4 w-4" />
                Add Schedule
              </Button>
            </div>

            {/* Schedules Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {schedules.map((schedule) => (
                <Card key={schedule.id} className="hover:border-[#E69F50] transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="rounded-md bg-muted p-2">
                          <Clock className="h-4 w-4 text-[#0D3133]" />
                        </div>
                        {schedule.isDefault && (
                          <Badge className="bg-[#E69F50] text-xs">Default</Badge>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(schedule)}>
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
                    <CardTitle className="mt-3 text-base">{schedule.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-xs">
                      <Globe className="h-3 w-3" />
                      {schedule.timezone}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {getActiveHours(schedule)}
                      </span>
                      <Switch checked={schedule.active} />
                    </div>
                    <div className="mt-3 flex gap-1">
                      {days.map((day) => {
                        const daySchedule = schedule.schedule.find((d) => d.day === day)
                        return (
                          <div
                            key={day}
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded text-xs font-medium",
                              daySchedule?.enabled
                                ? "bg-[#0D3133] text-white"
                                : "bg-muted text-muted-foreground"
                            )}
                            title={day}
                          >
                            {day.charAt(0)}
                          </div>
                        )
                      })}
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
        title={editingSchedule ? "Edit Business Hours" : "Add Business Hours"}
        description="Configure support schedule and timezone"
        width="lg"
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#0D3133] hover:bg-[#0D3133]/90">
              {editingSchedule ? "Save Changes" : "Create Schedule"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Schedule Name</Label>
            <Input
              id="name"
              defaultValue={editingSchedule?.name}
              placeholder="Enter schedule name"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Timezone</Label>
            <Select defaultValue={editingSchedule?.timezone || "America/New_York"}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                <SelectItem value="America/Los_Angeles">America/Los_Angeles (PST)</SelectItem>
                <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                <SelectItem value="Europe/Paris">Europe/Paris (CET)</SelectItem>
                <SelectItem value="Asia/Singapore">Asia/Singapore (SGT)</SelectItem>
                <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                <SelectItem value="Australia/Sydney">Australia/Sydney (AEST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-3 block">Weekly Schedule</Label>
            <div className="space-y-2">
              {days.map((day) => {
                const daySchedule = editingSchedule?.schedule.find((d) => d.day === day) || {
                  day,
                  start: "09:00",
                  end: "17:00",
                  enabled: day !== "Saturday" && day !== "Sunday",
                }
                return (
                  <div
                    key={day}
                    className="flex items-center gap-4 rounded-lg border border-border p-3"
                  >
                    <Switch defaultChecked={daySchedule.enabled} />
                    <span className="w-24 text-sm font-medium">{day}</span>
                    <div className="flex flex-1 items-center gap-2">
                      <Input
                        type="time"
                        defaultValue={daySchedule.start}
                        className="w-32"
                      />
                      <span className="text-muted-foreground">to</span>
                      <Input
                        type="time"
                        defaultValue={daySchedule.end}
                        className="w-32"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Set as Default</Label>
              <p className="text-xs text-muted-foreground">
                Use this schedule for new SLA policies
              </p>
            </div>
            <Switch defaultChecked={editingSchedule?.isDefault} />
          </div>
        </div>
      </SettingsDrawer>
    </AppShell>
  )
}
