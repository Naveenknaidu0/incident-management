"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Plus, Trash2, Save } from "lucide-react"

interface FilterCondition {
  id: string
  field: string
  operator: string
  value: string
}

interface FilterGroup {
  id: string
  logic: "AND" | "OR"
  conditions: FilterCondition[]
}

interface AdvancedFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  onApply: (groups: FilterGroup[]) => void
}

const fieldOptions = [
  { value: "status", label: "Status" },
  { value: "priority", label: "Priority" },
  { value: "severity", label: "Severity" },
  { value: "assignmentGroup", label: "Assignment Group" },
  { value: "assignedTo", label: "Assigned To" },
  { value: "service", label: "Service" },
  { value: "category", label: "Category" },
  { value: "slaState", label: "SLA State" },
  { value: "createdAt", label: "Created Date" },
  { value: "updatedAt", label: "Updated Date" },
  { value: "resolvedAt", label: "Resolved Date" },
  { value: "tags", label: "Tags" },
  { value: "description", label: "Description" },
]

const operatorOptions: Record<string, { value: string; label: string }[]> = {
  text: [
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Does not equal" },
    { value: "contains", label: "Contains" },
    { value: "not_contains", label: "Does not contain" },
    { value: "starts_with", label: "Starts with" },
    { value: "ends_with", label: "Ends with" },
    { value: "is_empty", label: "Is empty" },
    { value: "is_not_empty", label: "Is not empty" },
  ],
  date: [
    { value: "equals", label: "Equals" },
    { value: "before", label: "Before" },
    { value: "after", label: "After" },
    { value: "between", label: "Between" },
    { value: "last_7_days", label: "Last 7 days" },
    { value: "last_30_days", label: "Last 30 days" },
    { value: "this_month", label: "This month" },
    { value: "last_month", label: "Last month" },
  ],
  select: [
    { value: "is", label: "Is" },
    { value: "is_not", label: "Is not" },
    { value: "is_any_of", label: "Is any of" },
    { value: "is_none_of", label: "Is none of" },
  ],
}

const dateFields = ["createdAt", "updatedAt", "resolvedAt"]
const selectFields = ["status", "priority", "severity", "assignmentGroup", "service", "category", "slaState"]

function getOperators(field: string) {
  if (dateFields.includes(field)) return operatorOptions.date
  if (selectFields.includes(field)) return operatorOptions.select
  return operatorOptions.text
}

export function AdvancedFilterDrawer({
  isOpen,
  onClose,
  onApply,
}: AdvancedFilterDrawerProps) {
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([
    {
      id: "1",
      logic: "AND",
      conditions: [
        { id: "1-1", field: "status", operator: "is", value: "" },
      ],
    },
  ])

  const addCondition = (groupId: string) => {
    setFilterGroups(
      filterGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              conditions: [
                ...group.conditions,
                {
                  id: `${groupId}-${Date.now()}`,
                  field: "status",
                  operator: "is",
                  value: "",
                },
              ],
            }
          : group
      )
    )
  }

  const removeCondition = (groupId: string, conditionId: string) => {
    setFilterGroups(
      filterGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              conditions: group.conditions.filter((c) => c.id !== conditionId),
            }
          : group
      )
    )
  }

  const updateCondition = (
    groupId: string,
    conditionId: string,
    field: keyof FilterCondition,
    value: string
  ) => {
    setFilterGroups(
      filterGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              conditions: group.conditions.map((c) =>
                c.id === conditionId ? { ...c, [field]: value } : c
              ),
            }
          : group
      )
    )
  }

  const addGroup = () => {
    setFilterGroups([
      ...filterGroups,
      {
        id: `${Date.now()}`,
        logic: "AND",
        conditions: [
          { id: `${Date.now()}-1`, field: "status", operator: "is", value: "" },
        ],
      },
    ])
  }

  const removeGroup = (groupId: string) => {
    if (filterGroups.length > 1) {
      setFilterGroups(filterGroups.filter((g) => g.id !== groupId))
    }
  }

  const toggleGroupLogic = (groupId: string) => {
    setFilterGroups(
      filterGroups.map((group) =>
        group.id === groupId
          ? { ...group, logic: group.logic === "AND" ? "OR" : "AND" }
          : group
      )
    )
  }

  const clearAll = () => {
    setFilterGroups([
      {
        id: "1",
        logic: "AND",
        conditions: [
          { id: "1-1", field: "status", operator: "is", value: "" },
        ],
      },
    ])
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[520px] flex-col border-l border-border bg-card shadow-xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">
                Advanced Filters
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-6">
                {filterGroups.map((group, groupIndex) => (
                  <div key={group.id} className="space-y-4">
                    {groupIndex > 0 && (
                      <div className="flex items-center gap-4">
                        <Separator className="flex-1" />
                        <span className="text-xs font-medium text-muted-foreground">
                          OR
                        </span>
                        <Separator className="flex-1" />
                      </div>
                    )}

                    <div className="rounded-lg border border-border p-4">
                      {/* Group Header */}
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">
                            Filter Group {groupIndex + 1}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleGroupLogic(group.id)}
                            className="h-6 px-2 text-xs"
                          >
                            {group.logic}
                          </Button>
                        </div>
                        {filterGroups.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeGroup(group.id)}
                            className="h-6 w-6"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                        )}
                      </div>

                      {/* Conditions */}
                      <div className="space-y-3">
                        {group.conditions.map((condition, condIndex) => (
                          <div key={condition.id} className="space-y-2">
                            {condIndex > 0 && (
                              <div className="flex items-center gap-2 py-1">
                                <span className="text-xs font-medium text-[#E69F50]">
                                  {group.logic}
                                </span>
                                <Separator className="flex-1" />
                              </div>
                            )}
                            <div className="flex items-start gap-2">
                              {/* Field */}
                              <Select
                                value={condition.field}
                                onValueChange={(value) =>
                                  updateCondition(
                                    group.id,
                                    condition.id,
                                    "field",
                                    value
                                  )
                                }
                              >
                                <SelectTrigger className="w-36">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {fieldOptions.map((field) => (
                                    <SelectItem
                                      key={field.value}
                                      value={field.value}
                                    >
                                      {field.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              {/* Operator */}
                              <Select
                                value={condition.operator}
                                onValueChange={(value) =>
                                  updateCondition(
                                    group.id,
                                    condition.id,
                                    "operator",
                                    value
                                  )
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {getOperators(condition.field).map((op) => (
                                    <SelectItem key={op.value} value={op.value}>
                                      {op.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              {/* Value */}
                              <Input
                                placeholder="Value..."
                                value={condition.value}
                                onChange={(e) =>
                                  updateCondition(
                                    group.id,
                                    condition.id,
                                    "value",
                                    e.target.value
                                  )
                                }
                                className="flex-1"
                              />

                              {/* Remove */}
                              {group.conditions.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    removeCondition(group.id, condition.id)
                                  }
                                  className="h-9 w-9 shrink-0"
                                >
                                  <X className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Condition */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addCondition(group.id)}
                        className="mt-3 gap-1.5 text-[#E69F50] hover:text-[#E69F50]"
                      >
                        <Plus className="h-4 w-4" />
                        Add condition
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Add Group */}
                <Button
                  variant="outline"
                  onClick={addGroup}
                  className="w-full gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Filter Group (OR)
                </Button>
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="shrink-0 border-t border-border bg-muted/30 px-6 py-4">
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={clearAll}>
                  Clear All
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-2">
                    <Save className="h-4 w-4" />
                    Save as View
                  </Button>
                  <Button
                    onClick={() => {
                      onApply(filterGroups)
                      onClose()
                    }}
                    className="bg-[#0D3133] hover:bg-[#0D3133]/90"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
