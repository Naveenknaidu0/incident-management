"use client"

import { cn } from "@/lib/utils"
import {
  Plus,
  RefreshCw,
  Clock,
  GitBranch,
  AlertTriangle,
  Bell,
  UserPlus,
  Settings,
  FileEdit,
  Zap,
  Shield,
  Eye,
  Trash,
  Lock,
} from "lucide-react"

type EventType =
  | "incident-created"
  | "status-changed"
  | "sla-modified"
  | "workflow-updated"
  | "escalation-triggered"
  | "notification-sent"
  | "assignment-changed"
  | "configuration-updated"
  | "template-modified"
  | "automation-edited"
  | "access-granted"
  | "access-revoked"
  | "record-deleted"
  | "policy-violation"

interface EventTypeBadgeProps {
  type: EventType
  className?: string
}

const eventConfig: Record<EventType, { label: string; icon: typeof Plus; color: string }> = {
  "incident-created": { label: "Incident Created", icon: Plus, color: "text-green-600" },
  "status-changed": { label: "Status Changed", icon: RefreshCw, color: "text-blue-600" },
  "sla-modified": { label: "SLA Modified", icon: Clock, color: "text-amber-600" },
  "workflow-updated": { label: "Workflow Updated", icon: GitBranch, color: "text-purple-600" },
  "escalation-triggered": { label: "Escalation Triggered", icon: AlertTriangle, color: "text-red-600" },
  "notification-sent": { label: "Notification Sent", icon: Bell, color: "text-indigo-600" },
  "assignment-changed": { label: "Assignment Changed", icon: UserPlus, color: "text-teal-600" },
  "configuration-updated": { label: "Configuration Updated", icon: Settings, color: "text-slate-600" },
  "template-modified": { label: "Template Modified", icon: FileEdit, color: "text-orange-600" },
  "automation-edited": { label: "Automation Edited", icon: Zap, color: "text-yellow-600" },
  "access-granted": { label: "Access Granted", icon: Shield, color: "text-green-600" },
  "access-revoked": { label: "Access Revoked", icon: Lock, color: "text-red-600" },
  "record-deleted": { label: "Record Deleted", icon: Trash, color: "text-red-600" },
  "policy-violation": { label: "Policy Violation", icon: Eye, color: "text-red-600" },
}

export function EventTypeBadge({ type, className }: EventTypeBadgeProps) {
  const config = eventConfig[type]
  const Icon = config.icon

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", config.color, className)}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  )
}
