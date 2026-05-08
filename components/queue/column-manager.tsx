"use client"

import { useState } from "react"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { X, GripVertical, RotateCcw } from "lucide-react"

export interface ColumnConfig {
  id: string
  label: string
  visible: boolean
  width?: number
  locked?: boolean
}

interface ColumnManagerProps {
  isOpen: boolean
  onClose: () => void
  columns: ColumnConfig[]
  onColumnsChange: (columns: ColumnConfig[]) => void
}

const defaultColumns: ColumnConfig[] = [
  { id: "select", label: "Select", visible: true, locked: true },
  { id: "priority", label: "Priority", visible: true },
  { id: "id", label: "Incident ID", visible: true },
  { id: "title", label: "Title", visible: true },
  { id: "status", label: "Status", visible: true },
  { id: "severity", label: "Severity", visible: true },
  { id: "sla", label: "SLA", visible: true },
  { id: "assignmentGroup", label: "Assignment Group", visible: true },
  { id: "assignedTo", label: "Assigned To", visible: true },
  { id: "service", label: "Service", visible: true },
  { id: "updatedAt", label: "Updated", visible: true },
  { id: "createdAt", label: "Created", visible: true },
  { id: "tags", label: "Tags", visible: true },
  { id: "impact", label: "Impact", visible: false },
  { id: "urgency", label: "Urgency", visible: false },
  { id: "category", label: "Category", visible: false },
  { id: "escalationLevel", label: "Escalation Level", visible: false },
  { id: "resolvedAt", label: "Resolved Date", visible: false },
  { id: "description", label: "Description", visible: false },
]

export function ColumnManager({
  isOpen,
  onClose,
  columns,
  onColumnsChange,
}: ColumnManagerProps) {
  const [localColumns, setLocalColumns] = useState(columns)

  const handleToggleColumn = (id: string) => {
    setLocalColumns(
      localColumns.map((col) =>
        col.id === id && !col.locked ? { ...col, visible: !col.visible } : col
      )
    )
  }

  const handleReorder = (newOrder: ColumnConfig[]) => {
    setLocalColumns(newOrder)
  }

  const handleReset = () => {
    setLocalColumns(defaultColumns)
  }

  const handleApply = () => {
    onColumnsChange(localColumns)
    onClose()
  }

  const visibleCount = localColumns.filter((c) => c.visible).length
  const hiddenCount = localColumns.filter((c) => !c.visible).length

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

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[380px] flex-col border-l border-border bg-card shadow-xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Configure Columns
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {visibleCount} visible, {hiddenCount} hidden
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {/* Visible Columns */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">
                    Visible Columns
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Drag to reorder. Click to toggle visibility.
                  </p>
                  <Reorder.Group
                    axis="y"
                    values={localColumns.filter((c) => c.visible)}
                    onReorder={(newOrder) => {
                      const hidden = localColumns.filter((c) => !c.visible)
                      handleReorder([...newOrder, ...hidden])
                    }}
                    className="space-y-1"
                  >
                    {localColumns
                      .filter((c) => c.visible)
                      .map((column) => (
                        <Reorder.Item
                          key={column.id}
                          value={column}
                          className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 cursor-grab active:cursor-grabbing"
                        >
                          <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <Checkbox
                            checked={column.visible}
                            onCheckedChange={() => handleToggleColumn(column.id)}
                            disabled={column.locked}
                          />
                          <span className="flex-1 text-sm text-foreground">
                            {column.label}
                          </span>
                          {column.locked && (
                            <span className="text-xs text-muted-foreground">
                              Required
                            </span>
                          )}
                        </Reorder.Item>
                      ))}
                  </Reorder.Group>
                </div>

                <Separator />

                {/* Hidden Columns */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">
                    Hidden Columns
                  </h3>
                  <div className="space-y-1">
                    {localColumns
                      .filter((c) => !c.visible)
                      .map((column) => (
                        <div
                          key={column.id}
                          className="flex items-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 p-3"
                        >
                          <div className="w-4" />
                          <Checkbox
                            checked={column.visible}
                            onCheckedChange={() => handleToggleColumn(column.id)}
                          />
                          <span className="flex-1 text-sm text-muted-foreground">
                            {column.label}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="shrink-0 border-t border-border bg-muted/30 px-6 py-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset to Default
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleApply}
                    className="bg-[#0D3133] hover:bg-[#0D3133]/90"
                  >
                    Apply Changes
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

export { defaultColumns }
