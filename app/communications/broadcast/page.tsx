"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
import { MessagePriorityBadge } from "@/components/communications/message-priority-badge"
import { ChannelBadge } from "@/components/communications/channel-badge"
import {
  Home,
  Megaphone,
  Send,
  Clock,
  Users,
  Eye,
  Mail,
  MessageSquare,
  Phone,
  Bell,
  Globe,
  ChevronRight,
} from "lucide-react"

const recentBroadcasts = [
  {
    id: "BC001",
    subject: "Major Incident Update - Payment Gateway",
    audience: "All Stakeholders",
    reach: 847,
    sentAt: "5 min ago",
    priority: "critical" as const,
    channels: ["email" as const, "slack" as const, "sms" as const],
  },
  {
    id: "BC002",
    subject: "Service Restoration Notice",
    audience: "Engineering + Operations",
    reach: 234,
    sentAt: "1 hour ago",
    priority: "informational" as const,
    channels: ["email" as const, "slack" as const],
  },
  {
    id: "BC003",
    subject: "Scheduled Maintenance Window",
    audience: "Customers",
    reach: 1250,
    sentAt: "3 hours ago",
    priority: "informational" as const,
    channels: ["email" as const, "push" as const],
  },
]

const audienceGroups = [
  { id: "all", label: "All Stakeholders", count: 847 },
  { id: "executives", label: "Executives", count: 12 },
  { id: "service-owners", label: "Service Owners", count: 45 },
  { id: "operations", label: "Operations Team", count: 78 },
  { id: "engineering", label: "Engineering", count: 156 },
  { id: "customers", label: "Customers", count: 1250 },
]

const channels = [
  { id: "email", label: "Email", icon: Mail, enabled: true },
  { id: "slack", label: "Slack", icon: MessageSquare, enabled: true },
  { id: "teams", label: "Teams", icon: MessageSquare, enabled: false },
  { id: "sms", label: "SMS", icon: Phone, enabled: true },
  { id: "push", label: "Push", icon: Bell, enabled: true },
  { id: "status-page", label: "Status Page", icon: Globe, enabled: false },
]

export default function BroadcastPage() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState("informational")
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([])
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["email"])

  const toggleAudience = (id: string) => {
    setSelectedAudiences((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const totalRecipients = selectedAudiences.reduce((sum, id) => {
    const group = audienceGroups.find((g) => g.id === id)
    return sum + (group?.count || 0)
  }, 0)

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
                <BreadcrumbPage>Broadcast Center</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <Megaphone className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#0D3133]">Broadcast Center</h1>
                <p className="text-sm text-muted-foreground">Send mass notifications to stakeholder groups</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 min-h-0">
          {/* Left: Composer */}
          <div className="flex-1 overflow-y-auto p-6 border-r border-border">
            <div className="max-w-2xl space-y-6">
              {/* Message */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Message Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Subject *</Label>
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter broadcast subject..."
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Priority</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="informational">Informational</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="executive-critical">Executive Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Message *</Label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your broadcast message..."
                      className="min-h-[150px] resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Audience Selection */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Target Audience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {audienceGroups.map((group) => (
                      <button
                        key={group.id}
                        onClick={() => toggleAudience(group.id)}
                        className={`flex items-center justify-between rounded-lg border p-3 text-left transition-colors ${
                          selectedAudiences.includes(group.id)
                            ? "border-[#E69F50] bg-[#E69F50]/10"
                            : "border-border hover:border-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox checked={selectedAudiences.includes(group.id)} />
                          <span className="text-sm font-medium">{group.label}</span>
                        </div>
                        <Badge variant="secondary">{group.count}</Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Channel Selection */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Delivery Channels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {channels.map((channel) => {
                      const Icon = channel.icon
                      const isSelected = selectedChannels.includes(channel.id)
                      return (
                        <button
                          key={channel.id}
                          onClick={() => toggleChannel(channel.id)}
                          disabled={!channel.enabled}
                          className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 transition-colors ${
                            isSelected
                              ? "border-[#E69F50] bg-[#E69F50]/10"
                              : channel.enabled
                              ? "border-border hover:border-muted-foreground"
                              : "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-sm font-medium">{channel.label}</span>
                          {!channel.enabled && (
                            <Badge variant="secondary" className="text-[10px]">
                              Not configured
                            </Badge>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  {totalRecipients > 0 ? (
                    <span>
                      Will reach <strong className="text-[#0D3133]">{totalRecipients}</strong> recipients
                    </span>
                  ) : (
                    <span>Select audience groups</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Schedule
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Eye className="h-3.5 w-3.5" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1.5 bg-[#0D3133] hover:bg-[#0D3133]/90"
                    disabled={!subject || !message || selectedAudiences.length === 0}
                  >
                    <Send className="h-3.5 w-3.5" />
                    Send Broadcast
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Recent Broadcasts */}
          <div className="w-[360px] shrink-0 overflow-y-auto p-4 bg-muted/30">
            <h3 className="text-sm font-semibold text-[#0D3133] mb-4">Recent Broadcasts</h3>
            <div className="space-y-3">
              {recentBroadcasts.map((broadcast) => (
                <Card key={broadcast.id} className="hover:border-[#E69F50]/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-[#0D3133] line-clamp-2">
                        {broadcast.subject}
                      </h4>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </div>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <MessagePriorityBadge priority={broadcast.priority} />
                      <span className="text-xs text-muted-foreground">{broadcast.audience}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {broadcast.channels.map((channel) => (
                          <ChannelBadge key={channel} channel={channel} showLabel={false} />
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary">{broadcast.reach} reached</Badge>
                        <span>{broadcast.sentAt}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
