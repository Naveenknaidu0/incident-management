"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Lightbulb,
  TrendingUp,
  FileText,
  Eye,
  Zap,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

type LearningType = "lesson" | "improvement" | "process" | "monitoring" | "automation"

interface Learning {
  id: string
  type: LearningType
  title: string
  description: string
  linkedProblem: string
  status: "proposed" | "approved" | "implemented"
  impact: "high" | "medium" | "low"
  createdAt: string
}

interface LearningCenterCardProps {
  learnings: Learning[]
  className?: string
}

const typeConfig: Record<LearningType, { icon: LucideIcon; color: string; label: string }> = {
  lesson: { icon: Lightbulb, color: "text-amber-600 bg-amber-50", label: "Lesson Learned" },
  improvement: { icon: TrendingUp, color: "text-green-600 bg-green-50", label: "Improvement" },
  process: { icon: FileText, color: "text-blue-600 bg-blue-50", label: "Process" },
  monitoring: { icon: Eye, color: "text-cyan-600 bg-cyan-50", label: "Monitoring" },
  automation: { icon: Zap, color: "text-purple-600 bg-purple-50", label: "Automation" },
}

const statusColors = {
  proposed: "bg-slate-100 text-slate-700",
  approved: "bg-blue-50 text-blue-700",
  implemented: "bg-green-50 text-green-700",
}

export function LearningCenterCard({ learnings, className }: LearningCenterCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-semibold">
          <span className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            Operational Learning Center
          </span>
          <Button variant="link" size="sm" className="h-6 px-0 text-xs">
            View All <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {learnings.map((learning) => {
          const typeInfo = typeConfig[learning.type]
          const TypeIcon = typeInfo.icon

          return (
            <div
              key={learning.id}
              className="rounded-md border border-border p-3 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", typeInfo.color)}>
                  <TypeIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", statusColors[learning.status])}>
                      {learning.status}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px]",
                        learning.impact === "high" && "border-red-200 text-red-700",
                        learning.impact === "medium" && "border-amber-200 text-amber-700",
                        learning.impact === "low" && "border-green-200 text-green-700"
                      )}
                    >
                      {learning.impact} impact
                    </Badge>
                  </div>
                  <h4 className="mt-1 text-sm font-medium text-foreground line-clamp-1">
                    {learning.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                    {learning.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-mono">{learning.linkedProblem}</span>
                    <span>•</span>
                    <span>{learning.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
