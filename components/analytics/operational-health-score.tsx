"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface HealthMetric {
  label: string
  score: number
  status: "good" | "warning" | "critical"
}

const metrics: HealthMetric[] = [
  { label: "Incident Resolution", score: 94, status: "good" },
  { label: "SLA Compliance", score: 92, status: "good" },
  { label: "Service Availability", score: 99, status: "good" },
  { label: "Response Time", score: 88, status: "warning" },
  { label: "Escalation Rate", score: 76, status: "warning" },
]

const overallScore = Math.round(metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length)

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600"
  if (score >= 80) return "text-amber-600"
  return "text-red-600"
}

const getScoreBg = (score: number) => {
  if (score >= 90) return "bg-green-500"
  if (score >= 80) return "bg-amber-500"
  return "bg-red-500"
}

export function OperationalHealthScore() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">Operational Health Score</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          {/* Main Score Circle */}
          <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
            <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E2E0DC"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={overallScore >= 90 ? "#059669" : overallScore >= 80 ? "#D97706" : "#DC2626"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${overallScore * 2.83} 283`}
              />
            </svg>
            <div className="text-center">
              <span className={cn("text-3xl font-bold", getScoreColor(overallScore))}>
                {overallScore}
              </span>
              <p className="text-[10px] text-muted-foreground">Health Score</p>
            </div>
          </div>

          {/* Metrics Breakdown */}
          <div className="flex-1 space-y-2">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex items-center gap-3">
                <div className="w-24 truncate text-[11px] text-muted-foreground">
                  {metric.label}
                </div>
                <div className="flex-1 h-1.5 rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full transition-all", getScoreBg(metric.score))}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
                <span className={cn("w-8 text-right text-[11px] font-medium", getScoreColor(metric.score))}>
                  {metric.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
          <div className="flex items-center gap-2">
            {overallScore >= 90 ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            )}
            <span className="text-xs">
              {overallScore >= 90 
                ? "Operations running smoothly" 
                : "Some areas need attention"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-green-600">
            <TrendingUp className="h-3 w-3" />
            +2.4% vs last week
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
