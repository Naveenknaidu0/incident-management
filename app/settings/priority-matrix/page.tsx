"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { Home, Save, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Priority = "critical" | "high" | "medium" | "low"

const priorityMatrix: Record<string, Record<string, Priority>> = {
  critical: {
    critical: "critical",
    high: "critical",
    medium: "high",
    low: "medium",
  },
  high: {
    critical: "critical",
    high: "high",
    medium: "high",
    low: "medium",
  },
  medium: {
    critical: "high",
    high: "high",
    medium: "medium",
    low: "low",
  },
  low: {
    critical: "medium",
    high: "medium",
    medium: "low",
    low: "low",
  },
}

const impactLevels = ["critical", "high", "medium", "low"]
const urgencyLevels = ["critical", "high", "medium", "low"]

const priorityColors: Record<Priority, string> = {
  critical: "bg-red-500 text-white",
  high: "bg-orange-500 text-white",
  medium: "bg-yellow-500 text-[#0D3133]",
  low: "bg-green-500 text-white",
}

const prioritySLAs: Record<Priority, { response: string; resolution: string }> = {
  critical: { response: "15 min", resolution: "4 hours" },
  high: { response: "30 min", resolution: "8 hours" },
  medium: { response: "2 hours", resolution: "24 hours" },
  low: { response: "4 hours", resolution: "72 hours" },
}

export default function PriorityMatrixPage() {
  const [matrix, setMatrix] = useState(priorityMatrix)
  const [selectedImpact, setSelectedImpact] = useState<string>("high")
  const [selectedUrgency, setSelectedUrgency] = useState<string>("high")

  const calculatedPriority = matrix[selectedImpact]?.[selectedUrgency] || "medium"

  const handleMatrixChange = (impact: string, urgency: string, priority: Priority) => {
    setMatrix((prev) => ({
      ...prev,
      [impact]: {
        ...prev[impact],
        [urgency]: priority,
      },
    }))
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
                <BreadcrumbPage>Priority Matrix</BreadcrumbPage>
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
                  Priority Matrix
                </h1>
                <p className="text-sm text-muted-foreground">
                  Configure how impact and urgency determine incident priority
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reset to Default
                </Button>
                <Button className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>

            <Tabs defaultValue="matrix" className="space-y-6">
              <TabsList>
                <TabsTrigger value="matrix">Priority Matrix</TabsTrigger>
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
                <TabsTrigger value="sla-mapping">SLA Mapping</TabsTrigger>
              </TabsList>

              <TabsContent value="matrix" className="space-y-6">
                {/* Matrix Grid */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Impact vs Urgency Matrix</CardTitle>
                    <CardDescription>
                      Click on a cell to change the calculated priority
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="border border-border bg-muted/50 p-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                              Impact / Urgency
                            </th>
                            {urgencyLevels.map((urgency) => (
                              <th
                                key={urgency}
                                className="border border-border bg-muted/50 p-3 text-center text-xs font-semibold uppercase text-muted-foreground"
                              >
                                {urgency}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {impactLevels.map((impact) => (
                            <tr key={impact}>
                              <td className="border border-border bg-muted/50 p-3 text-xs font-semibold uppercase text-muted-foreground">
                                {impact}
                              </td>
                              {urgencyLevels.map((urgency) => {
                                const priority = matrix[impact]?.[urgency] || "medium"
                                return (
                                  <td
                                    key={`${impact}-${urgency}`}
                                    className="border border-border p-2"
                                  >
                                    <Select
                                      value={priority}
                                      onValueChange={(value) =>
                                        handleMatrixChange(impact, urgency, value as Priority)
                                      }
                                    >
                                      <SelectTrigger
                                        className={cn(
                                          "w-full border-0 font-medium capitalize",
                                          priorityColors[priority]
                                        )}
                                      >
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="critical">Critical</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </td>
                                )
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Legend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Priority Legend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      {(["critical", "high", "medium", "low"] as Priority[]).map((p) => (
                        <div key={p} className="flex items-center gap-2">
                          <div
                            className={cn(
                              "h-4 w-4 rounded",
                              priorityColors[p].split(" ")[0]
                            )}
                          />
                          <span className="text-sm capitalize text-foreground">{p}</span>
                          <span className="text-xs text-muted-foreground">
                            ({prioritySLAs[p].response} / {prioritySLAs[p].resolution})
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calculator" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Priority Calculator</CardTitle>
                    <CardDescription>
                      Test how different combinations calculate priority
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                      <div>
                        <label className="mb-2 block text-sm font-medium">Impact</label>
                        <Select value={selectedImpact} onValueChange={setSelectedImpact}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {impactLevels.map((level) => (
                              <SelectItem key={level} value={level} className="capitalize">
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">Urgency</label>
                        <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {urgencyLevels.map((level) => (
                              <SelectItem key={level} value={level} className="capitalize">
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Calculated Priority
                        </label>
                        <div
                          className={cn(
                            "flex h-10 items-center justify-center rounded-md font-semibold capitalize",
                            priorityColors[calculatedPriority]
                          )}
                        >
                          {calculatedPriority}
                        </div>
                      </div>
                    </div>

                    {/* SLA Preview */}
                    <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="mb-3 text-sm font-medium">SLA Targets</h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <span className="text-xs text-muted-foreground">Response Time</span>
                          <p className="text-lg font-semibold text-[#0D3133]">
                            {prioritySLAs[calculatedPriority].response}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Resolution Time</span>
                          <p className="text-lg font-semibold text-[#0D3133]">
                            {prioritySLAs[calculatedPriority].resolution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sla-mapping" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">SLA Mapping by Priority</CardTitle>
                    <CardDescription>
                      Configure SLA targets for each priority level
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(["critical", "high", "medium", "low"] as Priority[]).map((p) => (
                        <div
                          key={p}
                          className="flex items-center gap-4 rounded-lg border border-border p-4"
                        >
                          <Badge
                            className={cn(
                              "h-8 w-24 justify-center capitalize",
                              priorityColors[p]
                            )}
                          >
                            {p}
                          </Badge>
                          <div className="flex-1 grid gap-4 sm:grid-cols-2">
                            <div>
                              <label className="text-xs text-muted-foreground">
                                Response SLA
                              </label>
                              <Select defaultValue={prioritySLAs[p].response}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="15 min">15 minutes</SelectItem>
                                  <SelectItem value="30 min">30 minutes</SelectItem>
                                  <SelectItem value="1 hour">1 hour</SelectItem>
                                  <SelectItem value="2 hours">2 hours</SelectItem>
                                  <SelectItem value="4 hours">4 hours</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">
                                Resolution SLA
                              </label>
                              <Select defaultValue={prioritySLAs[p].resolution}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="4 hours">4 hours</SelectItem>
                                  <SelectItem value="8 hours">8 hours</SelectItem>
                                  <SelectItem value="24 hours">24 hours</SelectItem>
                                  <SelectItem value="48 hours">48 hours</SelectItem>
                                  <SelectItem value="72 hours">72 hours</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SettingsLayout>
      </div>
    </AppShell>
  )
}
