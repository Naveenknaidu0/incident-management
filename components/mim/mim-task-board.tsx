"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Clock, Plus, AlertTriangle, CheckCircle, Circle } from "lucide-react"

type TaskPriority = "critical" | "high" | "medium" | "low"
type TaskStatus = "pending" | "in-progress" | "completed" | "blocked"

interface MIMTask {
  id: string
  title: string
  owner?: {
    name: string
    avatar?: string
  }
  team: string
  priority: TaskPriority
  status: TaskStatus
  eta?: string
  completedAt?: string
}

interface MIMTaskBoardProps {
  tasks: MIMTask[]
  className?: string
  onAddTask?: () => void
  onToggleTask?: (taskId: string) => void
}

const priorityConfig: Record<TaskPriority, { bg: string; text: string; border: string }> = {
  critical: { bg: "bg-red-100", text: "text-red-700", border: "border-l-red-500" },
  high: { bg: "bg-orange-100", text: "text-orange-700", border: "border-l-orange-500" },
  medium: { bg: "bg-amber-100", text: "text-amber-700", border: "border-l-amber-500" },
  low: { bg: "bg-slate-100", text: "text-slate-600", border: "border-l-slate-400" },
}

const statusConfig: Record<TaskStatus, { icon: typeof Circle; color: string }> = {
  pending: { icon: Circle, color: "text-slate-400" },
  "in-progress": { icon: Clock, color: "text-amber-500" },
  completed: { icon: CheckCircle, color: "text-green-500" },
  blocked: { icon: AlertTriangle, color: "text-red-500" },
}

export function MIMTaskBoard({ tasks, className, onAddTask, onToggleTask }: MIMTaskBoardProps) {
  const completedCount = tasks.filter((t) => t.status === "completed").length
  const totalCount = tasks.length

  return (
    <Card className={className}>
      <CardHeader className="py-3 px-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Response Tasks</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {completedCount}/{totalCount} Complete
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={onAddTask}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Task
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {tasks.map((task) => {
            const priority = priorityConfig[task.priority]
            const status = statusConfig[task.status]
            const StatusIcon = status.icon

            return (
              <div
                key={task.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 border-l-2",
                  priority.border,
                  task.status === "completed" && "bg-muted/30"
                )}
              >
                <Checkbox
                  checked={task.status === "completed"}
                  onCheckedChange={() => onToggleTask?.(task.id)}
                  className="h-4 w-4"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-xs font-medium truncate",
                        task.status === "completed" && "line-through text-muted-foreground"
                      )}
                    >
                      {task.title}
                    </span>
                    <StatusIcon className={cn("h-3 w-3 shrink-0", status.color)} />
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {task.owner && (
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={task.owner.avatar} />
                      <AvatarFallback className="text-[8px] bg-[#0D3133] text-white">
                        {task.owner.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {task.team}
                  </Badge>
                  <Badge className={cn("text-[10px] px-1.5 py-0", priority.bg, priority.text)}>
                    {task.priority}
                  </Badge>
                  {task.eta && task.status !== "completed" && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <Clock className="h-3 w-3" />
                      {task.eta}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
