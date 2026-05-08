"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Lightbulb, AlertTriangle, TrendingUp, Clock, 
  Users, ArrowRight, Zap
} from "lucide-react"

interface Insight {
  id: string
  type: "warning" | "opportunity" | "anomaly" | "trend"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  action?: string
}

const insights: Insight[] = [
  {
    id: "1",
    type: "warning",
    title: "SLA Breach Risk - Application Support",
    description: "34 incidents at risk of breaching SLA in the next 2 hours. Team capacity is at 120%.",
    impact: "high",
    action: "Review Queue",
  },
  {
    id: "2",
    type: "anomaly",
    title: "Unusual Incident Spike Detected",
    description: "45% increase in database-related incidents in the last 4 hours compared to baseline.",
    impact: "high",
    action: "Investigate",
  },
  {
    id: "3",
    type: "trend",
    title: "Recurring Network Issues",
    description: "15 similar network timeout incidents reported in EU-West region this week.",
    impact: "medium",
    action: "View Pattern",
  },
  {
    id: "4",
    type: "opportunity",
    title: "Automation Opportunity",
    description: "78% of password reset incidents could be automated based on resolution patterns.",
    impact: "medium",
    action: "Create Rule",
  },
]

const typeIcons = {
  warning: AlertTriangle,
  opportunity: Zap,
  anomaly: TrendingUp,
  trend: Clock,
}

const typeStyles = {
  warning: "border-l-amber-500 bg-amber-50",
  opportunity: "border-l-blue-500 bg-blue-50",
  anomaly: "border-l-red-500 bg-red-50",
  trend: "border-l-purple-500 bg-purple-50",
}

const impactStyles = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
}

export function InsightsPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-[#E69F50]" />
          <CardTitle className="text-sm font-semibold">AI Operational Insights</CardTitle>
        </div>
        <Badge variant="outline" className="text-[10px]">
          4 new insights
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        {insights.map((insight) => {
          const Icon = typeIcons[insight.type]
          return (
            <div
              key={insight.id}
              className={cn(
                "rounded-lg border-l-4 p-3 transition-colors hover:opacity-90",
                typeStyles[insight.type]
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium">{insight.title}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
                <Badge variant="secondary" className={cn("shrink-0 text-[9px]", impactStyles[insight.impact])}>
                  {insight.impact}
                </Badge>
              </div>
              {insight.action && (
                <div className="mt-2 flex justify-end">
                  <Button variant="ghost" size="sm" className="h-6 gap-1 text-[10px]">
                    {insight.action}
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
