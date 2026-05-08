"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Settings,
  Clock,
  RefreshCw,
  Play,
  History,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { WorkflowStateBadge } from "./workflow-state-badge"

interface ExecutionHistoryItem {
  id: string
  status: "success" | "failed" | "running"
  startedAt: string
  duration: string
  incidentId?: string
}

interface WorkflowConfigPanelProps {
  workflowName: string
  workflowDescription: string
  workflowState: "draft" | "active" | "paused" | "failed" | "archived"
  onNameChange: (name: string) => void
  onDescriptionChange: (description: string) => void
  onStateChange: (state: "active" | "paused") => void
}

const executionHistory: ExecutionHistoryItem[] = [
  { id: "exec-1", status: "success", startedAt: "2 mins ago", duration: "1.2s", incidentId: "INC0042781" },
  { id: "exec-2", status: "success", startedAt: "15 mins ago", duration: "0.8s", incidentId: "INC0042780" },
  { id: "exec-3", status: "failed", startedAt: "1 hour ago", duration: "2.1s", incidentId: "INC0042779" },
  { id: "exec-4", status: "success", startedAt: "2 hours ago", duration: "1.5s", incidentId: "INC0042778" },
  { id: "exec-5", status: "success", startedAt: "3 hours ago", duration: "0.9s", incidentId: "INC0042777" },
]

export function WorkflowConfigPanel({
  workflowName,
  workflowDescription,
  workflowState,
  onNameChange,
  onDescriptionChange,
  onStateChange,
}: WorkflowConfigPanelProps) {
  const [retryEnabled, setRetryEnabled] = useState(true)
  const [maxRetries, setMaxRetries] = useState("3")
  const [retryDelay, setRetryDelay] = useState("5")

  return (
    <div className="flex h-full flex-col border-l border-border bg-card">
      <div className="shrink-0 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#0D3133]">Configuration</h3>
          <WorkflowStateBadge state={workflowState} />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <Accordion type="multiple" defaultValue={["general", "execution", "history"]} className="space-y-2">
            {/* General */}
            <AccordionItem value="general" className="border rounded-lg px-3">
              <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-[#73847B]" />
                  General
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Workflow Name</Label>
                    <Input
                      value={workflowName}
                      onChange={(e) => onNameChange(e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      value={workflowDescription}
                      onChange={(e) => onDescriptionChange(e.target.value)}
                      className="text-sm resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-xs">Workflow State</Label>
                      <p className="text-xs text-muted-foreground">
                        Enable or pause this workflow
                      </p>
                    </div>
                    <Switch
                      checked={workflowState === "active"}
                      onCheckedChange={(checked) => onStateChange(checked ? "active" : "paused")}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Execution Settings */}
            <AccordionItem value="execution" className="border rounded-lg px-3">
              <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-[#73847B]" />
                  Execution Settings
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-xs">Enable Retries</Label>
                      <p className="text-xs text-muted-foreground">
                        Retry on failure
                      </p>
                    </div>
                    <Switch
                      checked={retryEnabled}
                      onCheckedChange={setRetryEnabled}
                    />
                  </div>

                  {retryEnabled && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs">Max Retries</Label>
                          <Select value={maxRetries} onValueChange={setMaxRetries}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Retry Delay (min)</Label>
                          <Select value={retryDelay} onValueChange={setRetryDelay}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 min</SelectItem>
                              <SelectItem value="5">5 min</SelectItem>
                              <SelectItem value="15">15 min</SelectItem>
                              <SelectItem value="30">30 min</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="space-y-1.5">
                    <Label className="text-xs">Run Mode</Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All matching incidents</SelectItem>
                        <SelectItem value="first">First match only</SelectItem>
                        <SelectItem value="batch">Batch (every 5 min)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Execution History */}
            <AccordionItem value="history" className="border rounded-lg px-3">
              <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4 text-[#73847B]" />
                  Recent Executions
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {executionHistory.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-2">
                  {executionHistory.map((exec) => (
                    <div
                      key={exec.id}
                      className="flex items-center gap-3 rounded-md bg-muted/50 p-2"
                    >
                      {exec.status === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : exec.status === "failed" ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium">{exec.incidentId}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {exec.startedAt} · {exec.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>

      {/* Actions */}
      <div className="shrink-0 border-t border-border p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Clock className="mr-1.5 h-4 w-4" />
            Test
          </Button>
          <Button size="sm" className="flex-1 bg-[#E69F50] text-[#0D3133] hover:bg-[#E69F50]/90">
            <Play className="mr-1.5 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
