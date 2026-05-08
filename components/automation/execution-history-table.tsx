"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  Clock,
  ExternalLink,
  RotateCw,
  Eye,
} from "lucide-react"

export interface ExecutionRecord {
  id: string
  workflowName: string
  workflowId: string
  status: "success" | "failed" | "running"
  trigger: string
  incidentId: string
  startedAt: string
  duration: string
  steps: number
  stepsCompleted: number
  error?: string
}

interface ExecutionHistoryTableProps {
  executions: ExecutionRecord[]
  onRetry: (id: string) => void
}

export function ExecutionHistoryTable({
  executions,
  onRetry,
}: ExecutionHistoryTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Workflow
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Trigger
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Incident
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Started
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Duration
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Steps
              </th>
              <th className="w-20 px-2 py-3" />
            </tr>
          </thead>
          <tbody>
            {executions.map((exec) => (
              <tr
                key={exec.id}
                className="group border-b border-border transition-colors hover:bg-muted/50"
              >
                <td className="px-4 py-3">
                  {exec.status === "success" ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-50 text-green-700 gap-1"
                    >
                      <CheckCircle className="h-3 w-3" />
                      Success
                    </Badge>
                  ) : exec.status === "failed" ? (
                    <Badge
                      variant="secondary"
                      className="bg-red-50 text-red-700 gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      Failed
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 gap-1"
                    >
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      Running
                    </Badge>
                  )}
                </td>
                <td className="px-3 py-3">
                  <Link
                    href={`/automation/workflows/${exec.workflowId}`}
                    className="text-sm font-medium text-[#0D3133] hover:underline"
                  >
                    {exec.workflowName}
                  </Link>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm text-muted-foreground">{exec.trigger}</span>
                </td>
                <td className="px-3 py-3">
                  <Link
                    href={`/incidents/${exec.incidentId}`}
                    className="font-mono text-sm text-[#0D3133] hover:underline"
                  >
                    {exec.incidentId}
                  </Link>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {exec.startedAt}
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm">{exec.duration}</span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-12 rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          exec.status === "success"
                            ? "bg-green-500"
                            : exec.status === "failed"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        )}
                        style={{
                          width: `${(exec.stepsCompleted / exec.steps) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {exec.stepsCompleted}/{exec.steps}
                    </span>
                  </div>
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {exec.status === "failed" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onRetry(exec.id)}
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Demo data
export const demoExecutions: ExecutionRecord[] = [
  {
    id: "exec-1",
    workflowName: "SLA Breach Escalation",
    workflowId: "wf-001",
    status: "success",
    trigger: "SLA Breached",
    incidentId: "INC0042781",
    startedAt: "2 mins ago",
    duration: "1.2s",
    steps: 4,
    stepsCompleted: 4,
  },
  {
    id: "exec-2",
    workflowName: "VIP Routing",
    workflowId: "wf-002",
    status: "success",
    trigger: "Incident Created",
    incidentId: "INC0042780",
    startedAt: "15 mins ago",
    duration: "0.8s",
    steps: 3,
    stepsCompleted: 3,
  },
  {
    id: "exec-3",
    workflowName: "Auto Assignment",
    workflowId: "wf-003",
    status: "failed",
    trigger: "Incident Created",
    incidentId: "INC0042779",
    startedAt: "1 hour ago",
    duration: "2.1s",
    steps: 5,
    stepsCompleted: 3,
    error: "Assignment group not found",
  },
  {
    id: "exec-4",
    workflowName: "Executive Notification",
    workflowId: "wf-004",
    status: "running",
    trigger: "Priority Changed",
    incidentId: "INC0042778",
    startedAt: "Just now",
    duration: "-",
    steps: 4,
    stepsCompleted: 2,
  },
  {
    id: "exec-5",
    workflowName: "SLA Warning Alert",
    workflowId: "wf-005",
    status: "success",
    trigger: "SLA Warning",
    incidentId: "INC0042777",
    startedAt: "3 hours ago",
    duration: "0.5s",
    steps: 2,
    stepsCompleted: 2,
  },
]
