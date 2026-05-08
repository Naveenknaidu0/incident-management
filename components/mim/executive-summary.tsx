"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  DollarSign,
  Clock,
  Server,
  Building2,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

interface ExecutiveSummaryProps {
  businessImpact: "Critical" | "High" | "Medium" | "Low"
  outageDuration: string
  affectedRevenueServices: number
  escalatedCustomers: number
  communicationsSent: number
  recoveryProgress: number
  estimatedRevenueLoss?: string
  className?: string
}

const impactColors = {
  Critical: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
  High: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200" },
  Medium: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
  Low: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
}

export function ExecutiveSummary({
  businessImpact,
  outageDuration,
  affectedRevenueServices,
  escalatedCustomers,
  communicationsSent,
  recoveryProgress,
  estimatedRevenueLoss,
  className,
}: ExecutiveSummaryProps) {
  const impact = impactColors[businessImpact]

  return (
    <Card className={cn("border-[#0D3133]/20", className)}>
      <CardHeader className="py-3 px-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#E69F50]" />
            Executive Summary
          </CardTitle>
          <Badge className={cn("text-[10px]", impact.bg, impact.text, impact.border)}>
            {businessImpact} Business Impact
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Outage Duration */}
          <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
            <div className="h-8 w-8 rounded-md bg-red-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Duration</span>
              <span className="text-sm font-semibold text-red-600">{outageDuration}</span>
            </div>
          </div>

          {/* Revenue Services */}
          <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
            <div className="h-8 w-8 rounded-md bg-[#E69F50]/20 flex items-center justify-center">
              <Server className="h-4 w-4 text-[#E69F50]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Revenue Services</span>
              <span className="text-sm font-semibold">{affectedRevenueServices} Affected</span>
            </div>
          </div>

          {/* Escalated Customers */}
          <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
            <div className="h-8 w-8 rounded-md bg-[#0D3133]/10 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-[#0D3133]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Escalated</span>
              <span className="text-sm font-semibold">{escalatedCustomers} Customers</span>
            </div>
          </div>

          {/* Communications */}
          <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
            <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Communications</span>
              <span className="text-sm font-semibold">{communicationsSent} Sent</span>
            </div>
          </div>
        </div>

        {/* Estimated Revenue Loss */}
        {estimatedRevenueLoss && (
          <div className="mt-3 p-2 rounded-md border border-red-200 bg-red-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-red-600" />
                <span className="text-xs text-red-700">Estimated Revenue Impact</span>
              </div>
              <span className="text-sm font-bold text-red-700">{estimatedRevenueLoss}</span>
            </div>
          </div>
        )}

        {/* Recovery Progress */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-[#E69F50]" />
              Recovery Progress
            </span>
            <span className="text-xs font-semibold">{recoveryProgress}%</span>
          </div>
          <Progress value={recoveryProgress} className="h-2" />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">Identified</span>
            <span className="text-[10px] text-muted-foreground">Resolved</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
