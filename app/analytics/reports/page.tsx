"use client"

import { useState } from "react"
import Link from "next/link"
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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Home, Plus, FileText, Search, Filter, MoreHorizontal,
  Star, Copy, Download, Trash2, Calendar, Clock,
  BarChart3, LineChart, PieChart, Table as TableIcon
} from "lucide-react"

interface SavedReport {
  id: string
  name: string
  description: string
  type: "table" | "chart" | "dashboard"
  category: string
  lastRun: string
  schedule?: string
  owner: string
  starred: boolean
}

const savedReports: SavedReport[] = [
  {
    id: "1",
    name: "Weekly SLA Performance",
    description: "SLA compliance trends by team and priority",
    type: "chart",
    category: "SLA",
    lastRun: "2 hours ago",
    schedule: "Weekly",
    owner: "Sarah Chen",
    starred: true,
  },
  {
    id: "2",
    name: "Monthly Incident Summary",
    description: "Executive summary of incident metrics",
    type: "dashboard",
    category: "Executive",
    lastRun: "1 day ago",
    schedule: "Monthly",
    owner: "Mike Rodriguez",
    starred: true,
  },
  {
    id: "3",
    name: "Team Workload Analysis",
    description: "Ticket distribution and backlog by assignment group",
    type: "table",
    category: "Operations",
    lastRun: "5 hours ago",
    owner: "Lisa Park",
    starred: false,
  },
  {
    id: "4",
    name: "Service Health Report",
    description: "Uptime and availability metrics by service",
    type: "chart",
    category: "Services",
    lastRun: "3 hours ago",
    schedule: "Daily",
    owner: "Tom Wilson",
    starred: false,
  },
  {
    id: "5",
    name: "Major Incident Analysis",
    description: "Post-incident metrics and trends for P1/P2",
    type: "dashboard",
    category: "Major Incidents",
    lastRun: "12 hours ago",
    owner: "Sarah Chen",
    starred: true,
  },
]

const typeIcons = {
  table: TableIcon,
  chart: BarChart3,
  dashboard: PieChart,
}

export default function CustomReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredReports = savedReports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || report.category === categoryFilter
    return matchesSearch && matchesCategory
  })

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
                <BreadcrumbPage>Custom Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Page Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#0D3133]">Custom Reports</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Create, manage, and schedule custom analytics reports
              </p>
            </div>
            <Button asChild className="bg-[#E69F50] text-[#0D3133] hover:bg-[#E69F50]/90">
              <Link href="/analytics/reports/new" className="gap-1.5">
                <Plus className="h-4 w-4" />
                New Report
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-9 text-sm"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-8 w-[150px] text-xs">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Executive">Executive</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
                <SelectItem value="SLA">SLA</SelectItem>
                <SelectItem value="Services">Services</SelectItem>
                <SelectItem value="Major Incidents">Major Incidents</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reports List */}
        <div className="flex-1 overflow-y-auto p-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-8"></TableHead>
                    <TableHead className="text-[11px] font-medium">Report Name</TableHead>
                    <TableHead className="text-[11px] font-medium">Type</TableHead>
                    <TableHead className="text-[11px] font-medium">Category</TableHead>
                    <TableHead className="text-[11px] font-medium">Schedule</TableHead>
                    <TableHead className="text-[11px] font-medium">Last Run</TableHead>
                    <TableHead className="text-[11px] font-medium">Owner</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => {
                    const TypeIcon = typeIcons[report.type]
                    return (
                      <TableRow key={report.id} className="hover:bg-muted/50">
                        <TableCell className="text-center">
                          <button className="text-muted-foreground hover:text-[#E69F50]">
                            <Star className={`h-4 w-4 ${report.starred ? "fill-[#E69F50] text-[#E69F50]" : ""}`} />
                          </button>
                        </TableCell>
                        <TableCell>
                          <Link href={`/analytics/reports/${report.id}`} className="group">
                            <div className="flex items-center gap-2">
                              <TypeIcon className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs font-medium group-hover:text-[#E69F50]">{report.name}</p>
                                <p className="text-[10px] text-muted-foreground">{report.description}</p>
                              </div>
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-[10px] capitalize">
                            {report.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">{report.category}</TableCell>
                        <TableCell>
                          {report.schedule ? (
                            <Badge variant="outline" className="text-[10px] gap-1">
                              <Calendar className="h-3 w-3" />
                              {report.schedule}
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {report.lastRun}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs">{report.owner}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem className="text-xs">
                                <Download className="mr-2 h-3.5 w-3.5" />
                                Export
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-xs">
                                <Copy className="mr-2 h-3.5 w-3.5" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-xs">
                                <Calendar className="mr-2 h-3.5 w-3.5" />
                                Schedule
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-xs text-destructive">
                                <Trash2 className="mr-2 h-3.5 w-3.5" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
