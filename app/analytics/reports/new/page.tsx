"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AppShell } from "@/components/layout/app-shell"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Home, Save, Play, X, BarChart3, LineChart, PieChart, 
  Table as TableIcon, Plus, Trash2, GripVertical, Eye
} from "lucide-react"

interface Metric {
  id: string
  name: string
  field: string
  aggregation: string
}

interface Dimension {
  id: string
  name: string
  field: string
}

const availableMetrics = [
  { value: "incident_count", label: "Incident Count" },
  { value: "resolution_time", label: "Resolution Time (MTTR)" },
  { value: "response_time", label: "Response Time (MTTA)" },
  { value: "sla_compliance", label: "SLA Compliance %" },
  { value: "escalation_count", label: "Escalation Count" },
  { value: "backlog", label: "Backlog Size" },
  { value: "reopen_rate", label: "Reopen Rate %" },
]

const availableDimensions = [
  { value: "date", label: "Date" },
  { value: "priority", label: "Priority" },
  { value: "category", label: "Category" },
  { value: "assignment_group", label: "Assignment Group" },
  { value: "service", label: "Service" },
  { value: "region", label: "Region" },
  { value: "status", label: "Status" },
]

const aggregations = [
  { value: "count", label: "Count" },
  { value: "sum", label: "Sum" },
  { value: "avg", label: "Average" },
  { value: "min", label: "Min" },
  { value: "max", label: "Max" },
]

const visualizationTypes = [
  { value: "table", label: "Table", icon: TableIcon },
  { value: "bar", label: "Bar Chart", icon: BarChart3 },
  { value: "line", label: "Line Chart", icon: LineChart },
  { value: "pie", label: "Pie Chart", icon: PieChart },
]

export default function NewReportPage() {
  const router = useRouter()
  const [reportName, setReportName] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [visualizationType, setVisualizationType] = useState("table")
  const [selectedMetrics, setSelectedMetrics] = useState<Metric[]>([
    { id: "1", name: "Incident Count", field: "incident_count", aggregation: "count" },
  ])
  const [selectedDimensions, setSelectedDimensions] = useState<Dimension[]>([
    { id: "1", name: "Date", field: "date" },
  ])

  const addMetric = () => {
    setSelectedMetrics([
      ...selectedMetrics,
      { id: Date.now().toString(), name: "", field: "", aggregation: "count" },
    ])
  }

  const removeMetric = (id: string) => {
    setSelectedMetrics(selectedMetrics.filter((m) => m.id !== id))
  }

  const addDimension = () => {
    setSelectedDimensions([
      ...selectedDimensions,
      { id: Date.now().toString(), name: "", field: "" },
    ])
  }

  const removeDimension = (id: string) => {
    setSelectedDimensions(selectedDimensions.filter((d) => d.id !== id))
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
                  <Link href="/analytics">Analytics</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/analytics/reports">Reports</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>New Report</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Page Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#0D3133]">Report Builder</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Create custom analytics reports with metrics and dimensions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => router.back()}>
                <X className="mr-1.5 h-4 w-4" />
                Cancel
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="mr-1.5 h-4 w-4" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Play className="mr-1.5 h-4 w-4" />
                Run
              </Button>
              <Button size="sm" className="bg-[#E69F50] text-[#0D3133] hover:bg-[#E69F50]/90">
                <Save className="mr-1.5 h-4 w-4" />
                Save Report
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Report Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Report Name</Label>
                    <Input
                      placeholder="e.g., Weekly SLA Performance"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Description</Label>
                    <Textarea
                      placeholder="Describe what this report shows..."
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      rows={2}
                      className="resize-none text-sm"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Metrics */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-semibold">Metrics</CardTitle>
                  <Button variant="outline" size="sm" onClick={addMetric} className="h-7 gap-1 text-xs">
                    <Plus className="h-3 w-3" />
                    Add Metric
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedMetrics.map((metric, index) => (
                    <div key={metric.id} className="flex items-center gap-2 rounded-lg border border-border p-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <Select
                        value={metric.field}
                        onValueChange={(value) => {
                          const updated = [...selectedMetrics]
                          updated[index].field = value
                          updated[index].name = availableMetrics.find(m => m.value === value)?.label || ""
                          setSelectedMetrics(updated)
                        }}
                      >
                        <SelectTrigger className="h-8 flex-1 text-xs">
                          <SelectValue placeholder="Select metric" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableMetrics.map((m) => (
                            <SelectItem key={m.value} value={m.value} className="text-xs">
                              {m.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={metric.aggregation}
                        onValueChange={(value) => {
                          const updated = [...selectedMetrics]
                          updated[index].aggregation = value
                          setSelectedMetrics(updated)
                        }}
                      >
                        <SelectTrigger className="h-8 w-24 text-xs">
                          <SelectValue placeholder="Aggregation" />
                        </SelectTrigger>
                        <SelectContent>
                          {aggregations.map((a) => (
                            <SelectItem key={a.value} value={a.value} className="text-xs">
                              {a.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0"
                        onClick={() => removeMetric(metric.id)}
                        disabled={selectedMetrics.length <= 1}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Dimensions */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-semibold">Dimensions (Group By)</CardTitle>
                  <Button variant="outline" size="sm" onClick={addDimension} className="h-7 gap-1 text-xs">
                    <Plus className="h-3 w-3" />
                    Add Dimension
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedDimensions.map((dimension, index) => (
                    <div key={dimension.id} className="flex items-center gap-2 rounded-lg border border-border p-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <Select
                        value={dimension.field}
                        onValueChange={(value) => {
                          const updated = [...selectedDimensions]
                          updated[index].field = value
                          updated[index].name = availableDimensions.find(d => d.value === value)?.label || ""
                          setSelectedDimensions(updated)
                        }}
                      >
                        <SelectTrigger className="h-8 flex-1 text-xs">
                          <SelectValue placeholder="Select dimension" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDimensions.map((d) => (
                            <SelectItem key={d.value} value={d.value} className="text-xs">
                              {d.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0"
                        onClick={() => removeDimension(dimension.id)}
                        disabled={selectedDimensions.length <= 1}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Filters */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">Date Range</Label>
                      <Select defaultValue="30d">
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d" className="text-xs">Last 7 Days</SelectItem>
                          <SelectItem value="30d" className="text-xs">Last 30 Days</SelectItem>
                          <SelectItem value="90d" className="text-xs">Last 90 Days</SelectItem>
                          <SelectItem value="custom" className="text-xs">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">Priority</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all" className="text-xs">All Priorities</SelectItem>
                          <SelectItem value="critical" className="text-xs">Critical</SelectItem>
                          <SelectItem value="high" className="text-xs">High</SelectItem>
                          <SelectItem value="medium" className="text-xs">Medium</SelectItem>
                          <SelectItem value="low" className="text-xs">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">Service</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all" className="text-xs">All Services</SelectItem>
                          <SelectItem value="payment" className="text-xs">Payment Gateway</SelectItem>
                          <SelectItem value="auth" className="text-xs">Authentication</SelectItem>
                          <SelectItem value="database" className="text-xs">Core Database</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">Assignment Group</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all" className="text-xs">All Groups</SelectItem>
                          <SelectItem value="platform" className="text-xs">Platform Engineering</SelectItem>
                          <SelectItem value="network" className="text-xs">Network Operations</SelectItem>
                          <SelectItem value="database" className="text-xs">Database Team</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Visualization */}
            <div className="space-y-6">
              {/* Visualization Type */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {visualizationTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <button
                          key={type.value}
                          onClick={() => setVisualizationType(type.value)}
                          className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors ${
                            visualizationType === type.value
                              ? "border-[#E69F50] bg-[#E69F50]/10"
                              : "border-border hover:bg-muted/50"
                          }`}
                        >
                          <Icon className={`h-6 w-6 ${
                            visualizationType === type.value ? "text-[#E69F50]" : "text-muted-foreground"
                          }`} />
                          <span className="text-xs font-medium">{type.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
                    <div className="text-center">
                      {visualizationType === "table" && <TableIcon className="mx-auto h-8 w-8 text-muted-foreground" />}
                      {visualizationType === "bar" && <BarChart3 className="mx-auto h-8 w-8 text-muted-foreground" />}
                      {visualizationType === "line" && <LineChart className="mx-auto h-8 w-8 text-muted-foreground" />}
                      {visualizationType === "pie" && <PieChart className="mx-auto h-8 w-8 text-muted-foreground" />}
                      <p className="mt-2 text-xs text-muted-foreground">
                        Click &quot;Preview&quot; to see your report
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Schedule (Optional)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox id="schedule-enabled" />
                    <Label htmlFor="schedule-enabled" className="text-xs cursor-pointer">
                      Enable scheduled delivery
                    </Label>
                  </div>
                  <Select defaultValue="weekly">
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily" className="text-xs">Daily</SelectItem>
                      <SelectItem value="weekly" className="text-xs">Weekly</SelectItem>
                      <SelectItem value="monthly" className="text-xs">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Recipients</Label>
                    <Input
                      placeholder="email@example.com"
                      className="h-8 text-xs"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
