"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { KnowledgeKPIStrip } from "@/components/knowledge/knowledge-kpi-strip"
import { KnowledgeSearch } from "@/components/knowledge/knowledge-search"
import { ArticleCard } from "@/components/knowledge/article-card"
import { ArticleTable } from "@/components/knowledge/article-table"
import { KnownErrorCard } from "@/components/knowledge/known-error-card"
import { RunbookCard } from "@/components/knowledge/runbook-card"
import { SuggestedResolutionCard } from "@/components/knowledge/suggested-resolution-card"
import { AICopilotPanel } from "@/components/knowledge/ai-copilot-panel"
import {
  Home,
  Plus,
  Grid3X3,
  List,
  Brain,
  FileText,
  AlertTriangle,
  BookOpen,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react"

const mockArticles = [
  {
    id: "KB0012847",
    title: "VPN Connection Timeout - Complete Troubleshooting Guide",
    summary: "Step-by-step guide to resolve VPN connection timeout issues including certificate errors, network configuration, and client-side troubleshooting.",
    category: "vpn" as const,
    status: "published" as const,
    author: "Sarah Chen",
    updatedAt: "2 hours ago",
    views: 4523,
    successRate: 94,
    usageCount: 847,
  },
  {
    id: "KB0012654",
    title: "Database Performance Optimization Best Practices",
    summary: "Comprehensive guide for optimizing database performance including query tuning, index management, and connection pooling strategies.",
    category: "database" as const,
    status: "published" as const,
    author: "John Smith",
    updatedAt: "1 day ago",
    views: 3892,
    successRate: 91,
    usageCount: 654,
  },
  {
    id: "KB0012432",
    title: "Email Delivery Failure Diagnosis and Resolution",
    summary: "Diagnose and resolve email delivery failures including SPF/DKIM issues, relay configuration, and mailbox quota problems.",
    category: "email" as const,
    status: "published" as const,
    author: "Emily Johnson",
    updatedAt: "3 days ago",
    views: 3654,
    successRate: 89,
    usageCount: 543,
  },
  {
    id: "KB0012321",
    title: "Network Latency Troubleshooting Procedures",
    summary: "Identify and resolve network latency issues affecting application performance and user experience.",
    category: "network" as const,
    status: "review" as const,
    author: "Mike Davis",
    updatedAt: "5 days ago",
    views: 2987,
    successRate: 86,
    usageCount: 432,
  },
  {
    id: "KB0012198",
    title: "Cloud Infrastructure Scaling Guidelines",
    summary: "Guidelines for scaling cloud infrastructure including auto-scaling configuration, load balancing, and capacity planning.",
    category: "cloud" as const,
    status: "published" as const,
    author: "Lisa Wang",
    updatedAt: "1 week ago",
    views: 2654,
    successRate: 93,
    usageCount: 387,
  },
  {
    id: "KB0012087",
    title: "Security Incident Response Playbook",
    summary: "Standardized procedures for responding to security incidents including containment, investigation, and recovery steps.",
    category: "security" as const,
    status: "published" as const,
    author: "Tom Harris",
    updatedAt: "2 weeks ago",
    views: 2432,
    successRate: 97,
    usageCount: 298,
  },
]

const mockKnownErrors = [
  {
    id: "KE0000234",
    title: "VPN Disconnection During Peak Hours",
    affectedServices: ["VPN Gateway", "Auth Service"],
    hasWorkaround: true,
    linkedIncidents: 47,
    status: "in-progress" as const,
    lastUpdated: "2 hours ago",
  },
  {
    id: "KE0000219",
    title: "Email Attachment Size Limit Error",
    affectedServices: ["Email Server", "Exchange"],
    hasWorkaround: true,
    linkedIncidents: 23,
    status: "open" as const,
    lastUpdated: "1 day ago",
  },
  {
    id: "KE0000198",
    title: "Database Connection Pool Exhaustion",
    affectedServices: ["Core Database", "App Server"],
    hasWorkaround: false,
    linkedIncidents: 12,
    status: "in-progress" as const,
    lastUpdated: "3 days ago",
  },
]

const mockRunbooks = [
  {
    id: "RB0000089",
    title: "VPN Service Recovery Procedure",
    type: "vpn-troubleshooting" as const,
    steps: 8,
    estimatedTime: "15 min",
    successRate: 96,
    lastUsed: "1 hour ago",
  },
  {
    id: "RB0000076",
    title: "Database Restart and Health Check",
    type: "database-restart" as const,
    steps: 12,
    estimatedTime: "25 min",
    successRate: 94,
    lastUsed: "3 hours ago",
  },
  {
    id: "RB0000065",
    title: "Network Outage Recovery Steps",
    type: "network-recovery" as const,
    steps: 15,
    estimatedTime: "45 min",
    successRate: 89,
    lastUsed: "1 day ago",
  },
  {
    id: "RB0000054",
    title: "Application Service Restart",
    type: "service-restart" as const,
    steps: 6,
    estimatedTime: "10 min",
    successRate: 98,
    lastUsed: "2 days ago",
  },
]

const mockSuggestedResolutions = [
  {
    articleId: "KB0012847",
    title: "VPN Connection Timeout - Complete Troubleshooting Guide",
    confidence: 94,
    estimatedTime: "15 min",
    successRate: 94,
    affectedServices: ["VPN Gateway", "Auth Service", "Network Core"],
  },
  {
    articleId: "KB0012654",
    title: "Network Configuration Reset Procedure",
    confidence: 87,
    estimatedTime: "20 min",
    successRate: 89,
    affectedServices: ["Network Core", "Firewall"],
  },
]

export default function KnowledgePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showCopilot, setShowCopilot] = useState(true)
  const [activeTab, setActiveTab] = useState("popular")

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
                  <BreadcrumbPage>Knowledge Base</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header */}
          <div className="shrink-0 border-b border-border bg-card px-6 py-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-[#0D3133]">Knowledge Base</h1>
                <p className="text-sm text-muted-foreground">
                  Articles, runbooks, and operational knowledge
                </p>
              </div>
              <div className="flex items-center gap-3">
                <KnowledgeSearch />
                <Button
                  variant={showCopilot ? "default" : "outline"}
                  size="sm"
                  className={showCopilot ? "gap-2 bg-[#0D3133]" : "gap-2"}
                  onClick={() => setShowCopilot(!showCopilot)}
                >
                  <Brain className="h-4 w-4" />
                  AI Copilot
                </Button>
                <Button size="sm" className="gap-2 bg-[#E69F50] hover:bg-[#E69F50]/90" asChild>
                  <Link href="/knowledge/articles/new">
                    <Plus className="h-4 w-4" />
                    New Article
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6 p-6">
              {/* KPI Strip */}
              <KnowledgeKPIStrip />

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <Link href="/knowledge/articles">
                    <FileText className="h-4 w-4" />
                    All Articles
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <Link href="/knowledge/known-errors">
                    <AlertTriangle className="h-4 w-4" />
                    Known Errors
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <Link href="/knowledge/runbooks">
                    <BookOpen className="h-4 w-4" />
                    Runbooks
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <Link href="/knowledge/analytics">
                    <TrendingUp className="h-4 w-4" />
                    Analytics
                  </Link>
                </Button>
              </div>

              {/* AI Recommended Resolutions */}
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#E69F50]" />
                  <h2 className="text-sm font-semibold text-[#0D3133]">AI Recommended Fixes</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {mockSuggestedResolutions.map((resolution) => (
                    <SuggestedResolutionCard key={resolution.articleId} {...resolution} />
                  ))}
                </div>
              </section>

              {/* Tabs for Articles */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="popular" className="gap-2">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Popular
                    </TabsTrigger>
                    <TabsTrigger value="recent" className="gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      Recent
                    </TabsTrigger>
                    <TabsTrigger value="draft" className="gap-2">
                      <FileText className="h-3.5 w-3.5" />
                      Drafts
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-1">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <TabsContent value="popular" className="mt-4">
                  {viewMode === "grid" ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {mockArticles.map((article) => (
                        <ArticleCard key={article.id} {...article} />
                      ))}
                    </div>
                  ) : (
                    <ArticleTable articles={mockArticles} />
                  )}
                </TabsContent>

                <TabsContent value="recent" className="mt-4">
                  {viewMode === "grid" ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {mockArticles.slice().reverse().map((article) => (
                        <ArticleCard key={article.id} {...article} />
                      ))}
                    </div>
                  ) : (
                    <ArticleTable articles={mockArticles.slice().reverse()} />
                  )}
                </TabsContent>

                <TabsContent value="draft" className="mt-4">
                  <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
                    <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium text-[#0D3133]">No draft articles</p>
                    <p className="text-xs text-muted-foreground">
                      Start a new article to see it here
                    </p>
                    <Button size="sm" className="mt-4 gap-2" asChild>
                      <Link href="/knowledge/articles/new">
                        <Plus className="h-4 w-4" />
                        Create Article
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Known Errors */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <h2 className="text-sm font-semibold text-[#0D3133]">Known Errors</h2>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/knowledge/known-errors">View all</Link>
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {mockKnownErrors.map((error) => (
                    <KnownErrorCard key={error.id} {...error} />
                  ))}
                </div>
              </section>

              {/* Runbooks */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#0D3133]" />
                    <h2 className="text-sm font-semibold text-[#0D3133]">Operational Runbooks</h2>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/knowledge/runbooks">View all</Link>
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {mockRunbooks.map((runbook) => (
                    <RunbookCard key={runbook.id} {...runbook} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* AI Copilot Panel */}
        {showCopilot && (
          <div className="hidden w-[340px] shrink-0 border-l border-border lg:block">
            <AICopilotPanel />
          </div>
        )}
      </div>
    </AppShell>
  )
}
