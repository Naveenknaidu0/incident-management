"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  UserCheck,
  Users,
  Building,
  Shield,
  Plus,
  Trash2,
  ArrowDown,
  Clock,
} from "lucide-react"

interface ApprovalStage {
  id: string
  name: string
  type: "manager" | "cab" | "executive" | "custom"
  approvers: string[]
  timeout: number
  autoApproveOnTimeout: boolean
}

interface ApprovalFlowDesignerProps {
  stages: ApprovalStage[]
  onChange: (stages: ApprovalStage[]) => void
}

const stageTypes = [
  { value: "manager", label: "Manager Approval", icon: UserCheck },
  { value: "cab", label: "CAB Approval", icon: Users },
  { value: "executive", label: "Executive Approval", icon: Building },
  { value: "custom", label: "Custom Approvers", icon: Shield },
]

export function ApprovalFlowDesigner({ stages, onChange }: ApprovalFlowDesignerProps) {
  const addStage = () => {
    const newStage: ApprovalStage = {
      id: `stage-${Date.now()}`,
      name: "New Approval Stage",
      type: "manager",
      approvers: [],
      timeout: 24,
      autoApproveOnTimeout: false,
    }
    onChange([...stages, newStage])
  }

  const removeStage = (stageId: string) => {
    onChange(stages.filter((s) => s.id !== stageId))
  }

  const updateStage = (stageId: string, updates: Partial<ApprovalStage>) => {
    onChange(
      stages.map((s) => (s.id === stageId ? { ...s, ...updates } : s))
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#0D3133]">Approval Stages</h3>
        <Badge variant="secondary" className="text-xs">
          {stages.length} stages
        </Badge>
      </div>

      <div className="space-y-3">
        {stages.map((stage, index) => {
          const StageIcon = stageTypes.find((t) => t.value === stage.type)?.icon || UserCheck

          return (
            <div key={stage.id}>
              {index > 0 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                </div>
              )}

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
                        <StageIcon className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{stage.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          Stage {index + 1} of {stages.length}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => removeStage(stage.id)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Stage Name</Label>
                      <Input
                        value={stage.name}
                        onChange={(e) => updateStage(stage.id, { name: e.target.value })}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Approval Type</Label>
                      <Select
                        value={stage.type}
                        onValueChange={(value: ApprovalStage["type"]) =>
                          updateStage(stage.id, { type: value })
                        }
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {stageTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Timeout (hours)</Label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        value={stage.timeout}
                        onChange={(e) =>
                          updateStage(stage.id, { timeout: parseInt(e.target.value) || 24 })
                        }
                        className="h-8 w-20 text-sm"
                      />
                      <span className="text-xs text-muted-foreground">hours</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-xs">Auto-approve on timeout</Label>
                      <p className="text-[10px] text-muted-foreground">
                        Automatically approve if no response
                      </p>
                    </div>
                    <Switch
                      checked={stage.autoApproveOnTimeout}
                      onCheckedChange={(checked) =>
                        updateStage(stage.id, { autoApproveOnTimeout: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>

      <Button variant="outline" className="w-full" onClick={addStage}>
        <Plus className="mr-1.5 h-4 w-4" />
        Add Approval Stage
      </Button>
    </div>
  )
}

// Demo data
export const demoApprovalStages: ApprovalStage[] = [
  {
    id: "stage-1",
    name: "Manager Approval",
    type: "manager",
    approvers: [],
    timeout: 24,
    autoApproveOnTimeout: false,
  },
  {
    id: "stage-2",
    name: "CAB Review",
    type: "cab",
    approvers: [],
    timeout: 48,
    autoApproveOnTimeout: false,
  },
]
