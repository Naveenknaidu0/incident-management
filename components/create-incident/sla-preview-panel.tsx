"use client"

import { cn } from "@/lib/utils"
import { Clock, AlertTriangle, CheckCircle, ArrowUp, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SLAPreviewPanelProps {
  priority: string | null
  service?: string
  className?: string
}

const slaConfig = {
  critical: {
    response: "15 min",
    resolution: "4 hours",
    escalation: ["L1: Immediate", "L2: 30 min", "L3: 1 hr", "Major: 2 hr"],
    businessHours: false,
  },
  high: {
    response: "30 min",
    resolution: "8 hours",
    escalation: ["L1: 15 min", "L2: 1 hr", "L3: 2 hr", "Major: 4 hr"],
    businessHours: false,
  },
  medium: {
    response: "4 hours",
    resolution: "24 hours",
    escalation: ["L1: 2 hr", "L2: 4 hr", "L3: 8 hr", "Major: 12 hr"],
    businessHours: true,
  },
  low: {
    response: "8 hours",
    resolution: "72 hours",
    escalation: ["L1: 4 hr", "L2: 8 hr", "L3: 24 hr", "Major: 48 hr"],
    businessHours: true,
  },
}

export function SLAPreviewPanel({ priority, service, className }: SLAPreviewPanelProps) {
  const config = priority ? slaConfig[priority as keyof typeof slaConfig] : null

  if (!config) {
    return (
      <Card className={cn("border-dashed", className)}>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Clock className="mb-2 h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Select impact and urgency to see SLA preview
          </p>
        </CardContent>
      </Card>
    )
  }

  const priorityColors = {
    critical: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
    high: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" },
    medium: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700" },
    low: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
  }

  const colors = priorityColors[priority as keyof typeof priorityColors]

  return (
    <Card className={cn(colors.bg, colors.border, className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Clock className={cn("h-4 w-4", colors.text)} />
          SLA Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Response & Resolution */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="h-3.5 w-3.5" />
              Response Time
            </div>
            <p className={cn("mt-1 text-lg font-bold", colors.text)}>
              {config.response}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5" />
              Resolution Time
            </div>
            <p className={cn("mt-1 text-lg font-bold", colors.text)}>
              {config.resolution}
            </p>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-2.5">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs">
            {config.businessHours ? (
              <span className="text-muted-foreground">Business hours apply (Mon-Fri 9AM-5PM)</span>
            ) : (
              <span className="font-medium text-[#0D3133]">24/7 coverage - No business hour restrictions</span>
            )}
          </span>
        </div>

        {/* Escalation Timeline */}
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <ArrowUp className="h-3.5 w-3.5" />
            Escalation Timeline
          </p>
          <div className="space-y-1">
            {config.escalation.map((level, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded bg-card px-2 py-1 text-xs"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-muted text-[10px] font-semibold">
                  {idx + 1}
                </span>
                <span className="text-muted-foreground">{level}</span>
              </div>
            ))}
          </div>
        </div>

        {service && (
          <div className="rounded-lg border border-border bg-card p-2.5">
            <p className="text-xs text-muted-foreground">Service-specific SLA adjustments may apply</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
