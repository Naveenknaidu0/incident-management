"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  RotateCcw,
  Rocket,
  TestTube,
  Calendar,
  ArrowRight,
} from "lucide-react"

interface PermanentFix {
  id: string
  title: string
  linkedProblem: string
  status: "planning" | "development" | "testing" | "staging" | "production"
  progress: number
  riskLevel: "low" | "medium" | "high"
  rollbackReady: boolean
  validationChecks: { passed: number; total: number }
  targetDate: string
}

interface PermanentFixTrackerProps {
  fixes: PermanentFix[]
  className?: string
}

const statusSteps = [
  { key: "planning", label: "Planning", icon: Calendar },
  { key: "development", label: "Development", icon: Clock },
  { key: "testing", label: "Testing", icon: TestTube },
  { key: "staging", label: "Staging", icon: AlertTriangle },
  { key: "production", label: "Production", icon: Rocket },
]

const getStatusIndex = (status: PermanentFix["status"]) => {
  return statusSteps.findIndex((s) => s.key === status)
}

export function PermanentFixTracker({ fixes, className }: PermanentFixTrackerProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-semibold">
          <span className="flex items-center gap-2">
            <Rocket className="h-4 w-4 text-[#0D3133]" />
            Permanent Fix Tracking
          </span>
          <Badge variant="secondary" className="text-xs">
            {fixes.length} active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fixes.map((fix) => {
          const currentStepIndex = getStatusIndex(fix.status)

          return (
            <div
              key={fix.id}
              className="rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{fix.id}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px]",
                        fix.riskLevel === "high" && "border-red-200 text-red-700",
                        fix.riskLevel === "medium" && "border-amber-200 text-amber-700",
                        fix.riskLevel === "low" && "border-green-200 text-green-700"
                      )}
                    >
                      {fix.riskLevel} risk
                    </Badge>
                  </div>
                  <h4 className="mt-1 text-sm font-medium text-foreground line-clamp-1">
                    {fix.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Problem: {fix.linkedProblem}
                  </p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="mt-3 flex items-center gap-1">
                {statusSteps.map((step, index) => {
                  const StepIcon = step.icon
                  const isCompleted = index < currentStepIndex
                  const isCurrent = index === currentStepIndex

                  return (
                    <div key={step.key} className="flex items-center flex-1">
                      <div
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full text-xs shrink-0",
                          isCompleted && "bg-green-100 text-green-600",
                          isCurrent && "bg-blue-100 text-blue-600",
                          !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-3.5 w-3.5" />
                        ) : (
                          <StepIcon className="h-3 w-3" />
                        )}
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div
                          className={cn(
                            "h-0.5 flex-1 mx-1",
                            isCompleted ? "bg-green-300" : "bg-muted"
                          )}
                        />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Progress and Metadata */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Rollout Progress</span>
                  <span className="font-medium">{fix.progress}%</span>
                </div>
                <Progress value={fix.progress} className="h-1.5" />

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <CheckCircle className={cn("h-3 w-3", fix.validationChecks.passed === fix.validationChecks.total ? "text-green-600" : "text-amber-600")} />
                      {fix.validationChecks.passed}/{fix.validationChecks.total} checks
                    </span>
                    <span className={cn("flex items-center gap-1", fix.rollbackReady ? "text-green-600" : "text-amber-600")}>
                      <RotateCcw className="h-3 w-3" />
                      {fix.rollbackReady ? "Rollback Ready" : "No Rollback"}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    Target: {fix.targetDate}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
