"use client"

import { FileText, Lightbulb, AlertTriangle, ExternalLink, ThumbsUp, ThumbsDown, Eye, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface KnowledgeArticle {
  id: string
  number: string
  title: string
  category: string
  relevance: number
  views: number
  helpful: number
  type: "kb" | "known-error" | "resolution"
}

const suggestedArticles: KnowledgeArticle[] = [
  {
    id: "1",
    number: "KB0012345",
    title: "Troubleshooting Database Connection Pool Issues",
    category: "Database Operations",
    relevance: 95,
    views: 1240,
    helpful: 89,
    type: "kb",
  },
  {
    id: "2",
    number: "KB0012298",
    title: "Payment Service Error Codes Reference",
    category: "Payment Processing",
    relevance: 88,
    views: 2100,
    helpful: 156,
    type: "kb",
  },
  {
    id: "3",
    number: "KB0011987",
    title: "Database Connection Pool Configuration Best Practices",
    category: "Database Operations",
    relevance: 82,
    views: 890,
    helpful: 67,
    type: "kb",
  },
]

const knownErrors = [
  {
    id: "1",
    number: "KE0000456",
    title: "Memory leak in payment-service v2.4.x",
    workaround: "Restart pods every 4 hours until fix deployed",
    status: "Workaround Available",
  },
  {
    id: "2",
    number: "KE0000412",
    title: "Connection pool exhaustion under high load",
    workaround: "Increase max connections to 750",
    status: "Root Cause Identified",
  },
]

const similarIncidents = [
  {
    id: "1",
    number: "INC0041234",
    title: "Database connection timeout affecting checkout",
    resolution: "Increased connection pool limit and optimized queries",
    resolvedDate: "2024-01-15",
    similarity: 92,
  },
  {
    id: "2",
    number: "INC0040876",
    title: "Payment API latency spike during peak hours",
    resolution: "Scaled database read replicas and added caching",
    resolvedDate: "2024-01-08",
    similarity: 78,
  },
  {
    id: "3",
    number: "INC0039654",
    title: "Transaction failures due to pool exhaustion",
    resolution: "Deployed connection pool monitoring and auto-scaling",
    resolvedDate: "2023-12-20",
    similarity: 85,
  },
]

export function KnowledgeTab() {
  return (
    <div className="space-y-6">
      {/* Suggested KB Articles */}
      <section className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Lightbulb className="h-4 w-4 text-[#E69F50]" />
          <h3 className="text-sm font-semibold text-card-foreground">AI-Suggested Knowledge Articles</h3>
        </div>
        <div className="divide-y divide-border">
          {suggestedArticles.map((article) => (
            <div key={article.id} className="p-4 hover:bg-muted/20">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#E69F50]">{article.number}</span>
                    <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                      article.relevance >= 90 ? "bg-green-100 text-green-700" :
                      article.relevance >= 80 ? "bg-amber-100 text-amber-700" :
                      "bg-slate-100 text-slate-700"
                    }`}>
                      {article.relevance}% match
                    </span>
                  </div>
                  <h4 className="mt-1 text-sm font-medium text-card-foreground">{article.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{article.category}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {article.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {article.helpful} found helpful
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                    Preview
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Known Errors */}
      <section className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <h3 className="text-sm font-semibold text-card-foreground">Matching Known Errors</h3>
        </div>
        <div className="divide-y divide-border">
          {knownErrors.map((error) => (
            <div key={error.id} className="p-4 hover:bg-muted/20">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-amber-600">{error.number}</span>
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
                      {error.status}
                    </span>
                  </div>
                  <h4 className="mt-1 text-sm font-medium text-card-foreground">{error.title}</h4>
                  <div className="mt-2 rounded bg-muted/50 p-2">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-card-foreground">Workaround:</span> {error.workaround}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Apply Workaround
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Similar Resolved Incidents */}
      <section className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-card-foreground">Similar Resolved Incidents</h3>
        </div>
        <div className="divide-y divide-border">
          {similarIncidents.map((incident) => (
            <div key={incident.id} className="p-4 hover:bg-muted/20">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#0D3133]">{incident.number}</span>
                    <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                      incident.similarity >= 90 ? "bg-green-100 text-green-700" :
                      incident.similarity >= 80 ? "bg-amber-100 text-amber-700" :
                      "bg-slate-100 text-slate-700"
                    }`}>
                      {incident.similarity}% similar
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Resolved {incident.resolvedDate}
                    </span>
                  </div>
                  <h4 className="mt-1 text-sm font-medium text-card-foreground">{incident.title}</h4>
                  <div className="mt-2 rounded bg-green-50 p-2">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-green-700">Resolution:</span> {incident.resolution}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">
                    Copy Resolution
                  </Button>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Helpful">
                      <ThumbsUp className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Not helpful">
                      <ThumbsDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
