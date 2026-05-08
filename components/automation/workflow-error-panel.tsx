"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  XCircle,
  AlertTriangle,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Clock,
  Copy,
} from "lucide-react"
import { useState } from "react"

interface WorkflowError {
  id: string
  executionId: string
  workflowName: string
  workflowId: string
  step: string
  stepNumber: number
  totalSteps: number
  errorType: "validation" | "timeout" | "integration" | "condition"
  errorMessage: string
  stackTrace?: string
  incidentId: string
  occurredAt: string
  retryCount: number
  maxRetries: number
}

interface WorkflowErrorPanelProps {
  errors: WorkflowError[]
  onRetry: (errorId: string) => void
  onDismiss: (errorId: string) => void
}

const errorTypeStyles: Record<string, { bg: string; text: string; label: string }> = {
  validation: { bg: "bg-red-50", text: "text-red-700", label: "Validation Error" },
  timeout: { bg: "bg-amber-50", text: "text-amber-700", label: "Timeout" },
  integration: { bg: "bg-purple-50", text: "text-purple-700", label: "Integration Error" },
  condition: { bg: "bg-blue-50", text: "text-blue-700", label: "Condition Failed" },
}

export function WorkflowErrorPanel({ errors, onRetry, onDismiss }: WorkflowErrorPanelProps) {
  const [expandedErrors, setExpandedErrors] = useState<string[]>([])

  const toggleExpanded = (errorId: string) => {
    setExpandedErrors((prev) =>
      prev.includes(errorId)
        ? prev.filter((id) => id !== errorId)
        : [...prev, errorId]
    )
  }

  const copyStackTrace = (trace: string) => {
    navigator.clipboard.writeText(trace)
  }

  if (errors.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
            <RefreshCw className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-4 text-sm font-medium">No Active Errors</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            All workflow executions are running smoothly
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {errors.map((error) => {
        const errorStyle = errorTypeStyles[error.errorType]
        const isExpanded = expandedErrors.includes(error.id)

        return (
          <Card key={error.id} className="border-red-200 bg-red-50/30">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-sm font-medium">
                        {error.workflowName}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className={cn("text-[10px]", errorStyle.bg, errorStyle.text)}
                      >
                        {errorStyle.label}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Failed at step {error.stepNumber} of {error.totalSteps}: {error.step}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleExpanded(error.id)}
                  className="p-1 hover:bg-muted rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Error Message */}
              <div className="mb-3 rounded-md bg-red-100/50 p-3">
                <p className="text-xs font-medium text-red-800">{error.errorMessage}</p>
              </div>

              {/* Meta Info */}
              <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {error.occurredAt}
                </span>
                <span>
                  Incident:{" "}
                  <a href={`/incidents/${error.incidentId}`} className="text-[#0D3133] hover:underline">
                    {error.incidentId}
                  </a>
                </span>
                <span>
                  Retries: {error.retryCount}/{error.maxRetries}
                </span>
              </div>

              {/* Expanded Content */}
              {isExpanded && error.stackTrace && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-muted-foreground">Stack Trace</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => copyStackTrace(error.stackTrace!)}
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Copy
                    </Button>
                  </div>
                  <pre className="rounded-md bg-slate-900 p-3 text-[10px] text-slate-100 overflow-x-auto">
                    {error.stackTrace}
                  </pre>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => onRetry(error.id)}
                  disabled={error.retryCount >= error.maxRetries}
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Retry
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  onClick={() => onDismiss(error.id)}
                >
                  Dismiss
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs ml-auto"
                  asChild
                >
                  <a href={`/automation/workflows/${error.workflowId}`}>
                    <ExternalLink className="mr-1 h-3 w-3" />
                    View Workflow
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// Demo data
export const demoWorkflowErrors: WorkflowError[] = [
  {
    id: "err-1",
    executionId: "exec-001",
    workflowName: "Auto Assignment by Category",
    workflowId: "wf-003",
    step: "Assign to Group",
    stepNumber: 3,
    totalSteps: 5,
    errorType: "validation",
    errorMessage: "Assignment group 'Network-L2' not found in the system",
    stackTrace: `Error: Assignment group not found
    at AssignmentService.findGroup (workflow-engine:456:12)
    at ActionExecutor.execute (workflow-engine:234:8)
    at WorkflowRunner.runStep (workflow-engine:89:15)`,
    incidentId: "INC0042779",
    occurredAt: "1 hour ago",
    retryCount: 2,
    maxRetries: 3,
  },
  {
    id: "err-2",
    executionId: "exec-002",
    workflowName: "Executive Notification",
    workflowId: "wf-004",
    step: "Send Email",
    stepNumber: 2,
    totalSteps: 4,
    errorType: "integration",
    errorMessage: "SMTP connection timeout after 30000ms",
    incidentId: "INC0042776",
    occurredAt: "3 hours ago",
    retryCount: 3,
    maxRetries: 3,
  },
]
