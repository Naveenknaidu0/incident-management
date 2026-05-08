"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Home,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  LinkIcon,
  Server,
  Filter,
} from "lucide-react"

const mockKnownErrors = [
  {
    id: "KE0000234",
    title: "VPN Disconnection During Peak Hours",
    description: "Users experience frequent VPN disconnections during peak usage hours (9-11 AM, 2-4 PM).",
    affectedServices: ["VPN Gateway", "Auth Service"],
    hasWorkaround: true,
    workaround: "Users can connect to alternate gateway vpn2.company.com",
    linkedIncidents: 47,
    status: "in-progress" as const,
    priority: "High",
    lastUpdated: "2 hours ago",
    owner: "Network Team",
  },
  {
    id: "KE0000219",
    title: "Email Attachment Size Limit Error",
    description: "Users receive misleading error when attachment exceeds 25MB limit.",
    affectedServices: ["Email Server", "Exchange"],
    hasWorkaround: true,
    workaround: "Use file sharing service for large attachments",
    linkedIncidents: 23,
    status: "open" as const,
    priority: "Medium",
    lastUpdated: "1 day ago",
    owner: "Email Team",
  },
  {
    id: "KE0000198",
    title: "Database Connection Pool Exhaustion",
    description: "Application servers run out of database connections during high load.",
    affectedServices: ["Core Database", "App Server"],
    hasWorkaround: false,
    workaround: "",
    linkedIncidents: 12,
    status: "in-progress" as const,
    priority: "Critical",
    lastUpdated: "3 days ago",
    owner: "Database Team",
  },
  {
    id: "KE0000187",
    title: "SSO Token Expiration Not Refreshed",
    description: "SSO tokens not refreshing properly, causing users to re-authenticate frequently.",
    affectedServices: ["SSO Service", "Identity Provider"],
    hasWorkaround: true,
    workaround: "Clear browser cookies and re-authenticate",
    linkedIncidents: 89,
    status: "resolved" as const,
    priority: "High",
    lastUpdated: "1 week ago",
    owner: "Identity Team",
  },
  {
    id: "KE0000165",
    title: "Printer Queue Stalling",
    description: "Print jobs get stuck in queue and require manual intervention.",
    affectedServices: ["Print Server", "Network Printers"],
    hasWorkaround: true,
    workaround: "Restart print spooler service",
    linkedIncidents: 156,
    status: "open" as const,
    priority: "Low",
    lastUpdated: "2 weeks ago",
    owner: "Desktop Support",
  },
]

const statusConfig = {
  open: { label: "Open", color: "bg-red-50 text-red-700", dot: "bg-red-500" },
  "in-progress": { label: "In Progress", color: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  resolved: { label: "Resolved", color: "bg-green-50 text-green-700", dot: "bg-green-500" },
}

const priorityConfig = {
  Critical: "bg-red-100 text-red-800",
  High: "bg-orange-100 text-orange-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-slate-100 text-slate-800",
}

export default function KnownErrorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredErrors = mockKnownErrors.filter((error) => {
    if (statusFilter !== "all" && error.status !== statusFilter) return false
    if (activeTab === "with-workaround" && !error.hasWorkaround) return false
    if (activeTab === "no-workaround" && error.hasWorkaround) return false
    if (searchQuery && !error.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
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
                  <Link href="/knowledge">Knowledge Base</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Known Errors</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-xl font-semibold text-[#0D3133]">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Known Error Database
              </h1>
              <p className="text-sm text-muted-foreground">
                Track and manage recurring issues and their workarounds
              </p>
            </div>
            <Button size="sm" className="gap-2 bg-[#E69F50] hover:bg-[#E69F50]/90">
              <Plus className="h-4 w-4" />
              New Known Error
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <Card className="p-3">
              <p className="text-xs text-muted-foreground">Total Known Errors</p>
              <p className="text-2xl font-semibold text-[#0D3133]">156</p>
            </Card>
            <Card className="p-3">
              <p className="text-xs text-muted-foreground">Open</p>
              <p className="text-2xl font-semibold text-red-600">42</p>
            </Card>
            <Card className="p-3">
              <p className="text-xs text-muted-foreground">In Progress</p>
              <p className="text-2xl font-semibold text-amber-600">28</p>
            </Card>
            <Card className="p-3">
              <p className="text-xs text-muted-foreground">With Workaround</p>
              <p className="text-2xl font-semibold text-green-600">89</p>
            </Card>
            <Card className="p-3">
              <p className="text-xs text-muted-foreground">Linked Incidents</p>
              <p className="text-2xl font-semibold text-[#E69F50]">1,247</p>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 md:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search known errors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="shrink-0 border-b border-border bg-card px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-10 -mb-px bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
              >
                All Errors
              </TabsTrigger>
              <TabsTrigger
                value="with-workaround"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
              >
                With Workaround
              </TabsTrigger>
              <TabsTrigger
                value="no-workaround"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
              >
                No Workaround
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {filteredErrors.map((error) => (
              <Card key={error.id} className="transition-all hover:border-[#E69F50]/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-[#E69F50]">{error.id}</span>
                        <Badge variant="secondary" className={statusConfig[error.status].color}>
                          <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${statusConfig[error.status].dot}`} />
                          {statusConfig[error.status].label}
                        </Badge>
                        <Badge variant="outline" className={priorityConfig[error.priority as keyof typeof priorityConfig]}>
                          {error.priority}
                        </Badge>
                      </div>
                      <h3 className="mt-2 text-sm font-semibold text-[#0D3133]">
                        {error.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {error.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Server className="h-3.5 w-3.5" />
                          {error.affectedServices.join(", ")}
                        </span>
                        <span className="flex items-center gap-1">
                          <LinkIcon className="h-3.5 w-3.5" />
                          {error.linkedIncidents} incidents
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {error.lastUpdated}
                        </span>
                      </div>

                      {error.hasWorkaround && (
                        <div className="mt-3 rounded-md bg-green-50 p-2">
                          <p className="flex items-center gap-1 text-xs font-medium text-green-700">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Workaround Available
                          </p>
                          <p className="mt-1 text-xs text-green-600">{error.workaround}</p>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/knowledge/known-errors/${error.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
