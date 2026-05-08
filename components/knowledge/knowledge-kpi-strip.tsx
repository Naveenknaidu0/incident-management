"use client"

import { Card } from "@/components/ui/card"
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Brain,
  TrendingUp,
  RotateCcw,
} from "lucide-react"

const kpis = [
  { label: "Total Articles", value: "1,247", icon: FileText, trend: "+12", color: "text-[#0D3133]" },
  { label: "Published", value: "982", icon: CheckCircle, trend: "+8", color: "text-green-600" },
  { label: "Known Errors", value: "156", icon: AlertTriangle, trend: "+3", color: "text-amber-600" },
  { label: "AI Recommendations", value: "89", icon: Brain, trend: "+15", color: "text-[#E69F50]" },
  { label: "Resolution Rate", value: "94.2%", icon: TrendingUp, trend: "+2.1%", color: "text-green-600" },
  { label: "Reused Resolutions", value: "3,421", icon: RotateCcw, trend: "+156", color: "text-[#0D3133]" },
]

export function KnowledgeKPIStrip() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card key={kpi.label} className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className={`text-xl font-semibold ${kpi.color}`}>{kpi.value}</p>
              </div>
              <Icon className={`h-4 w-4 ${kpi.color}`} />
            </div>
            <p className="mt-1 text-xs text-green-600">{kpi.trend} this week</p>
          </Card>
        )
      })}
    </div>
  )
}
