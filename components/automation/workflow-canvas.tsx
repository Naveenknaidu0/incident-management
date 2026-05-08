"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  GitBranch,
  ArrowDown,
  Plus,
  Trash2,
  GripVertical,
  Settings,
  AlertCircle,
  UserPlus,
  Mail,
  Clock,
  CheckCircle,
} from "lucide-react"
import { LucideIcon } from "lucide-react"

export interface WorkflowNode {
  id: string
  type: "trigger" | "condition" | "action" | "approval" | "wait"
  name: string
  description?: string
  icon: LucideIcon
  config?: Record<string, unknown>
  branches?: { label: string; nodes: WorkflowNode[] }[]
}

interface WorkflowCanvasProps {
  nodes: WorkflowNode[]
  selectedNodeId?: string
  onSelectNode: (nodeId: string) => void
  onAddNode: (afterNodeId: string, type: string) => void
  onRemoveNode: (nodeId: string) => void
}

const nodeTypeStyles: Record<string, { bg: string; border: string; icon: string }> = {
  trigger: {
    bg: "bg-[#0D3133]",
    border: "border-[#0D3133]",
    icon: "text-white",
  },
  condition: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "text-amber-600",
  },
  action: {
    bg: "bg-[#E69F50]/10",
    border: "border-[#E69F50]",
    icon: "text-[#E69F50]",
  },
  approval: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "text-purple-600",
  },
  wait: {
    bg: "bg-slate-50",
    border: "border-slate-200",
    icon: "text-slate-600",
  },
}

function WorkflowNodeComponent({
  node,
  isSelected,
  onSelect,
  onRemove,
}: {
  node: WorkflowNode
  isSelected: boolean
  onSelect: () => void
  onRemove: () => void
}) {
  const styles = nodeTypeStyles[node.type]
  const Icon = node.icon

  return (
    <div
      onClick={onSelect}
      className={cn(
        "group relative cursor-pointer rounded-lg border-2 p-3 transition-all hover:shadow-md",
        styles.bg,
        styles.border,
        isSelected && "ring-2 ring-[#E69F50] ring-offset-2"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md",
            node.type === "trigger" ? "bg-white/20" : "bg-white"
          )}
        >
          <Icon className={cn("h-4 w-4", styles.icon)} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p
              className={cn(
                "text-sm font-medium truncate",
                node.type === "trigger" ? "text-white" : "text-foreground"
              )}
            >
              {node.name}
            </p>
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] capitalize",
                node.type === "trigger" && "border-white/30 text-white/80"
              )}
            >
              {node.type}
            </Badge>
          </div>
          {node.description && (
            <p
              className={cn(
                "mt-0.5 text-xs truncate",
                node.type === "trigger" ? "text-white/70" : "text-muted-foreground"
              )}
            >
              {node.description}
            </p>
          )}
        </div>

        {/* Node actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Settings className="h-3.5 w-3.5" />
          </Button>
          {node.type !== "trigger" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                onRemove()
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Drag handle */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-muted">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}

function AddNodeButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-6 w-px bg-border" />
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 rounded-full"
        onClick={onClick}
      >
        <Plus className="h-4 w-4" />
      </Button>
      <div className="h-6 w-px bg-border" />
    </div>
  )
}

export function WorkflowCanvas({
  nodes,
  selectedNodeId,
  onSelectNode,
  onAddNode,
  onRemoveNode,
}: WorkflowCanvasProps) {
  return (
    <div className="flex h-full flex-col items-center py-8">
      <div className="w-full max-w-md space-y-0">
        {nodes.map((node, index) => (
          <div key={node.id}>
            <WorkflowNodeComponent
              node={node}
              isSelected={selectedNodeId === node.id}
              onSelect={() => onSelectNode(node.id)}
              onRemove={() => onRemoveNode(node.id)}
            />

            {/* Connector */}
            {index < nodes.length - 1 && (
              <AddNodeButton onClick={() => onAddNode(node.id, "action")} />
            )}
          </div>
        ))}

        {/* Add final node */}
        {nodes.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="h-6 w-px bg-border" />
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => onAddNode(nodes[nodes.length - 1].id, "action")}
            >
              <Plus className="h-4 w-4" />
              Add Step
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Demo workflow data
export const demoWorkflow: WorkflowNode[] = [
  {
    id: "trigger-1",
    type: "trigger",
    name: "Incident Created",
    description: "Fires when a new incident is created",
    icon: Zap,
  },
  {
    id: "condition-1",
    type: "condition",
    name: "Check Priority",
    description: "If priority is Critical or High",
    icon: GitBranch,
  },
  {
    id: "action-1",
    type: "action",
    name: "Assign to On-Call",
    description: "Assign to current on-call engineer",
    icon: UserPlus,
  },
  {
    id: "action-2",
    type: "action",
    name: "Send Notification",
    description: "Notify stakeholders via email",
    icon: Mail,
  },
]
