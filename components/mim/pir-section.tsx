"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  FileText,
  Download,
  Lightbulb,
  Target,
  ListTodo,
  Clock,
} from "lucide-react"

interface PIRSectionProps {
  incidentId: string
  canCreatePIR?: boolean
  rootCausePlaceholder?: string
  lessonsLearned?: string[]
  followUpActions?: string[]
  className?: string
  onCreatePIR?: () => void
  onExportTimeline?: () => void
}

export function PIRSection({
  incidentId,
  canCreatePIR = true,
  rootCausePlaceholder = "",
  lessonsLearned = [],
  followUpActions = [],
  className,
  onCreatePIR,
  onExportTimeline,
}: PIRSectionProps) {
  return (
    <Card className={cn("border-[#0D3133]/20", className)}>
      <CardHeader className="py-3 px-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#E69F50]" />
            Post Incident Review
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={onExportTimeline}
            >
              <Download className="h-3 w-3 mr-1" />
              Export Timeline
            </Button>
            <Button
              size="sm"
              className="h-7 text-xs bg-[#E69F50] hover:bg-[#d18f40] text-[#0D3133]"
              onClick={onCreatePIR}
              disabled={!canCreatePIR}
            >
              <FileText className="h-3 w-3 mr-1" />
              Create PIR
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Root Cause */}
        <div>
          <label className="text-xs font-medium flex items-center gap-1.5 mb-2">
            <Target className="h-3.5 w-3.5 text-[#0D3133]" />
            Root Cause (Preliminary)
          </label>
          <Textarea
            placeholder="Document the preliminary root cause..."
            defaultValue={rootCausePlaceholder}
            className="min-h-[60px] text-xs resize-none"
          />
        </div>

        {/* Lessons Learned */}
        <div>
          <label className="text-xs font-medium flex items-center gap-1.5 mb-2">
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
            Lessons Learned
          </label>
          {lessonsLearned.length > 0 ? (
            <ul className="space-y-1">
              {lessonsLearned.map((lesson, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-[#E69F50]">•</span>
                  {lesson}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground italic">
              Lessons learned will be documented during the PIR process.
            </p>
          )}
        </div>

        {/* Follow-up Actions */}
        <div>
          <label className="text-xs font-medium flex items-center gap-1.5 mb-2">
            <ListTodo className="h-3.5 w-3.5 text-blue-500" />
            Follow-up Actions
          </label>
          {followUpActions.length > 0 ? (
            <ul className="space-y-1">
              {followUpActions.map((action, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  {action}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground italic">
              Follow-up actions will be tracked after incident resolution.
            </p>
          )}
        </div>

        {/* PIR Status */}
        {!canCreatePIR && (
          <div className="flex items-center gap-2 p-2 rounded-md bg-amber-50 border border-amber-200">
            <Clock className="h-4 w-4 text-amber-600" />
            <span className="text-xs text-amber-700">
              PIR can be created after the incident is resolved.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
