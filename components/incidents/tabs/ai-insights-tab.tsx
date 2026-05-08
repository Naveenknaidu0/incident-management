"use client"

import { 
  Brain, AlertTriangle, Clock, Users, Zap, TrendingUp, 
  CheckCircle2, Copy, RefreshCw, Sparkles 
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface AIInsight {
  id: string
  type: "root-cause" | "duplicate" | "sla-risk" | "assignment" | "automation"
  title: string
  confidence: number
  description: string
  action?: string
}

const insights: AIInsight[] = [
  {
    id: "1",
    type: "root-cause",
    title: "Probable Root Cause",
    confidence: 94,
    description: "Database connection pool exhaustion in prod-db-cluster due to memory leak in payment-service v2.4.1. Pattern matches 3 similar incidents in the past 30 days.",
    action: "Apply Fix",
  },
  {
    id: "2",
    type: "duplicate",
    title: "Potential Duplicate Detection",
    confidence: 78,
    description: "This incident appears similar to INC0042701 (Active). Consider merging or linking as related incidents.",
    action: "Link Incidents",
  },
  {
    id: "3",
    type: "sla-risk",
    title: "SLA Breach Risk",
    confidence: 85,
    description: "Based on current progress and historical data, there is an 85% probability of missing the 4-hour resolution SLA. Recommend escalation to Tier 3.",
    action: "Escalate Now",
  },
  {
    id: "4",
    type: "assignment",
    title: "Recommended Assignment",
    confidence: 91,
    description: "Based on expertise matching and current workload, recommend assigning to Sarah Chen (Payment Ops) - 92% success rate on similar incidents.",
    action: "Reassign",
  },
  {
    id: "5",
    type: "automation",
    title: "Suggested Automation",
    confidence: 88,
    description: "Runbook 'RB-DB-POOL-001: Database Connection Pool Recovery' can be executed automatically. Estimated time savings: 15 minutes.",
    action: "Run Automation",
  },
]

const typeConfig = {
  "root-cause": { icon: Brain, color: "text-purple-600", bg: "bg-purple-100", border: "border-purple-200" },
  duplicate: { icon: Copy, color: "text-blue-600", bg: "bg-blue-100", border: "border-blue-200" },
  "sla-risk": { icon: Clock, color: "text-amber-600", bg: "bg-amber-100", border: "border-amber-200" },
  assignment: { icon: Users, color: "text-green-600", bg: "bg-green-100", border: "border-green-200" },
  automation: { icon: Zap, color: "text-teal-600", bg: "bg-teal-100", border: "border-teal-200" },
}

const predictionMetrics = [
  { label: "Resolution Time Estimate", value: "45 min", trend: "Based on similar incidents" },
  { label: "Escalation Probability", value: "65%", trend: "High complexity detected" },
  { label: "Customer Impact Score", value: "8.2/10", trend: "Revenue-affecting services" },
  { label: "Similar Incident Matches", value: "12", trend: "In last 90 days" },
]

export function AIInsightsTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#E69F50]" />
          <h3 className="text-sm font-semibold text-card-foreground">AI Operations Assistant</h3>
          <span className="rounded bg-[#E69F50]/10 px-1.5 py-0.5 text-xs font-medium text-[#E69F50]">
            Beta
          </span>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
          Refresh Insights
        </Button>
      </div>

      {/* Prediction Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {predictionMetrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
            <p className="mt-1 text-xl font-bold text-card-foreground">{metric.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{metric.trend}</p>
          </div>
        ))}
      </div>

      {/* AI Insights Cards */}
      <div className="space-y-4">
        {insights.map((insight) => {
          const config = typeConfig[insight.type]
          const Icon = config.icon

          return (
            <div
              key={insight.id}
              className={`rounded-lg border bg-card p-4 ${config.border}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-card-foreground">{insight.title}</h4>
                      <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                        insight.confidence >= 90 ? "bg-green-100 text-green-700" :
                        insight.confidence >= 80 ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-700"
                      }`}>
                        {insight.confidence}% confidence
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
                {insight.action && (
                  <Button size="sm" className="shrink-0 bg-[#0D3133] text-white hover:bg-[#0D3133]/90">
                    {insight.action}
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Disclaimer */}
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <h4 className="text-sm font-medium text-card-foreground">AI Insights Disclaimer</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              These insights are generated by AI based on historical incident data and patterns. 
              Always verify recommendations before taking action. Confidence scores indicate the 
              reliability of predictions based on available data quality and pattern matching.
            </p>
          </div>
        </div>
      </div>

      {/* Training Feedback */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="text-sm font-semibold text-card-foreground">Help Improve AI Accuracy</h4>
        <p className="mt-1 text-xs text-muted-foreground">
          Rate the helpfulness of these insights to improve future recommendations.
        </p>
        <div className="mt-3 flex gap-2">
          <Button variant="outline" size="sm">
            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-green-600" />
            Insights Helpful
          </Button>
          <Button variant="outline" size="sm">
            <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
            Needs Improvement
          </Button>
        </div>
      </div>
    </div>
  )
}
