"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  UserPlus,
  RefreshCw,
  AlertTriangle,
  Tag,
  Download,
  XCircle,
  GitMerge,
  ChevronDown,
  X,
} from "lucide-react"

interface BulkActionsBarProps {
  selectedCount: number
  onClearSelection: () => void
  onAssign: () => void
  onChangeStatus: () => void
  onEscalate: () => void
  onAddTags: () => void
  onExport: () => void
  onClose: () => void
  onMerge: () => void
}

const statusOptions = [
  { label: "New", value: "new" },
  { label: "Assigned", value: "assigned" },
  { label: "In Progress", value: "in-progress" },
  { label: "Pending", value: "pending" },
  { label: "Resolved", value: "resolved" },
  { label: "Closed", value: "closed" },
]

export function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onAssign,
  onChangeStatus,
  onEscalate,
  onAddTags,
  onExport,
  onClose,
  onMerge,
}: BulkActionsBarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 shadow-lg">
            {/* Selection Count */}
            <div className="flex items-center gap-2 border-r border-border pr-4">
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#0D3133] px-2 text-sm font-medium text-white">
                {selectedCount}
              </span>
              <span className="text-sm text-muted-foreground">selected</span>
              <button
                onClick={onClearSelection}
                className="ml-1 rounded-full p-0.5 hover:bg-muted"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              {/* Assign */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onAssign}
                className="h-8 gap-1.5"
              >
                <UserPlus className="h-4 w-4" />
                Assign
              </Button>

              {/* Change Status */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                    <RefreshCw className="h-4 w-4" />
                    Status
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {statusOptions.map((status) => (
                    <DropdownMenuItem
                      key={status.value}
                      onClick={onChangeStatus}
                    >
                      {status.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Escalate */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onEscalate}
                className="h-8 gap-1.5 text-amber-600 hover:text-amber-700"
              >
                <AlertTriangle className="h-4 w-4" />
                Escalate
              </Button>

              {/* Add Tags */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddTags}
                className="h-8 gap-1.5"
              >
                <Tag className="h-4 w-4" />
                Tags
              </Button>

              {/* Export */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onExport}
                className="h-8 gap-1.5"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>

              <div className="h-5 w-px bg-border" />

              {/* Close Incidents */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 gap-1.5"
              >
                <XCircle className="h-4 w-4" />
                Close
              </Button>

              {/* Merge */}
              {selectedCount >= 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMerge}
                  className="h-8 gap-1.5"
                >
                  <GitMerge className="h-4 w-4" />
                  Merge
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
