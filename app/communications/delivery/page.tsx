"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DeliveryTrackingTable } from "@/components/communications/delivery-tracking-table"
import {
  Home,
  Search,
  Filter,
  RefreshCw,
  Send,
  Check,
  AlertCircle,
  Clock,
  Eye,
  CheckCheck,
  Download,
} from "lucide-react"

const deliveryRecords = [
  {
    id: "DEL001",
    subject: "Major Incident Update - Payment Gateway",
    recipient: "john.smith@company.com",
    channel: "email" as const,
    status: "delivered" as const,
    priority: "critical" as const,
    sentAt: "5 min ago",
    deliveredAt: "5 min ago",
    incidentId: "INC0042781",
  },
  {
    id: "DEL002",
    subject: "Major Incident Update - Payment Gateway",
    recipient: "#ops-critical",
    channel: "slack" as const,
    status: "delivered" as const,
    priority: "critical" as const,
    sentAt: "5 min ago",
    deliveredAt: "5 min ago",
    incidentId: "INC0042781",
  },
  {
    id: "DEL003",
    subject: "Executive Briefing",
    recipient: "robert.brown@company.com",
    channel: "email" as const,
    status: "read" as const,
    priority: "executive-critical" as const,
    sentAt: "1 hour ago",
    deliveredAt: "1 hour ago",
  },
  {
    id: "DEL004",
    subject: "SLA Breach Warning",
    recipient: "sarah.chen@company.com",
    channel: "email" as const,
    status: "acknowledged" as const,
    priority: "warning" as const,
    sentAt: "2 hours ago",
    deliveredAt: "2 hours ago",
    incidentId: "INC0042756",
  },
  {
    id: "DEL005",
    subject: "Customer Notification",
    recipient: "support@acme.com",
    channel: "email" as const,
    status: "failed" as const,
    priority: "critical" as const,
    sentAt: "3 hours ago",
    incidentId: "INC0042781",
  },
  {
    id: "DEL006",
    subject: "Maintenance Notice",
    recipient: "+1-555-0123",
    channel: "sms" as const,
    status: "failed" as const,
    priority: "informational" as const,
    sentAt: "4 hours ago",
  },
  {
    id: "DEL007",
    subject: "Service Update",
    recipient: "All Users",
    channel: "push" as const,
    status: "sending" as const,
    priority: "informational" as const,
    sentAt: "Just now",
  },
  {
    id: "DEL008",
    subject: "Scheduled Maintenance",
    recipient: "Engineering Team",
    channel: "teams" as const,
    status: "queued" as const,
    priority: "informational" as const,
    sentAt: "Scheduled",
  },
]

const statusCounts = {
  all: deliveryRecords.length,
  queued: deliveryRecords.filter((r) => r.status === "queued").length,
  sending: deliveryRecords.filter((r) => r.status === "sending").length,
  delivered: deliveryRecords.filter((r) => r.status === "delivered").length,
  failed: deliveryRecords.filter((r) => r.status === "failed").length,
  read: deliveryRecords.filter((r) => r.status === "read").length,
  acknowledged: deliveryRecords.filter((r) => r.status === "acknowledged").length,
}

export default function DeliveryTrackingPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRecords = deliveryRecords.filter((r) => {
    const matchesSearch = r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.recipient.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || r.status === activeTab
    return matchesSearch && matchesTab
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
                  <Link href="/communications">Communications</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Delivery Tracking</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#0D3133]/10 p-2">
                <Send className="h-5 w-5 text-[#0D3133]" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#0D3133]">Delivery Tracking</h1>
                <p className="text-sm text-muted-foreground">Monitor notification delivery status and analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="grid grid-cols-6 gap-3">
            <Card className="bg-slate-50">
              <CardContent className="p-3 flex items-center gap-3">
                <Clock className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Queued</p>
                  <p className="text-lg font-semibold">{statusCounts.queued}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="p-3 flex items-center gap-3">
                <Send className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Sending</p>
                  <p className="text-lg font-semibold">{statusCounts.sending}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-green-50">
              <CardContent className="p-3 flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Delivered</p>
                  <p className="text-lg font-semibold">{statusCounts.delivered}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-red-50">
              <CardContent className="p-3 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Failed</p>
                  <p className="text-lg font-semibold">{statusCounts.failed}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-emerald-50">
              <CardContent className="p-3 flex items-center gap-3">
                <Eye className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Read</p>
                  <p className="text-lg font-semibold">{statusCounts.read}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0D3133]/10">
              <CardContent className="p-3 flex items-center gap-3">
                <CheckCheck className="h-5 w-5 text-[#0D3133]" />
                <div>
                  <p className="text-xs text-muted-foreground">Acknowledged</p>
                  <p className="text-lg font-semibold">{statusCounts.acknowledged}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Toolbar */}
        <div className="shrink-0 border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search deliveries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8 text-sm"
              />
            </div>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredRecords.length} records
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <div className="sticky top-0 bg-card border-b border-border px-6">
              <TabsList className="h-10 bg-transparent p-0 gap-4">
                <TabsTrigger
                  value="all"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  All
                  <Badge variant="secondary" className="ml-1.5">{statusCounts.all}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="queued"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Queued
                  <Badge variant="secondary" className="ml-1.5">{statusCounts.queued}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="sending"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Sending
                  <Badge variant="secondary" className="ml-1.5">{statusCounts.sending}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="delivered"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Delivered
                  <Badge variant="secondary" className="ml-1.5">{statusCounts.delivered}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="failed"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Failed
                  <Badge variant="secondary" className="ml-1.5 bg-red-100 text-red-700">{statusCounts.failed}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="read"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Read
                  <Badge variant="secondary" className="ml-1.5">{statusCounts.read}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="acknowledged"
                  className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent px-0"
                >
                  Acknowledged
                  <Badge variant="secondary" className="ml-1.5">{statusCounts.acknowledged}</Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0 p-6">
              <DeliveryTrackingTable records={filteredRecords} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}
