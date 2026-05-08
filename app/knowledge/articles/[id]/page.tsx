"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { ArticleStatusBadge } from "@/components/knowledge/article-status-badge"
import { CategoryBadge } from "@/components/knowledge/category-badge"
import { KnowledgeContextPanel } from "@/components/knowledge/knowledge-context-panel"
import {
  Home,
  FileText,
  Edit,
  Copy,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Clock,
  User,
  Eye,
  Bookmark,
  Share2,
  Printer,
  CheckCircle,
  AlertCircle,
  Info,
  Server,
  ChevronRight,
  History,
  Paperclip,
  BarChart3,
} from "lucide-react"

export default function ArticleDetailPage() {
  const params = useParams()
  const articleId = params.id as string
  const [activeTab, setActiveTab] = useState("overview")
  const [helpful, setHelpful] = useState<boolean | null>(null)

  return (
    <AppShell>
      <div className="flex h-full overflow-hidden">
        {/* Main Content */}
        <div className="flex flex-1 flex-col min-h-0">
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
                  <BreadcrumbPage>{articleId}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header */}
          <div className="shrink-0 border-b border-border bg-card px-6 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CategoryBadge category="vpn" />
                  <ArticleStatusBadge status="published" />
                </div>
                <h1 className="mt-2 text-xl font-semibold text-[#0D3133]">
                  VPN Connection Timeout - Complete Troubleshooting Guide
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    Sarah Chen
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Updated 2 hours ago
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    4,523 views
                  </span>
                  <span className="flex items-center gap-1 text-green-600">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    94% success rate
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button size="sm" className="gap-2 bg-[#0D3133]" asChild>
                  <Link href={`/knowledge/articles/${articleId}/edit`}>
                    <Edit className="h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="shrink-0 border-b border-border bg-card px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-10 -mb-px bg-transparent p-0">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="resolution"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
                >
                  Resolution Steps
                </TabsTrigger>
                <TabsTrigger
                  value="incidents"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
                >
                  Related Incidents
                </TabsTrigger>
                <TabsTrigger
                  value="known-errors"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
                >
                  Known Errors
                </TabsTrigger>
                <TabsTrigger
                  value="attachments"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
                >
                  Attachments
                </TabsTrigger>
                <TabsTrigger
                  value="audit"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
                >
                  Audit Timeline
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
                >
                  Analytics
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="overview" className="m-0 space-y-6">
                  {/* Issue Summary */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Info className="h-4 w-4 text-blue-600" />
                        Issue Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-sm">
                      <p>
                        Users experience VPN connection timeouts when attempting to connect to
                        corporate network resources. The issue manifests as connection attempts
                        that hang indefinitely or fail with timeout errors after 30-60 seconds.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Symptoms */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        Symptoms
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                          VPN client shows &quot;Connecting...&quot; for extended periods
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                          Connection fails with &quot;Connection timed out&quot; error
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                          Certificate verification errors in VPN logs
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                          Intermittent disconnections after successful connection
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Affected Services */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Server className="h-4 w-4 text-[#0D3133]" />
                        Affected Services
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">VPN Gateway</Badge>
                        <Badge variant="outline">Authentication Service</Badge>
                        <Badge variant="outline">Network Core</Badge>
                        <Badge variant="outline">Certificate Authority</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Root Cause */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        Root Cause
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-sm">
                      <p>
                        The primary root cause is typically one of the following:
                      </p>
                      <ol className="mt-2 space-y-1">
                        <li>Expired or invalid VPN client certificates</li>
                        <li>Network firewall blocking VPN ports (UDP 500, 4500)</li>
                        <li>DNS resolution failures for VPN gateway hostname</li>
                        <li>VPN gateway overload during peak usage periods</li>
                      </ol>
                    </CardContent>
                  </Card>

                  {/* Workaround */}
                  <Card className="border-green-200 bg-green-50/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        Workaround
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-sm text-green-800">
                      <p>
                        As a temporary workaround, users can try connecting to an alternate VPN
                        gateway (vpn2.company.com) or use the web-based VPN portal at
                        https://vpnportal.company.com.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Feedback */}
                  <Card>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Was this article helpful?</p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant={helpful === true ? "default" : "outline"}
                            size="sm"
                            className={helpful === true ? "bg-green-600" : ""}
                            onClick={() => setHelpful(true)}
                          >
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            Yes
                          </Button>
                          <Button
                            variant={helpful === false ? "default" : "outline"}
                            size="sm"
                            className={helpful === false ? "bg-red-600" : ""}
                            onClick={() => setHelpful(false)}
                          >
                            <ThumbsDown className="mr-1 h-4 w-4" />
                            No
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resolution" className="m-0 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Resolution Steps</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          step: 1,
                          title: "Verify Network Connectivity",
                          description: "Ensure the user has basic internet connectivity by pinging external resources.",
                          code: "ping 8.8.8.8\nping vpn.company.com",
                        },
                        {
                          step: 2,
                          title: "Check VPN Client Version",
                          description: "Verify the user has the latest VPN client installed (minimum version 5.2.1).",
                        },
                        {
                          step: 3,
                          title: "Clear Cached Credentials",
                          description: "Remove stored VPN credentials and re-authenticate.",
                          code: "vpnclient credentials --clear\nvpnclient connect --force-auth",
                        },
                        {
                          step: 4,
                          title: "Renew Certificates",
                          description: "If certificate errors persist, renew the user's VPN certificate through the certificate portal.",
                        },
                        {
                          step: 5,
                          title: "Verify Firewall Settings",
                          description: "Check that UDP ports 500 and 4500 are not blocked by local firewall.",
                        },
                      ].map((item) => (
                        <div key={item.step} className="flex gap-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0D3133] text-sm font-medium text-white">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-[#0D3133]">{item.title}</h4>
                            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                            {item.code && (
                              <pre className="mt-2 rounded-md bg-slate-900 p-3 text-xs text-slate-100">
                                <code>{item.code}</code>
                              </pre>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Validation */}
                  <Card className="border-blue-200 bg-blue-50/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-sm text-blue-700">
                        <CheckCircle className="h-4 w-4" />
                        Validation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-blue-800">
                      <p>Confirm resolution by:</p>
                      <ul className="mt-2 space-y-1">
                        <li>• Successfully connecting to VPN</li>
                        <li>• Accessing internal resources (intranet, file shares)</li>
                        <li>• Connection remaining stable for at least 5 minutes</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Escalation */}
                  <Card className="border-amber-200 bg-amber-50/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-sm text-amber-700">
                        <AlertCircle className="h-4 w-4" />
                        Escalation Guidance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-amber-800">
                      <p>Escalate to Network Operations (L2) if:</p>
                      <ul className="mt-2 space-y-1">
                        <li>• Issue persists after all resolution steps</li>
                        <li>• Multiple users affected simultaneously</li>
                        <li>• VPN gateway shows high latency or packet loss</li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="incidents" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Related Incidents (47)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { id: "INC0042781", title: "VPN timeout for remote team", status: "Resolved", date: "2 hours ago" },
                          { id: "INC0042654", title: "Unable to connect to VPN gateway", status: "Resolved", date: "1 day ago" },
                          { id: "INC0042543", title: "VPN disconnects intermittently", status: "Resolved", date: "2 days ago" },
                          { id: "INC0042321", title: "VPN certificate error", status: "Resolved", date: "3 days ago" },
                        ].map((incident) => (
                          <div key={incident.id} className="flex items-center justify-between rounded-md border p-3">
                            <div>
                              <p className="font-mono text-xs text-[#E69F50]">{incident.id}</p>
                              <p className="text-sm font-medium">{incident.title}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant="secondary" className="bg-green-50 text-green-700">
                                {incident.status}
                              </Badge>
                              <p className="mt-1 text-xs text-muted-foreground">{incident.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="known-errors" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Linked Known Errors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-md border border-amber-200 bg-amber-50/50 p-3">
                          <div>
                            <p className="font-mono text-xs text-amber-700">KE0000234</p>
                            <p className="text-sm font-medium">VPN Disconnection During Peak Hours</p>
                            <p className="mt-1 text-xs text-muted-foreground">Workaround available</p>
                          </div>
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                            In Progress
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="attachments" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Paperclip className="h-4 w-4" />
                        Attachments (3)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { name: "vpn-troubleshooting-flowchart.pdf", size: "245 KB" },
                          { name: "vpn-client-config-screenshot.png", size: "128 KB" },
                          { name: "network-topology-diagram.png", size: "456 KB" },
                        ].map((file) => (
                          <div key={file.name} className="flex items-center justify-between rounded-md border p-3">
                            <div className="flex items-center gap-3">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{file.size}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="audit" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <History className="h-4 w-4" />
                        Audit Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { action: "Article updated", user: "Sarah Chen", time: "2 hours ago", detail: "Added new resolution step for certificate renewal" },
                          { action: "Article reviewed", user: "John Smith", time: "1 day ago", detail: "Approved changes" },
                          { action: "Known error linked", user: "System", time: "3 days ago", detail: "KE0000234 automatically linked" },
                          { action: "Article published", user: "Sarah Chen", time: "1 week ago", detail: "Initial publication" },
                          { action: "Article created", user: "Sarah Chen", time: "2 weeks ago", detail: "Draft created" },
                        ].map((entry, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="h-2 w-2 rounded-full bg-[#0D3133]" />
                              {idx < 4 && <div className="flex-1 w-px bg-border" />}
                            </div>
                            <div className="flex-1 pb-4">
                              <p className="text-sm font-medium">{entry.action}</p>
                              <p className="text-xs text-muted-foreground">{entry.detail}</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {entry.user} • {entry.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <BarChart3 className="h-4 w-4" />
                        Article Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border p-4 text-center">
                          <p className="text-2xl font-bold text-[#0D3133]">4,523</p>
                          <p className="text-xs text-muted-foreground">Total Views</p>
                        </div>
                        <div className="rounded-lg border p-4 text-center">
                          <p className="text-2xl font-bold text-green-600">94%</p>
                          <p className="text-xs text-muted-foreground">Success Rate</p>
                        </div>
                        <div className="rounded-lg border p-4 text-center">
                          <p className="text-2xl font-bold text-[#E69F50]">847</p>
                          <p className="text-xs text-muted-foreground">Times Used</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Right Context Panel */}
        <div className="hidden w-[320px] shrink-0 border-l border-border lg:block">
          <div className="h-full overflow-y-auto p-4">
            <KnowledgeContextPanel />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
