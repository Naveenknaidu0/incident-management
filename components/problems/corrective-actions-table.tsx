"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  Server,
  Settings,
  Zap,
  Eye,
  FileText,
} from "lucide-react"

type ActionStatus = "pending" | "in-progress" | "completed" | "overdue"
type ActionType = "infrastructure" | "configuration" | "automation" | "monitoring" | "process"

interface CorrectiveAction {
  id: string
  title: string
  type: ActionType
  owner: { name: string }
  dueDate: string
  status: ActionStatus
  impact: "high" | "medium" | "low"
  linkedProblem: string
}

interface CorrectiveActionsTableProps {
  actions: CorrectiveAction[]
  className?: string
}

const statusConfig: Record<ActionStatus, { label: string; icon: typeof CheckCircle2; color: string }> = {
  pending: { label: "Pending", icon: Clock, color: "text-slate-500 bg-slate-100" },
  "in-progress": { label: "In Progress", icon: Clock, color: "text-blue-600 bg-blue-50" },
  completed: { label: "Completed", icon: CheckCircle2, color: "text-green-600 bg-green-50" },
  overdue: { label: "Overdue", icon: AlertTriangle, color: "text-red-600 bg-red-50" },
}

const typeConfig: Record<ActionType, { icon: typeof Server; color: string }> = {
  infrastructure: { icon: Server, color: "text-purple-600" },
  configuration: { icon: Settings, color: "text-blue-600" },
  automation: { icon: Zap, color: "text-amber-600" },
  monitoring: { icon: Eye, color: "text-cyan-600" },
  process: { icon: FileText, color: "text-slate-600" },
}

export function CorrectiveActionsTable({ actions, className }: CorrectiveActionsTableProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold">Corrective Actions</CardTitle>
        <Button size="sm" variant="outline" className="h-7 gap-1">
          <Plus className="h-3.5 w-3.5" />
          Add Action
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-2">Action ID</th>
                <th className="px-3 py-2">Action</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Owner</th>
                <th className="px-3 py-2">Due Date</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Impact</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((action) => {
                const statusCfg = statusConfig[action.status]
                const typeCfg = typeConfig[action.type]
                const StatusIcon = statusCfg.icon
                const TypeIcon = typeCfg.icon

                return (
                  <tr key={action.id} className="border-b border-border hover:bg-muted/30">
                    <td className="px-4 py-2">
                      <span className="font-mono text-xs text-muted-foreground">{action.id}</span>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-sm text-foreground line-clamp-1">{action.title}</p>
                    </td>
                    <td className="px-3 py-2">
                      <TypeIcon className={cn("h-4 w-4", typeCfg.color)} />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[8px] bg-[#0D3133] text-white">
                            {action.owner.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-foreground">{action.owner.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-xs text-muted-foreground">{action.dueDate}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", statusCfg.color)}>
                        <StatusIcon className="h-3 w-3" />
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          action.impact === "high" && "border-red-200 text-red-700",
                          action.impact === "medium" && "border-amber-200 text-amber-700",
                          action.impact === "low" && "border-green-200 text-green-700"
                        )}
                      >
                        {action.impact}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
