"use client"

import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
import { Home, Save } from "lucide-react"

export default function PreferencesPage() {
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
                <BreadcrumbPage>Preferences</BreadcrumbPage>
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
                  Platform Preferences
                </h1>
                <p className="text-sm text-muted-foreground">
                  Configure default settings and operational preferences
                </p>
              </div>
              <Button className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>

            <div className="space-y-6">
              {/* Display Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Display Settings</CardTitle>
                  <CardDescription>
                    Configure default view options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Default Queue View</Label>
                      <p className="text-xs text-muted-foreground">
                        Queue displayed on login
                      </p>
                    </div>
                    <Select defaultValue="my-queue">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="my-queue">My Queue</SelectItem>
                        <SelectItem value="team-queue">Team Queue</SelectItem>
                        <SelectItem value="all-open">All Open Incidents</SelectItem>
                        <SelectItem value="critical">Critical Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Table Density</Label>
                      <p className="text-xs text-muted-foreground">
                        Row spacing in data tables
                      </p>
                    </div>
                    <Select defaultValue="comfortable">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Items Per Page</Label>
                      <p className="text-xs text-muted-foreground">
                        Default pagination size
                      </p>
                    </div>
                    <Select defaultValue="25">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 items</SelectItem>
                        <SelectItem value="25">25 items</SelectItem>
                        <SelectItem value="50">50 items</SelectItem>
                        <SelectItem value="100">100 items</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Incident Defaults */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Incident Defaults</CardTitle>
                  <CardDescription>
                    Default values for new incidents
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Default Priority</Label>
                      <p className="text-xs text-muted-foreground">
                        Initial priority for new incidents
                      </p>
                    </div>
                    <Select defaultValue="medium">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Default Assignment Group</Label>
                      <p className="text-xs text-muted-foreground">
                        Auto-assign new incidents
                      </p>
                    </div>
                    <Select defaultValue="service-desk">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None (Unassigned)</SelectItem>
                        <SelectItem value="service-desk">Service Desk</SelectItem>
                        <SelectItem value="network-ops">Network Operations</SelectItem>
                        <SelectItem value="app-support">Application Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-populate Reporter</Label>
                      <p className="text-xs text-muted-foreground">
                        Set current user as reporter
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Notification Preferences</CardTitle>
                  <CardDescription>
                    Personal alert settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Desktop Notifications</Label>
                      <p className="text-xs text-muted-foreground">
                        Browser push notifications
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Sound Alerts</Label>
                      <p className="text-xs text-muted-foreground">
                        Play sound for critical alerts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Digest</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive daily summary email
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Keyboard Shortcuts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Keyboard Shortcuts</CardTitle>
                  <CardDescription>
                    Enable keyboard navigation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Shortcuts</Label>
                      <p className="text-xs text-muted-foreground">
                        Use keyboard for quick actions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Vim-style Navigation</Label>
                      <p className="text-xs text-muted-foreground">
                        Use j/k for up/down movement
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Theme Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Theme Settings</CardTitle>
                  <CardDescription>
                    Visual appearance preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Color Theme</Label>
                      <p className="text-xs text-muted-foreground">
                        Light or dark mode
                      </p>
                    </div>
                    <Select defaultValue="light">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Sidebar Collapsed</Label>
                      <p className="text-xs text-muted-foreground">
                        Start with collapsed sidebar
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SettingsLayout>
      </div>
    </AppShell>
  )
}
