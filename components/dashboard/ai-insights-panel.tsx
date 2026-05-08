"use client"

import { Brain, AlertTriangle, Copy, TrendingUp, ArrowRight } from "lucide-react"

interface Insight {
  id: string
  type: "sla-breach" | "duplicate" | "anomaly"
  title: string
  description: string
  confidence: number
  actionable: boolean
}

const insights: Insight[] = [
  {
    id: "1",
    type: "sla-breach",
    title: "Predicted SLA Breach",
    description: "INC0042778 likely to breach SLA in next 30 minutes based on current resolution pace",
    confidence: 87,
    actionable: true,
  },
  {
    id: "2",
    type: "duplicate",
    title: "Potential Duplicate Detected",
    description: "INC0042780 appears similar to INC0042765 (resolved 2 days ago)",
    confidence: 92,
    actionable: true,
  },
  {
    id: "3",
    type: "anomaly",
    title: "Incident Volume Anomaly",
    description: "Database-related incidents 340% higher than normal for this time period",
    confidence: 95,
    actionable: false,
  },
]

const typeConfig = {
  "sla-breach": {
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  duplicate: {
    icon: Copy,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  anomaly: {
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
}

export function AIInsightsPanel() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-[#E69F50]" />
          <h3 className="text-sm font-semibold text-card-foreground">AI Insights</h3>
        </div>
        <span className="rounded-full bg-[#E69F50]/10 px-2 py-0.5 text-xs font-medium text-[#E69F50]">
          3 new
        </span>
      </div>
      <div className="divide-y divide-border">
        {insights.map((insight) => {
          const config = typeConfig[insight.type]
          const Icon = config.icon

          return (
            <div key={insight.id} className="p-4 transition-colors hover:bg-muted/30">
              <div className="mb-2 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={`rounded p-1 ${config.bg}`}>
                    <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                  </div>
                  <span className="text-sm font-medium text-card-foreground">{insight.title}</span>
                </div>
                <span className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {insight.confidence}% confidence
                </span>
              </div>
              <p className="mb-2 text-xs text-muted-foreground">{insight.description}</p>
              {insight.actionable && (
                <button className="flex items-center gap-1 text-xs font-medium text-[#E69F50] hover:underline">
                  Take action
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
