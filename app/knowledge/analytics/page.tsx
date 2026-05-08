"use client"

import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { KnowledgeAnalytics } from "@/components/knowledge/knowledge-analytics"
import {
  Home,
  Download,
  Calendar,
  TrendingUp,
  FileText,
  Brain,
  Users,
  Clock,
} from "lucide-react"

export default function KnowledgeAnalyticsPage() {
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
                <BreadcrumbPage>Analytics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-xl font-semibold text-[#0D3133]">
                <TrendingUp className="h-5 w-5 text-[#E69F50]" />
                Knowledge Analytics
              </h1>
              <p className="text-sm text-muted-foreground">
                Measure knowledge base effectiveness and AI recommendation usage
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue="30d">
                <SelectTrigger className="w-[150px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#0D3133]" />
                <p className="text-xs text-muted-foreground">Total Views</p>
              </div>
              <p className="mt-1 text-2xl font-semibold text-[#0D3133]">156,234</p>
              <p className="text-xs text-green-600">+12.4% vs last period</p>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <p className="text-xs text-muted-foreground">Resolution Rate</p>
              </div>
              <p className="mt-1 text-2xl font-semibold text-green-600">94.2%</p>
              <p className="text-xs text-green-600">+2.1% vs last period</p>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-[#E69F50]" />
                <p className="text-xs text-muted-foreground">AI Recommendations</p>
              </div>
              <p className="mt-1 text-2xl font-semibold text-[#E69F50]">3,421</p>
              <p className="text-xs text-green-600">+28.7% vs last period</p>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#73847B]" />
                <p className="text-xs text-muted-foreground">Incident Deflection</p>
              </div>
              <p className="mt-1 text-2xl font-semibold text-[#73847B]">1,247</p>
              <p className="text-xs text-green-600">+15.3% vs last period</p>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <p className="text-xs text-muted-foreground">Avg Time to Resolve</p>
              </div>
              <p className="mt-1 text-2xl font-semibold text-blue-600">8.2 min</p>
              <p className="text-xs text-green-600">-2.4 min vs last period</p>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-600" />
                <p className="text-xs text-muted-foreground">Articles Created</p>
              </div>
              <p className="mt-1 text-2xl font-semibold text-purple-600">47</p>
              <p className="text-xs text-green-600">+8 vs last period</p>
            </Card>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <KnowledgeAnalytics />
            
            {/* AI Recommendation Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Brain className="h-4 w-4 text-[#E69F50]" />
                    AI Recommendation Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Article Suggestions", value: 2847, accuracy: 89 },
                      { label: "Resolution Steps", value: 1234, accuracy: 94 },
                      { label: "Priority Predictions", value: 987, accuracy: 91 },
                      { label: "Assignment Suggestions", value: 756, accuracy: 87 },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.value.toLocaleString()} recommendations
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">{item.accuracy}%</p>
                          <p className="text-xs text-muted-foreground">accuracy</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Contributors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Users className="h-4 w-4 text-[#0D3133]" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Sarah Chen", articles: 24, views: 12450 },
                      { name: "John Smith", articles: 18, views: 9876 },
                      { name: "Emily Johnson", articles: 15, views: 8234 },
                      { name: "Mike Davis", articles: 12, views: 6543 },
                      { name: "Lisa Wang", articles: 10, views: 5432 },
                    ].map((contributor, idx) => (
                      <div key={contributor.name} className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{contributor.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {contributor.articles} articles
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {contributor.views.toLocaleString()} views
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Knowledge Gaps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-amber-600">
                    <TrendingUp className="h-4 w-4" />
                    Knowledge Gaps Identified
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { topic: "Azure AD Integration Issues", searches: 156, articles: 0 },
                      { topic: "Kubernetes Pod Failures", searches: 134, articles: 1 },
                      { topic: "Salesforce API Errors", searches: 98, articles: 0 },
                      { topic: "Teams Meeting Quality", searches: 87, articles: 2 },
                    ].map((gap) => (
                      <div key={gap.topic} className="flex items-center justify-between rounded-md border border-amber-200 bg-amber-50 p-2">
                        <div>
                          <p className="text-sm font-medium text-amber-800">{gap.topic}</p>
                          <p className="text-xs text-amber-600">
                            {gap.searches} searches, {gap.articles} articles
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          Create Article
                        </Button>
                      </div>
                    ))}
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
