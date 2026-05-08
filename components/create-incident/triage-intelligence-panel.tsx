"use client"

import { cn } from "@/lib/utils"
import { 
  Lightbulb, AlertCircle, BookOpen, AlertTriangle, 
  Zap, Server, ExternalLink
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TriageIntelligencePanelProps {
  title?: string
  service?: string
  category?: string
}

const similarIncidents = [
  {
    id: "INC0042765",
    title: "Payment Gateway Timeout - EU Region",
    status: "resolved",
    similarity: 94,
    service: "Payment Gateway",
    resolvedAt: "2 days ago",
  },
  {
    id: "INC0042701",
    title: "Payment API Latency Spike",
    status: "closed",
    similarity: 87,
    service: "Payment Gateway",
    resolvedAt: "5 days ago",
  },
  {
    id: "INC0042689",
    title: "Transaction Processing Delays",
    status: "closed",
    similarity: 82,
    service: "Payment Gateway",
    resolvedAt: "1 week ago",
  },
]

const knowledgeArticles = [
  {
    id: "KB0001234",
    title: "Payment Gateway Troubleshooting Guide",
    views: 1247,
    helpful: 94,
  },
  {
    id: "KB0001198",
    title: "Database Connection Pool Configuration",
    views: 892,
    helpful: 89,
  },
  {
    id: "KB0001156",
    title: "Network Latency Diagnosis Steps",
    views: 654,
    helpful: 92,
  },
]

const knownErrors = [
  {
    id: "KE0000045",
    title: "Payment timeout under high load",
    workaround: "Scale up gateway pods",
    status: "active",
  },
  {
    id: "KE0000039",
    title: "Database connection exhaustion",
    workaround: "Restart connection pool",
    status: "active",
  },
]

const recentOutages = [
  {
    id: "OUT0000123",
    title: "CDN Provider Outage",
    status: "resolved",
    duration: "45 min",
    time: "3 hours ago",
  },
  {
    id: "OUT0000121",
    title: "AWS us-east-1 Degradation",
    status: "monitoring",
    duration: "ongoing",
    time: "6 hours ago",
  },
]

const aiRecommendations = [
  {
    type: "assignment",
    title: "Suggested Assignment",
    description: "Payment Operations team has resolved 94% of similar incidents",
    confidence: 92,
  },
  {
    type: "priority",
    title: "Priority Recommendation",
    description: "Based on service criticality and time of day, suggest P1",
    confidence: 88,
  },
  {
    type: "action",
    title: "Recommended Action",
    description: "Check Payment Gateway health dashboard for connection pool status",
    confidence: 85,
  },
]

export function TriageIntelligencePanel({ title, service, category }: TriageIntelligencePanelProps) {
  return (
    <div className="flex flex-col">
      <div className="shrink-0 border-b border-border bg-muted/30 px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-[#0D3133]">
          <Lightbulb className="h-4 w-4 text-[#E69F50]" />
          Triage Intelligence
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          AI-powered insights based on your input
        </p>
      </div>

      <div className="space-y-4 p-4">
        {/* AI Recommendations */}
        <Card className="border-[#E69F50]/30 bg-[#E69F50]/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xs font-semibold">
              <Zap className="h-3.5 w-3.5 text-[#E69F50]" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {aiRecommendations.map((rec, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card p-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium">{rec.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{rec.description}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-[10px]">
                    {rec.confidence}%
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Similar Incidents */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xs font-semibold">
              <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
              Similar Incidents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {similarIncidents.map((incident) => (
              <div key={incident.id} className="rounded-lg border border-border p-2.5 hover:bg-muted/50">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{incident.id}</span>
                      <Badge variant="secondary" className={cn(
                        "text-[10px]",
                        incident.similarity >= 90 && "bg-green-100 text-green-700"
                      )}>
                        {incident.similarity}% match
                      </Badge>
                    </div>
                    <p className="mt-1 truncate text-xs font-medium">{incident.title}</p>
                    <p className="text-[10px] text-muted-foreground">
                      Resolved {incident.resolvedAt}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Knowledge Articles */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xs font-semibold">
              <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
              Suggested KB Articles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {knowledgeArticles.map((article) => (
              <div key={article.id} className="rounded-lg border border-border p-2.5 hover:bg-muted/50">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-mono text-xs text-muted-foreground">{article.id}</span>
                    <p className="mt-0.5 truncate text-xs font-medium">{article.title}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {article.views} views - {article.helpful}% helpful
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Known Errors */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xs font-semibold">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              Known Errors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {knownErrors.map((error) => (
              <div key={error.id} className="rounded-lg border border-amber-200 bg-amber-50 p-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{error.id}</span>
                  <Badge variant="outline" className="text-[10px] border-amber-300 text-amber-700">
                    {error.status}
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs font-medium">{error.title}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  <span className="font-medium">Workaround:</span> {error.workaround}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Outages */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xs font-semibold">
              <Server className="h-3.5 w-3.5 text-muted-foreground" />
              Recent Outages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentOutages.map((outage) => (
              <div key={outage.id} className="rounded-lg border border-border p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "h-2 w-2 rounded-full",
                        outage.status === "resolved" ? "bg-green-500" : "bg-amber-500 animate-pulse"
                      )} />
                      <p className="truncate text-xs font-medium">{outage.title}</p>
                    </div>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {outage.time} - Duration: {outage.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
