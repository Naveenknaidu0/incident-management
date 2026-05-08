"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, GitBranch, AlertCircle, CheckCircle } from "lucide-react"

interface ChangeItem {
  field: string
  previousValue: string
  newValue: string
  impactLevel?: "low" | "medium" | "high"
}

interface ChangeComparisonPanelProps {
  title: string
  timestamp: string
  performedBy: string
  changes: ChangeItem[]
  impactedModules?: string[]
  affectedWorkflows?: string[]
}

export function ChangeComparisonPanel({
  title,
  timestamp,
  performedBy,
  changes,
  impactedModules = [],
  affectedWorkflows = [],
}: ChangeComparisonPanelProps) {
  const impactColors = {
    low: "bg-green-50 text-green-700 border-green-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    high: "bg-red-50 text-red-700 border-red-200",
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              {timestamp} by {performedBy}
            </p>
          </div>
          <GitBranch className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Changes */}
        <div className="space-y-3">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Field Changes</h4>
          {changes.map((change, index) => (
            <div key={index} className="rounded-lg border bg-muted/30 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">{change.field}</span>
                {change.impactLevel && (
                  <Badge variant="outline" className={impactColors[change.impactLevel]}>
                    {change.impactLevel} impact
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 rounded border border-red-200 bg-red-50/50 p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <AlertCircle className="h-3 w-3 text-red-500" />
                    <span className="text-[10px] text-red-600 font-medium">Previous</span>
                  </div>
                  <p className="text-xs text-red-700 font-mono">{change.previousValue || "(empty)"}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1 rounded border border-green-200 bg-green-50/50 p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-[10px] text-green-600 font-medium">New</span>
                  </div>
                  <p className="text-xs text-green-700 font-mono">{change.newValue || "(empty)"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impacted Modules */}
        {impactedModules.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Impacted Modules</h4>
            <div className="flex flex-wrap gap-1.5">
              {impactedModules.map((module) => (
                <Badge key={module} variant="outline" className="text-xs">
                  {module}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Affected Workflows */}
        {affectedWorkflows.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Affected Workflows</h4>
            <div className="flex flex-wrap gap-1.5">
              {affectedWorkflows.map((workflow) => (
                <Badge key={workflow} variant="secondary" className="text-xs">
                  {workflow}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
