"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2, GitBranch } from "lucide-react"

interface Condition {
  id: string
  field: string
  operator: string
  value: string
}

interface ConditionGroup {
  id: string
  logic: "AND" | "OR"
  conditions: Condition[]
}

const fields = [
  { value: "priority", label: "Priority" },
  { value: "severity", label: "Severity" },
  { value: "status", label: "Status" },
  { value: "service", label: "Service" },
  { value: "assignment_group", label: "Assignment Group" },
  { value: "sla_state", label: "SLA State" },
  { value: "category", label: "Category" },
  { value: "tags", label: "Tags" },
  { value: "impacted_users", label: "Impacted Users" },
  { value: "environment", label: "Environment" },
]

const operators = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not Equals" },
  { value: "contains", label: "Contains" },
  { value: "not_contains", label: "Not Contains" },
  { value: "starts_with", label: "Starts With" },
  { value: "ends_with", label: "Ends With" },
  { value: "greater_than", label: "Greater Than" },
  { value: "less_than", label: "Less Than" },
  { value: "is_empty", label: "Is Empty" },
  { value: "is_not_empty", label: "Is Not Empty" },
]

interface ConditionBuilderProps {
  groups: ConditionGroup[]
  onChange: (groups: ConditionGroup[]) => void
}

export function ConditionBuilder({ groups, onChange }: ConditionBuilderProps) {
  const addGroup = () => {
    const newGroup: ConditionGroup = {
      id: `group-${Date.now()}`,
      logic: "AND",
      conditions: [
        { id: `cond-${Date.now()}`, field: "", operator: "equals", value: "" },
      ],
    }
    onChange([...groups, newGroup])
  }

  const removeGroup = (groupId: string) => {
    onChange(groups.filter((g) => g.id !== groupId))
  }

  const updateGroupLogic = (groupId: string, logic: "AND" | "OR") => {
    onChange(
      groups.map((g) => (g.id === groupId ? { ...g, logic } : g))
    )
  }

  const addCondition = (groupId: string) => {
    onChange(
      groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              conditions: [
                ...g.conditions,
                { id: `cond-${Date.now()}`, field: "", operator: "equals", value: "" },
              ],
            }
          : g
      )
    )
  }

  const removeCondition = (groupId: string, conditionId: string) => {
    onChange(
      groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              conditions: g.conditions.filter((c) => c.id !== conditionId),
            }
          : g
      )
    )
  }

  const updateCondition = (
    groupId: string,
    conditionId: string,
    updates: Partial<Condition>
  ) => {
    onChange(
      groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              conditions: g.conditions.map((c) =>
                c.id === conditionId ? { ...c, ...updates } : c
              ),
            }
          : g
      )
    )
  }

  return (
    <div className="space-y-4">
      {groups.map((group, groupIndex) => (
        <div key={group.id} className="relative">
          {groupIndex > 0 && (
            <div className="mb-2 flex items-center justify-center">
              <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                OR
              </div>
            </div>
          )}

          <div className="rounded-lg border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-[#73847B]" />
                <span className="text-xs font-medium text-muted-foreground">
                  Condition Group
                </span>
                <Select
                  value={group.logic}
                  onValueChange={(value: "AND" | "OR") =>
                    updateGroupLogic(group.id, value)
                  }
                >
                  <SelectTrigger className="h-6 w-16 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AND">AND</SelectItem>
                    <SelectItem value="OR">OR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {groups.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeGroup(group.id)}
                >
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {group.conditions.map((condition, condIndex) => (
                <div key={condition.id} className="flex items-center gap-2">
                  {condIndex > 0 && (
                    <span className="w-8 text-center text-xs text-muted-foreground">
                      {group.logic}
                    </span>
                  )}
                  {condIndex === 0 && <span className="w-8" />}

                  <Select
                    value={condition.field}
                    onValueChange={(value) =>
                      updateCondition(group.id, condition.id, { field: value })
                    }
                  >
                    <SelectTrigger className="h-8 w-[140px] text-xs">
                      <SelectValue placeholder="Field" />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((f) => (
                        <SelectItem key={f.value} value={f.value}>
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={condition.operator}
                    onValueChange={(value) =>
                      updateCondition(group.id, condition.id, { operator: value })
                    }
                  >
                    <SelectTrigger className="h-8 w-[120px] text-xs">
                      <SelectValue placeholder="Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      {operators.map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    value={condition.value}
                    onChange={(e) =>
                      updateCondition(group.id, condition.id, { value: e.target.value })
                    }
                    placeholder="Value"
                    className="h-8 flex-1 text-xs"
                  />

                  {group.conditions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeCondition(group.id, condition.id)}
                    >
                      <Trash2 className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="mt-2 h-7 text-xs"
              onClick={() => addCondition(group.id)}
            >
              <Plus className="mr-1 h-3 w-3" />
              Add Condition
            </Button>
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={addGroup}
      >
        <Plus className="mr-1.5 h-4 w-4" />
        Add Condition Group
      </Button>
    </div>
  )
}
