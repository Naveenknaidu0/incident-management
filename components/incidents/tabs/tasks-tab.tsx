"use client"

import { useState } from "react"
import { Plus, Clock, User, ChevronDown, MoreHorizontal, CheckCircle2, Circle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Task {
  id: string
  title: string
  assignee: { name: string; initials: string }
  dueDate: string
  sla: { remaining: string; status: "safe" | "warning" | "breach" }
  status: "open" | "in-progress" | "completed" | "blocked"
  priority: "critical" | "high" | "medium" | "low"
  team: string
}

const tasks: Task[] = [
  {
    id: "TSK0001",
    title: "Investigate database connection pool exhaustion",
    assignee: { name: "Sarah Chen", initials: "SC" },
    dueDate: "Today, 16:00",
    sla: { remaining: "00:45:22", status: "warning" },
    status: "completed",
    priority: "critical",
    team: "Database Ops",
  },
  {
    id: "TSK0002",
    title: "Deploy hotfix to payment-service",
    assignee: { name: "Sarah Chen", initials: "SC" },
    dueDate: "Today, 16:30",
    sla: { remaining: "01:15:22", status: "safe" },
    status: "in-progress",
    priority: "critical",
    team: "Payment Ops",
  },
  {
    id: "TSK0003",
    title: "Verify fix in staging environment",
    assignee: { name: "Mike Johnson", initials: "MJ" },
    dueDate: "Today, 17:00",
    sla: { remaining: "01:45:22", status: "safe" },
    status: "open",
    priority: "high",
    team: "QA Team",
  },
  {
    id: "TSK0004",
    title: "Monitor production error rates for 30 minutes",
    assignee: { name: "Sarah Chen", initials: "SC" },
    dueDate: "Today, 17:30",
    sla: { remaining: "02:15:22", status: "safe" },
    status: "open",
    priority: "high",
    team: "Payment Ops",
  },
  {
    id: "TSK0005",
    title: "Update stakeholders on resolution status",
    assignee: { name: "John Doe", initials: "JD" },
    dueDate: "Today, 18:00",
    sla: { remaining: "02:45:22", status: "safe" },
    status: "open",
    priority: "medium",
    team: "Incident Management",
  },
  {
    id: "TSK0006",
    title: "Schedule post-incident review",
    assignee: { name: "John Doe", initials: "JD" },
    dueDate: "Tomorrow, 10:00",
    sla: { remaining: "18:45:22", status: "safe" },
    status: "open",
    priority: "low",
    team: "Incident Management",
  },
]

const statusConfig = {
  open: { icon: Circle, label: "Open", color: "text-slate-500", bg: "bg-slate-100" },
  "in-progress": { icon: Clock, label: "In Progress", color: "text-blue-600", bg: "bg-blue-100" },
  completed: { icon: CheckCircle2, label: "Completed", color: "text-green-600", bg: "bg-green-100" },
  blocked: { icon: AlertCircle, label: "Blocked", color: "text-red-600", bg: "bg-red-100" },
}

const priorityConfig = {
  critical: { label: "Critical", color: "bg-red-100 text-red-700" },
  high: { label: "High", color: "bg-orange-100 text-orange-700" },
  medium: { label: "Medium", color: "bg-amber-100 text-amber-700" },
  low: { label: "Low", color: "bg-green-100 text-green-700" },
}

export function TasksTab() {
  const [taskList, setTaskList] = useState(tasks)

  const completedCount = taskList.filter((t) => t.status === "completed").length
  const totalCount = taskList.length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-card-foreground">Incident Tasks</h3>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {completedCount}/{totalCount} completed
          </span>
        </div>
        <Button size="sm" className="bg-[#0D3133] text-white hover:bg-[#0D3133]/90">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add Task
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-[#059669] transition-all"
          style={{ width: `${(completedCount / totalCount) * 100}%` }}
        />
      </div>

      {/* Task Table */}
      <div className="rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="sticky left-0 bg-muted/30 px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                  Task ID
                </th>
                <th className="min-w-[280px] px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                  Title
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Assignee</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Team</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Due Date</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">SLA</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Priority</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {taskList.map((task) => {
                const statusCfg = statusConfig[task.status]
                const priorityCfg = priorityConfig[task.priority]
                const StatusIcon = statusCfg.icon

                return (
                  <tr key={task.id} className="hover:bg-muted/20">
                    <td className="sticky left-0 bg-card px-4 py-2.5">
                      <span className="font-mono text-xs text-muted-foreground">{task.id}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`text-sm ${task.status === "completed" ? "text-muted-foreground line-through" : "text-card-foreground"}`}>
                        {task.title}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0D3133] text-[10px] font-semibold text-white">
                          {task.assignee.initials}
                        </div>
                        <span className="text-sm text-card-foreground">{task.assignee.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-sm text-muted-foreground">{task.team}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-sm text-muted-foreground">{task.dueDate}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`font-mono text-xs ${
                        task.sla.status === "breach" ? "text-red-600" :
                        task.sla.status === "warning" ? "text-amber-600" :
                        "text-green-600"
                      }`}>
                        {task.sla.remaining}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex rounded px-1.5 py-0.5 text-xs font-medium ${priorityCfg.color}`}>
                        {priorityCfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className={`inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium ${statusCfg.bg} ${statusCfg.color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {statusCfg.label}
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Open</DropdownMenuItem>
                          <DropdownMenuItem>In Progress</DropdownMenuItem>
                          <DropdownMenuItem>Completed</DropdownMenuItem>
                          <DropdownMenuItem>Blocked</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                    <td className="px-4 py-2.5">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="rounded p-1 hover:bg-muted">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>Reassign</DropdownMenuItem>
                          <DropdownMenuItem>Add Comment</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
