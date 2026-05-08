"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PagingTimeline } from "@/components/oncall/paging-timeline"
import { PagingStatusBadge } from "@/components/oncall/paging-status-badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Phone,
  MessageSquare,
  Bell,
  Mail,
  Filter,
  RefreshCw,
  Send,
} from "lucide-react"

const pagingEvents = [
  { id: "1", type: "sms" as const, recipient: "Sarah Chen (+1-555-0101)", status: "acknowledged" as const, timestamp: "15:05", retryCount: 0 },
  { id: "2", type: "phone" as const, recipient: "Sarah Chen (+1-555-0101)", status: "delivered" as const, timestamp: "15:02", retryCount: 0 },
  { id: "3", type: "push" as const, recipient: "Sarah Chen (iOS App)", status: "delivered" as const, timestamp: "15:00", retryCount: 0 },
  { id: "4", type: "slack" as const, recipient: "#platform-oncall", status: "delivered" as const, timestamp: "15:00", retryCount: 0 },
  { id: "5", type: "sms" as const, recipient: "John Smith (+1-555-0102)", status: "failed" as const, timestamp: "14:35", retryCount: 2 },
  { id: "6", type: "email" as const, recipient: "john@company.com", status: "escalated" as const, timestamp: "14:30", retryCount: 3 },
]

const recentPages = [
  { id: "1", incidentId: "INC0042781", recipient: "Sarah Chen", channel: "SMS", status: "acknowledged" as const, sentAt: "15:00", acknowledgedAt: "15:05" },
  { id: "2", incidentId: "INC0042781", recipient: "Sarah Chen", channel: "Phone", status: "delivered" as const, sentAt: "15:02", acknowledgedAt: null },
  { id: "3", incidentId: "INC0042780", recipient: "John Smith", channel: "Slack", status: "delivered" as const, sentAt: "14:30", acknowledgedAt: null },
  { id: "4", incidentId: "INC0042780", recipient: "John Smith", channel: "SMS", status: "failed" as const, sentAt: "14:35", acknowledgedAt: null },
  { id: "5", incidentId: "INC0042779", recipient: "Mike Wilson", channel: "Push", status: "queued" as const, sentAt: "14:00", acknowledgedAt: null },
]

export default function PagingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [channelFilter, setChannelFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  return (
    <AppShell>
      <div className="flex flex-col h-full min-h-0">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-[#0D3133]">Paging Operations</h1>
              <p className="text-sm text-muted-foreground">Monitor and manage responder notifications</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button size="sm" className="gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
                <Send className="h-4 w-4" />
                Send Page
              </Button>
            </div>
          </div>

          {/* Channel Stats */}
          <div className="grid grid-cols-6 gap-3">
            {[
              { channel: "SMS", icon: MessageSquare, sent: 45, acked: 42, failed: 3 },
              { channel: "Push", icon: Bell, sent: 120, acked: 115, failed: 2 },
              { channel: "Phone", icon: Phone, sent: 18, acked: 16, failed: 2 },
              { channel: "Slack", icon: MessageSquare, sent: 85, acked: 80, failed: 0 },
              { channel: "Teams", icon: MessageSquare, sent: 32, acked: 30, failed: 1 },
              { channel: "Email", icon: Mail, sent: 65, acked: 58, failed: 4 },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.channel} className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{stat.channel}</span>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#0D3133]">{stat.sent}</span>
                    <span className="text-xs text-green-600">{stat.acked} ack</span>
                    {stat.failed > 0 && (
                      <span className="text-xs text-red-600">{stat.failed} fail</span>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6">
          <Tabs defaultValue="timeline">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search pages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Select value={channelFilter} onValueChange={setChannelFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Channels</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="push">Push</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="teams">Teams</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="queued">Queued</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="acknowledged">Acknowledged</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="timeline">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-[#0D3133]">
                    Recent Paging Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PagingTimeline events={pagingEvents} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Incident</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Recipient</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Channel</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Sent</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Acknowledged</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentPages.map((page) => (
                          <tr key={page.id} className="border-b border-border hover:bg-muted/30">
                            <td className="px-4 py-3 font-mono text-[#0D3133]">{page.incidentId}</td>
                            <td className="px-4 py-3">{page.recipient}</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline">{page.channel}</Badge>
                            </td>
                            <td className="px-4 py-3">
                              <PagingStatusBadge status={page.status} />
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">{page.sentAt}</td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {page.acknowledgedAt || "-"}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Button variant="ghost" size="sm" className="h-7">
                                Retry
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="failed">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Incident</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Recipient</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Channel</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Error</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Retries</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentPages
                          .filter((p) => p.status === "failed")
                          .map((page) => (
                            <tr key={page.id} className="border-b border-border hover:bg-muted/30">
                              <td className="px-4 py-3 font-mono text-[#0D3133]">{page.incidentId}</td>
                              <td className="px-4 py-3">{page.recipient}</td>
                              <td className="px-4 py-3">
                                <Badge variant="outline">{page.channel}</Badge>
                              </td>
                              <td className="px-4 py-3 text-red-600 text-xs">Delivery timeout</td>
                              <td className="px-4 py-3 text-muted-foreground">2/3</td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button variant="outline" size="sm" className="h-7">
                                    Retry
                                  </Button>
                                  <Button variant="outline" size="sm" className="h-7">
                                    Escalate
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  )
}
