"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Search,
  Wrench,
  TrendingUp,
  Eye,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react"

type RecoveryPhase = "identified" | "mitigation" | "partial-recovery" | "monitoring" | "resolved"

interface RecoveryMilestone {
  id: string
  phase: RecoveryPhase
  title: string
  description?: string
  team?: string
  assignee?: {
    name: string
    avatar?: string
  }
  eta?: string
  completedAt?: string
  status: "completed" | "in-progress" | "pending"
}

interface RecoveryTrackerProps {
  currentPhase: RecoveryPhase
  milestones: RecoveryMilestone[]
  estimatedRecovery?: string
  className?: string
}

const phaseConfig: Record<RecoveryPhase, { icon: typeof Search; label: string; color: string }> = {
  identified: { icon: Search, label: "Identified", color: "text-red-600" },
  mitigation: { icon: Wrench, label: "Mitigation", color: "text-orange-600" },
  "partial-recovery": { icon: TrendingUp, label: "Partial Recovery", color: "text-amber-600" },
  monitoring: { icon: Eye, label: "Monitoring", color: "text-blue-600" },
  resolved: { icon: CheckCircle, label: "Resolved", color: "text-green-600" },
}

const phases: RecoveryPhase[] = ["identified", "mitigation", "partial-recovery", "monitoring", "resolved"]

export function RecoveryTracker({
  currentPhase,
  milestones,
  estimatedRecovery,
  className,
}: RecoveryTrackerProps) {
  const currentPhaseIndex = phases.indexOf(currentPhase)

  return (
    <div className={cn("space-y-4", className)}>
      {/* Phase Progress */}
      <Card>
        <CardHeader className="py-3 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Recovery Progress</CardTitle>
            {estimatedRecovery && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                ETA: <span className="font-medium text-foreground">{estimatedRecovery}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <div className="relative">
            {/* Progress Bar Background */}
            <div className="absolute top-3 left-0 right-0 h-1 bg-muted rounded-full" />
            
            {/* Progress Bar Fill */}
            <div
              className="absolute top-3 left-0 h-1 bg-[#E69F50] rounded-full transition-all duration-500"
              style={{ width: `${((currentPhaseIndex + 1) / phases.length) * 100}%` }}
            />

            {/* Phase Dots */}
            <div className="relative flex justify-between">
              {phases.map((phase, index) => {
                const config = phaseConfig[phase]
                const Icon = config.icon
                const isCompleted = index < currentPhaseIndex
                const isCurrent = index === currentPhaseIndex
                const isPending = index > currentPhaseIndex

                return (
                  <div key={phase} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "h-7 w-7 rounded-full flex items-center justify-center border-2 transition-all",
                        isCompleted && "bg-green-500 border-green-500",
                        isCurrent && "bg-[#E69F50] border-[#E69F50] ring-4 ring-[#E69F50]/20",
                        isPending && "bg-white border-muted"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4 text-white" />
                      ) : (
                        <Icon
                          className={cn(
                            "h-3.5 w-3.5",
                            isCurrent ? "text-white" : "text-muted-foreground"
                          )}
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[10px] mt-2 font-medium",
                        isCompleted && "text-green-600",
                        isCurrent && "text-[#E69F50]",
                        isPending && "text-muted-foreground"
                      )}
                    >
                      {config.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-medium">Recovery Milestones</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0 space-y-2">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className={cn(
                "p-2 rounded-md border",
                milestone.status === "completed" && "border-green-200 bg-green-50/50",
                milestone.status === "in-progress" && "border-[#E69F50]/30 bg-[#E69F50]/5",
                milestone.status === "pending" && "border-border bg-muted/30"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div
                    className={cn(
                      "mt-0.5 h-4 w-4 rounded-full flex items-center justify-center",
                      milestone.status === "completed" && "bg-green-500",
                      milestone.status === "in-progress" && "bg-[#E69F50]",
                      milestone.status === "pending" && "bg-muted"
                    )}
                  >
                    {milestone.status === "completed" ? (
                      <CheckCircle className="h-2.5 w-2.5 text-white" />
                    ) : milestone.status === "in-progress" ? (
                      <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">{milestone.title}</span>
                    {milestone.description && (
                      <span className="text-[10px] text-muted-foreground">{milestone.description}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {milestone.assignee && (
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={milestone.assignee.avatar} />
                      <AvatarFallback className="text-[8px] bg-[#0D3133] text-white">
                        {milestone.assignee.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  {milestone.team && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {milestone.team}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-1.5 pl-6">
                {milestone.eta && milestone.status !== "completed" && (
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    ETA: {milestone.eta}
                  </span>
                )}
                {milestone.completedAt && (
                  <span className="text-[10px] text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Completed: {milestone.completedAt}
                  </span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
